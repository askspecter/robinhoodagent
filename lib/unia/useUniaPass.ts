"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { useAccount, useBalance, useReadContract, useWriteContract } from "wagmi";
import { formatEther, parseEther } from "viem";
import { UNIA, robinhoodChain, isPlaceholderAddr } from "@/lib/config";
import { privyEnabled } from "@/lib/wagmi";
import { useWalletConnect } from "@/lib/wallet/connect";
import { UNIA_TOKEN_ABI, UNIA_PASS_ABI } from "./abi";

/**
 * UNIA PASS economy — real on-chain when the contracts are deployed
 * (addresses set in lib/config.ts), otherwise a paper/demo simulation.
 * Wallet connect is real (wagmi injected) whenever a browser wallet exists;
 * it falls back to a sim wallet so the demo still works without one.
 */

const FREE_HOLD = UNIA.token.freeMintHold;   // 5,000,000
const PRICE_ETH = UNIA.pass.publicPriceEth;  // 0.005
const REWARD_DAY = UNIA.pass.rewardPerDay;   // 420 / day
const TOKEN = UNIA.token.address as `0x${string}`;
const PASS = UNIA.pass.address as `0x${string}`;
const ONCHAIN = !isPlaceholderAddr(UNIA.token.address) && !isPlaceholderAddr(UNIA.pass.address);

const hex = (n: number) => Array.from({ length: n }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
const num = (x: unknown) => (typeof x === "bigint" ? Number(formatEther(x)) : 0);
// deterministic paper $UNIA balance for a given address (some wallets are whales)
function simBal(addr: string): number {
  let h = 0;
  for (const c of addr) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const r = (h % 10000) / 10000;
  return Math.round(r < 0.35 ? 5_000_000 + r * 9_000_000 : r * 4_000_000);
}

type Demo = { address: string; unia: number; owned: boolean; minting: boolean; mintTx: string | null; freeMinted: boolean; rewards: number };
const freshDemo = (): Demo => ({ address: "", unia: 0, owned: false, minting: false, mintTx: null, freeMinted: false, rewards: 0 });

export function useUniaPass() {
  const [, force] = useReducer((x) => x + 1, 0);
  const demo = useRef<Demo>(freshDemo());

  // ---- real wallet (wagmi + connect bridge: Privy or injected) ----
  const { address: waddr, isConnected } = useAccount();
  const wc = useWalletConnect();
  const realConnected = isConnected && !!waddr;

  const ethQ = useBalance({ address: waddr, chainId: robinhoodChain.id, query: { enabled: realConnected } });
  const uniaQ = useReadContract({ address: TOKEN, abi: UNIA_TOKEN_ABI, functionName: "balanceOf", args: [waddr ?? "0x0"], query: { enabled: ONCHAIN && realConnected, refetchInterval: 8000 } });
  const passQ = useReadContract({ address: PASS, abi: UNIA_PASS_ABI, functionName: "balanceOf", args: [waddr ?? "0x0"], query: { enabled: ONCHAIN && realConnected, refetchInterval: 8000 } });
  const pendQ = useReadContract({ address: PASS, abi: UNIA_PASS_ABI, functionName: "pendingRewards", args: [waddr ?? "0x0"], query: { enabled: ONCHAIN && realConnected, refetchInterval: 3000 } });
  const { writeContractAsync, isPending: writing } = useWriteContract();
  const txRef = useRef<string | null>(null);

  const useReal = ONCHAIN && realConnected;

  // seed / reset the demo book for the connected address (paper mode only)
  useEffect(() => {
    if (useReal) return;
    const addr = realConnected ? (waddr as string) : demo.current.address;
    if (!addr) return;
    if (demo.current.address !== addr) {
      demo.current = { ...freshDemo(), address: addr, unia: simBal(addr) };
      force();
    }
  }, [waddr, realConnected, useReal]);

  // paper rewards stream
  useEffect(() => {
    const id = setInterval(() => {
      if (!useReal && demo.current.owned) { demo.current.rewards += REWARD_DAY / 60; force(); }
    }, 1000);
    return () => clearInterval(id);
  }, [useReal]);

  // ---- effective (merged real/paper) values ----
  const connected = realConnected || demo.current.address !== "";
  const address = realConnected ? (waddr as string) : demo.current.address;
  const unia = useReal ? num(uniaQ.data) : demo.current.unia;
  const owned = useReal ? Number(passQ.data ?? 0n) > 0 : demo.current.owned;
  const rewards = useReal ? num(pendQ.data) : demo.current.rewards;
  const minting = useReal ? writing : demo.current.minting;
  const mintTx = useReal ? txRef.current : demo.current.mintTx;
  const isHolder = unia >= FREE_HOLD;

  // ---- actions ----
  const simConnect = () => {
    const addr = "0x" + hex(40);
    demo.current = { ...freshDemo(), address: addr, unia: simBal(addr) };
    force();
  };

  const connect = useCallback(async () => {
    const hasWallet = typeof window !== "undefined" && !!(window as unknown as { ethereum?: unknown }).ethereum;
    // Privy handles email/social too, so use the bridge whenever Privy is on
    // or a browser wallet exists; otherwise fall back to a sim wallet (demo).
    if ((privyEnabled || hasWallet) && wc?.connect) {
      try { await wc.connect(); return; } catch { /* fall through to sim */ }
    }
    simConnect();
  }, [wc]);

  const disconnect = useCallback(() => {
    if (realConnected) wc?.disconnect();
    demo.current = freshDemo();
    txRef.current = null;
    force();
  }, [realConnected, wc]);

  const airdrop = useCallback(() => {
    if (useReal || !demo.current.address) return; // paper-only faucet
    demo.current.unia += FREE_HOLD;
    force();
  }, [useReal]);

  const mint = useCallback(async () => {
    if (owned || minting) return;
    if (useReal) {
      try {
        const price = isHolder ? 0n : parseEther(String(PRICE_ETH));
        const hash = await writeContractAsync({ address: PASS, abi: UNIA_PASS_ABI, functionName: "mint", value: price });
        txRef.current = hash; force();
      } catch { /* user rejected / failed */ }
      return;
    }
    if (!demo.current.address) return;
    demo.current.minting = true; force();
    const free = demo.current.unia >= FREE_HOLD;
    setTimeout(() => { demo.current = { ...demo.current, owned: true, minting: false, freeMinted: free, mintTx: "0x" + hex(64) }; force(); }, 1500);
  }, [owned, minting, useReal, isHolder, writeContractAsync]);

  const claim = useCallback(async () => {
    if (useReal) {
      try { const h = await writeContractAsync({ address: PASS, abi: UNIA_PASS_ABI, functionName: "claim" }); txRef.current = h; force(); } catch { /* noop */ }
      return;
    }
    if (demo.current.rewards <= 0) return;
    demo.current.unia += Math.floor(demo.current.rewards);
    demo.current.rewards = 0;
    force();
  }, [useReal, writeContractAsync]);

  return {
    connected, address, unia, owned, minting, mintTx,
    freeMinted: useReal ? isHolder : demo.current.freeMinted,
    rewards,
    premium: owned,
    isHolder,
    mintPriceEth: isHolder ? 0 : PRICE_ETH,
    freeHold: FREE_HOLD,
    priceEth: PRICE_ETH,
    rewardPerDay: REWARD_DAY,
    onchain: ONCHAIN,
    isReal: realConnected,
    ethBalance: ethQ.data?.formatted ?? null,
    canAirdrop: !useReal,
    connect, disconnect, airdrop, mint, claim,
  };
}

export type PassState = ReturnType<typeof useUniaPass>;

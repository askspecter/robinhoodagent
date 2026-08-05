"use client";

import { useCallback, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { UNIA, POOLS, BUY, isPlaceholderAddr, poolsTradeUrl } from "@/lib/config";
import { ATOMIC_BUY_ABI } from "./abi";

/**
 * Native "Buy $UNIA" — routes ETH → $UNIA through pools.trade's atomic buy
 * route in a single tx.
 *
 * SAFETY GATE: the on-chain call only fires when EVERY condition holds:
 *   - the $UNIA token address is real (not the 0x000… placeholder),
 *   - the atomic buy route is set,
 *   - BUY.verified === true (the route's ABI has been confirmed).
 * Until then `nativeReady` is false and `buy()` just opens pools.trade, so we
 * never submit a transaction against an unverified function signature.
 */
export function useUniaBuy() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();
  const [tx, setTx] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const tokenLive = !isPlaceholderAddr(UNIA.token.address);
  const routeSet = !isPlaceholderAddr(POOLS.atomicBuyRoute);
  const nativeReady = tokenLive && routeSet && BUY.verified;
  const link = poolsTradeUrl();

  const openPools = useCallback(() => {
    if (typeof window !== "undefined") window.open(link, "_blank", "noreferrer");
  }, [link]);

  const buy = useCallback(
    async (ethAmount: string) => {
      setError(null);
      setTx(null);

      // not wired for native execution yet → hand off to pools.trade
      if (!nativeReady) {
        openPools();
        return;
      }
      if (!isConnected || !address) {
        setError("connect your wallet first");
        return;
      }

      let value: bigint;
      try {
        value = parseEther((ethAmount || "0").trim());
      } catch {
        setError("enter a valid ETH amount");
        return;
      }
      if (value <= 0n) {
        setError("enter an amount");
        return;
      }

      try {
        const token = UNIA.token.address as `0x${string}`;
        // amountOutMin left at 0 here; wire real slippage math (BUY.slippageBps)
        // once a quote source is available. Args must match ATOMIC_BUY_ABI.
        const hash = await writeContractAsync({
          address: POOLS.atomicBuyRoute as `0x${string}`,
          abi: ATOMIC_BUY_ABI,
          functionName: BUY.functionName as "buy",
          args: [token, 0n, address],
          value,
        });
        setTx(hash);
      } catch {
        setError("transaction rejected or failed");
      }
    },
    [nativeReady, isConnected, address, writeContractAsync, openPools],
  );

  return {
    buy,
    buying: isPending,
    tx,
    error,
    nativeReady,
    tokenLive,
    link,
    presets: BUY.presetsEth,
  };
}

export type BuyState = ReturnType<typeof useUniaBuy>;

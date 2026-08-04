"use client";

import { useMemo, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { ConnectButton } from "@/components/ConnectButton";
import { site, robinhoodChain } from "@/lib/config";
import { robinhood } from "@/lib/chain";

// Minimal ERC-721A style mint ABI (adjust to your contract).
const MINT_ABI = [
  {
    type: "function",
    name: "mint",
    stateMutability: "payable",
    inputs: [{ name: "quantity", type: "uint256" }],
    outputs: [],
  },
  {
    type: "function",
    name: "totalSupply",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

export default function MintPage() {
  const { isConnected, chainId } = useAccount();
  const [qty, setQty] = useState(1);

  const contract = site.nft.contractAddress;
  const isDemo = contract.startsWith("0x0000000");
  const wrongChain = isConnected && chainId !== robinhood.id;

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: confirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const minted = 1287; // illustrative
  const pct = useMemo(
    () => Math.min(100, (minted / site.nft.totalSupply) * 100),
    []
  );

  function handleMint() {
    if (isDemo) return;
    writeContract({
      abi: MINT_ABI,
      address: contract as `0x${string}`,
      functionName: "mint",
      args: [BigInt(qty)],
      value: 0n, // free mint; change if paid
    });
  }

  const canMint = isConnected && !wrongChain && !isDemo && !isPending && !confirming;

  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <div className="grid gap-10 lg:grid-cols-2 items-start">
        {/* Preview card */}
        <div className="panel p-6">
          <div className="aspect-square rounded-xl border border-stonk-line grid-bg relative overflow-hidden grid place-items-center">
            <div className="text-center">
              <div className="text-7xl">💼</div>
              <div className="mt-3 font-mono text-stonk-muted text-sm">
                {site.nft.collectionName} #????
              </div>
            </div>
            <div className="absolute top-3 left-3 chip px-2 py-1 text-xs text-stonk-green font-mono uppercase tracking-wider">
              Robinhood Chain
            </div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-stonk-muted">Minted</span>
              <span className="font-mono">
                {minted.toLocaleString()} / {site.nft.totalSupply.toLocaleString()}
              </span>
            </div>
            <div className="h-2 rounded-full bg-stonk-line overflow-hidden">
              <div className="h-full bg-stonk-green" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        {/* Mint controls */}
        <div>
          <h1 className="text-4xl font-black">Mint your Broker</h1>
          <p className="mt-3 text-stonk-muted">
            Claim your broker NFT on {robinhoodChain.name}. Every broker is your ticket
            into the ecosystem and the rewards powered by {site.ticker} on Pons.
          </p>

          <div className="mt-6 panel p-5 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-stonk-muted text-sm">Price</span>
              <span className="font-bold">{site.nft.mintPriceLabel}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-stonk-muted text-sm">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  className="btn-ghost h-9 w-9"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="w-8 text-center font-mono text-lg">{qty}</span>
                <button
                  className="btn-ghost h-9 w-9"
                  onClick={() => setQty((q) => Math.min(site.nft.maxPerWallet, q + 1))}
                >
                  +
                </button>
              </div>
            </div>

            {!isConnected ? (
              <div className="pt-1">
                <ConnectButton />
                <p className="mt-2 text-xs text-stonk-muted">
                  Connect a wallet or sign in to mint.
                </p>
              </div>
            ) : (
              <button
                className="btn-primary w-full py-3"
                disabled={!canMint}
                onClick={handleMint}
              >
                {wrongChain
                  ? "Switch to Robinhood Chain"
                  : confirming
                  ? "Confirming…"
                  : isPending
                  ? "Check wallet…"
                  : isDemo
                  ? "Mint (demo — set contract)"
                  : `Mint ${qty}`}
              </button>
            )}

            {isDemo && (
              <p className="text-xs text-stonk-gold">
                ⚠ Demo mode: set <code>nft.contractAddress</code> in{" "}
                <code>lib/config.ts</code> to enable on-chain minting.
              </p>
            )}
            {isSuccess && (
              <p className="text-xs text-stonk-green">✅ Mint successful! Check your wallet.</p>
            )}
            {error && (
              <p className="text-xs text-stonk-red break-words">
                {(error as Error).message.slice(0, 140)}
              </p>
            )}
          </div>

          <ul className="mt-6 space-y-2 text-sm text-stonk-muted">
            <li>▸ Max {site.nft.maxPerWallet} per wallet</li>
            <li>▸ Supply {site.nft.totalSupply.toLocaleString()}</li>
            <li>▸ You only pay gas</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

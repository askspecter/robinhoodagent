"use client";

import { useState } from "react";
import { ConnectButton } from "@/components/ConnectButton";
import { site, robinhoodChain } from "@/lib/config";

const TABS = ["Swap Desk", "Trade", "My Brokers", "Activate", "Distributions", "Analytics", "Loans"];

function TokenChip({ symbol, color }: { symbol: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid place-items-center h-10 w-10 rounded-full font-bold text-stonk-ink shrink-0" style={{ background: color }}>{symbol.slice(0, 1)}</span>
      <div>
        <div className="font-bold leading-tight">{symbol}</div>
        <div className="text-xs text-stonk-muted">{robinhoodChain.name}</div>
      </div>
      <span className="text-stonk-muted ml-1">›</span>
    </div>
  );
}

export default function MarketPage() {
  const [tab, setTab] = useState("Swap Desk");
  const tokenName = site.ticker.replace("$", "");

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-8 py-8 space-y-5">
      <div className="dashed p-6">
        <h1 className="text-3xl sm:text-4xl font-bold uppercase">Anvil NFT AMM</h1>
        <p className="mt-3 text-stonk-muted text-sm leading-relaxed">
          Swap brokers for {site.ticker}, view broker wallets, activate staking tiers, collect
          stock distributions, and borrow — live on {robinhoodChain.name} mainnet.
        </p>
      </div>

      <div className="inset px-4 py-3 text-sm text-stonk-muted flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-stonk-green">&gt;_</span>
        <span className="whitespace-nowrap">buy broker · sell broker #5 · activate broker #5 · borrow</span>
        <span className="ml-auto text-stonk-green">?</span>
      </div>

      <div className="dashed-dim p-4">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`btn px-3 py-2 text-xs ${tab === t ? "btn-lime" : "text-stonk-muted"}`}>{t}</button>
          ))}
        </div>
      </div>

      {/* Swap desk */}
      <div className="panel p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="uppercase tracking-wider font-bold text-sm">Swap Desk</h2>
          <div className="flex gap-1 text-xs">
            <button className="btn btn-solid px-3 py-1.5">Crypto</button>
            <button className="btn px-3 py-1.5 opacity-60" disabled>Stock Tokens 🔒</button>
          </div>
        </div>
        <div className="inset p-4">
          <div className="text-stonk-muted text-sm mb-2">Sell</div>
          <div className="flex items-center justify-between gap-3">
            <input className="dashed-dim bg-transparent px-3 py-2 text-lg w-1/2 outline-none focus:border-stonk-green" placeholder="0" inputMode="decimal" />
            <TokenChip symbol="ETH" color="#c6f24d" />
          </div>
          <div className="text-xs text-stonk-muted mt-2">$0.00 ⇅</div>
        </div>
        <div className="flex justify-center my-2"><div className="inset h-9 w-9 grid place-items-center">↓</div></div>
        <div className="inset p-4">
          <div className="flex items-center justify-between"><span className="text-stonk-muted text-sm">Buy</span><span className="text-stonk-green text-sm">Enter Address</span></div>
          <div className="flex items-center justify-between gap-3 mt-2">
            <span className="text-lg text-stonk-muted">0</span>
            <TokenChip symbol={tokenName} color="#ff7a1a" />
          </div>
          <div className="text-xs text-stonk-muted mt-2">$0.00</div>
        </div>
        <div className="mt-5"><ConnectButton variant="sidebar" /></div>
        <p className="mt-4 text-xs text-stonk-muted text-center leading-relaxed">Pay in ETH or tokens from Ethereum, Base, Arbitrum and more.</p>
      </div>

      <div className="border-t border-stonk-line pt-4 flex items-center justify-between text-xs text-stonk-muted">
        <span className="uppercase tracking-wider">{site.name} · {robinhoodChain.name} mainnet</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-stonk-green" /> Online</span>
      </div>
    </div>
  );
}

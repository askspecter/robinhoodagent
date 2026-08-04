"use client";

import { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@/components/ConnectButton";
import { site, robinhoodChain, explorerToken } from "@/lib/config";

const TABS = ["Swap Desk", "Trade", "My Brokers", "Activate", "Distributions", "Analytics", "Loans"];

const AIRDROPS = [
  "DROP #772  0.027446 ETH → 0x4a08…",
  "DROP #771  0.019820 ETH → 0x9f21…",
  "DROP #770  0.041003 ETH → 0xa10c…",
  "DROP #769  0.008640 ETH → 0x77f2…",
];

const HOWTO = [
  {
    n: 1,
    t: `Buy ${site.ticker}`,
    d: `Swap below from any chain — ETH, Base, Arbitrum and more route straight into ${site.ticker} on Robinhood Chain.`,
  },
  {
    n: 2,
    t: "Open Anvil NFT AMM",
    d: `Go to Trade on this site. One broker costs a flat amount of ${site.ticker} plus a small ETH fee.`,
  },
  {
    n: 3,
    t: "Swap or snipe a broker",
    d: "Swap grabs the next vault broker; Snipe lets you pick an exact # from inventory.",
  },
];

function TokenChip({ symbol, label, color }: { symbol: string; label: string; color: string }) {
  return (
    <button className="flex items-center gap-3 text-left">
      <span
        className="grid place-items-center h-11 w-11 rounded-full font-black text-stonk-ink shrink-0"
        style={{ background: color }}
      >
        {symbol.slice(0, 1)}
      </span>
      <span>
        <span className="block font-bold leading-tight">{symbol}</span>
        <span className="block text-xs text-stonk-muted">{label}</span>
      </span>
      <span className="text-stonk-muted ml-1">›</span>
    </button>
  );
}

export default function MarketplacePage() {
  const [tab, setTab] = useState("Swap Desk");
  const [pay, setPay] = useState("Crypto");
  const [copied, setCopied] = useState(false);
  const tokenName = site.ticker.replace("$", "");
  const isPlaceholder = site.token.address.startsWith("0x0000000");

  function copyCA() {
    navigator.clipboard?.writeText(site.token.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 space-y-5">
      {/* Announcement bar */}
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono uppercase tracking-widest text-sm font-bold">
          Broker Box is live
        </span>
        <Link
          href="/broker-box"
          className="btn-ghost px-4 py-2 text-xs font-mono uppercase tracking-wider text-stonk-green"
        >
          Ring the bell →
        </Link>
      </div>

      {/* Hero */}
      <div className="dashed p-6">
        <h1 className="text-3xl sm:text-4xl font-black font-mono">ANVIL NFT AMM</h1>
        <p className="mt-3 text-stonk-muted leading-relaxed font-mono text-sm">
          Swap brokers for {site.ticker}, view broker wallets, activate staking tiers,
          collect stock distributions, and borrow — live on {robinhoodChain.name} mainnet.
        </p>
      </div>

      {/* Live airdrops ticker */}
      <div className="inset overflow-hidden flex items-center">
        <div className="flex items-center gap-2 px-4 py-2.5 border-r border-stonk-line shrink-0">
          <span className="h-2 w-2 rounded-full bg-stonk-green animate-pulseGlow" />
          <span className="font-mono uppercase tracking-wider text-xs text-stonk-green">Live airdrops</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex w-max animate-marquee">
            {[...AIRDROPS, ...AIRDROPS].map((a, i) => (
              <span key={i} className="px-6 py-2.5 font-mono text-xs text-stonk-muted whitespace-nowrap">
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal hint */}
      <div className="inset px-4 py-3 font-mono text-sm text-stonk-muted flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-stonk-green">&gt;_</span>
        <span className="whitespace-nowrap">buy broker · sell broker #5 · activate broker #5 · borrow</span>
        <span className="ml-auto text-stonk-green">?</span>
      </div>

      {/* Tabs */}
      <div className="dashed-dim p-4">
        <h2 className="font-black font-mono text-xl mb-3">ANVIL NFT AMM</h2>
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`tab px-3 py-2 text-xs ${tab === t ? "tab-active" : "text-stonk-muted"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Swap desk */}
      <div className="panel p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono uppercase tracking-wider font-bold">Swap Desk</h3>
          <div className="flex gap-1 text-xs font-mono">
            <button
              onClick={() => setPay("Crypto")}
              className={`px-3 py-1.5 rounded ${pay === "Crypto" ? "bg-stonk-green text-stonk-ink font-bold" : "text-stonk-muted"}`}
            >
              Crypto
            </button>
            <button
              className="px-3 py-1.5 rounded text-stonk-muted inset flex items-center gap-1"
              disabled
              title="Coming soon"
            >
              Stock Tokens 🔒
            </button>
          </div>
        </div>

        {/* Sell */}
        <div className="inset p-4">
          <div className="text-stonk-muted text-sm mb-2">Sell</div>
          <div className="flex items-center justify-between gap-3">
            <input
              className="dashed-dim bg-transparent px-3 py-2 font-mono text-lg w-1/2 outline-none focus:border-stonk-green"
              placeholder="0"
              inputMode="decimal"
            />
            <TokenChip symbol="ETH" label={robinhoodChain.name} color="#c3f53c" />
          </div>
          <div className="text-xs text-stonk-muted mt-2 font-mono">$0.00 ⇅</div>
        </div>

        <div className="flex justify-center my-2">
          <div className="inset h-9 w-9 grid place-items-center">↓</div>
        </div>

        {/* Buy */}
        <div className="inset p-4">
          <div className="flex items-center justify-between">
            <span className="text-stonk-muted text-sm">Buy</span>
            <span className="text-stonk-green text-sm font-mono">Enter Address</span>
          </div>
          <div className="flex items-center justify-between gap-3 mt-2">
            <span className="font-mono text-lg text-stonk-muted">0</span>
            <TokenChip symbol={tokenName} label={robinhoodChain.name} color="#ff7a1a" />
          </div>
          <div className="text-xs text-stonk-muted mt-2 font-mono">$0.00</div>
        </div>

        <div className="mt-5">
          <ConnectButton variant="sidebar" />
        </div>

        <p className="mt-4 text-xs text-stonk-muted text-center font-mono leading-relaxed">
          Pay in ETH or tokens from Ethereum, Base, Arbitrum and more.
        </p>
      </div>

      {/* Piggy bank */}
      <div className="dashed p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-sm">
            <span className="text-stonk-green">&gt;_</span> Swap Desk Piggy Bank
          </span>
          <span className="text-xl">🐷</span>
        </div>
        <div className="inset p-5 text-center">
          <div className="text-3xl font-black">$8.87K</div>
          <div className="text-xs text-stonk-muted uppercase tracking-widest mt-1 font-mono">
            Sent to stock booster
          </div>
          <div className="text-xs text-stonk-muted mt-1 font-mono">4.6966 ETH · 190 deposits</div>
        </div>
        <div className="inset p-5 text-center mt-3">
          <div className="text-3xl font-black">$365,448</div>
          <div className="text-xs text-stonk-muted uppercase tracking-widest mt-1 font-mono">
            Total distributions (clock in + overtime)
          </div>
        </div>
        <p className="mt-3 text-[11px] text-stonk-muted font-mono text-center">
          * Illustrative — wire to an on-chain indexer for live figures.
        </p>
      </div>

      {/* Token CA */}
      <div className="panel p-5">
        <div className="flex items-center gap-3 mb-4">
          <span className="grid place-items-center h-12 w-12 rounded bg-[#ff7a1a] text-stonk-ink text-2xl">
            💼
          </span>
          <span className="tab tab-active px-3 py-1.5 text-sm font-bold">{site.ticker}</span>
        </div>

        <div className="dashed-dim p-4 text-center">
          <div className="tab tab-active inline-block px-3 py-1 text-xs font-bold mb-3">
            {site.ticker} CA
          </div>
          <div className="font-mono text-sm break-all">{site.token.address}</div>
          {isPlaceholder && (
            <div className="text-[11px] text-stonk-gold mt-2 font-mono">
              Placeholder — replace after launching on Pons.
            </div>
          )}
          <div className="flex items-center justify-center gap-3 mt-3">
            <button onClick={copyCA} className="tab tab-active px-4 py-2 text-xs font-bold">
              {copied ? "Copied ✓" : "Copy CA"}
            </button>
            <a
              href={explorerToken(site.token.address)}
              target="_blank"
              rel="noreferrer"
              className="text-stonk-green text-xs font-mono hover:underline"
            >
              Explorer ↗
            </a>
          </div>
        </div>

        <ol className="mt-5 space-y-4">
          {HOWTO.map((s) => (
            <li key={s.n} className="flex gap-3">
              <span className="text-stonk-green font-mono font-bold">{s.n}.</span>
              <div>
                <span className="font-bold">{s.t}</span>
                <span className="text-stonk-muted text-sm"> — {s.d}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Status footer */}
      <div className="border-t border-stonk-line pt-4 flex items-center justify-between text-xs font-mono text-stonk-muted">
        <span className="uppercase tracking-wider">
          {site.name} · {robinhoodChain.name} mainnet
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-stonk-green animate-pulseGlow" /> Online
        </span>
      </div>
    </div>
  );
}

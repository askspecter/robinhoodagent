import Link from "next/link";
import { Ticker } from "@/components/Ticker";
import { BuyOnPons } from "@/components/BuyOnPons";
import { CopyCA } from "@/components/CopyCA";
import { site, robinhoodChain, isPlaceholderAddr } from "@/lib/config";

const HOWTO = [
  { n: 1, t: `Buy ${site.ticker}`, d: `Swap in from ETH on any chain — routes straight into ${site.ticker} on ${robinhoodChain.name}.` },
  { n: 2, t: "Open Anvil NFT AMM", d: `Head to the market. One broker costs a flat amount of ${site.ticker} plus a small ETH fee.` },
  { n: 3, t: "Swap or snipe a broker", d: "Swap grabs the next vault broker; snipe lets you pick an exact # from inventory." },
];

const FEATURES = [
  { href: "/market", t: "Anvil NFT AMM", d: "Swap, activate and borrow against broker NFTs." },
  { href: "/launcher", t: "Launcher", d: "Launch a fixed-supply token straight onto Pons." },
  { href: "/exchange", t: "Exchange", d: "Trade ecosystem tokens with fee-routing to holders." },
];

export default function Home() {
  const placeholder = isPlaceholderAddr(site.token.address);
  return (
    <>
      {/* Announcement */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-8 py-3 border-b border-stonk-line">
        <span className="uppercase tracking-[0.14em] text-sm font-bold">Broker Box is live</span>
        <Link href="/broker-box" className="btn btn-lime px-4 py-2 text-xs">Ring the bell →</Link>
      </div>

      <Ticker />

      <div className="mx-auto max-w-5xl px-4 sm:px-8 py-8 space-y-6">
        {/* Hero */}
        <section className="dashed p-8 sm:p-12">
          <div className="text-stonk-muted text-xs uppercase tracking-[0.2em]">// launched on pons · {robinhoodChain.name.toLowerCase()}</div>
          <h1 className="text-4xl sm:text-6xl font-bold uppercase leading-[1.02] my-5">
            <span className="text-stonk-green">{site.name.split(" ")[0]}</span> {site.name.split(" ").slice(1).join(" ")}
          </h1>
          <p className="text-stonk-muted max-w-2xl leading-relaxed">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BuyOnPons />
            <Link href="/market" className="btn px-6 py-3 text-sm">Open Anvil NFT AMM</Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-9">
            {[
              { k: "Price", v: "$0.0042", up: true },
              { k: "Supply", v: site.token.supply },
              { k: "Chain", v: "Robinhood" },
              { k: "Liquidity", v: "Locked", up: true },
            ].map((s) => (
              <div key={s.k} className="chip px-4 py-4">
                <div className="text-[11px] text-stonk-muted uppercase tracking-[0.14em]">{s.k}</div>
                <div className={`text-lg font-bold mt-1 ${s.up ? "text-stonk-green" : "text-stonk-bright"}`}>{s.v}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Live airdrops + hint */}
        <div className="inset px-4 py-3 text-sm text-stonk-muted flex items-center gap-3 overflow-x-auto no-scrollbar">
          <span className="h-2 w-2 rounded-full bg-stonk-green shrink-0" />
          <span className="uppercase tracking-wider text-stonk-green shrink-0">Live airdrops</span>
          <span className="whitespace-nowrap">DROP #772 0.027446 ETH → 0x4a08… · DROP #771 0.019820 ETH → 0x9f21…</span>
        </div>

        {/* Piggy bank */}
        <div className="dashed p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm">&gt;_ Swap Desk Piggy Bank</span>
            <span className="text-lg">🐷</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="inset p-5 text-center">
              <div className="text-3xl font-bold">$8.87K</div>
              <div className="text-xs text-stonk-muted uppercase tracking-widest mt-1">Sent to stock booster</div>
            </div>
            <div className="inset p-5 text-center">
              <div className="text-3xl font-bold">$365,448</div>
              <div className="text-xs text-stonk-muted uppercase tracking-widest mt-1">Total distributions</div>
            </div>
          </div>
          <p className="text-[11px] text-stonk-muted mt-3 text-center">* Illustrative — wire to an on-chain indexer for live figures.</p>
        </div>

        {/* Token CA + how to buy */}
        <div className="panel p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="grid place-items-center h-11 w-11 rounded bg-[#ff7a1a] text-stonk-ink text-xl">💼</span>
            <span className="btn btn-lime px-3 py-1.5 text-sm">{site.ticker}</span>
          </div>
          <div className="dashed-dim p-4 text-center">
            <div className="text-xs text-stonk-green uppercase tracking-wider mb-2">{site.ticker} CA</div>
            <div className="text-sm break-all">{site.token.address}</div>
            {placeholder && <div className="text-[11px] text-stonk-amber mt-2">Placeholder — replace after launching on Pons.</div>}
            <div className="flex items-center justify-center gap-2 mt-3">
              <CopyCA value={site.token.address} />
              <a href={`${robinhoodChain.explorerUrl}/token/${site.token.address}`} target="_blank" rel="noreferrer" className="btn px-4 py-2 text-xs">Explorer ↗</a>
            </div>
          </div>
          <ol className="mt-5 space-y-4">
            {HOWTO.map((s) => (
              <li key={s.n} className="flex gap-3">
                <span className="text-stonk-green font-bold">{s.n}.</span>
                <div><span className="font-bold">{s.t}</span><span className="text-stonk-muted"> — {s.d}</span></div>
              </li>
            ))}
          </ol>
        </div>

        {/* Feature cards */}
        <div className="grid gap-3 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <Link key={f.href} href={f.href} className="panel p-5 hover:border-stonk-green transition-colors">
              <div className="font-bold uppercase tracking-wider text-sm">{f.t}</div>
              <p className="text-sm text-stonk-muted mt-2 leading-relaxed">{f.d}</p>
              <div className="text-stonk-green text-xs mt-3">Open →</div>
            </Link>
          ))}
        </div>

        {/* Status footer */}
        <div className="border-t border-stonk-line pt-4 flex items-center justify-between text-xs text-stonk-muted">
          <span className="uppercase tracking-wider">{site.name} · {robinhoodChain.name} mainnet</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-stonk-green" /> Online</span>
        </div>
      </div>
    </>
  );
}

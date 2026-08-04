import Link from "next/link";
import { Ticker } from "@/components/Ticker";
import { BuyOnPons } from "@/components/BuyOnPons";
import { site, robinhoodChain } from "@/lib/config";

const STEPS = [
  { n: "01", t: "Launch on Pons", d: "Fixed-supply token deployed straight into a Uniswap V3 pool, liquidity locked." },
  { n: "02", t: "Connect", d: "Sign in with a wallet or email via Privy. Robinhood Chain added automatically." },
  { n: "03", t: "Buy the dip", d: "Route in from ETH and trade the ticker — no brokers, no middlemen." },
  { n: "04", t: "Watch it run", d: "Track price, supply and holders live from the desk." },
];

const ALLOC = [
  { label: "Liquidity (Pons)", pct: 60 },
  { label: "Community", pct: 25 },
  { label: "Treasury", pct: 15 },
];

export default function Home() {
  return (
    <>
      <Ticker />

      <div className="mx-auto max-w-6xl px-4">
        {/* Hero */}
        <section className="dashed p-8 sm:p-14 mt-8 text-center">
          <div className="text-stonk-muted text-xs sm:text-sm uppercase tracking-[0.22em]">
            // launched on pons · {robinhoodChain.name.toLowerCase()}
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold uppercase leading-[1.02] my-6">
            Trade <span className="text-stonk-green">{site.ticker}</span>
            <br />from the desk.
          </h1>
          <p className="mx-auto max-w-xl text-stonk-muted text-base leading-relaxed">
            A fixed-supply token with locked liquidity on Pons. Buy, hold, and watch the
            ticker — no brokers, no middlemen.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <BuyOnPons />
            <Link href="/token" className="btn px-6 py-3 text-sm">View Token</Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
            {[
              { k: "Price", v: "$0.0042", up: true },
              { k: "Supply", v: site.token.supply },
              { k: "Chain", v: "Robinhood" },
              { k: "Liquidity", v: "Locked", up: true },
            ].map((s) => (
              <div key={s.k} className="chip px-4 py-4 text-left">
                <div className="text-[11px] text-stonk-muted uppercase tracking-[0.14em]">{s.k}</div>
                <div className={`text-lg font-extrabold mt-1 ${s.up ? "text-stonk-green" : "text-stonk-bright"}`}>{s.v}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="py-16">
          <div className="text-stonk-green text-sm mb-2">// how it works</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase mb-8">From launch to the desk</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="panel p-6 hover:shadow-glow transition-shadow">
                <div className="text-stonk-green text-sm font-bold">{s.n}</div>
                <div className="mt-3 font-bold text-lg">{s.t}</div>
                <p className="mt-2 text-sm text-stonk-muted leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tokenomics teaser */}
        <section className="pb-20">
          <div className="dashed-dim p-6 sm:p-8 grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <div className="text-stonk-green text-sm mb-2">// tokenomics</div>
              <h2 className="text-3xl font-extrabold uppercase">{site.ticker}, launched on Pons.</h2>
              <p className="mt-4 text-stonk-muted">
                Fixed supply, straight into a Uniswap V3 pool with locked liquidity. This site
                is the official gateway — buy when it goes live.
              </p>
              <div className="mt-6"><BuyOnPons /></div>
            </div>
            <div className="space-y-4">
              {ALLOC.map((a) => (
                <div key={a.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{a.label}</span>
                    <span className="text-stonk-muted">{a.pct}%</span>
                  </div>
                  <div className="h-2 rounded bg-stonk-panel2 border border-stonk-line overflow-hidden">
                    <div className="h-full bg-stonk-green" style={{ width: `${a.pct}%` }} />
                  </div>
                </div>
              ))}
              <p className="text-xs text-stonk-muted pt-1">* Illustrative — set to match your Pons launch.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

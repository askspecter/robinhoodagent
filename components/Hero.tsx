import Link from "next/link";
import { site } from "@/lib/config";
import { BuyOnPons } from "./BuyOnPons";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="mx-auto max-w-5xl px-5 pt-20 pb-16 text-center">
        <div className="chip inline-flex items-center gap-2 px-3 py-1 text-xs text-stonk-muted mb-6 font-mono uppercase tracking-wider">
          <span className="h-2 w-2 rounded-full bg-stonk-green animate-pulseGlow" />
          Free NFT Mint — Live on Robinhood Chain
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05]">
          Own a broker.
          <br />
          <span className="text-stonk-green">Clock in.</span> Get stonks.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-stonk-muted text-lg">
          {site.description}
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/mint" className="btn-primary px-6 py-3 text-sm">
            Mint your Broker →
          </Link>
          <BuyOnPons />
          <Link href="/marketplace" className="btn-ghost px-6 py-3 text-sm font-mono uppercase tracking-wider">
            Explore Market
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {[
            { k: "Supply", v: site.nft.totalSupply.toLocaleString() },
            { k: "Mint price", v: site.nft.mintPriceLabel },
            { k: "Chain", v: "Robinhood" },
            { k: "Token", v: `${site.ticker} · Pons` },
          ].map((s) => (
            <div key={s.k} className="panel px-4 py-4">
              <div className="text-xs text-stonk-muted uppercase tracking-widest font-mono">{s.k}</div>
              <div className="text-lg font-bold mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

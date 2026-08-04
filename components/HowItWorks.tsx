import { site } from "@/lib/config";

const STEPS = [
  {
    n: "01",
    t: "Mint your broker",
    d: "Claim one of the free broker NFTs on Robinhood Chain. Every broker is your pass into the ecosystem.",
  },
  {
    n: "02",
    t: "Activate",
    d: "Activate your broker with the token to lock in a participation tier. Higher tier, bigger share of rewards.",
  },
  {
    n: "03",
    t: "Clock in & overtime",
    d: "Active brokers clock in. A share of protocol fees is swapped into stock tokens and paid out to your wallet.",
  },
  {
    n: "04",
    t: "Powered by Pons",
    d: `It all runs on ${site.ticker} — the token launched on the Pons Launchpad on Robinhood Chain, with locked liquidity.`,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-10">
        <div className="text-stonk-green text-sm font-mono mb-2">// how it works</div>
        <h2 className="text-3xl sm:text-4xl font-black">Works like Wall Street — but on-chain.</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <div key={s.n} className="panel p-6 hover:shadow-glow transition-shadow">
            <div className="font-mono text-stonk-green text-sm">{s.n}</div>
            <div className="mt-3 font-bold text-lg">{s.t}</div>
            <p className="mt-2 text-sm text-stonk-muted leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

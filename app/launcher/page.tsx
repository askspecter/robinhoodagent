import { site } from "@/lib/config";

const STEPS = [
  { n: "01", t: "Connect a wallet", d: "Use a self-custody EVM wallet with a little ETH on Robinhood Chain for gas." },
  { n: "02", t: "Set your token", d: "Name, ticker, image, description and socials — the metadata for your launch." },
  { n: "03", t: "Launch on Pons", d: "Deploy a fixed-supply token straight into a Uniswap V3 pool with locked liquidity." },
  { n: "04", t: "Go live here", d: "Paste the token address into the site config and the Buy button lights up." },
];

export default function LauncherPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-8 py-10">
      <div className="dashed p-6 mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold uppercase">Launcher</h1>
        <p className="mt-3 text-stonk-muted text-sm leading-relaxed">
          Launch this project&apos;s token on the <span className="text-stonk-green">Pons Launchpad</span> — a
          non-custodial launchpad for fixed-supply tokens that deploy directly into Uniswap V3 with
          locked liquidity.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {STEPS.map((s) => (
          <div key={s.n} className="panel p-6">
            <div className="text-stonk-green text-sm font-bold">{s.n}</div>
            <div className="mt-3 font-bold text-lg">{s.t}</div>
            <p className="mt-2 text-sm text-stonk-muted leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
      <div className="panel p-6 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-bold text-lg uppercase">Ready to launch {site.ticker}?</div>
          <p className="text-sm text-stonk-muted mt-1">Head to Pons, then update <code>lib/config.ts</code>.</p>
        </div>
        <a href={site.token.ponsUrl} target="_blank" rel="noreferrer" className="btn btn-solid px-6 py-3 text-sm shrink-0">Open Pons Launchpad ↗</a>
      </div>
    </div>
  );
}

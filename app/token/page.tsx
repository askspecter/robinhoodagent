import { BuyOnPons } from "@/components/BuyOnPons";
import { CopyCA } from "@/components/CopyCA";
import { site, robinhoodChain, isPlaceholderAddr, explorerToken } from "@/lib/config";

const ALLOC = [
  { label: "Liquidity (Pons)", pct: 60 },
  { label: "Community", pct: 25 },
  { label: "Treasury", pct: 15 },
];

const META: [string, string][] = [
  ["Name", site.name],
  ["Ticker", site.ticker],
  ["Supply", site.token.supply],
  ["Chain", `${robinhoodChain.name} (#${robinhoodChain.id})`],
  ["Launchpad", "Pons"],
];

export default function TokenPage() {
  const placeholder = isPlaceholderAddr(site.token.address);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-6">
      <div>
        <div className="text-stonk-green text-sm mb-2">// token</div>
        <h1 className="text-4xl font-extrabold uppercase">{site.ticker} details</h1>
      </div>

      {/* Meta */}
      <div className="dashed p-6">
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          {META.map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-stonk-line/70 pb-2">
              <span className="text-stonk-muted uppercase tracking-wider text-xs">{k}</span>
              <span className="font-bold">{v}</span>
            </div>
          ))}
          <div className="flex justify-between border-b border-stonk-line/70 pb-2">
            <span className="text-stonk-muted uppercase tracking-wider text-xs">Status</span>
            <span className={`font-bold ${site.token.launched ? "text-stonk-green" : "text-stonk-amber"}`}>
              {site.token.launched ? "LIVE" : "Pending"}
            </span>
          </div>
        </div>
      </div>

      {/* Contract */}
      <div className="panel p-6">
        <div className="text-xs text-stonk-muted uppercase tracking-wider mb-2">Contract address</div>
        {placeholder ? (
          <div className="text-stonk-amber text-sm">
            Pending — deploy on Pons, then set <code className="text-stonk-bright">token.address</code> in <code className="text-stonk-bright">lib/config.ts</code>.
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-sm break-all text-stonk-bright">{site.token.address}</div>
            <div className="flex flex-wrap gap-2">
              <CopyCA value={site.token.address} />
              <a href={explorerToken(site.token.address)} target="_blank" rel="noreferrer" className="btn px-4 py-2 text-xs">Explorer ↗</a>
            </div>
          </div>
        )}
      </div>

      {/* Allocation */}
      <div className="panel p-6">
        <div className="text-xs text-stonk-muted uppercase tracking-wider mb-4">Allocation</div>
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

      <div className="flex justify-center pt-2"><BuyOnPons /></div>
    </div>
  );
}

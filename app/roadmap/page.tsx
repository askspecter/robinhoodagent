import { site } from "@/lib/config";

const PHASES = [
  { q: "Phase 1", t: "The Desk", items: ["Website live", "Community & socials", "Ticker online"], done: true },
  { q: "Phase 2", t: `${site.ticker} on Pons`, items: ["Launch on Pons", "Uniswap V3 LP + lock", "Buy on Pons live"], done: false },
  { q: "Phase 3", t: "Liquidity", items: ["Grow holders", "Listings", "Analytics"], done: false },
  { q: "Phase 4", t: "Beyond", items: ["Governance", "Ecosystem", "[classified]"], done: false },
];

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="text-stonk-green text-sm mb-2">// roadmap</div>
      <h1 className="text-4xl font-extrabold uppercase mb-8">The trading floor plan</h1>
      <div className="grid gap-4 md:grid-cols-4">
        {PHASES.map((p) => (
          <div key={p.q} className={p.done ? "dashed p-6" : "panel p-6"}>
            <div className="flex items-center justify-between">
              <span className="text-xs text-stonk-muted uppercase tracking-wider">{p.q}</span>
              <span className={`h-2.5 w-2.5 rounded-full ${p.done ? "bg-stonk-green" : "bg-stonk-line"}`} />
            </div>
            <div className="mt-2 font-bold text-lg">{p.t}</div>
            <ul className="mt-3 space-y-1.5 text-sm text-stonk-muted">
              {p.items.map((i) => (
                <li key={i} className="flex gap-2">
                  <span className={p.done ? "text-stonk-green" : "text-stonk-line"}>▸</span>{i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

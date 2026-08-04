const PHASES = [
  { q: "Phase 1", t: "The Mint", items: ["Free broker NFT mint", "Community & socials", "Website live"], done: true },
  { q: "Phase 2", t: "Token on Pons", items: ["Launch $TOKEN di Pons", "Uniswap V3 LP + lock", "Buy on Pons live"], done: false },
  { q: "Phase 3", t: "Activation", items: ["Broker activation & tiers", "Stock-drop rewards", "Holder dashboard"], done: false },
  { q: "Phase 4", t: "Exchange", items: ["Anvil-style marketplace", "Governance", "Ecosystem grants"], done: false },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-10">
        <div className="text-stonk-green text-sm font-mono mb-2">// roadmap</div>
        <h2 className="text-3xl sm:text-4xl font-black">The trading floor plan</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {PHASES.map((p) => (
          <div key={p.q} className="panel p-6 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-stonk-muted">{p.q}</span>
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  p.done ? "bg-stonk-green" : "bg-stonk-line"
                }`}
              />
            </div>
            <div className="mt-2 font-bold text-lg">{p.t}</div>
            <ul className="mt-3 space-y-1.5 text-sm text-stonk-muted">
              {p.items.map((i) => (
                <li key={i} className="flex gap-2">
                  <span className={p.done ? "text-stonk-green" : "text-stonk-line"}>▸</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

import { site, explorerToken } from "@/lib/config";
import { BuyOnPons } from "./BuyOnPons";

const ALLOC = [
  { label: "Liquidity (Pons)", pct: 60, color: "#c3f53c" },
  { label: "Broker rewards", pct: 20, color: "#f5c518" },
  { label: "Community / airdrop", pct: 12, color: "#3ea6ff" },
  { label: "Treasury", pct: 8, color: "#8b909a" },
];

export function Tokenomics() {
  const isPlaceholder = site.token.address.startsWith("0x0000000");
  return (
    <section id="tokenomics" className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <div className="text-stonk-green text-sm font-mono mb-2">// tokenomics</div>
          <h2 className="text-3xl sm:text-4xl font-black">
            {site.ticker}, launched on Pons.
          </h2>
          <p className="mt-4 text-stonk-muted">
            The ecosystem&apos;s core token is launched through the Pons Launchpad on
            Robinhood Chain — fixed supply, straight into a Uniswap V3 pool, liquidity
            locked. This site is the official gateway to it.
          </p>

          <div className="mt-6 panel p-4 font-mono text-sm">
            <div className="text-stonk-muted text-xs uppercase tracking-widest mb-1">
              Contract
            </div>
            {isPlaceholder ? (
              <span className="text-stonk-muted">Not launched yet — coming soon on Pons</span>
            ) : (
              <a
                href={explorerToken(site.token.address)}
                target="_blank"
                rel="noreferrer"
                className="text-stonk-green break-all hover:underline"
              >
                {site.token.address}
              </a>
            )}
          </div>

          <div className="mt-6">
            <BuyOnPons />
          </div>
        </div>

        <div className="panel p-6">
          <div className="space-y-4">
            {ALLOC.map((a) => (
              <div key={a.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{a.label}</span>
                  <span className="font-mono text-stonk-muted">{a.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-stonk-line overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${a.pct}%`, background: a.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-stonk-muted">
            * Illustrative allocation — adjust to match your launch parameters on Pons.
          </p>
        </div>
      </div>
    </section>
  );
}

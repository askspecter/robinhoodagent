import { site, explorerToken } from "@/lib/config";
import { BuyOnPons } from "./BuyOnPons";

const ALLOC = [
  { label: "Liquidity (Pons)", pct: 60, color: "#00c805" },
  { label: "Broker rewards", pct: 20, color: "#f5c518" },
  { label: "Community / airdrop", pct: 12, color: "#3ea6ff" },
  { label: "Treasury", pct: 8, color: "#8a97a8" },
];

export function Tokenomics() {
  const isPlaceholder = site.token.address.startsWith("0x0000000");
  return (
    <section id="tokenomics" className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <div className="text-stonk-green text-sm font-mono mb-2">// tokenomics</div>
          <h2 className="text-3xl sm:text-4xl font-black">
            {site.ticker}, diluncurkan di Pons.
          </h2>
          <p className="mt-4 text-stonk-muted">
            Token utama ekosistem diluncurkan lewat Pons Launchpad di Robinhood Chain —
            supply tetap, langsung masuk pool Uniswap V3, likuiditas terkunci. Website ini
            adalah gerbang resmi ke sana.
          </p>

          <div className="mt-6 panel p-4 font-mono text-sm">
            <div className="text-stonk-muted text-xs uppercase tracking-widest mb-1">
              Contract
            </div>
            {isPlaceholder ? (
              <span className="text-stonk-muted">Belum diluncurkan — segera hadir di Pons</span>
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
            * Alokasi ilustratif — sesuaikan dengan parameter launch kamu di Pons.
          </p>
        </div>
      </div>
    </section>
  );
}

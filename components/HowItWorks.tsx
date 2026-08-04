import { site } from "@/lib/config";

const STEPS = [
  {
    n: "01",
    t: "Mint your broker",
    d: "Klaim salah satu broker NFT gratis di Robinhood Chain. Tiap broker adalah pass masuk ke ekosistem.",
  },
  {
    n: "02",
    t: "Activate",
    d: "Aktifkan broker-mu pakai token untuk mengunci tier partisipasi. Makin tinggi tier, makin besar bagian reward.",
  },
  {
    n: "03",
    t: "Clock in & overtime",
    d: "Broker yang aktif ‘clock in’. Sebagian fee protokol di-swap jadi token saham dan dibagikan ke wallet-mu.",
  },
  {
    n: "04",
    t: "Powered by Pons",
    d: `Semua ditenagai ${site.ticker} — token yang diluncurkan di Pons Launchpad di Robinhood Chain, dengan likuiditas terkunci.`,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-10">
        <div className="text-stonk-green text-sm font-mono mb-2">// how it works</div>
        <h2 className="text-3xl sm:text-4xl font-black">Kerjanya kayak Wall Street, tapi on-chain.</h2>
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

import { site } from "@/lib/config";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-stonk-green text-sm mb-2">// about</div>
      <h1 className="text-4xl font-extrabold uppercase mb-6">{site.name}</h1>
      <div className="dashed p-6 sm:p-8 space-y-5 text-sm leading-relaxed">
        <p>{site.description}</p>
        <p>
          No brokers. No middlemen. Just a fixed-supply token, launched transparently on
          <span className="text-stonk-green"> Pons</span>, living on the{" "}
          <span className="text-stonk-green">Robinhood Chain</span>.
        </p>
        <div>
          <div className="text-stonk-muted mb-2 uppercase tracking-wider text-xs">Principles</div>
          <ul className="space-y-1.5">
            <li><span className="text-stonk-green">▸</span> Transparent — liquidity on Pons, contract public.</li>
            <li><span className="text-stonk-green">▸</span> Permissionless — connect a wallet or an email, that&apos;s it.</li>
            <li><span className="text-stonk-green">▸</span> Minimal — a clean desk, a live ticker, nothing else.</li>
          </ul>
        </div>
        <p className="text-stonk-muted">— {site.company}</p>
      </div>
    </div>
  );
}

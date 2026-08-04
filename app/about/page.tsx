import { TerminalWindow } from "@/components/TerminalWindow";
import { site } from "@/lib/config";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-stonk-muted text-sm mb-4">
        <span className="text-stonk-green">$</span> cat about.md
      </div>
      <TerminalWindow title={`${site.host}: ~/about.md`}>
        <div className="space-y-5 text-sm leading-relaxed">
          <h1 className="text-2xl font-bold text-stonk-bright glow"># {site.name}</h1>
          <p>{site.description}</p>
          <p>
            No brokers. No middlemen. No promises we can&apos;t keep on-chain. This is a
            terminal for a single idea: a fixed-supply token, launched transparently on
            <span className="text-stonk-green"> Pons</span>, living on the{" "}
            <span className="text-stonk-green">Robinhood Chain</span>.
          </p>

          <div>
            <div className="text-stonk-muted mb-2">## principles</div>
            <ul className="space-y-1">
              <li><span className="text-stonk-green">▸</span> transparent — liquidity on Pons, contract public.</li>
              <li><span className="text-stonk-green">▸</span> permissionless — connect a wallet or an email, that&apos;s it.</li>
              <li><span className="text-stonk-green">▸</span> minimal — the site is the terminal; the terminal is the site.</li>
            </ul>
          </div>

          <p className="text-stonk-muted">
            — {site.company}
          </p>
        </div>
      </TerminalWindow>
    </div>
  );
}

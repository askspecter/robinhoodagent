import { TerminalWindow } from "@/components/TerminalWindow";
import { BuyOnPons } from "@/components/BuyOnPons";
import { site, robinhoodChain, isPlaceholderAddr, explorerToken } from "@/lib/config";
import { CopyCA } from "@/components/CopyCA";

const ALLOC = [
  { label: "liquidity (Pons)", pct: 60 },
  { label: "community", pct: 25 },
  { label: "treasury", pct: 15 },
];

export default function TokenPage() {
  const placeholder = isPlaceholderAddr(site.token.address);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <div className="text-stonk-muted text-sm">
        <span className="text-stonk-green">$</span> cat token.json
      </div>

      <TerminalWindow title={`${site.host}: ~/token.json`}>
        <div className="text-sm font-mono space-y-1">
          <div className="text-stonk-muted">{"{"}</div>
          <div>  <span className="text-stonk-muted">&quot;name&quot;:</span> &quot;{site.name}&quot;,</div>
          <div>  <span className="text-stonk-muted">&quot;ticker&quot;:</span> <span className="text-stonk-green">&quot;{site.ticker}&quot;</span>,</div>
          <div>  <span className="text-stonk-muted">&quot;supply&quot;:</span> &quot;{site.token.supply}&quot;,</div>
          <div>  <span className="text-stonk-muted">&quot;chain&quot;:</span> &quot;{robinhoodChain.name}&quot;,</div>
          <div>  <span className="text-stonk-muted">&quot;chainId&quot;:</span> {robinhoodChain.id},</div>
          <div>  <span className="text-stonk-muted">&quot;launchpad&quot;:</span> &quot;Pons&quot;,</div>
          <div>
            <span className="text-stonk-muted">  &quot;status&quot;:</span>{" "}
            {site.token.launched ? (
              <span className="text-stonk-green">&quot;LIVE&quot;</span>
            ) : (
              <span className="text-stonk-amber">&quot;pending&quot;</span>
            )}
            ,
          </div>
          <div className="text-stonk-muted">{"}"}</div>
        </div>
      </TerminalWindow>

      {/* Contract */}
      <TerminalWindow title="contract">
        <div className="text-xs text-stonk-muted uppercase tracking-wider mb-2">contract address</div>
        {placeholder ? (
          <div className="text-stonk-amber text-sm">
            pending — deploy on Pons, then set <code className="text-stonk-bright">token.address</code> in <code className="text-stonk-bright">lib/config.ts</code>.
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-sm break-all text-stonk-bright">{site.token.address}</div>
            <div className="flex flex-wrap gap-2">
              <CopyCA value={site.token.address} />
              <a href={explorerToken(site.token.address)} target="_blank" rel="noreferrer" className="btn px-4 py-2 text-xs">
                explorer ↗
              </a>
            </div>
          </div>
        )}
      </TerminalWindow>

      {/* Allocation */}
      <TerminalWindow title="allocation">
        <div className="space-y-4">
          {ALLOC.map((a) => (
            <div key={a.label}>
              <div className="flex justify-between text-sm mb-1">
                <span>{a.label}</span>
                <span className="text-stonk-muted">{a.pct}%</span>
              </div>
              <div className="h-2 bg-stonk-panel2 border border-stonk-line rounded overflow-hidden">
                <div className="h-full bg-stonk-green" style={{ width: `${a.pct}%` }} />
              </div>
            </div>
          ))}
          <p className="text-xs text-stonk-muted pt-1">* illustrative — set to match your Pons launch.</p>
        </div>
      </TerminalWindow>

      <div className="flex justify-center pt-2">
        <BuyOnPons />
      </div>
    </div>
  );
}

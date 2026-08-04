import { TerminalWindow } from "@/components/TerminalWindow";
import { site } from "@/lib/config";

const LOG = [
  { tag: "done", t: "phase 0 — terminal boots", d: "site live, brand + theme online.", cls: "text-stonk-green" },
  { tag: "live", t: `phase 1 — launch ${site.ticker} on Pons`, d: "fixed supply, liquidity locked on Robinhood Chain.", cls: "text-stonk-amber" },
  { tag: "    ", t: "phase 2 — liquidity + community", d: "grow holders, socials, listings.", cls: "text-stonk-muted" },
  { tag: "    ", t: "phase 3 — [classified]", d: "decrypting… access denied.", cls: "text-stonk-muted" },
];

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-stonk-muted text-sm mb-4">
        <span className="text-stonk-green">$</span> tail -f roadmap.log
      </div>
      <TerminalWindow title={`${site.host}: ~/roadmap.log`}>
        <div className="space-y-4 text-sm">
          {LOG.map((l, i) => (
            <div key={i} className="flex gap-3">
              <span className={`${l.cls} shrink-0`}>[{l.tag}]</span>
              <div>
                <div className="text-stonk-bright">{l.t}</div>
                <div className="text-stonk-muted">{l.d}</div>
              </div>
            </div>
          ))}
          <div className="text-stonk-muted pt-2">
            <span className="cursor align-middle" /> awaiting next entry…
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}

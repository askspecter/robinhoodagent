import { site } from "@/lib/config";

const ROWS = [
  { s: "AAPL", p: "228.41", c: "+1.24%", up: true },
  { s: "NVDA", p: "141.09", c: "+3.87%", up: true },
  { s: site.ticker, p: "0.0042", c: "+69.4%", up: true },
  { s: "ETH", p: "3,201", c: "+0.60%", up: true },
  { s: "TSLA", p: "352.10", c: "-0.92%", up: false },
  { s: "GME", p: "24.88", c: "+12.1%", up: true },
  { s: "AMZN", p: "214.55", c: "+0.66%", up: true },
  { s: "META", p: "612.77", c: "-1.44%", up: false },
];

export function Ticker() {
  const items = [...ROWS, ...ROWS];
  return (
    <div className="ticker">
      <div className="flex w-max animate-marquee">
        {items.map((r, i) => (
          <div key={i} className="flex items-center gap-2 px-6 py-2.5 text-sm whitespace-nowrap">
            <span className="text-stonk-muted">{r.s}</span>
            <span className="text-stonk-bright">{r.p}</span>
            <span className={r.up ? "up" : "down"}>{r.up ? "▲" : "▼"}{r.c.replace(/[+-]/, "")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

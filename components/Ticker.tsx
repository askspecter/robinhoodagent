"use client";

const ROWS = [
  { s: "AAPL", p: "228.41", c: "+1.24%", up: true },
  { s: "NVDA", p: "141.09", c: "+3.87%", up: true },
  { s: "TSLA", p: "352.10", c: "-0.92%", up: false },
  { s: "AMZN", p: "214.55", c: "+0.66%", up: true },
  { s: "$STONK", p: "0.0042", c: "+69.4%", up: true },
  { s: "MSFT", p: "429.03", c: "+0.31%", up: true },
  { s: "GME", p: "24.88", c: "+12.1%", up: true },
  { s: "META", p: "612.77", c: "-1.44%", up: false },
];

export function Ticker() {
  const items = [...ROWS, ...ROWS];
  return (
    <div className="border-y border-stonk-line bg-stonk-panel/60 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {items.map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-6 py-2 font-mono text-sm whitespace-nowrap border-r border-stonk-line/60"
          >
            <span className="text-stonk-muted">{r.s}</span>
            <span>{r.p}</span>
            <span className={r.up ? "text-up" : "text-down"}>{r.c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

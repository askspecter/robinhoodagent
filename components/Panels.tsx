"use client";

import { useEffect, useRef, useState } from "react";
import { MENU, type Log, type Metrics } from "@/lib/unia/terminal";

/* ------------------------------- Logo -------------------------------- */
// letters spaced apart (3-col gaps) so the wordmark reads loosely, not cramped
const UNIA = String.raw`██╗   ██╗   ███╗   ██╗   ██╗    █████╗
██║   ██║   ████╗  ██║   ██║   ██╔══██╗
██║   ██║   ██╔██╗ ██║   ██║   ███████║
██║   ██║   ██║╚██╗██║   ██║   ██╔══██║
╚██████╔╝   ██║ ╚████║   ██║   ██║  ██║
 ╚═════╝    ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝`;

export function Logo() {
  return (
    <div>
      <pre
        aria-label="UNIA"
        className="font-mono text-uni-green leading-none select-none overflow-x-auto no-scrollbar"
        style={{
          fontSize: "clamp(8px, 2.5vw, 22px)",
          lineHeight: 1.0,
          margin: 0,
        }}
      >
        {UNIA}
      </pre>
      <div className="mt-4 text-sm sm:text-base text-uni-text">
        <span className="text-uni-green">&gt;</span> The first autonomous agent on{" "}
        <span className="text-uni-green">Uniswap</span>.
      </div>
    </div>
  );
}

/* ------------------------------- Menu -------------------------------- */
export function Menu({ onSelect, active }: { onSelect: (n: number) => void; active: number }) {
  return (
    <div className="box p-2 mt-5">
      {MENU.map((m) => (
        <button
          key={m.n}
          onClick={() => onSelect(m.n)}
          className={`menu-row w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm ${active === m.n ? "active" : ""}`}
        >
          <span className="text-uni-green w-5">{active === m.n ? ">" : " "}</span>
          <span className="text-uni-muted">[{m.n}]</span>
          <span className="text-uni-text">{m.label}</span>
          <span className="ml-auto text-uni-muted">{m.status}</span>
          <span className={`dot ${m.on ? "bg-uni-green" : "border border-uni-muted"}`} />
        </button>
      ))}
    </div>
  );
}

/* --------------------------- System Status --------------------------- */
function Bar({ pct }: { pct: number }) {
  const total = 12;
  const filled = Math.round((pct / 100) * total);
  return (
    <span className="bar text-uni-green">
      [<span className="text-uni-green">{"■".repeat(filled)}</span><span className="text-uni-muted">{"□".repeat(total - filled)}</span>] <span className="text-uni-text">{Math.round(pct)}%</span>
    </span>
  );
}

export function SystemStatus({ metrics, uptime }: { metrics: Metrics; uptime: string }) {
  const rows: [string, React.ReactNode][] = [
    ["Uptime", uptime],
    ["Version", "v1.0.0"],
    ["Environment", "production"],
    ["Chain", "Uniswap · Ethereum"],
    ["Node", "uniswap-main"],
    ["Load", <Bar key="l" pct={metrics.load} />],
    ["Memory", <Bar key="m" pct={metrics.mem} />],
    ["CPU", <Bar key="c" pct={metrics.cpu} />],
  ];
  return (
    <div className="box">
      <div className="px-4 py-2.5 border-b border-uni-line text-sm text-uni-green tracking-wide">▚ SYSTEM STATUS</div>
      <div className="p-4 space-y-2 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-2 sm:gap-3">
            <span className="text-uni-muted w-24 sm:w-28 shrink-0">{k}</span>
            <span className="text-uni-muted shrink-0">:</span>
            <span className="text-uni-text min-w-0">{v}</span>
          </div>
        ))}
        <div className="text-uni-green pt-1">&gt; All systems operational.</div>
      </div>
    </div>
  );
}

/* ------------------------------- Logs -------------------------------- */
export function Logs({ logs }: { logs: Log[] }) {
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [logs]);
  return (
    <div className="box flex flex-col">
      <div className="px-4 py-2.5 border-b border-uni-line flex items-center justify-between text-sm">
        <span className="text-uni-green tracking-wide">▤ UNIA LOGS</span>
        <span className="flex items-center gap-1.5 text-[11px] text-uni-green"><span className="dot bg-uni-green animate-[blink_1.4s_step-end_infinite]" /> LIVE</span>
      </div>
      <div className="p-4 space-y-1 text-sm overflow-y-auto no-scrollbar h-[240px]">
        {logs.map((l) => (
          <div key={l.id} className="flex gap-2 whitespace-pre-wrap break-words">
            <span className="text-uni-green shrink-0">{l.t}</span>
            <span className="text-uni-muted shrink-0">[{l.tag.padEnd(5)}]</span>
            <span className="text-uni-text">{l.text}</span>
          </div>
        ))}
        <div ref={end} />
      </div>
    </div>
  );
}

/* ----------------------------- Command bar ---------------------------- */
export function CommandBar({ onRun }: { onRun: (cmd: string) => void }) {
  const [v, setV] = useState("");
  const inp = useRef<HTMLInputElement>(null);
  const submit = () => { if (v.trim()) { onRun(v.trim()); setV(""); } };
  return (
    <div className="flex items-stretch gap-2 sm:gap-3 mt-5">
      <div className="box flex-1 min-w-0 flex items-center gap-2 px-3 sm:px-4 py-3 text-sm cursor-text" onClick={() => inp.current?.focus()}>
        <span className="text-uni-green shrink-0">visitor@uniswap:~$</span>
        <input
          ref={inp}
          value={v}
          onChange={(e) => setV(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          spellCheck={false} autoCapitalize="off" autoComplete="off"
          className="flex-1 min-w-0 bg-transparent outline-none text-uni-text caret-[#7ecb3c]"
          placeholder="type a command · try 'help'"
          aria-label="command"
        />
      </div>
      <button className="btn btn-solid shrink-0 px-4 sm:px-6 text-lg" onClick={submit} aria-label="run">&gt;_</button>
    </div>
  );
}

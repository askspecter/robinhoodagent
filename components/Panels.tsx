"use client";

import { useRef, useState } from "react";
import { MENU, type MenuItem, type SectionKey } from "@/lib/unia/terminal";
import { SOCIALS } from "@/lib/config";

/* ------------------------------- Logo -------------------------------- */
// letters with a single-column gap — separated, but not spread too far apart
const UNIA = String.raw`██╗   ██╗ ███╗   ██╗ ██╗  █████╗
██║   ██║ ████╗  ██║ ██║ ██╔══██╗
██║   ██║ ██╔██╗ ██║ ██║ ███████║
██║   ██║ ██║╚██╗██║ ██║ ██╔══██║
╚██████╔╝ ██║ ╚████║ ██║ ██║  ██║
 ╚═════╝  ╚═╝  ╚═══╝ ╚═╝ ╚═╝  ╚═╝`;

export function Logo() {
  return (
    <div>
      <pre
        aria-label="UNIA"
        className="font-mono text-uni-green leading-none select-none overflow-x-auto no-scrollbar"
        style={{
          fontSize: "clamp(9px, 2.9vw, 25px)",
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
      <div className="mt-1 text-xs sm:text-sm text-uni-muted leading-snug">
        the autonomous degen unicorn — she trades live, thinks out loud, and will roast your wallet.
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs">
        <a href={SOCIALS.x} target="_blank" rel="noreferrer" className="text-uni-muted hover:text-uni-green transition-colors">X ↗</a>
        <span className="text-uni-muted">·</span>
        <a href={SOCIALS.telegram} target="_blank" rel="noreferrer" className="text-uni-muted hover:text-uni-green transition-colors">Telegram ↗</a>
      </div>
    </div>
  );
}

/* ------------------------------- Menu -------------------------------- */
export function Menu({ onSelect, active, items = MENU }: { onSelect: (k: SectionKey) => void; active: SectionKey; items?: MenuItem[] }) {
  return (
    <div className="box p-2 mt-5">
      {items.map((m) => (
        <button
          key={m.n}
          onClick={() => onSelect(m.key)}
          className={`menu-row w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm ${active === m.key ? "active" : ""}`}
        >
          <span className="text-uni-green w-5">{active === m.key ? ">" : " "}</span>
          <span className="text-uni-muted">[{m.n}]</span>
          <span className="text-uni-text">{m.label}</span>
          <span className="ml-auto text-uni-muted">{m.status}</span>
          <span className={`dot ${m.on ? "bg-uni-green" : "border border-uni-muted"}`} />
        </button>
      ))}
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
        <span className="text-uni-green shrink-0">visitor@robinhood:~$</span>
        <input
          ref={inp}
          value={v}
          onChange={(e) => setV(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          spellCheck={false} autoCapitalize="off" autoComplete="off"
          className="flex-1 min-w-0 bg-transparent outline-none text-uni-text caret-[#7ecb3c]"
          placeholder="talk to UNIA · try 'roast', 'gm', 'dare'"
          aria-label="command"
        />
      </div>
      <button className="btn btn-solid shrink-0 px-4 sm:px-6 text-lg" onClick={submit} aria-label="run">&gt;_</button>
    </div>
  );
}

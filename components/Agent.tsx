"use client";

import { useEffect, useRef } from "react";
import type { Token, Position, Trade } from "@/lib/unia/engine";
import type { Thought, Tone } from "@/lib/unia/useUnia";
import { MOOD_LABEL } from "@/lib/unia/phrases";

/* ------------------------------ helpers ------------------------------ */
const money = (n: number) =>
  "$" + (n >= 1
    ? n.toLocaleString("en-US", { maximumFractionDigits: 2 })
    : n.toLocaleString("en-US", { maximumSignificantDigits: 4 }));
const price = (p: number) => "$" + p.toLocaleString("en-US", { maximumSignificantDigits: 5 });
const qtyFmt = (q: number) => {
  if (q >= 1e9) return (q / 1e9).toFixed(2) + "B";
  if (q >= 1e6) return (q / 1e6).toFixed(2) + "M";
  if (q >= 1e3) return (q / 1e3).toFixed(2) + "K";
  return q.toLocaleString("en-US", { maximumSignificantDigits: 4 });
};
const pctStr = (p: number) => `${p >= 0 ? "+" : ""}${p.toFixed(2)}%`;

function Delta({ pct, className = "" }: { pct: number; className?: string }) {
  const up = pct >= 0;
  return (
    <span className={`${up ? "text-uni-green" : "text-uni-down"} ${className}`}>
      {up ? "▲" : "▼"} {pctStr(pct)}
    </span>
  );
}

function PanelHead({ mark, title, right }: { mark: string; title: string; right?: React.ReactNode }) {
  return (
    <div className="px-4 py-2.5 border-b border-uni-line flex items-center justify-between text-sm">
      <span className="text-uni-green tracking-wide">{mark} {title}</span>
      {right}
    </div>
  );
}

/* ----------------------------- Sparkline ----------------------------- */
function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2) return <div className="h-10" />;
  const w = 240, h = 40;
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`).join(" ");
  const up = data[data.length - 1] >= data[0];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" className="mt-1">
      <polyline points={pts} fill="none" stroke={up ? "#7ecb3c" : "#ff5c5c"} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const MOOD_COLOR: Record<string, string> = {
  euphoric: "text-uni-green", happy: "text-uni-green", neutral: "text-uni-text",
  nervous: "text-uni-gold", crying: "text-uni-down", rekt: "text-uni-down",
};

/* ------------------------------- Bag --------------------------------- */
export function BagPanel({ netWorth, cash, pnlPct, mood, history }: {
  netWorth: number; cash: number; pnlPct: number; mood: string; history: number[];
}) {
  return (
    <div className="box">
      <PanelHead mark="◈" title="UNIA BAG" right={<span className={`text-xs ${MOOD_COLOR[mood]}`}>{MOOD_LABEL[mood]}</span>} />
      <div className="p-4 text-sm">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-uni-muted text-xs">equity</div>
            <div className="text-uni-text text-2xl leading-tight">{money(netWorth)}</div>
          </div>
          <div className="text-right">
            <div className="text-uni-muted text-xs">pnl</div>
            <div className="text-lg leading-tight"><Delta pct={pnlPct} /></div>
          </div>
        </div>
        <Sparkline data={history} />
        <div className="flex justify-between text-xs pt-1">
          <span className="text-uni-muted">cash <span className="text-uni-text">{money(cash)}</span></span>
          <span className="text-uni-muted">start $10,000</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Market ------------------------------- */
export function MarketPanel({ tokens }: { tokens: Token[] }) {
  return (
    <div className="box">
      <PanelHead mark="▚" title="LIVE MARKET" right={<span className="text-[11px] text-uni-muted">uniswap v3</span>} />
      <div className="p-4 space-y-1.5 text-sm">
        {tokens.map((t) => {
          const mv = ((t.price - t.prev) / t.prev) * 100;
          return (
            <div key={t.symbol} className="flex items-center gap-3">
              <span className="text-uni-text w-16 shrink-0">{t.symbol}</span>
              <span className="text-uni-muted flex-1 min-w-0 truncate">{price(t.price)}</span>
              <Delta pct={mv} className="shrink-0 text-right" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------- Holdings ------------------------------ */
export function HoldingsPanel({ positions, tokens }: { positions: Position[]; tokens: Token[] }) {
  return (
    <div className="box">
      <PanelHead mark="▦" title="HOLDINGS" right={<span className="text-[11px] text-uni-muted">{positions.length} open</span>} />
      <div className="p-4 text-sm">
        {positions.length === 0 ? (
          <div className="text-uni-muted py-2">no open positions · full cash · the calm before the crime.</div>
        ) : (
          <div className="space-y-1.5">
            {positions.map((p) => {
              const tk = tokens.find((t) => t.symbol === p.symbol);
              const value = tk ? p.qty * tk.price : 0;
              const pnl = tk ? ((tk.price - p.cost) / p.cost) * 100 : 0;
              return (
                <div key={p.symbol} className="flex items-center gap-2 sm:gap-3">
                  <span className="text-uni-text w-14 sm:w-16 shrink-0">{p.symbol}</span>
                  <span className="hidden sm:block text-uni-muted sm:w-24 shrink-0 truncate">{qtyFmt(p.qty)}</span>
                  <span className="text-uni-text flex-1 min-w-0 text-right truncate">{money(value)}</span>
                  <Delta pct={pnl} className="w-20 sm:w-24 shrink-0 text-right" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------- Tape -------------------------------- */
function ago(t: number) {
  const s = Math.max(0, Math.floor((Date.now() - t) / 1000));
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  return `${Math.floor(s / 3600)}h`;
}

export function TapePanel({ trades }: { trades: Trade[] }) {
  return (
    <div className="box flex flex-col">
      <PanelHead mark="≋" title="TAPE" right={<span className="text-[11px] text-uni-muted">last {Math.min(trades.length, 20)}</span>} />
      <div className="p-4 space-y-1.5 text-sm overflow-y-auto no-scrollbar h-[168px]">
        {trades.length === 0 ? (
          <div className="text-uni-muted">no trades yet · she is deciding.</div>
        ) : (
          trades.map((tr) => (
            <div key={tr.id} className="flex items-center gap-3">
              <span className={`w-12 shrink-0 ${tr.side === "BUY" ? "text-uni-green" : "text-uni-down"}`}>{tr.side}</span>
              <span className="text-uni-text w-16 shrink-0">{tr.symbol}</span>
              <span className="text-uni-muted flex-1 min-w-0 text-right truncate">{money(tr.usd)}</span>
              <span className="text-uni-muted w-10 shrink-0 text-right">{ago(tr.t)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ------------------------------- Feed -------------------------------- */
const TONE: Record<Tone, string> = {
  buy: "text-uni-green", pump: "text-uni-green", sell: "text-uni-text",
  dump: "text-uni-down", idle: "text-uni-muted", sys: "text-uni-muted", user: "text-uni-text",
  unia: "text-uni-green",
};

export function FeedPanel({ thoughts, muted, thinking, onToggleMute }: {
  thoughts: Thought[]; muted: boolean; thinking?: boolean; onToggleMute: () => void;
}) {
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [thoughts]);
  return (
    <div className="box flex flex-col">
      <PanelHead
        mark="▤"
        title="UNIA FEED"
        right={
          <div className="flex items-center gap-3 text-[11px]">
            <button onClick={onToggleMute} className="text-uni-muted hover:text-uni-green transition-colors" aria-label="toggle voice">
              voice: <span className={muted ? "text-uni-muted" : "text-uni-green"}>{muted ? "off" : "on"}</span>
            </button>
            <span className="flex items-center gap-1.5 text-uni-green"><span className="dot bg-uni-green animate-[blink_1.4s_step-end_infinite]" /> LIVE</span>
          </div>
        }
      />
      <div className="p-4 space-y-1 text-sm overflow-y-auto no-scrollbar h-[300px]">
        {thoughts.length === 0 && <div className="text-uni-muted">booting the beast…</div>}
        {thoughts.map((t) => (
          <div key={t.id} className="whitespace-pre-wrap break-words leading-snug">
            <span className="text-uni-green">{t.tone === "user" ? "$ " : t.tone === "unia" ? "unia » " : "» "}</span>
            <span className={TONE[t.tone]}>{t.text}</span>
          </div>
        ))}
        {thinking && <div className="text-uni-muted"><span className="text-uni-green">unia » </span>typing…</div>}
        <div ref={end} />
      </div>
    </div>
  );
}

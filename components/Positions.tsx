"use client";

import type { Token, Position, Trade } from "@/lib/unia/engine";

const fmt = (n: number) =>
  n >= 1 ? n.toLocaleString(undefined, { maximumFractionDigits: 2 })
  : n.toPrecision(2);

export function Holdings({ tokens, positions, cash }: { tokens: Token[]; positions: Position[]; cash: number }) {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold tracking-wide mb-3">UNIA&apos;S BAGS 🎒</h3>
      <div className="space-y-2">
        <Row emoji="💵" name="Cash (USDC)" sub="dry powder" value={`$${fmt(cash)}`} />
        {positions.length === 0 && <div className="text-uni-muted text-sm py-2">no positions… yet. give it a sec.</div>}
        {positions.map((p) => {
          const tk = tokens.find((t) => t.symbol === p.symbol);
          if (!tk) return null;
          const val = p.qty * tk.price;
          const pnl = ((tk.price - p.cost) / p.cost) * 100;
          return (
            <Row
              key={p.symbol}
              emoji={tk.emoji}
              name={p.symbol}
              sub={`${fmt(p.qty)} @ $${fmt(p.cost)}`}
              value={`$${fmt(val)}`}
              pnl={pnl}
            />
          );
        })}
      </div>
    </div>
  );
}

function Row({ emoji, name, sub, value, pnl }: { emoji: string; name: string; sub: string; value: string; pnl?: number }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="h-9 w-9 grid place-items-center rounded-full bg-uni-card2 text-lg">{emoji}</span>
      <div className="min-w-0">
        <div className="font-semibold text-sm">{name}</div>
        <div className="text-xs text-uni-muted truncate">{sub}</div>
      </div>
      <div className="ml-auto text-right">
        <div className="font-semibold text-sm">{value}</div>
        {pnl !== undefined && (
          <div className={`text-xs ${pnl >= 0 ? "up" : "down"}`}>{pnl >= 0 ? "+" : ""}{pnl.toFixed(1)}%</div>
        )}
      </div>
    </div>
  );
}

export function Tape({ trades }: { trades: Trade[] }) {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold tracking-wide mb-3">TRADE TAPE 🧾</h3>
      <div className="space-y-1.5 text-sm max-h-56 overflow-y-auto no-scrollbar">
        {trades.length === 0 && <div className="text-uni-muted">no trades yet.</div>}
        {trades.map((t) => (
          <div key={t.id} className="flex items-center gap-2 animate-pop">
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${t.side === "BUY" ? "bg-uni-up/15 text-uni-up" : "bg-uni-down/15 text-uni-down"}`}>{t.side}</span>
            <span className="font-semibold">{t.symbol}</span>
            <span className="ml-auto text-uni-muted text-xs">${fmt(t.usd)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

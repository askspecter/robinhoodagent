"use client";

import type { Token, Position, Trade } from "@/lib/unia/engine";

const fmt = (n: number) => (n >= 1 ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) : n.toPrecision(2));

export function Holdings({ tokens, positions, cash }: { tokens: Token[]; positions: Position[]; cash: number }) {
  return (
    <div className="box">
      <div className="bar px-4 py-2 text-xs text-uni-muted">unia@degen:~/wallet — cat bags.json</div>
      <div className="p-4 space-y-1.5 text-sm">
        <Row badge="$" name="CASH/USDC" sub="dry powder" value={`$${fmt(cash)}`} />
        {positions.length === 0 && <div className="text-uni-muted py-1">[ no positions yet — stand by ]</div>}
        {positions.map((p) => {
          const tk = tokens.find((t) => t.symbol === p.symbol);
          if (!tk) return null;
          const val = p.qty * tk.price;
          const pnl = ((tk.price - p.cost) / p.cost) * 100;
          return <Row key={p.symbol} badge={tk.emoji} name={p.symbol} sub={`${fmt(p.qty)} @ ${fmt(p.cost)}`} value={`$${fmt(val)}`} pnl={pnl} />;
        })}
      </div>
    </div>
  );
}

function Row({ badge, name, sub, value, pnl }: { badge: string; name: string; sub: string; value: string; pnl?: number }) {
  return (
    <div className="flex items-center gap-3 py-1 border-b border-uni-line/40 last:border-0">
      <span className="h-7 w-7 grid place-items-center border border-uni-line text-uni-text text-sm">{badge}</span>
      <div className="min-w-0">
        <div className="text-uni-text">{name}</div>
        <div className="text-[11px] text-uni-muted truncate">{sub}</div>
      </div>
      <div className="ml-auto text-right">
        <div className="text-uni-text">{value}</div>
        {pnl !== undefined && <div className={`text-[11px] ${pnl >= 0 ? "up" : "down"}`}>{pnl >= 0 ? "+" : ""}{pnl.toFixed(1)}%</div>}
      </div>
    </div>
  );
}

export function Tape({ trades }: { trades: Trade[] }) {
  return (
    <div className="box">
      <div className="bar px-4 py-2 text-xs text-uni-muted">unia@degen:~/tape — tail -f fills.log</div>
      <div className="p-4 space-y-1 text-sm max-h-56 overflow-y-auto no-scrollbar">
        {trades.length === 0 && <div className="text-uni-muted">[ no fills yet ]</div>}
        {trades.map((t) => (
          <div key={t.id} className="flex items-center gap-2 animate-pop">
            <span className={t.side === "BUY" ? "up" : "down"}>{t.side === "BUY" ? "+" : "-"}</span>
            <span className={t.side === "BUY" ? "text-uni-up" : "text-uni-down"}>{t.side}</span>
            <span className="text-uni-text">{t.symbol}</span>
            <span className="ml-auto text-uni-muted">${fmt(t.usd)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

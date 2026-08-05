// Paper-mode market simulation + Unia's autonomous decisions.

export type Token = {
  symbol: string;
  name: string;
  emoji: string;
  color: string;
  price: number;
  prev: number;
};

export type Position = { symbol: string; qty: number; cost: number };

export type Trade = {
  id: number;
  side: "BUY" | "SELL";
  symbol: string;
  qty: number;
  price: number;
  usd: number;
  t: number;
};

export const START_CASH = 10000;

export function initTokens(): Token[] {
  const base: Omit<Token, "prev">[] = [
    { symbol: "WETH", name: "Ether", emoji: "Ξ", color: "#8f9dff", price: 3200 },
    { symbol: "UNI", name: "Uniswap", emoji: "🦄", color: "#ff007a", price: 12.4 },
    { symbol: "PEPE", name: "Pepe", emoji: "🐸", color: "#4fd06a", price: 0.0000091 },
    { symbol: "DEGEN", name: "Degen", emoji: "🎩", color: "#a06bff", price: 0.014 },
    { symbol: "WBTC", name: "Bitcoin", emoji: "₿", color: "#f7931a", price: 96000 },
    { symbol: "MOG", name: "Mog", emoji: "😼", color: "#ffcf5a", price: 0.0000015 },
  ];
  return base.map((b) => ({ ...b, prev: b.price }));
}

// Random-walk with occasional pump/dump events. Returns the token that had a big move (if any).
export function tickTokens(tokens: Token[]): { tokens: Token[]; event?: { symbol: string; pct: number } } {
  let event: { symbol: string; pct: number } | undefined;
  const next = tokens.map((tk) => {
    let drift = (Math.random() - 0.5) * 0.02; // ±1%
    if (Math.random() < 0.06) {
      // event: big spike
      const mag = 0.08 + Math.random() * 0.22; // 8%–30%
      const dir = Math.random() < 0.5 ? 1 : -1;
      drift = dir * mag;
      const pct = Math.round(dir * mag * 100);
      if (!event || Math.abs(pct) > Math.abs(event.pct)) event = { symbol: tk.symbol, pct };
    }
    const price = Math.max(tk.price * (1 + drift), tk.price * 0.5);
    return { ...tk, prev: tk.price, price };
  });
  return { tokens: next, event };
}

export type Decision =
  | { kind: "buy"; symbol: string; usd: number; pctOfCash: number }
  | { kind: "sell"; symbol: string; qty: number }
  | { kind: "panic"; symbol: string; qty: number }
  | null;

export function decide(tokens: Token[], positions: Position[], cash: number): Decision {
  // Panic-sell a position that just dumped hard
  for (const p of positions) {
    const tk = tokens.find((t) => t.symbol === p.symbol);
    if (!tk) continue;
    const mv = (tk.price - tk.prev) / tk.prev;
    if (mv < -0.09 && Math.random() < 0.7) {
      return { kind: "panic", symbol: p.symbol, qty: p.qty };
    }
    // Take profit sometimes when up on cost
    const upVsCost = (tk.price - p.cost) / p.cost;
    if (upVsCost > 0.15 && Math.random() < 0.35) {
      return { kind: "sell", symbol: p.symbol, qty: p.qty * (0.4 + Math.random() * 0.6) };
    }
  }
  // Buy something with momentum
  if (cash > 200 && Math.random() < 0.5) {
    const movers = tokens
      .map((t) => ({ t, mv: (t.price - t.prev) / t.prev }))
      .sort((a, b) => b.mv - a.mv);
    const target = Math.random() < 0.7 ? movers[0].t : movers[Math.floor(Math.random() * tokens.length)].t;
    const pctOfCash = 0.15 + Math.random() * 0.35;
    const usd = Math.min(cash * pctOfCash, cash - 50);
    if (usd > 100) return { kind: "buy", symbol: target.symbol, usd, pctOfCash: Math.round(pctOfCash * 100) };
  }
  return null;
}

export function netWorth(tokens: Token[], positions: Position[], cash: number): number {
  const held = positions.reduce((s, p) => {
    const tk = tokens.find((t) => t.symbol === p.symbol);
    return s + (tk ? p.qty * tk.price : 0);
  }, 0);
  return cash + held;
}

export type Mood = "euphoric" | "happy" | "neutral" | "nervous" | "crying" | "rekt";

export function moodFrom(pnlPct: number, recentDelta: number): Mood {
  if (pnlPct < -40) return "rekt";
  if (recentDelta < -3) return "crying";
  if (recentDelta < -0.6) return "nervous";
  if (recentDelta > 3) return "euphoric";
  if (recentDelta > 0.6) return "happy";
  return "neutral";
}

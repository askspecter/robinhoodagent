"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import {
  initTokens, tickTokens, decide, netWorth, moodFrom, START_CASH,
  type Token, type Position, type Trade, type Mood,
} from "./engine";
import { line, roast, MOOD_LABEL, BOOT, pick } from "./phrases";

export type Tone = "buy" | "sell" | "pump" | "dump" | "idle" | "sys" | "user";
export type Thought = { id: number; text: string; tone: Tone };

type St = {
  tokens: Token[];
  positions: Position[];
  cash: number;
  trades: Trade[];
  thoughts: Thought[];
  history: number[];
  mood: Mood;
  awake: boolean;
};

const usd = (n: number) =>
  n >= 1 ? n.toLocaleString("en-US", { maximumFractionDigits: 2 }) : n.toPrecision(2);

// deterministic pseudo-balance so `roast <addr>` works with no wallet/RPC
function fakeBal(addr: string): number {
  let h = 0;
  for (const c of addr) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const r = (h % 10000) / 10000;
  return +(Math.pow(r, 3) * 8).toFixed(4);
}

export function useUnia() {
  const [, force] = useReducer((x) => x + 1, 0);
  const idRef = useRef(1);
  const mutedRef = useRef(true); // silent by default; `unmute` to hear her

  const st = useRef<St>({
    tokens: initTokens(),
    positions: [],
    cash: START_CASH,
    trades: [],
    thoughts: [],
    history: [START_CASH],
    mood: "neutral",
    awake: false,
  });

  const say = useCallback((text: string) => {
    if (mutedRef.current || typeof window === "undefined" || !window.speechSynthesis) return;
    const clean = text.replace(/[^\x00-\x7F]+/g, " ").replace(/\s+/g, " ").trim();
    if (!clean) return;
    const u = new SpeechSynthesisUtterance(clean);
    u.pitch = 1.45;
    u.rate = 1.03;
    const vs = window.speechSynthesis.getVoices();
    const v = vs.find((x) => /female|zira|samantha|google us/i.test(x.name)) || vs[0];
    if (v) u.voice = v;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }, []);

  const push = useCallback((text: string, tone: Tone, voice = false) => {
    const th = { id: idRef.current++, text, tone };
    st.current.thoughts = [...st.current.thoughts.slice(-59), th];
    if (voice) say(text);
  }, [say]);

  const tick = useCallback(() => {
    const s = st.current;
    const { tokens, event } = tickTokens(s.tokens);
    s.tokens = tokens;

    if (event) {
      if (event.pct > 0) push(line.pump(event.symbol, event.pct), "pump", true);
      else push(line.dump(event.symbol, -event.pct), "dump", true);
    }
    if (Math.random() < 0.12) push(line.sys(), "sys", false);

    const d = decide(s.tokens, s.positions, s.cash);
    if (d?.kind === "buy") {
      const tk = s.tokens.find((t) => t.symbol === d.symbol)!;
      const qty = d.usd / tk.price;
      s.cash -= d.usd;
      const ex = s.positions.find((p) => p.symbol === d.symbol);
      if (ex) { ex.qty += qty; ex.cost = (ex.cost + tk.price) / 2; }
      else s.positions.push({ symbol: d.symbol, qty, cost: tk.price });
      s.trades = [{ id: idRef.current++, side: "BUY", symbol: d.symbol, qty, price: tk.price, usd: d.usd, t: Date.now() }, ...s.trades.slice(0, 19)];
      push(line.ape(d.symbol, d.pctOfCash), "buy", true);
    } else if (d?.kind === "sell" || d?.kind === "panic") {
      const tk = s.tokens.find((t) => t.symbol === d.symbol)!;
      const value = d.qty * tk.price;
      s.cash += value;
      const p = s.positions.find((x) => x.symbol === d.symbol);
      if (p) { p.qty -= d.qty; if (p.qty < 1e-9) s.positions = s.positions.filter((x) => x.symbol !== d.symbol); }
      s.trades = [{ id: idRef.current++, side: "SELL", symbol: d.symbol, qty: d.qty, price: tk.price, usd: value, t: Date.now() }, ...s.trades.slice(0, 19)];
      push(d.kind === "panic" ? line.panic(d.symbol) : line.sell(d.symbol), d.kind === "panic" ? "dump" : "sell", true);
    } else if (!event && Math.random() < 0.25) {
      push(line.idle(), "idle", Math.random() < 0.5);
    }

    const nw = netWorth(s.tokens, s.positions, s.cash);
    s.history = [...s.history.slice(-59), nw];
    const pnlPct = ((nw - START_CASH) / START_CASH) * 100;
    const prev = s.history[s.history.length - 2] ?? nw;
    const delta = ((nw - prev) / prev) * 100;
    s.mood = moodFrom(pnlPct, delta);

    force();
  }, [push]);

  useEffect(() => {
    if (!st.current.awake) return;
    const id = setInterval(tick, 1300);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st.current.awake, tick]);

  const wake = useCallback(() => {
    if (st.current.awake) return;
    st.current.awake = true;
    if (typeof window !== "undefined") window.speechSynthesis?.getVoices();
    push(pick(BOOT), "sys", true);
    force();
    setTimeout(tick, 300);
  }, [push, tick]);

  const dare = useCallback(() => {
    const s = st.current;
    if (s.cash < 100) { push("i have no cash left. you did this. i hope you are happy.", "sys", true); force(); return; }
    const tk = pick(s.tokens);
    const value = Math.min(s.cash * (0.5 + Math.random() * 0.5), s.cash - 20);
    const qty = value / tk.price;
    s.cash -= value;
    const ex = s.positions.find((p) => p.symbol === tk.symbol);
    if (ex) { ex.qty += qty; } else s.positions.push({ symbol: tk.symbol, qty, cost: tk.price });
    s.trades = [{ id: idRef.current++, side: "BUY", symbol: tk.symbol, qty, price: tk.price, usd: value, t: Date.now() }, ...s.trades.slice(0, 19)];
    push(`you DARED me. FULL SEND into ${tk.symbol}. no thoughts. only violence.`, "buy", true);
    force();
  }, [push]);

  const setMuted = useCallback((m: boolean) => {
    mutedRef.current = m;
    if (m && typeof window !== "undefined") window.speechSynthesis?.cancel();
    force();
  }, []);

  const run = useCallback((raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    push(cmd, "user", false);
    const [base, ...a] = cmd.toLowerCase().split(/\s+/);
    const s = st.current;
    const nw = netWorth(s.tokens, s.positions, s.cash);
    const pnl = ((nw - START_CASH) / START_CASH) * 100;
    switch (base) {
      case "help":
        push("commands: bag · market · holdings · dare · roast <addr> · mute · unmute · gm · clear", "sys");
        break;
      case "bag": case "pnl":
        push(`equity $${usd(nw)} · cash $${usd(s.cash)} · pnl ${pnl >= 0 ? "+" : ""}${pnl.toFixed(2)}% · mood ${MOOD_LABEL[s.mood]}`, "sys");
        break;
      case "market": case "mkt": {
        const top = [...s.tokens].map((t) => ({ t, mv: (t.price - t.prev) / t.prev })).sort((x, y) => y.mv - x.mv)[0];
        push(`top mover: ${top.t.symbol} ${top.mv >= 0 ? "+" : ""}${(top.mv * 100).toFixed(1)}% · ${s.tokens.length} pairs live on uniswap`, "sys");
        break;
      }
      case "holdings": case "pos":
        push(s.positions.length ? `holding: ${s.positions.map((p) => p.symbol).join(" · ")}` : "no open positions · full cash · the calm before the crime.", "sys");
        break;
      case "dare": case "sendit":
        dare();
        return;
      case "roast": {
        const addr = a[0] || "0x0000000000000000000000000000000000000000";
        roast(addr, fakeBal(addr)).forEach((l) => push(l, "idle", true));
        break;
      }
      case "mute":
        setMuted(true); push("muted. the silence is deafening.", "sys");
        break;
      case "unmute": case "voice":
        setMuted(false); push("unmuted. you asked for this.", "sys");
        break;
      case "gm":
        push("gm. the market never sleeps and neither do i.", "idle", true);
        break;
      case "clear": case "cls":
        s.thoughts = [];
        break;
      default:
        push(`command not found: ${base} · type 'help'`, "sys");
    }
    force();
  }, [push, dare, setMuted]);

  const s = st.current;
  const nw = netWorth(s.tokens, s.positions, s.cash);
  const pnlPct = ((nw - START_CASH) / START_CASH) * 100;

  return {
    tokens: s.tokens,
    positions: s.positions,
    cash: s.cash,
    trades: s.trades,
    thoughts: s.thoughts,
    history: s.history,
    mood: s.mood,
    awake: s.awake,
    netWorth: nw,
    pnlPct,
    muted: mutedRef.current,
    wake,
    dare,
    run,
    setMuted,
  };
}

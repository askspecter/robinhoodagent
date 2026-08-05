"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import {
  initTokens, tickTokens, decide, netWorth, moodFrom, START_CASH,
  type Token, type Position, type Trade, type Mood,
} from "./engine";
import { line, BOOT, pick } from "./phrases";

export type Thought = { id: number; text: string; tone: "buy" | "sell" | "pump" | "dump" | "idle" | "sys" };

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

export function useUnia() {
  const [, force] = useReducer((x) => x + 1, 0);
  const idRef = useRef(1);
  const mutedRef = useRef(false);
  const glitchRef = useRef(false);

  const glitch = () => {
    glitchRef.current = true;
    force();
    setTimeout(() => { glitchRef.current = false; force(); }, 520);
  };
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

  const push = useCallback((text: string, tone: Thought["tone"], voice = false) => {
    const th = { id: idRef.current++, text, tone };
    st.current.thoughts = [...st.current.thoughts.slice(-39), th];
    if (voice) say(text);
  }, [say]);

  const tick = useCallback(() => {
    const s = st.current;
    const { tokens, event } = tickTokens(s.tokens);
    s.tokens = tokens;

    // React to a big market event
    if (event) {
      if (event.pct > 0) push(line.pump(event.symbol, event.pct), "pump", true);
      else { push(line.dump(event.symbol, -event.pct), "dump", true); if (event.pct < -18) glitch(); }
    }
    if (Math.random() < 0.12) push(line.sys(), "sys", false);

    // Decide + act
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
      const usd = d.qty * tk.price;
      s.cash += usd;
      const p = s.positions.find((x) => x.symbol === d.symbol);
      if (p) { p.qty -= d.qty; if (p.qty < 1e-9) s.positions = s.positions.filter((x) => x.symbol !== d.symbol); }
      s.trades = [{ id: idRef.current++, side: "SELL", symbol: d.symbol, qty: d.qty, price: tk.price, usd, t: Date.now() }, ...s.trades.slice(0, 19)];
      push(d.kind === "panic" ? line.panic(d.symbol) : line.sell(d.symbol), "sell", true);
      if (d.kind === "panic") glitch();
    } else if (!event && Math.random() < 0.25) {
      push(line.idle(), "idle", Math.random() < 0.5);
    }

    // Valuation + mood
    const nw = netWorth(s.tokens, s.positions, s.cash);
    s.history = [...s.history.slice(-59), nw];
    const pnlPct = ((nw - START_CASH) / START_CASH) * 100;
    const prev = s.history[s.history.length - 2] ?? nw;
    const delta = ((nw - prev) / prev) * 100;
    s.mood = moodFrom(pnlPct, delta);

    force();
  }, [push]);

  // loop
  useEffect(() => {
    if (!st.current.awake) return;
    const id = setInterval(tick, 1100);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st.current.awake, tick]);

  const wake = useCallback(() => {
    if (st.current.awake) return;
    st.current.awake = true;
    // prime voices + greet
    if (typeof window !== "undefined") window.speechSynthesis?.getVoices();
    push(pick(BOOT), "sys", true);
    force();
    setTimeout(tick, 300);
  }, [push, tick]);

  const dare = useCallback(() => {
    const s = st.current;
    if (s.cash < 100) { push("i have no cash left. you did this. i hope you are happy.", "sys", true); force(); return; }
    const tk = pick(s.tokens);
    const usd = Math.min(s.cash * (0.5 + Math.random() * 0.5), s.cash - 20);
    const qty = usd / tk.price;
    s.cash -= usd;
    const ex = s.positions.find((p) => p.symbol === tk.symbol);
    if (ex) { ex.qty += qty; } else s.positions.push({ symbol: tk.symbol, qty, cost: tk.price });
    s.trades = [{ id: idRef.current++, side: "BUY", symbol: tk.symbol, qty, price: tk.price, usd, t: Date.now() }, ...s.trades.slice(0, 19)];
    push(`you DARED me. FULL SEND into ${tk.symbol}. no thoughts. only violence.`, "buy", true);
    force();
  }, [push]);

  const setMuted = useCallback((m: boolean) => {
    mutedRef.current = m;
    if (m && typeof window !== "undefined") window.speechSynthesis?.cancel();
    force();
  }, []);

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
    glitching: glitchRef.current,
    muted: mutedRef.current,
    wake,
    dare,
    setMuted,
    say,
    pushRoast: (lines: string[]) => lines.forEach((l) => push(l, "idle", true)),
  };
}

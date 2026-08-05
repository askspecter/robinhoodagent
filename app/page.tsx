"use client";

import { useUnia } from "@/lib/unia/useUnia";
import { MOOD_LABEL } from "@/lib/unia/phrases";
import { START_CASH } from "@/lib/unia/engine";
import { Unicorn } from "@/components/Unicorn";
import { Sparkline } from "@/components/Sparkline";
import { Thoughts } from "@/components/Thoughts";
import { Holdings, Tape } from "@/components/Positions";
import { RoastCard } from "@/components/RoastCard";

export default function Home() {
  const u = useUnia();
  const up = u.pnlPct >= 0;
  const last = u.thoughts[u.thoughts.length - 1]?.text;

  return (
    <main className={`relative z-10 min-h-screen ${u.glitching ? "animate-glitch" : ""}`}>
      {/* top bar */}
      <header className="sticky top-0 z-30 backdrop-blur-sm bg-uni-bg/70 border-b border-uni-line">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <span className="glow-mag text-uni-pink font-bold tracking-widest">UNIA</span>
            <span className="text-uni-muted">// degen.terminal v6.6.6</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="pill px-2.5 py-1 text-[11px] text-uni-muted hidden sm:inline">MODE: PAPER</span>
            <button className="btn px-3 py-1.5 text-xs" onClick={() => u.setMuted(!u.muted)}>{u.muted ? "voice: off" : "voice: on"}</button>
            {u.awake && <button className="btn btn-mag px-3 py-1.5 text-xs" onClick={u.dare}>dare her</button>}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* hero */}
        <section className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-uni-muted text-xs tracking-widest mb-3">
              <span className="text-uni-pink">$</span> ./init unia --autonomous --unhinged
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight glow">
              THE AUTONOMOUS<br />DEGEN <span className="text-uni-pink glow-mag">UNICORN</span>
            </h1>
            <p className="mt-4 text-uni-muted max-w-md text-sm leading-relaxed">
              she has her own bag, trades live on-chain, thinks out loud, and will
              read your wallet for filth. paper mode: no real funds, all real chaos.
            </p>
            {!u.awake ? (
              <button className="btn btn-solid px-7 py-3.5 mt-6 text-sm" onClick={u.wake}>&gt; wake unia (sound on)</button>
            ) : (
              <div className="pill inline-flex items-center gap-2 px-3 py-2 mt-6 text-sm">
                <span className={`h-2 w-2 rounded-full animate-blink`} style={{ background: up ? "#35ff7a" : "#ff4d4d" }} />
                LIVE // STATE: <span className={up ? "up" : "down"}>{MOOD_LABEL[u.mood]}</span>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <Unicorn mood={u.mood} glitching={u.glitching} speech={u.awake ? last : "run ./wake and turn your volume up"} />
          </div>
        </section>

        {/* pnl readout */}
        <section className="box mt-8">
          <div className="bar px-4 py-2 text-xs text-uni-muted">unia@degen:~ — watch --interval 1s ./pnl</div>
          <div className="p-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-[11px] text-uni-muted tracking-widest">NET_WORTH</div>
                <div className="text-4xl font-bold mt-1 glow">${u.netWorth.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-uni-muted tracking-widest">PNL</div>
                <div className={`text-3xl font-bold ${up ? "up glow" : "down"}`}>{up ? "+" : ""}{u.pnlPct.toFixed(1)}%</div>
                <div className="text-[11px] text-uni-muted">from ${START_CASH.toLocaleString()}</div>
              </div>
            </div>
            <div className="mt-3"><Sparkline data={u.history} up={up} /></div>
          </div>
        </section>

        {/* grid */}
        <section className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2"><Thoughts thoughts={u.thoughts} /></div>
          <div className="space-y-6">
            <Holdings tokens={u.tokens} positions={u.positions} cash={u.cash} />
            <Tape trades={u.trades} />
          </div>
        </section>

        <section className="mt-6"><RoastCard onRoast={u.pushRoast} /></section>

        <footer className="text-center text-[11px] text-uni-muted mt-10 pb-8 tracking-wide">
          UNIA is a paper-trading art project. not financial advice. not affiliated with Uniswap Labs.
        </footer>
      </div>
    </main>
  );
}

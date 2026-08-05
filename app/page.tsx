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
  const lastThought = u.thoughts[u.thoughts.length - 1]?.text;

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-uni-bg/70 border-b border-uni-line">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl">🦄</span> <span className="grad-text">Unia</span>
            <span className="pill ml-2 px-2.5 py-1 text-[11px] text-uni-muted">PAPER MODE</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost px-3 py-2 text-sm" onClick={() => u.setMuted(!u.muted)} title="voice">
              {u.muted ? "🔇" : "🔊"}
            </button>
            {u.awake && (
              <button className="btn-ghost px-3 py-2 text-sm" onClick={u.dare}>Dare her 😈</button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Hero row */}
        <section className="grid lg:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-center lg:text-left">
              Meet <span className="grad-text">Unia</span> — the<br />autonomous degen unicorn 🦄
            </h1>
            <p className="mt-4 text-uni-muted max-w-md text-center lg:text-left">
              She has her own bag, trades live on-chain, thinks out loud, and will
              absolutely roast your wallet. Paper mode — no real funds, all real chaos.
            </p>
            {!u.awake ? (
              <button className="btn-pink px-7 py-3.5 mt-6 text-base" onClick={u.wake}>
                🔊 Wake Unia
              </button>
            ) : (
              <div className="pill px-4 py-2 mt-6 text-sm flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-uni-up animate-pulse" /> Live · {MOOD_LABEL[u.mood]}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Unicorn mood={u.mood} speech={u.awake ? lastThought : "click Wake Unia and turn your volume up 🔊"} />
          </div>
        </section>

        {/* PnL bar */}
        <section className="card p-5 mt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs text-uni-muted tracking-wide">UNIA&apos;S NET WORTH</div>
              <div className="text-4xl font-extrabold mt-1">
                ${u.netWorth.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-uni-muted tracking-wide">PNL</div>
              <div className={`text-3xl font-extrabold ${up ? "up" : "down"}`}>
                {up ? "+" : ""}{u.pnlPct.toFixed(1)}%
              </div>
              <div className="text-xs text-uni-muted">from ${START_CASH.toLocaleString()}</div>
            </div>
          </div>
          <div className="mt-3"><Sparkline data={u.history} up={up} /></div>
        </section>

        {/* Grid */}
        <section className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2"><Thoughts thoughts={u.thoughts} /></div>
          <div className="space-y-6">
            <Holdings tokens={u.tokens} positions={u.positions} cash={u.cash} />
            <Tape trades={u.trades} />
          </div>
        </section>

        <section className="mt-6">
          <RoastCard onRoast={u.pushRoast} />
        </section>

        <footer className="text-center text-xs text-uni-muted mt-10 pb-6">
          Unia is a paper-trading art project. Not financial advice. Not affiliated with Uniswap Labs. 🦄
        </footer>
      </div>
    </main>
  );
}

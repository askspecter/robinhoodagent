"use client";

import { useEffect, useState } from "react";
import { useUnia } from "@/lib/unia/useUnia";
import { Unicorn } from "@/components/Unicorn";
import { Logo, Menu, CommandBar } from "@/components/Panels";
import { BagPanel, MarketPanel, HoldingsPanel, TapePanel, FeedPanel } from "@/components/Agent";

export default function Home() {
  const unia = useUnia();
  const [active, setActive] = useState(1);

  // wake the agent once; she starts trading (silently) on load
  useEffect(() => {
    unia.wake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="relative z-10 min-h-screen p-3 sm:p-6 md:p-8">
      <div className="win mx-auto max-w-6xl p-4 sm:p-6">
        {/* title bar */}
        <div className="flex items-center justify-between pb-4 mb-2 border-b border-uni-line">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="dot bg-uni-green" />
              <span className="dot bg-uni-green" />
              <span className="dot bg-uni-green" />
            </div>
            <span className="text-uni-text text-sm">unia@uniswap: ~</span>
          </div>
          <span className="btn px-3 py-1.5 text-xs">UNIA v1.0.0</span>
        </div>

        {/* top: unicorn + logo/menu */}
        <section className="grid lg:grid-cols-2 gap-6 items-center py-4">
          <div className="order-2 lg:order-1"><Unicorn /></div>
          <div className="order-1 lg:order-2">
            <Logo />
            <Menu active={active} onSelect={setActive} />
          </div>
        </section>

        {/* the agent — 2 columns of live panels */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-6 min-w-0">
            <BagPanel netWorth={unia.netWorth} cash={unia.cash} pnlPct={unia.pnlPct} mood={unia.mood} history={unia.history} />
            <HoldingsPanel positions={unia.positions} tokens={unia.tokens} />
            <TapePanel trades={unia.trades} />
          </div>
          <div className="space-y-6 min-w-0">
            <MarketPanel tokens={unia.tokens} />
            <FeedPanel thoughts={unia.thoughts} muted={unia.muted} onToggleMute={() => unia.setMuted(!unia.muted)} />
          </div>
        </section>

        {/* command bar */}
        <CommandBar onRun={unia.run} />

        <div className="text-center text-[11px] text-uni-muted mt-6">
          UNIA · the first agent on Uniswap · not affiliated with Uniswap Labs. paper-trading art project, not financial advice.
        </div>
      </div>
    </main>
  );
}

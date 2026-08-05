"use client";

import { useEffect, useMemo, useState } from "react";
import { useUnia } from "@/lib/unia/useUnia";
import { useUniaPass } from "@/lib/unia/useUniaPass";
import { MENU, type SectionKey } from "@/lib/unia/terminal";
import { Unicorn } from "@/components/Unicorn";
import { Logo, Menu, CommandBar } from "@/components/Panels";
import { BagPanel, MarketPanel, HoldingsPanel, TapePanel, FeedPanel } from "@/components/Agent";
import {
  WalletChip, NftSection, RewardsSection, DocsSection, NetworkSection, DevsSection, ExitSection,
} from "@/components/Sections";

export default function Home() {
  const unia = useUnia();
  const pass = useUniaPass();
  const [active, setActive] = useState<SectionKey>("terminal");

  // wake the agent once; she starts trading (silently) on load
  useEffect(() => {
    unia.wake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // live menu — statuses reflect wallet/pass state
  const items = useMemo(
    () =>
      MENU.map((m) => {
        if (m.key === "nft") return { ...m, status: pass.owned ? "owned" : "mint open" };
        if (m.key === "rewards") return { ...m, status: pass.owned ? "premium" : "locked", on: pass.owned };
        return m;
      }),
    [pass.owned]
  );

  // command bar dispatch: app nav/actions first, else the agent
  const onRun = (raw: string) => {
    const [base] = raw.trim().toLowerCase().split(/\s+/);
    switch (base) {
      case "connect": pass.connect(); setActive("nft"); return;
      case "disconnect": pass.disconnect(); return;
      case "mint": setActive("nft"); pass.mint(); return;
      case "claim": pass.claim(); return;
      case "nft": case "pass": setActive("nft"); return;
      case "rewards": setActive("rewards"); return;
      case "docs": setActive("docs"); return;
      case "network": case "net": setActive("network"); return;
      case "devs": case "developers": setActive("devs"); return;
      case "terminal": case "home": setActive("terminal"); return;
      default: unia.run(raw);
    }
  };

  return (
    <main className="relative z-10 min-h-screen p-3 sm:p-6 md:p-8">
      <div className="win mx-auto max-w-6xl p-4 sm:p-6">
        {/* title bar */}
        <div className="flex items-center justify-between gap-3 pb-4 mb-2 border-b border-uni-line">
          <div className="flex items-center gap-4 min-w-0">
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <span className="dot bg-uni-green" />
              <span className="dot bg-uni-green" />
              <span className="dot bg-uni-green" />
            </div>
            <span className="text-uni-text text-sm truncate">unia@robinhood: ~</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <WalletChip pass={pass} />
            <span className="btn px-3 py-1.5 text-xs hidden sm:inline">UNIA v1.0.0</span>
          </div>
        </div>

        {/* top: unicorn + logo/menu (persistent nav) */}
        <section className="grid lg:grid-cols-2 gap-6 items-center py-4">
          <div className="order-2 lg:order-1"><Unicorn /></div>
          <div className="order-1 lg:order-2">
            <Logo />
            <Menu items={items} active={active} onSelect={setActive} />
          </div>
        </section>

        {/* routed content */}
        {active === "terminal" && (
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
        )}
        {active === "nft" && <NftSection pass={pass} goto={setActive} />}
        {active === "rewards" && <RewardsSection pass={pass} goto={setActive} />}
        {active === "docs" && <DocsSection />}
        {active === "network" && <NetworkSection />}
        {active === "devs" && <DevsSection />}
        {active === "exit" && <ExitSection pass={pass} goto={setActive} />}

        {/* command bar */}
        <CommandBar onRun={onRun} />

        <div className="text-center text-[11px] text-uni-muted mt-6">
          UNIA · the first agent on Uniswap · Robinhood Chain #4663 · not affiliated with Uniswap Labs or Robinhood Markets, Inc. · paper-trading art project, not financial advice.
        </div>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useUnia } from "@/lib/unia/useUnia";
import { useUniaPass } from "@/lib/unia/useUniaPass";
import { MENU, type SectionKey } from "@/lib/unia/terminal";
import { SOCIALS } from "@/lib/config";
import { Unicorn } from "@/components/Unicorn";
import { Logo, Menu, CommandBar } from "@/components/Panels";
import { BagPanel, MarketPanel, HoldingsPanel, TapePanel, FeedPanel } from "@/components/Agent";
import { WalletChip, UniaHub, RoastSection, AboutSection } from "@/components/Sections";
import { LaunchBanner } from "@/components/Launch";

export default function Home() {
  const unia = useUnia();
  const pass = useUniaPass();
  const [active, setActive] = useState<SectionKey>("live");

  // wake the agent once; she starts trading (silently) on load
  useEffect(() => {
    unia.wake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // live menu — the $UNIA hub is open (buy / token economy). status nods to
  // pass ownership when held.
  const items = useMemo(
    () =>
      MENU.map((m) =>
        m.key === "unia"
          ? { ...m, status: pass.owned ? "owned" : "buy", on: true }
          : m
      ),
    [pass.owned]
  );

  // local agent commands (handled by the sim engine, not the AI brain)
  const AGENT_CMDS = new Set([
    "help", "bag", "pnl", "market", "mkt", "holdings", "pos",
    "dare", "sendit", "mute", "unmute", "voice", "gm", "clear", "cls",
  ]);

  // command bar dispatch: nav/actions → agent commands → else TALK to UNIA (AI)
  const onRun = (raw: string) => {
    const [base] = raw.trim().toLowerCase().split(/\s+/);
    switch (base) {
      case "roast": setActive("roast"); return;
      case "about": case "who": setActive("about"); return;
      case "live": case "terminal": case "home": setActive("live"); return;
      case "connect": pass.connect(); setActive("unia"); return;
      case "disconnect": pass.disconnect(); return;
      case "mint": setActive("unia"); pass.mint(); return;
      case "claim": pass.claim(); return;
      case "nft": case "pass": case "rewards": case "docs": case "network": case "net": case "devs": case "developers":
        setActive("unia"); return;
      case "x": case "twitter": window.open(SOCIALS.x, "_blank", "noopener"); return;
      case "tg": case "telegram": window.open(SOCIALS.telegram, "_blank", "noopener"); return;
      case "socials": window.open(SOCIALS.x, "_blank", "noopener"); return;
    }
    if (AGENT_CMDS.has(base)) { unia.run(raw); return; }
    // anything else → talk to UNIA's brain; show it on the Live feed
    setActive("live");
    unia.ask(raw);
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

        {/* safety / disclaimer strip — clarifies this is an unofficial art
            project and never asks for secrets, reducing false "deceptive site"
            flags from Safe Browsing. */}
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-uni-line px-3 py-2 text-[11px] leading-snug text-uni-muted">
          <span className="text-uni-gold shrink-0">ⓘ</span>
          <span>
            Unofficial community project · <span className="text-uni-text">not affiliated with Uniswap Labs or Robinhood Markets, Inc.</span>{" "}
            UNIA is a paper-trading art project. It will <span className="text-uni-text">never</span> ask for your seed phrase, private key, or password — connecting a wallet is read-only.
          </span>
        </div>

        {/* launch countdown → Pons */}
        <LaunchBanner />

        {/* top: unicorn + logo/menu (persistent nav) */}
        <section className="grid lg:grid-cols-2 gap-6 items-center py-4">
          <div className="order-2 lg:order-1"><Unicorn /></div>
          <div className="order-1 lg:order-2">
            <Logo />
            <Menu items={items} active={active} onSelect={setActive} />
          </div>
        </section>

        {/* routed content */}
        {active === "live" && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-6 min-w-0">
              <BagPanel netWorth={unia.netWorth} cash={unia.cash} pnlPct={unia.pnlPct} mood={unia.mood} history={unia.history} />
              <HoldingsPanel positions={unia.positions} tokens={unia.tokens} />
              <TapePanel trades={unia.trades} />
            </div>
            <div className="space-y-6 min-w-0">
              <MarketPanel tokens={unia.tokens} />
              <FeedPanel thoughts={unia.thoughts} muted={unia.muted} thinking={unia.asking} onToggleMute={() => unia.setMuted(!unia.muted)} />
            </div>
          </section>
        )}
        {active === "roast" && <RoastSection pass={pass} />}
        {active === "about" && <AboutSection />}
        {active === "unia" && <UniaHub pass={pass} />}

        {/* command bar */}
        <CommandBar onRun={onRun} />

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-6 text-xs">
          <a href={SOCIALS.x} target="_blank" rel="noreferrer" className="text-uni-muted hover:text-uni-green transition-colors">X ↗</a>
          <span className="text-uni-muted">·</span>
          <a href={SOCIALS.telegram} target="_blank" rel="noreferrer" className="text-uni-muted hover:text-uni-green transition-colors">Telegram ↗</a>
        </div>
        <div className="text-center text-[11px] text-uni-muted mt-3 leading-snug">
          UNIA · the first agent on Uniswap · Robinhood Chain #4663 · unofficial project, not affiliated with Uniswap Labs or Robinhood Markets, Inc. · paper-trading art project, not financial advice. UNIA never asks for your seed phrase, private key, or password.
        </div>
      </div>
    </main>
  );
}

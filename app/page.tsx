"use client";

import { useState } from "react";
import { useTerminal } from "@/lib/unia/terminal";
import { Unicorn } from "@/components/Unicorn";
import { Logo, Menu, SystemStatus, Logs, CommandBar } from "@/components/Panels";

export default function Home() {
  const term = useTerminal();
  const [active, setActive] = useState(1);

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

        {/* bottom: status + logs */}
        <section className="grid lg:grid-cols-2 gap-6">
          <SystemStatus metrics={term.metrics} uptime={term.uptime} />
          <Logs logs={term.logs} />
        </section>

        {/* command bar */}
        <CommandBar onRun={term.run} />

        <div className="text-center text-[11px] text-uni-muted mt-6">
          UNIA · the first agent on Uniswap · not affiliated with Uniswap Labs.
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-72 border-r border-stonk-line z-30">
        <Sidebar />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 h-14 flex items-center justify-between px-4 border-b border-stonk-line bg-stonk-ink/90 backdrop-blur">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid place-items-center h-8 w-8 border-2 border-stonk-green text-stonk-green font-bold">×</span>
          <span className="font-bold tracking-[0.12em] text-sm"><span className="text-stonk-green">STONK</span> BROKERS</span>
        </Link>
        <button className="btn px-3 py-2 text-lg leading-none" aria-label="menu" onClick={() => setOpen(true)}>≡</button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-xs border-r border-stonk-line">
            <button className="absolute top-4 right-3 z-10 text-stonk-muted hover:text-white text-xl" aria-label="close" onClick={() => setOpen(false)}>✕</button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-72">{children}</div>
    </div>
  );
}

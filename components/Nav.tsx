"use client";

import Link from "next/link";
import { useState } from "react";
import { ConnectButton } from "./ConnectButton";
import { site } from "@/lib/config";

const links = [
  { href: "/#how", label: "How it works" },
  { href: "/mint", label: "Mint" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/#tokenomics", label: "Tokenomics" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-stonk-ink/70 border-b border-stonk-line">
      <nav className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-bold tracking-tight">
          <span className="grid place-items-center h-8 w-8 rounded-lg bg-stonk-green text-stonk-ink font-black">
            §
          </span>
          <span className="text-lg">{site.name}</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-stonk-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ConnectButton />
          </div>
          <button
            className="md:hidden btn-ghost px-3 py-2 text-sm"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-stonk-line px-4 py-3 space-y-3 bg-stonk-ink">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-stonk-muted hover:text-white"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2">
            <ConnectButton />
          </div>
        </div>
      )}
    </header>
  );
}

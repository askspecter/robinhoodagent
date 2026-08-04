"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ConnectButton } from "./ConnectButton";
import { site } from "@/lib/config";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/token", label: "Token" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/about", label: "About" },
];

export function TopBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-stonk-line bg-stonk-ink/85 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <span className="grid place-items-center h-8 w-8 border-2 border-stonk-green text-stonk-green font-black">×</span>
          <span className="font-bold tracking-[0.14em] text-sm">{site.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm uppercase tracking-[0.1em] text-stonk-muted">
          {NAV.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} className={active ? "text-stonk-green" : "hover:text-stonk-bright"}>
                {n.label}
              </Link>
            );
          })}
          <a href={site.socials.docs} target="_blank" rel="noreferrer" className="hover:text-stonk-bright">
            Docs ↗
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block"><ConnectButton /></div>
          <button className="btn md:hidden px-3 py-2 text-sm" onClick={() => setOpen((v) => !v)} aria-label="menu">
            {open ? "✕" : "≡"}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-stonk-line px-4 py-3 space-y-1 bg-stonk-ink">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block px-2 py-2 uppercase tracking-wider text-stonk-muted hover:text-stonk-green">
              {n.label}
            </Link>
          ))}
          <a href={site.socials.docs} target="_blank" rel="noreferrer" className="block px-2 py-2 uppercase tracking-wider text-stonk-muted">Docs ↗</a>
          <div className="pt-2 sm:hidden"><ConnectButton variant="block" /></div>
        </div>
      )}
    </header>
  );
}

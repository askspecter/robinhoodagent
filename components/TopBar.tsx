"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ConnectButton } from "./ConnectButton";
import { site } from "@/lib/config";

const NAV = [
  { href: "/", cmd: "~" },
  { href: "/about", cmd: "./about" },
  { href: "/token", cmd: "./token" },
  { href: "/roadmap", cmd: "./roadmap" },
];

export function TopBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-stonk-line bg-stonk-ink/85 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-stonk-green glow text-sm">{site.host}</span>
          <span className="text-stonk-muted text-sm hidden sm:inline">:~$</span>
          <span className="cursor align-middle hidden sm:inline" />
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {NAV.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`px-3 py-1.5 rounded border transition-colors ${
                  active
                    ? "border-stonk-line text-stonk-green glow-soft bg-stonk-green/5"
                    : "border-transparent text-stonk-muted hover:text-stonk-bright"
                }`}
              >
                {n.cmd}
              </Link>
            );
          })}
          <a
            href={site.socials.docs}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 text-stonk-muted hover:text-stonk-bright"
          >
            ./docs ↗
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ConnectButton />
          </div>
          <button
            className="btn md:hidden px-3 py-1.5 text-sm"
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
          >
            {open ? "✕" : "≡"}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-stonk-line px-4 py-3 space-y-1 bg-stonk-ink">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block px-2 py-2 text-stonk-muted hover:text-stonk-green"
            >
              {n.cmd}
            </Link>
          ))}
          <a href={site.socials.docs} target="_blank" rel="noreferrer" className="block px-2 py-2 text-stonk-muted">
            ./docs ↗
          </a>
          <div className="pt-2 sm:hidden">
            <ConnectButton variant="block" />
          </div>
        </div>
      )}
    </header>
  );
}

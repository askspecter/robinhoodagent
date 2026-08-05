"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "./ConnectButton";
import { site } from "@/lib/config";

const I = {
  home: "M3 11 12 3l9 8M5 10v10h5v-6h4v6h5V10",
  bag: "M6 7V6a4 4 0 0 1 8 0v1m-9 0h10l1 13H4L5 7Z",
  rocket: "M5 15c-1 1-1 4-1 4s3 0 4-1m8-13c-3 0-6 2-8 5l-2 4 3 3 4-2c3-2 5-5 5-8V4h-2Z",
  swap: "M7 4v13m0 0-3-3m3 3 3-3M17 20V7m0 0-3 3m3-3 3 3",
  chart: "M4 19h16M6 16l4-5 3 3 5-7",
  bell: "M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 0 0 4 0",
  vault: "M4 5h16v14H4zM9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0m3 0v.01M17 5v14",
  book: "M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Zm0 0v14",
};

const Icon = ({ d }: { d: string }) => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const NAV = [
  { href: "/", label: "Home", icon: I.home },
  { href: "/market", label: "Anvil NFT AMM", icon: I.bag },
  { href: "/launcher", label: "Launcher", icon: I.rocket },
  { href: "/exchange", label: "Exchange", icon: I.swap },
  { href: "/options", label: "Options", icon: I.chart },
  { href: "/broker-box", label: "Broker Box", icon: I.bell },
  { href: "/safety-deposit-box", label: "Safety Deposit Box", icon: I.vault },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col h-full bg-stonk-ink">
      <Link href="/" onClick={onNavigate} className="flex items-center gap-3 px-5 h-[70px] border-b border-stonk-line">
        <span className="grid place-items-center h-9 w-9 border-2 border-stonk-green text-stonk-green font-bold text-lg">×</span>
        <span className="font-bold tracking-[0.12em] text-[15px]">
          <span className="text-stonk-green">STONK</span> BROKERS
        </span>
      </Link>

      <nav className="flex-1 overflow-y-auto py-2 no-scrollbar border-b border-stonk-line">
        {NAV.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={onNavigate} className={`nav-item ${active ? "active" : ""}`}>
              <Icon d={item.icon} />
              {item.label}
            </Link>
          );
        })}
        <a href={site.socials.docs} target="_blank" rel="noreferrer" className="nav-item">
          <Icon d={I.book} /> Docs
        </a>
      </nav>

      <div className="px-5 py-5">
        <ConnectButton variant="sidebar" />
      </div>

      <div className="px-5 pb-5 flex items-center gap-4 text-stonk-muted">
        {site.socials.twitter && (
          <a href={site.socials.twitter} target="_blank" rel="noreferrer" aria-label="X" className="hover:text-stonk-bright">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.4 8.5L23 22h-6.8l-5.3-6.9L4.8 22H1.6l7.9-9L1 2h6.9l4.8 6.3L18.9 2Zm-1.2 18h1.9L7.3 4H5.3l12.4 16Z"/></svg>
          </a>
        )}
        <a href={site.socials.discord || "#"} target="_blank" rel="noreferrer" aria-label="Discord" className="hover:text-stonk-bright">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20 5.3A17 17 0 0 0 15.9 4l-.2.4a13 13 0 0 1 3.6 1.8 12 12 0 0 0-10.6 0A13 13 0 0 1 12.3 4.4L12 4a17 17 0 0 0-4 1.3C1.6 14 3.8 20 3.8 20a17 17 0 0 0 5.2 2.6l.4-1a11 11 0 0 1-1.8-.9l.4-.3a12 12 0 0 0 10 0l.5.3a11 11 0 0 1-1.8.9l.4 1A17 17 0 0 0 20.2 20s2.2-6-.2-14.7ZM9.5 15.5c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm5 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z"/></svg>
        </a>
        <span className="ml-auto text-[11px] tracking-wider">{site.company}</span>
      </div>
    </div>
  );
}

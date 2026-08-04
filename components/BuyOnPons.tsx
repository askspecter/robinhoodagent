"use client";

import { site } from "@/lib/config";

export function BuyOnPons({ className = "" }: { className?: string }) {
  const live = site.token.launched;
  return (
    <a
      href={live ? site.token.ponsUrl : undefined}
      target={live ? "_blank" : undefined}
      rel="noreferrer"
      aria-disabled={!live}
      onClick={(e) => {
        if (!live) e.preventDefault();
      }}
      className={`btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-sm ${
        !live ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
      title={live ? "Buy on Pons" : "Segera hadir — token belum diluncurkan di Pons"}
    >
      {live ? `Buy ${site.ticker} on Pons` : `${site.ticker} — Coming soon on Pons`}
      <span aria-hidden>↗</span>
    </a>
  );
}

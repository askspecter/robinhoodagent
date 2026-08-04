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
      onClick={(e) => !live && e.preventDefault()}
      className={`btn ${live ? "btn-solid" : "opacity-60 cursor-not-allowed"} inline-flex items-center gap-2 px-6 py-3 text-sm ${className}`}
      title={live ? "Buy on Pons" : "Token not launched on Pons yet"}
    >
      {live ? `Buy ${site.ticker} on Pons` : `${site.ticker} — Coming soon on Pons`}
      <span aria-hidden>↗</span>
    </a>
  );
}

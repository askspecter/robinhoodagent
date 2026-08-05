"use client";

import { useEffect, useState } from "react";
import { LAUNCH } from "@/lib/config";

const TARGET = new Date(LAUNCH.at).getTime();
const pad = (n: number) => String(n).padStart(2, "0");

export function LaunchBanner() {
  // null until mounted, to avoid a hydration mismatch on the ticking clock
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const ms = now === null ? null : TARGET - now;
  const live = ms !== null && ms <= 0;

  let cd = "--h --m --s";
  if (ms !== null && ms > 0) {
    const s = Math.floor(ms / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    cd = `${d > 0 ? `${d}d ` : ""}${pad(h)}h ${pad(m)}m ${pad(sec)}s`;
  }

  return (
    <div
      className="box mb-4 px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
      style={{ borderColor: "rgba(126,203,60,0.6)", background: "rgba(126,203,60,0.05)" }}
    >
      <div className="flex items-start sm:items-center gap-2 min-w-0">
        <span className="dot bg-uni-green animate-[blink_1.4s_step-end_infinite] shrink-0 mt-1 sm:mt-0" />
        <span className="text-sm leading-snug">
          <span className="text-uni-green tracking-widest text-xs">{live ? "LIVE" : "LAUNCH"}</span>{" "}
          <span className="text-uni-text">{live ? "$UNIA is live on " : "$UNIA launches on "}</span>
          <span className="text-uni-green">pools.trade</span>
          <span className="text-uni-muted"> · Robinhood Chain</span>
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 sm:contents">
        {!live && (
          <span className="text-uni-green text-base sm:text-lg tabular-nums sm:ml-auto shrink-0" aria-label="time until launch">
            {cd}
          </span>
        )}
        <a
          href={LAUNCH.poolsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-solid text-xs px-4 py-2 shrink-0 whitespace-nowrap"
        >
          {live ? "trade on pools.trade →" : "pools.trade →"}
        </a>
      </div>
    </div>
  );
}

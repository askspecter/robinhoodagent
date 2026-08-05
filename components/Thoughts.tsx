"use client";

import { useEffect, useRef } from "react";
import type { Thought } from "@/lib/unia/useUnia";

const TONE: Record<Thought["tone"], string> = {
  buy: "text-uni-up",
  sell: "text-uni-pinkSoft",
  pump: "text-uni-up",
  dump: "text-uni-down",
  idle: "text-uni-muted",
  sys: "text-uni-purple",
};

export function Thoughts({ thoughts }: { thoughts: Thought[] }) {
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [thoughts]);

  return (
    <div className="card p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-uni-pink animate-pulse" />
        <h3 className="text-sm font-semibold tracking-wide">UNIA IS THINKING…</h3>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 text-sm min-h-[220px] max-h-[46vh]">
        {thoughts.length === 0 && (
          <div className="text-uni-muted">wake Unia to hear the voices in her head 🦄</div>
        )}
        {thoughts.map((t) => (
          <div key={t.id} className="animate-pop leading-snug">
            <span className="text-uni-muted mr-2">›</span>
            <span className={TONE[t.tone]}>{t.text}</span>
          </div>
        ))}
        <div ref={end} />
      </div>
    </div>
  );
}

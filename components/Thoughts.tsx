"use client";

import { useEffect, useRef } from "react";
import type { Thought } from "@/lib/unia/useUnia";

const TONE: Record<Thought["tone"], string> = {
  buy: "text-uni-up",
  sell: "text-uni-pinkSoft",
  pump: "text-uni-up",
  dump: "text-uni-down",
  idle: "text-uni-muted",
  sys: "text-uni-cyan",
};

const clock = () => new Date().toLocaleTimeString("en-GB", { hour12: false });

export function Thoughts({ thoughts }: { thoughts: Thought[] }) {
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [thoughts]);

  return (
    <div className="box h-full flex flex-col">
      <div className="bar px-4 py-2 flex items-center gap-2 text-xs text-uni-muted">
        <span className="h-2 w-2 rounded-full bg-uni-pink animate-blink" />
        unia@degen:~/mind — tail -f thoughts.log
      </div>
      <div className="p-4 flex-1 overflow-y-auto no-scrollbar space-y-1.5 text-sm min-h-[260px] max-h-[48vh]">
        {thoughts.length === 0 && <div className="text-uni-muted">[ awaiting wake signal ]</div>}
        {thoughts.map((t) => (
          <div key={t.id} className="animate-pop leading-snug break-words">
            <span className="text-uni-muted mr-2">[{clock()}]</span>
            <span className={TONE[t.tone]}>{t.text}</span>
          </div>
        ))}
        <div className="text-uni-text"><span className="text-uni-pink">unia&gt;</span> <span className="cursor align-middle" /></div>
        <div ref={end} />
      </div>
    </div>
  );
}

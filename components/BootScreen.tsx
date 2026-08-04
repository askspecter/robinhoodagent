"use client";

import { useEffect, useRef, useState } from "react";
import { site, robinhoodChain } from "@/lib/config";

const LINES: { t: string; cls?: string; d?: number }[] = [
  { t: `${site.name} BIOS v0.9.4 — (c) ${site.company}`, cls: "text-stonk-muted" },
  { t: "POST ....................... OK", cls: "text-stonk-muted" },
  { t: "cpu: quantum-risc // mem: 640K (enough)", cls: "text-stonk-muted" },
  { t: "loading kernel ............. OK" },
  { t: "mounting /dev/pons ......... OK" },
  { t: `net: dialing ${robinhoodChain.name} (chainId ${robinhoodChain.id}) ...`, d: 500 },
  { t: "net: handshake ............. OK", cls: "text-stonk-green" },
  { t: "auth: privy module ......... ready" },
  { t: `token: ${site.ticker} :: ${site.token.launched ? "LIVE on Pons" : "pending launch on Pons"}`, cls: "text-stonk-amber" },
  { t: "starting session ...", d: 400 },
];

export function BootScreen() {
  const [i, setI] = useState(0);
  const [gone, setGone] = useState(true); // default hidden for SSR
  const [fade, setFade] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const seen = sessionStorage.getItem("booted");
    if (seen) return; // already booted this session
    setGone(false);
  }, []);

  useEffect(() => {
    if (gone) return;
    if (i >= LINES.length) {
      const done = setTimeout(finish, 650);
      return () => clearTimeout(done);
    }
    const d = LINES[i]?.d ?? 190;
    const timer = setTimeout(() => setI((v) => v + 1), d);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, gone]);

  function finish() {
    setFade(true);
    setTimeout(() => {
      sessionStorage.setItem("booted", "1");
      setGone(true);
    }, 550);
  }

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-stonk-ink px-6 py-10 sm:p-16 font-mono text-sm sm:text-base transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
      onClick={finish}
      role="button"
      aria-label="Skip intro"
    >
      <div className="max-w-2xl">
        {LINES.slice(0, i).map((l, idx) => (
          <div key={idx} className={`glow-soft ${l.cls ?? "text-stonk-bright"}`}>
            <span className="text-stonk-greenDim">›</span> {l.t}
          </div>
        ))}
        <div className="text-stonk-bright glow-soft">
          <span className="text-stonk-greenDim">›</span> <span className="cursor align-middle" />
        </div>
      </div>
      <div className="fixed bottom-6 right-6 text-xs text-stonk-muted">click / tap to skip →</div>
    </div>
  );
}

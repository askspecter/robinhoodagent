"use client";

import { useEffect, useRef, useState } from "react";
import { site, robinhoodChain } from "@/lib/config";

type L = { t: string; cls?: string; d?: number };

const LINES: L[] = [
  { t: `${site.name} BIOS v0.9.4 — (c) ${site.company}`, cls: "text-stonk-muted" },
  { t: "POST ............................. OK", cls: "text-stonk-muted" },
  { t: "cpu: quantum-risc @ 4.04 THz", cls: "text-stonk-muted" },
  { t: "mem: 640K ......... (enough)", cls: "text-stonk-muted", d: 120 },
  { t: "detecting devices ...", d: 260 },
  { t: "  /dev/pons ...................... OK" },
  { t: "  /dev/wallet .................... OK" },
  { t: "  /dev/entropy ................... OK" },
  { t: "loading kernel ................... OK", d: 220 },
  { t: `net: dialing ${robinhoodChain.name} (chainId ${robinhoodChain.id}) ...`, d: 520 },
  { t: "net: ping 14ms · 12ms · 11ms", cls: "text-stonk-muted" },
  { t: "net: handshake ................... OK", cls: "text-stonk-green" },
  { t: "auth: privy module ............... ready" },
  { t: "warn: this is an experiment. dyor.", cls: "text-stonk-amber", d: 320 },
  { t: `token: ${site.ticker} :: ${site.token.launched ? "LIVE on Pons" : "pending launch on Pons"}`, cls: "text-stonk-amber" },
  { t: "seeding rng ...................... 0x9f2a…c04", cls: "text-stonk-muted", d: 200 },
  { t: "decrypting session manifest ...", d: 260 },
];

const BAR_W = 26;

export function BootScreen() {
  const [i, setI] = useState(0);
  const [gone, setGone] = useState(true); // hidden during SSR
  const [fade, setFade] = useState(false);
  const [phase, setPhase] = useState<"log" | "progress" | "grant">("log");
  const [pct, setPct] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (sessionStorage.getItem("booted")) return;
    setGone(false);
  }, []);

  // log phase
  useEffect(() => {
    if (gone || phase !== "log") return;
    if (i >= LINES.length) {
      setPhase("progress");
      return;
    }
    const d = LINES[i]?.d ?? 155;
    const t = setTimeout(() => setI((v) => v + 1), d);
    return () => clearTimeout(t);
  }, [i, gone, phase]);

  // progress phase
  useEffect(() => {
    if (gone || phase !== "progress") return;
    if (pct >= 100) {
      const t = setTimeout(() => setPhase("grant"), 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPct((p) => Math.min(100, p + 4)), 34);
    return () => clearTimeout(t);
  }, [pct, gone, phase]);

  // grant phase → fade
  useEffect(() => {
    if (gone || phase !== "grant") return;
    const t = setTimeout(finish, 650);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, gone]);

  function finish() {
    setFade(true);
    setTimeout(() => {
      sessionStorage.setItem("booted", "1");
      setGone(true);
    }, 550);
  }

  if (gone) return null;

  const filled = Math.round((pct / 100) * BAR_W);
  const bar = "█".repeat(filled) + "░".repeat(BAR_W - filled);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-stonk-ink px-6 py-10 sm:p-16 font-mono text-sm sm:text-base overflow-hidden transition-opacity duration-500 ${
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

        {phase === "progress" && (
          <div className="text-stonk-green glow-soft mt-1">
            <span className="text-stonk-greenDim">›</span> [{bar}] {pct}%
          </div>
        )}

        {phase === "grant" && (
          <>
            <div className="text-stonk-green glow-soft mt-1">
              <span className="text-stonk-greenDim">›</span> [{"█".repeat(BAR_W)}] 100%
            </div>
            <div className="mt-4 text-lg sm:text-2xl font-bold text-stonk-green glow animate-pulseGlow">
              ▓ ACCESS GRANTED ▓
            </div>
          </>
        )}

        {phase === "log" && (
          <div className="text-stonk-bright glow-soft">
            <span className="text-stonk-greenDim">›</span> <span className="cursor align-middle" />
          </div>
        )}
      </div>

      <div className="fixed bottom-6 right-6 text-xs text-stonk-muted">click / tap to skip →</div>
    </div>
  );
}

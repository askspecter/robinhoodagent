"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";

export const CHAIN = { name: "Robinhood Chain", id: 4663, symbol: "ETH" };

export type LogTag = "INFO" | "CORE" | "NET" | "MOD" | "CHAIN" | "USER" | "SYS";
export type Log = { id: number; t: string; tag: LogTag; text: string };

export type MenuItem = { n: number; label: string; status: string; on: boolean };
export const MENU: MenuItem[] = [
  { n: 1, label: "System Status", status: "online", on: true },
  { n: 2, label: "AI Core", status: "active", on: true },
  { n: 3, label: "Robinhood Chain", status: "connected", on: true },
  { n: 4, label: "Modules", status: "12 loaded", on: true },
  { n: 5, label: "Explorer", status: "ready", on: true },
  { n: 6, label: "Developers", status: "online", on: true },
  { n: 7, label: "Exit", status: "logout", on: false },
];

const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
const clock = () => new Date().toLocaleTimeString("en-GB", { hour12: false });

const BOOT: [LogTag, string][] = [
  ["INFO", "UNIA terminal initialized"],
  ["CORE", "AI engine online"],
  ["NET", `connecting to ${CHAIN.name}...`],
  ["NET", `connection established · chainId ${CHAIN.id}`],
  ["MOD", "loading modules..."],
  ["MOD", "12 modules loaded"],
  ["CHAIN", "syncing headers... 100%"],
  ["USER", "welcome to UNIA terminal"],
  ["SYS", "ready for command"],
];

const TOKENS = ["ETH", "USDC", "PONS", "STONK", "WBTC", "DEGEN", "HOOD"];
function liveLog(): [LogTag, string] {
  const r = Math.random();
  if (r < 0.34) return ["CHAIN", `block #${(21_400_000 + Math.floor(Math.random() * 9000)).toLocaleString()} sealed · ${2 + Math.floor(Math.random() * 180)} txns`];
  if (r < 0.55) return ["NET", `gas ${(0.001 + Math.random() * 0.03).toFixed(4)} gwei · ${(20 + Math.floor(Math.random() * 40))} peers`];
  if (r < 0.72) return ["CORE", `scanning ${CHAIN.name} mempool for alpha`];
  if (r < 0.86) return ["MOD", `indexed new pool ${pick(TOKENS)}/WETH on ${CHAIN.name}`];
  return ["CHAIN", `${5 + Math.floor(Math.random() * 90)} swaps routed via Uniswap V3`];
}

export type Metrics = { load: number; mem: number; cpu: number };
const walk = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v + (Math.random() - 0.5) * 8));

function respond(cmd: string): [LogTag, string][] {
  const [base, ...a] = cmd.trim().toLowerCase().split(/\s+/);
  switch (base) {
    case "": return [];
    case "help": return [["SYS", "commands: status · network · block · gas · modules · peers · about · whoami · clear"]];
    case "status": return [["INFO", "all systems operational · uptime nominal · agent online"]];
    case "network": case "net": return [["NET", `${CHAIN.name} · chainId ${CHAIN.id} · connected · L2 (Arbitrum stack)`]];
    case "block": return [["CHAIN", `head block #${(21_400_000 + Math.floor(Math.random() * 9000)).toLocaleString()} · finalized`]];
    case "gas": return [["NET", `base fee ${(0.001 + Math.random() * 0.02).toFixed(4)} gwei on ${CHAIN.name}`]];
    case "modules": case "mod": return [["MOD", "indexer · router · oracle · watcher · roaster · x12 online"]];
    case "peers": return [["NET", `${20 + Math.floor(Math.random() * 40)} peers connected across the Robinhood network`]];
    case "about": return [["INFO", "UNIA — the first agent on Uniswap, living on the Robinhood network."]];
    case "whoami": return [["USER", `visitor@robinhood · guest access · welcome, ${a[0] || "degen"}`]];
    case "clear": return [["__clear__" as LogTag, ""]];
    case "gm": return [["USER", "gm. the network never sleeps and neither do i."]];
    default: return [["SYS", `command not found: ${base} · type 'help'`]];
  }
}

export function useTerminal() {
  const [, force] = useReducer((x) => x + 1, 0);
  const idRef = useRef(1);
  const logs = useRef<Log[]>([]);
  const metrics = useRef<Metrics>({ load: 74, mem: 68, cpu: 82 });
  const startRef = useRef(Date.now() - 42 * 86400_000 - 17 * 3600_000 - 36 * 60_000);
  const booted = useRef(false);

  const push = useCallback((tag: LogTag, text: string) => {
    if ((tag as string) === "__clear__") { logs.current = []; return; }
    logs.current = [...logs.current.slice(-120), { id: idRef.current++, t: clock(), tag, text }];
  }, []);

  // boot once
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    let i = 0;
    const step = () => {
      if (i < BOOT.length) { push(BOOT[i][0], BOOT[i][1]); i++; force(); setTimeout(step, 180); }
    };
    step();
  }, [push]);

  // live loop
  useEffect(() => {
    const id = setInterval(() => {
      const [tag, text] = liveLog();
      push(tag, text);
      const m = metrics.current;
      metrics.current = { load: walk(m.load, 55, 92), mem: walk(m.mem, 50, 88), cpu: walk(m.cpu, 60, 96) };
      force();
    }, 1500);
    return () => clearInterval(id);
  }, [push]);

  const run = useCallback((cmd: string) => {
    push("USER", `$ ${cmd}`);
    respond(cmd).forEach(([tag, text]) => push(tag, text));
    force();
  }, [push]);

  const uptime = () => {
    const s = Math.floor((Date.now() - startRef.current) / 1000);
    const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60);
    return `${d}d ${h}h ${m}m`;
  };

  return { logs: logs.current, metrics: metrics.current, uptime: uptime(), run };
}

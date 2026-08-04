"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { site, robinhoodChain, isPlaceholderAddr, explorerToken } from "@/lib/config";

type Line = { kind: "in" | "out"; node: ReactNode };

const HELP: [string, string][] = [
  ["help", "list available commands"],
  ["about", "what is this project"],
  ["token", "token details + contract"],
  ["buy", "buy the token on Pons"],
  ["roadmap", "the plan"],
  ["socials", "where to find us"],
  ["ls / cat <file>", "browse the filesystem"],
  ["whoami", "who are you"],
  ["clear", "clear the screen"],
];

function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-stonk-green underline underline-offset-2 hover:text-stonk-bright">
      {children}
    </a>
  );
}

export function Console() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", node: <span className="text-stonk-muted">type <span className="text-stonk-green">help</span> to begin. try <span className="text-stonk-green">about</span>, <span className="text-stonk-green">token</span>, or <span className="text-stonk-green">buy</span>.</span> },
  ]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  function push(nodes: ReactNode[]) {
    setLines((l) => [...l, ...nodes.map((node) => ({ kind: "out" as const, node }))]);
  }

  function run(raw: string) {
    const cmd = raw.trim();
    setLines((l) => [
      ...l,
      { kind: "in", node: <span>{cmd}</span> },
    ]);
    if (!cmd) return;
    setHist((h) => [cmd, ...h]);

    const [base, ...args] = cmd.toLowerCase().split(/\s+/);
    switch (base) {
      case "help":
        push([
          <span key="h" className="text-stonk-bright">available commands:</span>,
          ...HELP.map(([c, d], i) => (
            <span key={i}>
              <span className="text-stonk-green">{c.padEnd(16)}</span>
              <span className="text-stonk-muted">{d}</span>
            </span>
          )),
        ]);
        break;
      case "about":
        push([
          <span key="1" className="text-stonk-bright">{site.name} — {site.tagline}</span>,
          <span key="2">{site.description}</span>,
        ]);
        break;
      case "token":
      case "cat": {
        if (base === "cat" && args[0] && args[0] !== "token.json" && args[0] !== "token") {
          if (args[0] === "about.md") return void push([<span key="a">{site.description}</span>]);
          if (args[0] === "roadmap.log") return void run("roadmap");
          return void push([<span key="e" className="text-stonk-red">cat: {args[0]}: no such file</span>]);
        }
        const addr = isPlaceholderAddr(site.token.address)
          ? <span className="text-stonk-amber">pending — launch on Pons</span>
          : <Link href={explorerToken(site.token.address)}>{site.token.address}</Link>;
        push([
          <span key="t0" className="text-stonk-bright">{"{"}</span>,
          <span key="t1">  ticker:   <span className="text-stonk-green">{site.ticker}</span></span>,
          <span key="t2">  supply:   {site.token.supply}</span>,
          <span key="t3">  chain:    {robinhoodChain.name} (#{robinhoodChain.id})</span>,
          <span key="t4">  launchpad: Pons</span>,
          <span key="t5">  status:   {site.token.launched ? <span className="text-stonk-green">LIVE</span> : <span className="text-stonk-amber">pending</span>}</span>,
          <span key="t6">  contract: {addr}</span>,
          <span key="t7" className="text-stonk-bright">{"}"}</span>,
        ]);
        break;
      }
      case "buy":
      case "./buy":
        if (site.token.launched) {
          push([<span key="b">opening Pons… <Link href={site.token.ponsUrl}>buy {site.ticker} on Pons ↗</Link></span>]);
          window.open(site.token.ponsUrl, "_blank");
        } else {
          push([<span key="b" className="text-stonk-amber">{site.ticker} is not live yet. it launches on Pons — stay tuned.</span>]);
        }
        break;
      case "roadmap":
        push([
          <span key="r0" className="text-stonk-bright">roadmap.log</span>,
          <span key="r1"><span className="text-stonk-green">[done]</span> phase 0 — terminal boots</span>,
          <span key="r2"><span className="text-stonk-amber">[live]</span> phase 1 — launch {site.ticker} on Pons</span>,
          <span key="r3"><span className="text-stonk-muted">[   ]</span> phase 2 — liquidity + community</span>,
          <span key="r4"><span className="text-stonk-muted">[   ]</span> phase 3 — ??? (classified)</span>,
        ]);
        break;
      case "socials":
        push([
          <span key="s1">x/twitter: <Link href={site.socials.twitter}>{site.socials.twitter}</Link></span>,
          <span key="s2">telegram:  <Link href={site.socials.telegram}>{site.socials.telegram}</Link></span>,
          <span key="s3">docs:      <Link href={site.socials.docs}>{site.socials.docs}</Link></span>,
        ]);
        break;
      case "ls":
        push([<span key="l"><span className="text-stonk-green">about.md  token.json  roadmap.log</span>  <span className="text-stonk-muted">secrets/</span></span>]);
        break;
      case "whoami":
        push([<span key="w">{site.host} — an early terminal dweller. welcome.</span>]);
        break;
      case "pons":
        push([<span key="p">Pons is a non-custodial launchpad on {robinhoodChain.name}. {site.name}&apos;s token launches there. <Link href={site.token.ponsUrl}>open Pons ↗</Link></span>]);
        break;
      case "sudo":
        push([<span key="su" className="text-stonk-red">permission denied: nice try.</span>]);
        break;
      case "clear":
        setLines([]);
        break;
      case "banner":
        push([<span key="bn" className="text-stonk-green glow whitespace-pre text-lg font-bold">┌─[ {site.name} ]─┐{"\n"}└─ launched on Pons ─┘</span>]);
        break;
      default:
        push([<span key="d" className="text-stonk-red">command not found: {base}. type <span className="text-stonk-green">help</span>.</span>]);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(input);
      setInput("");
      setHi(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(hi + 1, hist.length - 1);
      if (n >= 0) { setHi(n); setInput(hist[n]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = Math.max(hi - 1, -1);
      setHi(n);
      setInput(n === -1 ? "" : hist[n]);
    }
  }

  return (
    <div
      className="win overflow-hidden cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="win-bar flex items-center gap-2 px-3 py-2">
        <span className="dot bg-stonk-red" />
        <span className="dot bg-stonk-amber" />
        <span className="dot bg-stonk-green" />
        <span className="ml-3 text-xs text-stonk-muted truncate">{site.host}: ~/console — zsh</span>
      </div>
      <div className="p-4 h-[46vh] min-h-[320px] overflow-y-auto no-scrollbar text-sm leading-relaxed">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {l.kind === "in" ? (
              <span>
                <span className="text-stonk-green glow-soft">{site.host}</span>
                <span className="text-stonk-muted">:~$ </span>
                {l.node}
              </span>
            ) : (
              <span className="text-stonk-bright">{l.node}</span>
            )}
          </div>
        ))}
        {/* live input line */}
        <div className="flex items-center">
          <span className="text-stonk-green glow-soft">{site.host}</span>
          <span className="text-stonk-muted">:~$&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            className="flex-1 bg-transparent outline-none text-stonk-bright caret-[#3bff88]"
            aria-label="terminal input"
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}

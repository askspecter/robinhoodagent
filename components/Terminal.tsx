"use client";

import { useMemo, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { ConnectButton } from "./ConnectButton";
import { CopyCA } from "./CopyCA";
import { site, robinhoodChain, isPlaceholderAddr } from "@/lib/config";
import { robinhood } from "@/lib/chain";

const TABS = ["Buy", "Stats", "Mint"] as const;
type Tab = (typeof TABS)[number];

const STATS: [string, string][] = [
  ["Ticker", site.ticker],
  ["Supply", site.token.supply],
  ["Chain", `${robinhoodChain.name} (#${robinhoodChain.id})`],
  ["Launchpad", "Pons"],
  ["Liquidity", "Locked"],
  ["Market cap", "$4.20M"],
];

function Field({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="box p-4">
      <div className="text-xs text-stonk-muted uppercase tracking-[0.12em]">{label}</div>
      <div className={`${big ? "text-3xl" : "text-xl"} mt-2 text-stonk-green`}>{value}</div>
    </div>
  );
}

const MINT_ABI = [
  { type: "function", name: "mint", stateMutability: "payable", inputs: [{ name: "quantity", type: "uint256" }], outputs: [] },
] as const;

export function Terminal() {
  const [tab, setTab] = useState<Tab>("Stats");
  const placeholder = isPlaceholderAddr(site.token.address);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Logo */}
      <h1 className="font-pixel text-5xl sm:text-7xl leading-[0.95] text-stonk-green glow break-words">
        {site.name}
      </h1>
      <p className="mt-4 text-sm uppercase tracking-[0.2em] text-stonk-muted">{site.tagline}</p>

      {/* Connect */}
      <div className="mt-6">
        <ConnectButton variant="sidebar" />
      </div>

      {/* Tabs */}
      <div className="mt-8 grid grid-cols-3">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`tab py-3 text-sm ${tab === t ? "tab-active" : ""}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="box border-t-0 p-5 sm:p-6">
        {tab === "Stats" && <StatsTab />}
        {tab === "Buy" && <BuyTab placeholder={placeholder} />}
        {tab === "Mint" && <MintTab />}
      </div>

      {/* Copyright */}
      <p className="mt-8 text-xs text-stonk-muted uppercase tracking-[0.14em]">
        {site.company} (c) 20xx — productivity is paramount.
      </p>
    </div>
  );
}

/* ------------------------------ Stats ------------------------------ */
function StatsTab() {
  return (
    <div>
      <h2 className="text-lg text-stonk-green uppercase tracking-[0.14em]">{site.name} stats</h2>
      <hr className="hr my-4" />
      <div className="grid sm:grid-cols-2 gap-3">
        {STATS.map(([k, v]) => (
          <Field key={k} label={k} value={v} />
        ))}
      </div>
      <p className="mt-4 text-xs text-stonk-muted">* Illustrative — wire to an on-chain indexer for live figures.</p>
    </div>
  );
}

/* ------------------------------ Buy ------------------------------ */
function BuyTab({ placeholder }: { placeholder: boolean }) {
  const STEPS = [
    ["01", `Get ETH on ${robinhoodChain.name}`, "Bridge or transfer a little ETH for gas + your buy."],
    ["02", `Open Pons`, `Head to the ${site.ticker} page on the Pons launchpad.`],
    ["03", "Swap into " + site.ticker, "Confirm the swap — liquidity is locked, straight into Uniswap V3."],
  ];
  return (
    <div>
      <h2 className="text-lg text-stonk-green uppercase tracking-[0.14em]">Buy {site.ticker}</h2>
      <hr className="hr my-4" />

      <div className="box p-4 mb-4">
        <div className="text-xs text-stonk-muted uppercase tracking-[0.12em] mb-2">{site.ticker} contract</div>
        <div className="text-sm break-all text-stonk-green">{site.token.address}</div>
        {placeholder && <div className="text-[11px] text-stonk-blue mt-2">Placeholder — replace after launching on Pons.</div>}
        <div className="flex flex-wrap gap-2 mt-3">
          <CopyCA value={site.token.address} />
          <a href={`${robinhoodChain.explorerUrl}/token/${site.token.address}`} target="_blank" rel="noreferrer" className="btn px-4 py-2 text-xs">Explorer ↗</a>
        </div>
      </div>

      <ol className="space-y-3">
        {STEPS.map(([n, t, d]) => (
          <li key={n} className="flex gap-3">
            <span className="text-stonk-green">{n}.</span>
            <div><span className="text-stonk-bright">{t}</span><span className="text-stonk-muted"> — {d}</span></div>
          </li>
        ))}
      </ol>

      <a
        href={site.token.launched ? site.token.ponsUrl : undefined}
        target={site.token.launched ? "_blank" : undefined}
        rel="noreferrer"
        onClick={(e) => !site.token.launched && e.preventDefault()}
        className={`btn ${site.token.launched ? "btn-solid" : "opacity-60 cursor-not-allowed"} block text-center py-3 mt-5 text-sm`}
      >
        {site.token.launched ? `Buy ${site.ticker} on Pons ↗` : `${site.ticker} — coming soon on Pons`}
      </a>
    </div>
  );
}

/* ------------------------------ Mint ------------------------------ */
function MintTab() {
  const { isConnected, chainId } = useAccount();
  const [qty, setQty] = useState(1);
  const contract = "0x0000000000000000000000000000000000000000";
  const isDemo = true;
  const wrongChain = isConnected && chainId !== robinhood.id;
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: confirming } = useWaitForTransactionReceipt({ hash });
  const pct = useMemo(() => 100, []);

  return (
    <div>
      <h2 className="text-lg text-stonk-green uppercase tracking-[0.14em]">Mint a pass</h2>
      <hr className="hr my-4" />
      <div className="text-sm text-stonk-muted">Price per pass: <span className="text-stonk-green">0.0042 ETH</span></div>

      <div className="flex items-center gap-4 mt-4">
        <button className="box w-11 h-11 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
        <span className="text-xl w-8 text-center">{qty}</span>
        <button className="box w-11 h-11 text-lg" onClick={() => setQty((q) => q + 1)}>+</button>
        <span className="text-sm text-stonk-muted">Total: {(0.0042 * qty).toFixed(4)} ETH</span>
      </div>

      <div className="box h-6 mt-5 p-1">
        <div className="h-full bg-stonk-green" style={{ width: `${pct}%` }} />
      </div>
      <div className="text-sm text-stonk-muted mt-2">1000 / 1000 minted</div>

      <div className="dashed-blue p-4 mt-5 text-sm">
        <div className="text-stonk-blue uppercase tracking-wider font-bold">Mint is closed — supply sold out.</div>
        <p className="text-stonk-muted mt-2">The token still launches on Pons. Grab {site.ticker} there and you&apos;re in.</p>
      </div>

      <div className="mt-4">
        {!isConnected ? (
          <ConnectButton />
        ) : (
          <button className="btn btn-solid w-full py-3 text-sm" disabled>
            {wrongChain ? "Switch to Robinhood Chain" : confirming ? "Confirming…" : isPending ? "Check wallet…" : isDemo ? "Minted out" : `Mint ${qty}`}
          </button>
        )}
      </div>
    </div>
  );
}

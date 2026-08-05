"use client";

import type { PassState } from "@/lib/unia/useUniaPass";
import type { SectionKey } from "@/lib/unia/terminal";
import { robinhoodChain, UNIA, SOCIALS, explorerTx } from "@/lib/config";

/* ------------------------------ helpers ------------------------------ */
const short = (a: string) => (a ? `${a.slice(0, 6)}…${a.slice(-4)}` : "");
const unia = (n: number) => {
  if (n >= 1e6) return (n / 1e6).toLocaleString("en-US", { maximumFractionDigits: 2 }) + "M";
  if (n >= 1e3) return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
};

function Box({ mark, title, right, children }: { mark: string; title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="box">
      <div className="px-4 py-2.5 border-b border-uni-line flex items-center justify-between text-sm">
        <span className="text-uni-green tracking-wide">{mark} {title}</span>
        {right}
      </div>
      <div className="p-4 text-sm">{children}</div>
    </div>
  );
}

const Row = ({ k, v }: { k: string; v: React.ReactNode }) => (
  <div className="flex gap-2 sm:gap-3">
    <span className="text-uni-muted w-28 sm:w-32 shrink-0">{k}</span>
    <span className="text-uni-muted shrink-0">:</span>
    <span className="text-uni-text min-w-0 break-words">{v}</span>
  </div>
);

/* ---------------------------- wallet chip ---------------------------- */
export function WalletChip({ pass }: { pass: PassState }) {
  if (!pass.connected)
    return (
      <button onClick={pass.connect} className="btn px-3 py-1.5 text-xs" aria-label="connect wallet">
        connect
      </button>
    );
  return (
    <button onClick={pass.disconnect} className="btn px-3 py-1.5 text-xs normal-case" title={pass.address} aria-label="disconnect">
      {short(pass.address)} · {unia(pass.unia)} $UNIA
    </button>
  );
}

/* ------------------------------ pass card ---------------------------- */
function PassCard({ pass }: { pass: PassState }) {
  const dim = pass.owned ? "" : "opacity-60";
  return (
    <div className={`relative border border-uni-green/60 rounded-lg overflow-hidden ${dim}`} style={{ background: "rgba(126,203,60,0.05)" }}>
      <div className="px-4 py-3 flex items-center justify-between border-b border-uni-line">
        <span className="text-uni-green tracking-widest text-sm">UNIA PASS</span>
        <span className="text-uni-muted text-xs">ROBINHOOD · #{robinhoodChain.id}</span>
      </div>
      <div className="px-4 py-6">
        <pre className="text-uni-green leading-none select-none" style={{ fontSize: "clamp(10px,3vw,20px)", margin: 0 }}>{String.raw`  /\
 <  >   UNIA
  \/    PASS`}</pre>
      </div>
      <div className="px-4 py-3 border-t border-uni-line flex items-center justify-between text-xs">
        <span className="text-uni-muted">{pass.owned ? "holder" : "preview"}</span>
        <span className="text-uni-text">{pass.owned ? short(pass.address) : `${UNIA.pass.supply.toLocaleString()} supply`}</span>
      </div>
    </div>
  );
}

/* -------------------------------- NFT -------------------------------- */
export function NftSection({ pass, goto }: { pass: PassState; goto: (k: SectionKey) => void }) {
  const free = pass.isHolder;
  return (
    <section className="grid lg:grid-cols-2 gap-6 items-start">
      <div className="min-w-0"><PassCard pass={pass} /></div>

      <Box
        mark="◆"
        title="MINT UNIA PASS"
        right={<span className={`text-[11px] ${pass.onchain ? "text-uni-green" : "text-uni-muted"}`}>{pass.onchain ? "on-chain" : "paper"}</span>}
      >
        <div className="space-y-3">
          <p className="text-uni-muted leading-snug">
            Hold <span className="text-uni-green">5,000,000 $UNIA</span> → mint <span className="text-uni-green">FREE</span>.
            Otherwise public mint is <span className="text-uni-green">0.005 ETH</span> on Robinhood Chain.
          </p>

          {!pass.connected ? (
            <button onClick={pass.connect} className="btn btn-solid w-full py-3">connect wallet to mint</button>
          ) : pass.owned ? (
            <div className="space-y-2">
              <div className="text-uni-green">✓ UNIA PASS minted {pass.freeMinted ? "(free · holder)" : "(0.005 ETH)"}</div>
              {pass.mintTx && (
                <a href={explorerTx(pass.mintTx)} target="_blank" rel="noreferrer" className="text-uni-muted hover:text-uni-green break-all text-xs">
                  tx: {pass.mintTx.slice(0, 18)}… ↗
                </a>
              )}
              <div className="text-uni-text">premium unlocked · rewards streaming.</div>
              <button onClick={() => goto("rewards")} className="btn w-full py-2.5">open rewards →</button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-1">
                <Row k="wallet" v={<span title={pass.address}>{short(pass.address)}{pass.isReal ? "" : " (sim)"}</span>} />
                {pass.isReal && pass.ethBalance != null && (
                  <Row k="ETH" v={`${Number(pass.ethBalance).toFixed(4)} ETH`} />
                )}
                <Row k="$UNIA held" v={<span className={free ? "text-uni-green" : ""}>{unia(pass.unia)}</span>} />
                <Row k="your price" v={free ? <span className="text-uni-green">FREE (holder)</span> : "0.005 ETH"} />
              </div>
              <button onClick={pass.mint} disabled={pass.minting} className="btn btn-solid w-full py-3 disabled:opacity-60">
                {pass.minting ? "minting…" : free ? "mint free" : "mint · 0.005 ETH"}
              </button>
              {!free && pass.canAirdrop && (
                <button onClick={pass.airdrop} className="btn w-full py-2 text-xs">sim: airdrop 5M $UNIA (test free mint)</button>
              )}
            </div>
          )}

          <div className="pt-2 border-t border-uni-line space-y-1 text-xs text-uni-muted">
            <div>utility · holders earn <span className="text-uni-green">{UNIA.pass.rewardPerDay} $UNIA</span> / day</div>
            <div>utility · unlocks <span className="text-uni-green">premium</span> — PRO signals, priority feed, voice</div>
          </div>
        </div>
      </Box>
    </section>
  );
}

/* ------------------------------ Rewards ------------------------------ */
const PRO = [
  "PRO · rotation into majors before the herd notices.",
  "PRO · MOG accumulation zone flagged. horn tingling.",
  "PRO · liquidity thinning on the short side. squeeze setup.",
  "PRO · alpha: buy fear, sell euphoria, tip the unicorn.",
];

export function RewardsSection({ pass, goto }: { pass: PassState; goto: (k: SectionKey) => void }) {
  if (!pass.owned) {
    return (
      <Box mark="★" title="REWARDS · PREMIUM" right={<span className="text-[11px] text-uni-down">locked</span>}>
        <div className="space-y-3">
          <p className="text-uni-muted">Rewards and premium are gated by the <span className="text-uni-green">UNIA PASS</span>. Mint one to start streaming <span className="text-uni-green">$UNIA</span> and unlock PRO features.</p>
          <button onClick={() => goto("nft")} className="btn btn-solid w-full py-3">mint a UNIA PASS →</button>
        </div>
      </Box>
    );
  }
  return (
    <section className="grid lg:grid-cols-2 gap-6 items-start">
      <Box mark="★" title="$UNIA REWARDS" right={<span className="text-[11px] text-uni-green flex items-center gap-1.5"><span className="dot bg-uni-green animate-[blink_1.4s_step-end_infinite]" /> streaming</span>}>
        <div className="space-y-3">
          <div>
            <div className="text-uni-muted text-xs">claimable</div>
            <div className="text-uni-green text-2xl leading-tight">{pass.rewards.toFixed(2)} <span className="text-sm">$UNIA</span></div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-uni-muted">rate <span className="text-uni-text">{pass.rewardPerDay} $UNIA / day</span></span>
            <span className="text-uni-muted">balance <span className="text-uni-text">{unia(pass.unia)} $UNIA</span></span>
          </div>
          <button onClick={pass.claim} disabled={pass.rewards < 1} className="btn btn-solid w-full py-2.5 disabled:opacity-60">claim $UNIA</button>
        </div>
      </Box>

      <Box mark="◈" title="PRO SIGNALS" right={<span className="text-[11px] text-uni-green">premium</span>}>
        <div className="space-y-1.5 text-uni-text">
          {PRO.map((p, i) => (
            <div key={i} className="leading-snug"><span className="text-uni-green">» </span>{p}</div>
          ))}
        </div>
      </Box>
    </section>
  );
}

/* -------------------------------- Docs ------------------------------- */
export function DocsSection() {
  const H = ({ children }: { children: React.ReactNode }) => <div className="text-uni-green tracking-wide pt-3 first:pt-0">{children}</div>;
  return (
    <Box mark="▤" title="DOCS" right={<span className="text-[11px] text-uni-muted">v1.0.0</span>}>
      <div className="space-y-2 leading-snug text-uni-muted max-w-3xl">
        <H># what is UNIA</H>
        <p>UNIA is the first agent on Uniswap — an autonomous unicorn that trades a paper book live, thinks out loud, and roasts your wallet. She lives on <span className="text-uni-text">Robinhood Chain (#{robinhoodChain.id})</span>.</p>
        <H># $UNIA</H>
        <p>The native reward token. Hold <span className="text-uni-text">5,000,000 $UNIA</span> to mint the UNIA PASS for free. Rewards stream to Pass holders and can be claimed on-chain.</p>
        <H># UNIA PASS (NFT)</H>
        <p>Mint is FREE for 5M+ $UNIA holders, otherwise <span className="text-uni-text">0.005 ETH</span> on Robinhood Chain. Supply {UNIA.pass.supply.toLocaleString()}. Holding a Pass streams <span className="text-uni-text">{UNIA.pass.rewardPerDay} $UNIA/day</span> and unlocks premium — PRO signals, priority feed, and the voice module.</p>
        <H># socials</H>
        <p className="flex flex-wrap gap-4">
          <a href={SOCIALS.x} target="_blank" rel="noreferrer" className="text-uni-text hover:text-uni-green">X · @uniadotsh ↗</a>
          <a href={SOCIALS.telegram} target="_blank" rel="noreferrer" className="text-uni-text hover:text-uni-green">Telegram · t.me/uniash ↗</a>
        </p>
        <H># disclaimer</H>
        <p>Paper-trading art project. Not financial advice. Not affiliated with Uniswap Labs or Robinhood Markets, Inc.</p>
      </div>
    </Box>
  );
}

/* ------------------------------ Network ------------------------------ */
export function NetworkSection() {
  return (
    <Box mark="▚" title="NETWORK" right={<span className="text-[11px] text-uni-green flex items-center gap-1.5"><span className="dot bg-uni-green" /> connected</span>}>
      <div className="space-y-2">
        <Row k="chain" v="Robinhood Chain" />
        <Row k="chainId" v={`${robinhoodChain.id}`} />
        <Row k="currency" v={robinhoodChain.nativeCurrency.symbol} />
        <Row k="rpc" v={robinhoodChain.rpcUrl} />
        <Row k="explorer" v={<a className="hover:text-uni-green" href={robinhoodChain.explorerUrl} target="_blank" rel="noreferrer">{robinhoodChain.explorerUrl} ↗</a>} />
        <div className="text-uni-green pt-1">&gt; Unia is live on Robinhood Chain.</div>
      </div>
    </Box>
  );
}

/* ---------------------------- Developers ----------------------------- */
export function DevsSection() {
  return (
    <Box mark="◇" title="DEVELOPERS" right={<span className="text-[11px] text-uni-muted">API</span>}>
      <div className="space-y-2">
        <Row k="$UNIA token" v={<span className="break-all">{UNIA.token.address}</span>} />
        <Row k="UNIA PASS" v={<span className="break-all">{UNIA.pass.address}</span>} />
        <Row k="chainId" v={`${robinhoodChain.id}`} />
        <div className="pt-2">
          <div className="text-uni-muted text-xs mb-1">read the pass gate:</div>
          <pre className="box p-3 text-xs overflow-x-auto no-scrollbar text-uni-text">{String.raw`const bal = await unia.balanceOf(user)
const free = bal >= 5_000_000n * 10n**18n
const price = free ? 0n : parseEther("0.005")
await pass.mint({ value: price }) // Robinhood Chain #4663`}</pre>
        </div>
      </div>
    </Box>
  );
}

/* ------------------------------- Exit -------------------------------- */
export function ExitSection({ pass, goto }: { pass: PassState; goto: (k: SectionKey) => void }) {
  return (
    <Box mark="⏻" title="EXIT">
      <div className="space-y-3">
        <p className="text-uni-muted">session paused. the unicorn keeps trading without you — she always does.</p>
        <div className="flex gap-3">
          <button onClick={() => { pass.disconnect(); goto("terminal"); }} className="btn py-2.5 px-4">disconnect</button>
          <button onClick={() => goto("terminal")} className="btn btn-solid py-2.5 px-4">re-enter terminal</button>
        </div>
      </div>
    </Box>
  );
}

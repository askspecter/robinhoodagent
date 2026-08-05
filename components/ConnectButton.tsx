"use client";

import { useState } from "react";
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";
import { usePrivy } from "@privy-io/react-auth";
import { robinhood } from "@/lib/chain";
import { robinhoodChain } from "@/lib/config";
import { privyEnabled } from "@/lib/wagmi";

type Variant = "compact" | "sidebar";

const short = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;

const WalletIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M16 12h.01M2 9h20" /></svg>
);
const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 6 10 7 10-7" /></svg>
);

function NotConnected({ onLogin, onEmail, variant, loading }: { onLogin: () => void; onEmail?: () => void; variant: Variant; loading?: boolean }) {
  if (variant === "sidebar") {
    return (
      <div className="space-y-3">
        <button className="btn btn-lime w-full py-3 text-sm flex items-center justify-center gap-2" onClick={onLogin} disabled={loading}>
          <WalletIcon /> {loading ? "Connecting…" : "Connect Wallet"}
        </button>
        <button className="w-full py-1 text-sm text-stonk-muted hover:text-stonk-bright flex items-center justify-center gap-2 uppercase tracking-wider" onClick={onEmail ?? onLogin}>
          <MailIcon /> Email sign in
        </button>
      </div>
    );
  }
  return (
    <button className="btn btn-lime px-4 py-2 text-sm" onClick={onLogin} disabled={loading}>
      {loading ? "…" : "Connect Wallet"}
    </button>
  );
}

/* ------------------------------ Privy ------------------------------ */
function PrivyConnect({ variant }: { variant: Variant }) {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const address = user?.wallet?.address;
  const email = user?.email?.address;
  const label = address ? short(address) : email || "Account";
  if (!ready) return <span className="text-stonk-muted text-sm">…</span>;
  if (!authenticated) return <NotConnected onLogin={login} variant={variant} />;
  return <Account label={label} address={address} onDisconnect={logout} variant={variant} />;
}

/* --------------------------- Injected fallback --------------------------- */
function InjectedConnect({ variant }: { variant: Variant }) {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const wrongChain = isConnected && chainId !== robinhood.id;
  const injected = connectors[0];

  async function addChain() {
    try {
      await (window as any).ethereum?.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x" + robinhood.id.toString(16),
          chainName: robinhoodChain.name,
          nativeCurrency: robinhoodChain.nativeCurrency,
          rpcUrls: [robinhoodChain.rpcUrl],
          blockExplorerUrls: [robinhoodChain.explorerUrl],
        }],
      });
    } catch { switchChain?.({ chainId: robinhood.id }); }
  }

  if (!isConnected) {
    return <NotConnected onLogin={() => injected && connect({ connector: injected })} variant={variant} loading={isPending} />;
  }
  if (wrongChain) {
    return (
      <button className={`btn btn-solid text-sm ${variant === "sidebar" ? "w-full py-3" : "px-4 py-2"}`} onClick={addChain}>
        Switch to Robinhood Chain
      </button>
    );
  }
  return <Account label={address ? short(address) : ""} address={address} onDisconnect={disconnect} variant={variant} />;
}

/* ----------------------------- Connected ----------------------------- */
function Account({ label, address, onDisconnect, variant }: { label: string; address?: string; onDisconnect: () => void; variant: Variant; }) {
  const [open, setOpen] = useState(false);
  const { data: balance } = useBalance({ address: address as `0x${string}` | undefined });
  const bal = balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : "—";

  if (variant === "sidebar") {
    return (
      <div className="inset p-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-stonk-green" />
          <span className="text-stonk-bright">{label}</span>
        </div>
        <div className="text-stonk-muted mt-2 text-xs">{bal}</div>
        <button className="btn w-full py-2 text-xs mt-3" onClick={onDisconnect}>Disconnect</button>
      </div>
    );
  }
  return (
    <div className="relative">
      <button className="btn px-3 py-2 text-sm flex items-center gap-2" onClick={() => setOpen((v) => !v)}>
        <span className="h-2 w-2 rounded-full bg-stonk-green" />{label}
      </button>
      {open && (
        <div className="panel absolute right-0 mt-2 w-56 p-3 z-50 text-sm">
          <div className="text-stonk-muted text-xs mb-1">Balance</div>
          <div className="mb-3 text-stonk-bright">{bal}</div>
          {address && <a className="btn block text-center py-2 mb-2 text-xs" href={`${robinhoodChain.explorerUrl}/address/${address}`} target="_blank" rel="noreferrer">Explorer ↗</a>}
          <button className="btn w-full py-2 text-xs" onClick={onDisconnect}>Disconnect</button>
        </div>
      )}
    </div>
  );
}

export function ConnectButton({ variant = "compact" }: { variant?: Variant }) {
  return privyEnabled ? <PrivyConnect variant={variant} /> : <InjectedConnect variant={variant} />;
}

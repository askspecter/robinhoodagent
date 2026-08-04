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

function short(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

const WalletIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M16 12h.01M2 9h20" />
  </svg>
);
const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 6 10 7 10-7" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Privy mode                                                         */
/* ------------------------------------------------------------------ */
function PrivyConnect({ variant }: { variant: Variant }) {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const address = user?.wallet?.address;
  const email = user?.email?.address;
  const label = address ? short(address) : email || "Account";

  if (!ready) {
    return (
      <button className="btn-ghost px-4 py-2 text-sm w-full" disabled>
        Loading…
      </button>
    );
  }

  if (!authenticated) {
    if (variant === "sidebar") {
      return (
        <div className="space-y-3">
          <button
            className="btn-ghost w-full py-3 text-sm font-mono uppercase tracking-wider flex items-center justify-center gap-2"
            onClick={login}
          >
            <WalletIcon /> Connect Wallet
          </button>
          <button
            className="w-full text-sm font-mono uppercase tracking-wider text-stonk-muted hover:text-white flex items-center justify-center gap-2"
            onClick={login}
          >
            <MailIcon /> Email sign in
          </button>
        </div>
      );
    }
    return (
      <button className="btn-primary px-4 py-2 text-sm" onClick={login}>
        Connect Wallet
      </button>
    );
  }

  return <Account label={label} address={address} onDisconnect={logout} variant={variant} />;
}

/* ------------------------------------------------------------------ */
/*  Fallback mode (injected wallet, no Privy configured)               */
/* ------------------------------------------------------------------ */
function InjectedConnect({ variant }: { variant: Variant }) {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const wrongChain = isConnected && chainId !== robinhood.id;
  const injectedConnector = connectors[0];

  async function addChain() {
    try {
      await (window as any).ethereum?.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x" + robinhood.id.toString(16),
            chainName: robinhoodChain.name,
            nativeCurrency: robinhoodChain.nativeCurrency,
            rpcUrls: [robinhoodChain.rpcUrl],
            blockExplorerUrls: [robinhoodChain.explorerUrl],
          },
        ],
      });
    } catch {
      switchChain?.({ chainId: robinhood.id });
    }
  }

  if (!isConnected) {
    if (variant === "sidebar") {
      return (
        <button
          className="btn-ghost w-full py-3 text-sm font-mono uppercase tracking-wider flex items-center justify-center gap-2"
          disabled={isPending || !injectedConnector}
          onClick={() => injectedConnector && connect({ connector: injectedConnector })}
        >
          <WalletIcon /> {isPending ? "Connecting…" : "Connect Wallet"}
        </button>
      );
    }
    return (
      <button
        className="btn-primary px-4 py-2 text-sm"
        disabled={isPending || !injectedConnector}
        onClick={() => injectedConnector && connect({ connector: injectedConnector })}
      >
        {isPending ? "Connecting…" : "Connect Wallet"}
      </button>
    );
  }

  if (wrongChain) {
    return (
      <button
        className={`btn-primary text-sm ${variant === "sidebar" ? "w-full py-3" : "px-4 py-2"}`}
        onClick={addChain}
      >
        Switch to Robinhood Chain
      </button>
    );
  }

  return (
    <Account
      label={address ? short(address) : ""}
      address={address}
      onDisconnect={disconnect}
      variant={variant}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Shared "connected" view                                            */
/* ------------------------------------------------------------------ */
function Account({
  label,
  address,
  onDisconnect,
  variant,
}: {
  label: string;
  address?: string;
  onDisconnect: () => void;
  variant: Variant;
}) {
  const [open, setOpen] = useState(false);
  const { data: balance } = useBalance({
    address: address as `0x${string}` | undefined,
  });

  if (variant === "sidebar") {
    return (
      <div className="panel p-3 text-sm">
        <div className="flex items-center gap-2 font-mono">
          <span className="h-2 w-2 rounded-full bg-stonk-green animate-pulseGlow" />
          {label}
        </div>
        <div className="text-xs text-stonk-muted mt-2 font-mono">
          {balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : "—"}
        </div>
        <button
          className="btn-ghost w-full py-2 text-xs mt-3 uppercase tracking-wider"
          onClick={onDisconnect}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        className="btn-ghost px-3 py-2 text-sm font-mono flex items-center gap-2"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="h-2 w-2 rounded-full bg-stonk-green animate-pulseGlow" />
        {label}
      </button>
      {open && (
        <div className="panel absolute right-0 mt-2 w-56 p-3 z-50 text-sm">
          <div className="text-stonk-muted text-xs mb-1">Balance</div>
          <div className="font-mono mb-3">
            {balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : "—"}
          </div>
          {address && (
            <a
              className="btn-ghost block text-center py-2 mb-2 text-xs"
              href={`${robinhoodChain.explorerUrl}/address/${address}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Explorer
            </a>
          )}
          <button
            className="btn-ghost w-full py-2 text-xs text-stonk-red"
            onClick={onDisconnect}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export function ConnectButton({ variant = "compact" }: { variant?: Variant }) {
  return privyEnabled ? (
    <PrivyConnect variant={variant} />
  ) : (
    <InjectedConnect variant={variant} />
  );
}

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

type Variant = "compact" | "block";

const short = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;

/* ------------------------------ Privy ------------------------------ */
function PrivyConnect({ variant }: { variant: Variant }) {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const address = user?.wallet?.address;
  const email = user?.email?.address;
  const label = address ? short(address) : email || "session";

  if (!ready) {
    return <span className="text-stonk-muted text-sm">booting…</span>;
  }

  if (!authenticated) {
    if (variant === "block") {
      return (
        <div className="space-y-2 w-full">
          <button className="btn w-full py-3 text-sm text-left px-4" onClick={login}>
            <span className="text-stonk-green">$</span> connect --wallet
          </button>
          <button className="btn w-full py-3 text-sm text-left px-4" onClick={login}>
            <span className="text-stonk-green">$</span> auth --email
          </button>
        </div>
      );
    }
    return (
      <button className="btn px-3 py-2 text-sm" onClick={login}>
        <span className="text-stonk-green">$</span> login
      </button>
    );
  }
  return <Account label={label} address={address} onDisconnect={logout} variant={variant} />;
}

/* --------------------------- Injected (fallback) --------------------------- */
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
    if (variant === "block") {
      return (
        <div className="space-y-2 w-full">
          <button
            className="btn w-full py-3 text-sm text-left px-4"
            disabled={isPending || !injected}
            onClick={() => injected && connect({ connector: injected })}
          >
            <span className="text-stonk-green">$</span>{" "}
            {isPending ? "connecting…" : "connect --wallet"}
          </button>
          <div className="btn w-full py-3 text-sm text-left px-4 opacity-50 cursor-not-allowed">
            <span className="text-stonk-green">$</span> auth --email{" "}
            <span className="text-stonk-muted text-xs">(set PRIVY_APP_ID)</span>
          </div>
        </div>
      );
    }
    return (
      <button
        className="btn px-3 py-2 text-sm"
        disabled={isPending || !injected}
        onClick={() => injected && connect({ connector: injected })}
      >
        <span className="text-stonk-green">$</span> {isPending ? "…" : "connect"}
      </button>
    );
  }

  if (wrongChain) {
    return (
      <button className="btn btn-solid px-3 py-2 text-sm" onClick={addChain}>
        switch → Robinhood Chain
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

/* ----------------------------- Connected ----------------------------- */
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
  const { data: balance } = useBalance({ address: address as `0x${string}` | undefined });
  const bal = balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : "—";

  if (variant === "block") {
    return (
      <div className="win p-4 text-sm w-full">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-stonk-green animate-pulseGlow" />
          <span className="text-stonk-bright">{label}</span>
        </div>
        <div className="text-stonk-muted mt-2">balance: {bal}</div>
        <button className="btn w-full py-2 text-xs mt-3" onClick={onDisconnect}>
          $ logout
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button className="btn px-3 py-2 text-sm flex items-center gap-2" onClick={() => setOpen((v) => !v)}>
        <span className="h-2 w-2 rounded-full bg-stonk-green animate-pulseGlow" />
        {label}
      </button>
      {open && (
        <div className="win absolute right-0 mt-2 w-56 p-3 z-50 text-sm">
          <div className="text-stonk-muted text-xs mb-1">balance</div>
          <div className="mb-3 text-stonk-bright">{bal}</div>
          {address && (
            <a
              className="btn block text-center py-2 mb-2 text-xs"
              href={`${robinhoodChain.explorerUrl}/address/${address}`}
              target="_blank"
              rel="noreferrer"
            >
              view on explorer ↗
            </a>
          )}
          <button className="btn w-full py-2 text-xs" onClick={onDisconnect}>
            $ logout
          </button>
        </div>
      )}
    </div>
  );
}

export function ConnectButton({ variant = "compact" }: { variant?: Variant }) {
  return privyEnabled ? <PrivyConnect variant={variant} /> : <InjectedConnect variant={variant} />;
}

"use client";

import { useAccount, useBalance, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { useState } from "react";
import { robinhood } from "@/lib/chain";
import { robinhoodChain } from "@/lib/config";

function short(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function ConnectButton() {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { data: balance } = useBalance({ address });
  const [open, setOpen] = useState(false);

  const wrongChain = isConnected && chainId !== robinhood.id;

  // Tambah / pindah ke Robinhood Chain via wallet.
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
    const injectedConnector = connectors[0];
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
      <button className="btn-primary px-4 py-2 text-sm" onClick={addChain}>
        Switch to Robinhood Chain
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        className="btn-ghost px-3 py-2 text-sm font-mono flex items-center gap-2"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="h-2 w-2 rounded-full bg-stonk-green animate-pulseGlow" />
        {address ? short(address) : ""}
      </button>
      {open && (
        <div className="panel absolute right-0 mt-2 w-56 p-3 z-50 text-sm">
          <div className="text-stonk-muted text-xs mb-1">Balance</div>
          <div className="font-mono mb-3">
            {balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : "—"}
          </div>
          <a
            className="btn-ghost block text-center py-2 mb-2 text-xs"
            href={`${robinhoodChain.explorerUrl}/address/${address}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Explorer
          </a>
          <button
            className="btn-ghost w-full py-2 text-xs text-stonk-red"
            onClick={() => {
              disconnect();
              setOpen(false);
            }}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

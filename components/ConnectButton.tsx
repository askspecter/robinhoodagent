"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

const short = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const injected = connectors[0];

  if (isConnected && address) {
    return (
      <button className="pill px-4 py-2 text-sm flex items-center gap-2" onClick={() => disconnect()}>
        <span className="h-2 w-2 rounded-full bg-uni-up" /> {short(address)}
      </button>
    );
  }
  return (
    <button
      className="btn-pink px-5 py-2.5 text-sm"
      disabled={isPending || !injected}
      onClick={() => injected && connect({ connector: injected })}
    >
      {isPending ? "Connecting…" : "Connect Wallet"}
    </button>
  );
}

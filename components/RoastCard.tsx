"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { ConnectButton } from "./ConnectButton";
import { roast as makeRoast, pick } from "@/lib/unia/phrases";

export function RoastCard({ onRoast }: { onRoast: (lines: string[]) => void }) {
  const { address, isConnected } = useAccount();
  const { data: bal } = useBalance({ address });
  const [text, setText] = useState<string>("");
  const done = useRef<string>("");

  useEffect(() => {
    if (!isConnected || !address) { done.current = ""; setText(""); return; }
    const eth = bal ? Number(bal.formatted) : 0;
    const key = `${address}:${bal ? bal.value.toString() : "0"}`;
    if (done.current === key) return;
    done.current = key;
    const lines = makeRoast(address, eth);
    setText(pick(lines));
    onRoast(lines.slice(0, 2));
  }, [isConnected, address, bal, onRoast]);

  return (
    <div className="card p-5 relative overflow-hidden">
      <div className="absolute -right-6 -top-6 text-7xl opacity-10 select-none">🔥</div>
      <h3 className="text-sm font-semibold tracking-wide mb-3">GET ROASTED BY UNIA 🔥</h3>
      {!isConnected ? (
        <div>
          <p className="text-sm text-uni-muted mb-4">
            Connect your wallet and let a unicorn read you for filth. She has seen your kind before.
          </p>
          <ConnectButton />
        </div>
      ) : (
        <div>
          <p className="text-lg leading-snug grad-text font-semibold">“{text}”</p>
          <p className="text-xs text-uni-muted mt-3">
            balance: {bal ? `${Number(bal.formatted).toFixed(4)} ${bal.symbol}` : "…"} · she said it out loud too.
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { ConnectButton } from "./ConnectButton";
import { roast as makeRoast, pick } from "@/lib/unia/phrases";

export function RoastCard({ onRoast }: { onRoast: (lines: string[]) => void }) {
  const { address, isConnected } = useAccount();
  const { data: bal } = useBalance({ address });
  const [text, setText] = useState("");
  const done = useRef("");

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
    <div className="box-mag box">
      <div className="bar px-4 py-2 text-xs text-uni-muted" style={{ borderColor: "rgba(255,46,136,0.25)" }}>
        unia@degen:~ # ./roast --wallet
      </div>
      <div className="p-5">
        {!isConnected ? (
          <div>
            <p className="text-sm text-uni-muted mb-4">
              connect a wallet and let the unicorn read your balance for filth. she has seen your kind before.
            </p>
            <ConnectButton />
          </div>
        ) : (
          <div>
            <p className="text-lg leading-snug text-uni-pink glow-mag">&quot;{text}&quot;</p>
            <p className="text-xs text-uni-muted mt-3">
              bal: {bal ? `${Number(bal.formatted).toFixed(4)} ${bal.symbol}` : "…"} · she said it out loud too.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

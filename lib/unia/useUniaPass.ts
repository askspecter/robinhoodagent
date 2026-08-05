"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { UNIA } from "@/lib/config";

/**
 * Simulated UNIA PASS economy (paper / art project — no live contracts).
 * - connect a wallet (sim), read a $UNIA balance
 * - mint the Pass: FREE if you hold >= 5M $UNIA, else 0.005 ETH on Robinhood Chain
 * - holding the Pass streams $UNIA rewards and unlocks premium features
 */

const FREE_HOLD = UNIA.token.freeMintHold;        // 5,000,000
const PRICE_ETH = UNIA.pass.publicPriceEth;       // 0.005
const REWARD_DAY = UNIA.pass.rewardPerDay;        // 420 $UNIA / day / pass

const hex = (n: number) =>
  Array.from({ length: n }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
const randAddr = () => "0x" + hex(40);
const randTx = () => "0x" + hex(64);

type St = {
  connected: boolean;
  address: string;
  unia: number;        // $UNIA balance
  owned: boolean;      // holds a UNIA PASS
  minting: boolean;
  mintTx: string | null;
  freeMinted: boolean; // was the held pass minted for free
  rewards: number;     // claimable streamed rewards
};

const fresh = (): St => ({
  connected: false, address: "", unia: 0, owned: false,
  minting: false, mintTx: null, freeMinted: false, rewards: 0,
});

export function useUniaPass() {
  const [, force] = useReducer((x) => x + 1, 0);
  const st = useRef<St>(fresh());

  // stream rewards while a Pass is held
  useEffect(() => {
    const id = setInterval(() => {
      if (st.current.owned) {
        // paper stream — accrues visibly (≈ REWARD_DAY/60 per tick)
        st.current.rewards += REWARD_DAY / 60;
        force();
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const connect = useCallback(() => {
    const s = st.current;
    if (s.connected) return;
    s.connected = true;
    s.address = randAddr();
    // simulate an on-chain $UNIA balance (some wallets are whales)
    const r = Math.random();
    s.unia = Math.round((r < 0.35 ? 5_000_000 + r * 9_000_000 : r * 4_000_000));
    force();
  }, []);

  const disconnect = useCallback(() => {
    st.current = fresh();
    force();
  }, []);

  // demo faucet so the free-mint path is testable
  const airdrop = useCallback(() => {
    if (!st.current.connected) return;
    st.current.unia += FREE_HOLD;
    force();
  }, []);

  const mint = useCallback(() => {
    const s = st.current;
    if (!s.connected || s.owned || s.minting) return;
    const free = s.unia >= FREE_HOLD;
    s.minting = true;
    force();
    setTimeout(() => {
      s.owned = true;
      s.minting = false;
      s.freeMinted = free;
      s.mintTx = randTx();
      force();
    }, 1500);
  }, []);

  const claim = useCallback(() => {
    const s = st.current;
    if (s.rewards <= 0) return;
    s.unia += Math.floor(s.rewards);
    s.rewards = 0;
    force();
  }, []);

  const s = st.current;
  return {
    ...s,
    premium: s.owned,
    isHolder: s.unia >= FREE_HOLD,
    mintPriceEth: s.unia >= FREE_HOLD ? 0 : PRICE_ETH,
    freeHold: FREE_HOLD,
    priceEth: PRICE_ETH,
    rewardPerDay: REWARD_DAY,
    connect, disconnect, airdrop, mint, claim,
  };
}

export type PassState = ReturnType<typeof useUniaPass>;

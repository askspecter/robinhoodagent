import { defineChain } from "viem";
import { ethereumChain as cfg } from "./config";

/** viem chain definition for Ethereum mainnet (chainId 1) — Uniswap's home chain. */
export const mainnet = defineChain({
  id: cfg.id,
  name: cfg.name,
  nativeCurrency: cfg.nativeCurrency,
  rpcUrls: {
    default: { http: [cfg.rpcUrl] },
    public: { http: [cfg.rpcUrl] },
  },
  blockExplorers: {
    default: { name: "Etherscan", url: cfg.explorerUrl },
  },
});

import { defineChain } from "viem";
import { robinhoodChain as cfg } from "./config";

/** viem chain definition for Robinhood Chain (chainId 4663). */
export const robinhood = defineChain({
  id: cfg.id,
  name: cfg.name,
  nativeCurrency: cfg.nativeCurrency,
  rpcUrls: {
    default: { http: [cfg.rpcUrl] },
    public: { http: [cfg.rpcUrl] },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: cfg.explorerUrl },
  },
});

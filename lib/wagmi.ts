import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { robinhood } from "./chain";

/**
 * wagmi config — pakai injected connector (MetaMask / browser wallet).
 * Tidak butuh WalletConnect projectId, jadi self-contained.
 */
export const wagmiConfig = createConfig({
  chains: [robinhood],
  connectors: [injected({ shimDisconnect: true })],
  transports: {
    [robinhood.id]: http(robinhood.rpcUrls.default.http[0]),
  },
  ssr: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

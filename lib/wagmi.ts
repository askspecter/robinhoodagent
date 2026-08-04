import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { createConfig as createPrivyConfig } from "@privy-io/wagmi";
import { robinhood } from "./chain";

/** True kalau Privy dikonfigurasi (env var di-set saat build). */
export const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";
export const privyEnabled = privyAppId.length > 0;

/**
 * Config untuk mode Privy — Privy mengelola connector-nya sendiri,
 * jadi tidak perlu daftar `connectors` di sini.
 */
export const privyWagmiConfig = createPrivyConfig({
  chains: [robinhood],
  transports: {
    [robinhood.id]: http(robinhood.rpcUrls.default.http[0]),
  },
});

/**
 * Fallback ketika Privy belum dikonfigurasi: injected connector biasa
 * (MetaMask / browser wallet). Memastikan situs tetap jalan & deploy
 * sebelum NEXT_PUBLIC_PRIVY_APP_ID diisi.
 */
export const fallbackWagmiConfig = createConfig({
  chains: [robinhood],
  connectors: [injected({ shimDisconnect: true })],
  transports: {
    [robinhood.id]: http(robinhood.rpcUrls.default.http[0]),
  },
  ssr: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof privyWagmiConfig;
  }
}

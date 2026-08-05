"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider as PrivyWagmiProvider } from "@privy-io/wagmi";
import { WagmiProvider } from "wagmi";
import {
  privyAppId,
  privyEnabled,
  privyWagmiConfig,
  fallbackWagmiConfig,
} from "@/lib/wagmi";
import { robinhood } from "@/lib/chain";
import { InjectedConnectProvider, PrivyConnectProvider } from "@/lib/wallet/connect";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  // Belum ada Privy App ID → jalankan mode fallback (injected wallet).
  // Situs tetap build, deploy, dan bisa connect wallet browser.
  if (!privyEnabled) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <WagmiProvider config={fallbackWagmiConfig as any}>
        <QueryClientProvider client={queryClient}>
          <InjectedConnectProvider>{children}</InjectedConnectProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#ff3ba7",
          logo: undefined,
        },
        loginMethods: ["wallet"],
        embeddedWallets: {
          ethereum: { createOnLogin: "off" },
        },
        defaultChain: robinhood,
        supportedChains: [robinhood],
      }}
    >
      <QueryClientProvider client={queryClient}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <PrivyWagmiProvider config={privyWagmiConfig as any}>
          <PrivyConnectProvider>{children}</PrivyConnectProvider>
        </PrivyWagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}

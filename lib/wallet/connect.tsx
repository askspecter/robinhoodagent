"use client";

import { createContext, useContext, useMemo } from "react";
import { useConnect, useDisconnect } from "wagmi";
import { useLogin, useLogout } from "@privy-io/react-auth";

/**
 * A tiny bridge so useUniaPass can trigger "connect" without caring whether
 * the app is running under Privy or the plain injected-wallet fallback.
 * Only ONE of the two providers below is mounted (chosen in providers.tsx),
 * so the Privy hooks are only ever called inside a PrivyProvider.
 */
export type WalletConnectApi = { connect: () => Promise<void> | void; disconnect: () => void };

const Ctx = createContext<WalletConnectApi | null>(null);
export const useWalletConnect = () => useContext(Ctx);

/** Fallback: injected wallet (MetaMask) via wagmi. */
export function InjectedConnectProvider({ children }: { children: React.ReactNode }) {
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const api = useMemo<WalletConnectApi>(
    () => ({
      connect: async () => {
        const inj = connectors.find((c) => c.type === "injected") ?? connectors[0];
        if (inj) await connectAsync({ connector: inj });
      },
      disconnect: () => disconnect(),
    }),
    [connectAsync, connectors, disconnect]
  );
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

/** Privy: opens the Privy login modal (wallet + email + socials). */
export function PrivyConnectProvider({ children }: { children: React.ReactNode }) {
  const { login } = useLogin();
  const { logout } = useLogout();
  const { disconnect } = useDisconnect();
  const api = useMemo<WalletConnectApi>(
    () => ({
      connect: () => login(),
      disconnect: () => { logout(); disconnect(); },
    }),
    [login, logout, disconnect]
  );
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

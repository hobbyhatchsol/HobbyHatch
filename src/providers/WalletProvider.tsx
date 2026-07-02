"use client";

import { useMemo, type ReactNode, type FC } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import {
  ConnectionProvider as RawConnectionProvider,
  WalletProvider as RawWalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider as RawWalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

// The adapter provider types clash with React 18's JSX return type under
// strict mode; alias them to plain FCs to bridge the interop gap.
const ConnectionProvider = RawConnectionProvider as unknown as FC<{
  endpoint: string;
  children: ReactNode;
}>;
const SolanaWalletProvider = RawWalletProvider as unknown as FC<{
  wallets: never[];
  autoConnect?: boolean;
  children: ReactNode;
}>;
const WalletModalProvider = RawWalletModalProvider as unknown as FC<{
  children: ReactNode;
}>;

// HobbyHatch runs on Solana (devnet by default). Phantom, Solflare and Backpack
// all register themselves via the Wallet Standard, so they are auto-detected
// with no explicit adapters — keeping the bundle lean.
//
// autoConnect is intentionally OFF: "logging in" only happens when the user
// explicitly connects a wallet. Otherwise a returning visitor would be silently
// reconnected on page load without ever choosing to sign in.
export function WalletProvider({ children }: { children: ReactNode }) {
  // Prefer a dedicated RPC (Helius/QuickNode) via env; fall back to public
  // devnet. The public endpoint rate-limits hard, so set NEXT_PUBLIC_SOLANA_RPC
  // in production.
  const endpoint = useMemo(
    () => process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl("devnet"),
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={[]} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}

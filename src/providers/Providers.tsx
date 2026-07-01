"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import { WalletProvider } from "./WalletProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <WalletProvider>{children}</WalletProvider>
    </QueryProvider>
  );
}

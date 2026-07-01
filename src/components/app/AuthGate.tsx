"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { WalletButton } from "./WalletButton";
import { ease } from "@/lib/motion";

/**
 * Wallet-based authentication gate. HobbyHatch needs no email — connecting a
 * Solana wallet is the sign-in. Wraps pages that require an identity.
 */
export function AuthGate({
  title = "Connect your wallet",
  description = "Sign in with a Solana wallet — Phantom, Solflare or Backpack. No email required.",
  children,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  const { connected } = useWallet();

  if (connected) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="mx-auto flex min-h-[60svh] max-w-md flex-col items-center justify-center text-center"
    >
      <div className="relative">
        <div className="absolute inset-0 -z-10 rounded-full bg-brand/20 blur-2xl" />
        <Logo size={72} priority />
      </div>
      <h2 className="mt-7 text-2xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <p className="mt-3 text-pretty text-[15px] leading-relaxed text-ink-muted">
        {description}
      </p>
      <div className="mt-7">
        <WalletButton />
      </div>
      <p className="mt-5 text-[13px] text-ink-faint">
        Built on Solana · $HOBBY on Orynth
      </p>
    </motion.div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Copy, LogOut, Check, ChevronDown } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { shortAddress } from "@/lib/format";
import { cn } from "@/lib/cn";

export function WalletButton({
  className,
  full = false,
}: {
  className?: string;
  full?: boolean;
}) {
  const { publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const address = publicKey?.toBase58();

  if (!address) {
    return (
      <button
        onClick={() => setVisible(true)}
        disabled={connecting}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-5 text-[15px] font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-60",
          full && "w-full",
          className
        )}
      >
        <Wallet className="h-4 w-4" />
        {connecting ? "Connecting…" : "Connect Wallet"}
      </button>
    );
  }

  const copy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div ref={ref} className={cn("relative", full && "w-full")}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-11 items-center gap-2.5 rounded-full border border-line bg-white/80 pl-1.5 pr-3 text-[15px] font-medium text-ink transition-colors hover:border-ink/20",
          full && "w-full justify-between",
          className
        )}
      >
        <span className="flex items-center gap-2.5">
          <Avatar seed={address} size={32} />
          {shortAddress(address)}
        </span>
        <ChevronDown className="h-4 w-4 text-ink-muted" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-paper p-1.5 shadow-lift"
          >
            <div className="px-3 py-2.5">
              <p className="text-[12px] text-ink-muted">Connected</p>
              <p className="mt-0.5 font-mono text-[13px] text-ink">
                {shortAddress(address, 6)}
              </p>
            </div>
            <button
              onClick={copy}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[14px] text-ink-soft transition-colors hover:bg-ink/[0.04]"
            >
              {copied ? (
                <Check className="h-4 w-4 text-mint" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied" : "Copy address"}
            </button>
            <button
              onClick={() => {
                disconnect();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[14px] text-ink-soft transition-colors hover:bg-ink/[0.04]"
            >
              <LogOut className="h-4 w-4" />
              Disconnect
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Logo } from "./Logo";

export function BrandLoader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-[70svh] w-full flex-col items-center justify-center gap-6">
      <div className="relative">
        <motion.div
          className="absolute inset-0 -z-10 rounded-full bg-brand/20 blur-2xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Logo size={64} priority />
        </motion.div>
      </div>
      <div className="flex items-center gap-2 text-[13px] font-medium text-ink-muted">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-brand"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        {label}
      </div>
    </div>
  );
}

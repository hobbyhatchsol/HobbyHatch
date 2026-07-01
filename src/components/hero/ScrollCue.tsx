"use client";

import { motion } from "framer-motion";

export function ScrollCue() {
  return (
    <motion.a
      href="#economy"
      aria-label="Scroll to explore"
      className="group flex flex-col items-center gap-2.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 1 }}
    >
      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-faint transition-colors group-hover:text-ink-muted">
        Scroll
      </span>
      <span className="relative flex h-9 w-[22px] items-start justify-center rounded-full border border-line">
        <motion.span
          className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand"
          animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </motion.a>
  );
}

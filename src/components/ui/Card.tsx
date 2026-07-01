"use client";

import { motion } from "framer-motion";
import { fadeUp, ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  interactive = true,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={interactive ? { y: -6 } : undefined}
      transition={{ duration: 0.4, ease }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-line bg-white/70 p-8 backdrop-blur-sm",
        "shadow-soft transition-shadow duration-500",
        interactive && "hover:border-ink/10 hover:shadow-lift",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

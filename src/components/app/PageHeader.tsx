"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function PageHeader({
  kicker,
  title,
  description,
  actions,
  className,
}: {
  kicker?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="max-w-2xl">
        {kicker && (
          <span className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] text-ink-muted">
            <span className="h-px w-5 bg-brand" />
            {kicker}
          </span>
        )}
        <h1 className="mt-3 text-[clamp(1.9rem,3.5vw,2.6rem)] font-semibold leading-[1.05] tracking-tightest text-ink">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-pretty text-[15px] leading-relaxed text-ink-muted">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </motion.div>
  );
}

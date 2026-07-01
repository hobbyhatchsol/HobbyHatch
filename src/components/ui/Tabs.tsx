"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function Tabs({
  tabs,
  value,
  onChange,
  className,
}: {
  tabs: { id: string; label: string; count?: number }[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-1 overflow-x-auto rounded-full border border-line bg-white/60 p-1 backdrop-blur-sm",
        className
      )}
    >
      {tabs.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "relative whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium transition-colors",
              active ? "text-ink" : "text-ink-muted hover:text-ink"
            )}
          >
            {active && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-paper shadow-soft"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {t.label}
              {typeof t.count === "number" && (
                <span className="rounded-full bg-ink/[0.06] px-1.5 text-[11px] text-ink-muted">
                  {t.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

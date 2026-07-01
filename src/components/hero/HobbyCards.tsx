"use client";

import { motion } from "framer-motion";
import { hobbies } from "@/lib/content";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function HobbyArt({ id }: { id: string }) {
  const common = "h-9 w-9 text-white/95";
  switch (id) {
    case "photography":
      return (
        <svg viewBox="0 0 32 32" className={common} {...line}>
          <path d="M5 10.5h4l2-2.5h10l2 2.5h4v14H5z" />
          <circle cx="16" cy="17" r="4.5" />
        </svg>
      );
    case "music":
      return (
        <svg viewBox="0 0 32 32" className={common} {...line}>
          <path d="M12 22V8l12-2.5V19" />
          <circle cx="9" cy="22" r="3" />
          <circle cx="21" cy="19" r="3" />
        </svg>
      );
    case "gaming":
      return (
        <svg viewBox="0 0 32 32" className={common} {...line}>
          <path d="M10 11h12a6 6 0 0 1 6 6v.5A4.5 4.5 0 0 1 20 20l-1-1h-6l-1 1a4.5 4.5 0 0 1-8-2.5V17a6 6 0 0 1 6-6Z" />
          <path d="M9.5 15.5v2M8.5 16.5h2M21 15.5h.01M23.5 17.5h.01" />
        </svg>
      );
    case "cooking":
      return (
        <svg viewBox="0 0 32 32" className={common} {...line}>
          <path d="M9 15a5 5 0 0 1 .8-9.7A5 5 0 0 1 22 5.3 5 5 0 0 1 23 15v1H9z" />
          <path d="M9 19h14M10 22.5h12" />
        </svg>
      );
    case "travel":
      return (
        <svg viewBox="0 0 32 32" className={common} {...line}>
          <path d="M4 18l24-9-6 14-4-5-5 4-1-5z" />
          <path d="M14 17l8-6" />
        </svg>
      );
    default: // art
      return (
        <svg viewBox="0 0 32 32" className={common} {...line}>
          <path d="M16 5a11 11 0 1 0 0 22c1.7 0 2.5-1.3 2.5-2.5 0-1.5-1.3-2-1.3-3.3 0-1.2 1-2.2 2.3-2.2H21A6 6 0 0 0 27 13C27 8.6 22 5 16 5Z" />
          <circle cx="11.5" cy="13" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="16" cy="10.5" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="20.5" cy="13" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

export function HobbyCards() {
  return (
    <motion.div
      className="relative z-10 flex items-end justify-center gap-3 sm:gap-4"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.09, delayChildren: 0.5 } },
      }}
    >
      {hobbies.map((h, i) => {
        // Center cards sit taller — an editorial arc.
        const heights = [
          "h-[15rem] sm:h-[17rem]",
          "h-[17rem] sm:h-[20rem]",
          "h-[19rem] sm:h-[23rem]",
          "h-[19rem] sm:h-[23rem]",
          "h-[17rem] sm:h-[20rem]",
          "h-[15rem] sm:h-[17rem]",
        ][i];
        return (
          <motion.div
            key={h.id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
            }}
            className={cn(
              "group relative w-[5.4rem] shrink-0 overflow-hidden rounded-[1.6rem] sm:w-[7.5rem] lg:w-[8.5rem]",
              "shadow-lift ring-1 ring-black/5",
              heights
            )}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ y: [0, i % 2 === 0 ? -8 : -12, 0] }}
              transition={{
                duration: 6 + i * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              style={{
                background: `linear-gradient(160deg, ${h.hue} 0%, ${h.hue2} 100%)`,
              }}
            >
              {/* subtle inner light */}
              <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_30%_10%,rgba(255,255,255,0.35),transparent_60%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>

            <div className="relative flex h-full flex-col justify-between p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-105">
                <HobbyArt id={h.id} />
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
                  Economy
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white sm:text-[15px]">
                  {h.label}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

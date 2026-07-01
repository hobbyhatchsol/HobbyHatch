"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { ease } from "@/lib/motion";

function Float({
  children,
  className,
  delay,
  amplitude = 10,
  duration = 7,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
  amplitude?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={`absolute z-20 hidden lg:block ${className}`}
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.9, ease }}
    >
      <motion.div
        animate={{ y: [0, -amplitude, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const chip =
  "flex items-center gap-3 rounded-2xl border border-line bg-white/80 px-4 py-3 shadow-lift backdrop-blur-md";

export function FloatingLabels() {
  return (
    <>
      <Float className="left-[3%] top-[30%] xl:left-[6%]" delay={0.9} duration={8}>
        <div className={chip}>
          <Logo size={36} className="rounded-xl" />
          <div>
            <p className="text-[13px] font-semibold leading-none text-ink">
              Built on Solana
            </p>
            <p className="mt-1 text-[11px] text-ink-muted">Settlement layer</p>
          </div>
        </div>
      </Float>

      <Float
        className="right-[3%] top-[24%] xl:right-[6%]"
        delay={1.1}
        amplitude={12}
        duration={9}
      >
        <div className={chip}>
          <div>
            <p className="text-[13px] font-semibold leading-none text-ink">
              1,284 economies
            </p>
            <p className="mt-1 text-[11px] text-ink-muted">and counting</p>
          </div>
          <div className="flex -space-x-2">
            {["#7C5CFC", "#14C69A", "#38BDF8"].map((c) => (
              <span
                key={c}
                className="h-6 w-6 rounded-full border-2 border-white"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      </Float>

      <Float
        className="left-[8%] bottom-[16%] xl:left-[11%]"
        delay={1.25}
        amplitude={9}
        duration={7.5}
      >
        <div className={chip}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <p className="text-[13px] font-semibold text-ink">Community Owned</p>
        </div>
      </Float>

      <Float
        className="right-[7%] bottom-[19%] xl:right-[10%]"
        delay={1.4}
        amplitude={11}
        duration={8.5}
      >
        <div className={chip}>
          <p className="font-display text-lg font-semibold leading-none text-ink">
            +38%
          </p>
          <p className="text-[11px] leading-tight text-ink-muted">
            treasury
            <br />
            growth
          </p>
        </div>
      </Float>
    </>
  );
}

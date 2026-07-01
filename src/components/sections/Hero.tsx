"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AmbientBackground } from "@/components/hero/AmbientBackground";
import { GridLines } from "@/components/hero/GridLines";
import { HobbyCards } from "@/components/hero/HobbyCards";
import { FloatingLabels } from "@/components/hero/FloatingLabels";
import { ScrollCue } from "@/components/hero/ScrollCue";
import { ease } from "@/lib/motion";
import { trustBadges } from "@/lib/content";

const word = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.06, duration: 0.85, ease },
  }),
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] px-3 pb-10 pt-24 sm:px-4 sm:pt-28"
    >
      <AmbientBackground />

      {/* Floating editorial container */}
      <div className="relative mx-auto flex min-h-[calc(100svh-8rem)] max-w-[1360px] flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/55 shadow-float backdrop-blur-xl sm:rounded-[2.75rem]">
        <GridLines columns={6} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(237,233,254,0.5),transparent_60%)]" />
        <FloatingLabels />

        {/* Centered hero copy */}
        <div className="relative z-10 flex flex-1 flex-col items-center px-6 pt-14 text-center sm:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 px-4 py-1.5 text-[13px] font-medium tracking-tight text-ink-soft backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            Launching in 2 weeks · July 15, 2026
          </motion.div>

          <h1 className="mt-8 max-w-[16ch] text-[clamp(2.7rem,7vw,5.6rem)] font-semibold leading-[0.98] tracking-tightest text-ink">
            {["Tokenize", "Your", "Hobby."].map((w, i) => (
              <motion.span
                key={w}
                custom={i}
                variants={word}
                initial="hidden"
                animate="show"
                className="mr-[0.28em] inline-block"
              >
                {w}
              </motion.span>
            ))}
            <br className="hidden sm:block" />
            {["Build", "Your"].map((w, i) => (
              <motion.span
                key={w}
                custom={i + 3}
                variants={word}
                initial="hidden"
                animate="show"
                className="mr-[0.28em] inline-block text-ink"
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              custom={5}
              variants={word}
              initial="hidden"
              animate="show"
              className="inline-block bg-gradient-to-r from-brand via-sky to-mint bg-clip-text text-transparent"
            >
              Community.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease }}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted"
          >
            Launch community-owned hobby ecosystems on Solana. Create
            communities, launch tokens, reward contributors — and grow together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8, ease }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button href="/app" arrow>
              Get early access
            </Button>
            <Button href="#features" variant="secondary">
              Read Documentation
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.9 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-ink-muted"
          >
            {trustBadges.map((l, i) => (
              <span key={l.text} className="flex items-center gap-6">
                {i > 0 && <span className="h-3 w-px bg-line" />}
                <span className="flex items-center gap-2">
                  <span
                    className={
                      l.tone === "brand"
                        ? "h-1.5 w-1.5 rounded-full bg-brand"
                        : "h-1.5 w-1.5 rounded-full bg-ink/30"
                    }
                  />
                  {l.text}
                </span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Overlapping hobby cards */}
        <div className="relative z-10 -mb-2 mt-auto px-4 pt-10 sm:px-8">
          <HobbyCards />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="mt-6 flex justify-center">
        <ScrollCue />
      </div>
    </section>
  );
}

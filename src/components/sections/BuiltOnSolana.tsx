"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { solanaReasons } from "@/lib/content";
import { revealViewport, ease } from "@/lib/motion";

export function BuiltOnSolana() {
  return (
    <Section id="solana">
      <div className="relative overflow-hidden rounded-[2.25rem] border border-line bg-ink p-8 text-paper sm:p-14 lg:p-20">
        {/* ambient holographic glow */}
        <div className="pointer-events-none absolute -left-10 top-0 h-72 w-72 rounded-full bg-brand/30 blur-[100px]" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-mint/20 blur-[110px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #fff 0, #fff 1px, transparent 1px, transparent 6.25rem)",
          }}
        />

        <div className="relative grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.18em] text-paper/60">
              <span className="h-px w-6 bg-brand" />
              Built on Solana
            </span>
            <Reveal>
              <h2 className="text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.03] tracking-tightest">
                An economy needs a{" "}
                <span className="bg-gradient-to-r from-brand via-sky to-mint bg-clip-text text-transparent">
                  settlement layer
                </span>{" "}
                that never gets in the way.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-lg text-pretty text-lg leading-relaxed text-paper/70">
                Micro-contributions, instant rewards and global membership only
                work when fees round to zero and finality feels instant. Solana
                gives HobbyHatch the throughput, cost and reach to serve millions
                of everyday participants — and our $HOBBY protocol token launches on Orynth.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-paper/10">
            {solanaReasons.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ delay: i * 0.1, duration: 0.7, ease }}
                className="bg-ink p-6 sm:p-8"
              >
                <p className="font-display text-3xl font-semibold text-paper sm:text-4xl">
                  {r.value}
                </p>
                <p className="mt-2 text-[15px] font-medium text-paper">
                  {r.label}
                </p>
                <p className="mt-1 text-[13px] leading-snug text-paper/50">
                  {r.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ease } from "@/lib/motion";

const drains = [
  { pct: "~50%", label: "Platform take rate", sub: "on what creators earn" },
  { pct: "0%", label: "Community ownership", sub: "of the value they create" },
  { pct: "100%", label: "Lock-in", sub: "audiences you can't take with you" },
];

export function Problem() {
  return (
    <Section id="problem" className="bg-canvas/50">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">
        <SectionHeader
          kicker="The Problem"
          title={
            <>
              Today&apos;s internet monetizes{" "}
              <span className="bg-gradient-to-r from-brand to-sky bg-clip-text text-transparent">
                platforms
              </span>{" "}
              — not hobbies.
            </>
          }
          intro="Passion flows up to shareholders. The people who bring the craft, the culture and the community are left renting an audience they'll never own. When the platform changes the rules, everything they built disappears."
        />

        <Reveal delay={0.1}>
          <div className="relative rounded-4xl border border-line bg-white/70 p-8 shadow-soft backdrop-blur-sm sm:p-10">
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand/5 blur-2xl" />
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-ink-faint">
              Where the value goes today
            </p>
            <div className="mt-8 space-y-7">
              {drains.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease }}
                  className="flex items-baseline justify-between gap-4 border-b border-line pb-6 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-[17px] font-semibold text-ink">
                      {d.label}
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">{d.sub}</p>
                  </div>
                  <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                    {d.pct}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

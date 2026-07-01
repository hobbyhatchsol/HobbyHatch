"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { steps } from "@/lib/content";
import { revealViewport, ease } from "@/lib/motion";

export function HowItWorks() {
  return (
    <Section id="how" className="bg-canvas/50">
      <SectionHeader
        kicker="How It Works"
        title="From passion to economy in four steps."
        intro="A guided path from an idea to a living, community-owned economy. No smart-contract knowledge required."
      />

      <div className="relative mt-16 lg:mt-20">
        {/* connecting rail */}
        <div className="absolute left-[27px] top-4 bottom-4 w-px bg-line lg:left-0 lg:right-0 lg:top-[46px] lg:h-px lg:w-full lg:bottom-auto" />
        <motion.div
          className="absolute left-[27px] top-4 w-px origin-top bg-gradient-to-b from-brand to-mint lg:left-0 lg:top-[46px] lg:h-px lg:w-full lg:origin-left lg:bg-gradient-to-r"
          initial={{ scaleY: 0, scaleX: 0 }}
          whileInView={{ scaleY: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
          style={{ height: "calc(100% - 2rem)" }}
        />

        <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ delay: i * 0.12, duration: 0.7, ease }}
              className="relative flex gap-6 lg:block"
            >
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-paper font-display text-lg font-semibold text-ink shadow-soft">
                {s.n}
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-brand" />
              </div>
              <div className="lg:mt-7 lg:pr-6">
                <h3 className="text-xl font-semibold tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-ink-muted">
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

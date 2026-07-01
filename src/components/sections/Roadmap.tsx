"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { roadmap } from "@/lib/content";
import { revealViewport, ease } from "@/lib/motion";

export function Roadmap() {
  return (
    <Section id="roadmap">
      <SectionHeader
        kicker="Roadmap"
        title="The path to a self-owned internet of hobbies."
        intro="A deliberate rollout — from a proven core to thousands of interoperable economies."
      />

      <div className="relative mt-16">
        <div className="absolute left-0 right-0 top-[9px] hidden h-px bg-line lg:block" />
        <motion.div
          className="absolute left-0 top-[9px] hidden h-px origin-left bg-gradient-to-r from-brand via-sky to-mint lg:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease }}
          style={{ width: "100%" }}
        />

        <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">
          {roadmap.map((r, i) => (
            <motion.div
              key={r.phase}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ delay: i * 0.12, duration: 0.7, ease }}
              className="relative pl-8 lg:pl-0"
            >
              {/* node */}
              <span
                className={`absolute left-0 top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 lg:left-0 ${
                  r.done
                    ? "border-brand bg-brand"
                    : "border-line bg-paper"
                }`}
              >
                {r.done && (
                  <span className="h-1.5 w-1.5 rounded-full bg-paper" />
                )}
              </span>
              {/* vertical rail on mobile */}
              <span className="absolute left-[8px] top-6 h-[calc(100%-1rem)] w-px bg-line lg:hidden" />

              <div className="lg:mt-8">
                <div className="flex items-center gap-2.5">
                  <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand">
                    {r.phase}
                  </span>
                  <span className="rounded-full border border-line bg-paper px-2.5 py-0.5 text-[11px] font-medium text-ink-muted">
                    {r.period}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">
                  {r.title}
                </h3>
                <p className="mt-2.5 text-pretty leading-relaxed text-ink-muted">
                  {r.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

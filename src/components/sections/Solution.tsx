"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { solutionPillars } from "@/lib/content";

export function Solution() {
  return (
    <Section id="solution">
      <SectionHeader
        align="center"
        kicker="The Solution"
        title={
          <>
            HobbyHatch is the protocol that gives
            <br className="hidden sm:block" /> every hobby its own economy.
          </>
        }
        intro="Not a platform that owns your community — neutral rails your community owns. Turn a hobby into a tokenized, self-governing economy in an afternoon."
      />

      <RevealGroup className="mt-16 grid gap-5 md:grid-cols-3">
        {solutionPillars.map((p, i) => (
          <Card key={p.title} className="flex flex-col">
            <span className="font-display text-sm font-semibold text-brand">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">
              {p.title}
            </h3>
            <p className="mt-3 text-pretty leading-relaxed text-ink-muted">
              {p.body}
            </p>
            <div className="mt-8 h-px w-full bg-gradient-to-r from-line via-line to-transparent transition-all duration-500 group-hover:from-brand/40" />
          </Card>
        ))}
      </RevealGroup>
    </Section>
  );
}

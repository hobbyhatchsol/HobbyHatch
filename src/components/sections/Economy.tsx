"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { economyPoints } from "@/lib/content";

export function Economy() {
  return (
    <Section id="economy">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader
            kicker="The Hobby Economy"
            title={
              <>
                The world&apos;s largest untapped economy is{" "}
                <span className="text-ink-muted">what people love.</span>
              </>
            }
            intro="Long before it was a market, culture was a hobby. HobbyHatch turns that devotion into an economy the community actually owns."
          />
        </div>

        <RevealGroup className="flex flex-col">
          {economyPoints.map((p, i) => (
            <RevealItem key={p.k}>
              <div className="group flex gap-6 border-t border-line py-8 first:border-t-0 first:pt-0">
                <span className="font-display text-sm font-semibold text-brand">
                  {p.k}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-pretty leading-relaxed text-ink-muted">
                    {p.body}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}

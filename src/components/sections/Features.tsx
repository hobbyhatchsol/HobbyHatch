"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { features } from "@/lib/content";
import { featureIcons } from "@/components/ui/icons";

export function Features() {
  return (
    <Section id="features">
      <SectionHeader
        kicker="Protocol Features"
        title="Primitives for a community-owned economy."
        intro="Six composable building blocks. Use one, use all — every hobby economy is assembled from the same open standard."
      />

      <RevealGroup
        className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        staggerChildren={0.07}
      >
        {features.map((f) => {
          const Icon = featureIcons[f.icon];
          return (
            <Card key={f.title} className="flex flex-col p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-paper text-ink transition-colors duration-500 group-hover:border-brand/30 group-hover:text-brand">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">
                {f.title}
              </h3>
              <p className="mt-2.5 text-pretty leading-relaxed text-ink-muted">
                {f.body}
              </p>
            </Card>
          );
        })}
      </RevealGroup>
    </Section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { revealViewport, ease } from "@/lib/motion";

export function CTA() {
  return (
    <section id="cta" className="relative py-24 sm:py-32 lg:py-40">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.9, ease }}
          className="relative overflow-hidden rounded-[2.5rem] border border-line bg-white/60 px-6 py-20 text-center shadow-float backdrop-blur-xl sm:px-16 sm:py-28"
        >
          {/* ambient glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full blur-[110px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(237,233,254,0.9), rgba(20,198,154,0.12), transparent 70%)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, rgba(16,15,14,0.03) 0, rgba(16,15,14,0.03) 1px, transparent 1px, transparent 25%)",
            }}
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.18em] text-ink-muted">
              <span className="h-px w-6 bg-brand" />
              Every hobby deserves its own economy
            </span>
            <h2 className="mx-auto mt-7 max-w-4xl text-[clamp(2.4rem,6vw,4.8rem)] font-semibold leading-[0.98] tracking-tightest text-ink">
              Build the economy your
              <br className="hidden sm:block" /> hobby always deserved.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted">
              The platform is ready and goes live in two weeks — July 15, 2026.
              Get early access, help us build in public, and be first when the
              hobby economy opens on Solana.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/app" arrow>
                Get early access
              </Button>
              <Button href="#launch" variant="secondary">
                See the countdown
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

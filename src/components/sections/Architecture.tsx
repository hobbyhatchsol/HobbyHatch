"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { architectureLayers, hobbies } from "@/lib/content";
import { Logo } from "@/components/brand/Logo";
import { revealViewport, ease } from "@/lib/motion";

export function Architecture() {
  return (
    <Section id="architecture" className="bg-canvas/50">
      <SectionHeader
        align="center"
        kicker="Protocol Architecture"
        title="One open stack. Endless economies."
        intro="Diverse hobbies flow into shared protocol primitives, all settling on Solana. Composable at every layer — built for the Solana ecosystem."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={{ duration: 0.9, ease }}
        className="relative mx-auto mt-16 max-w-4xl"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white/70 p-6 shadow-soft backdrop-blur-sm sm:p-10">
          {/* Input row: hobbies */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {hobbies.map((h, i) => (
              <motion.span
                key={h.id}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
                className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[13px] font-medium text-ink-soft"
              >
                {h.label}
              </motion.span>
            ))}
          </div>

          <FlowConnectors />

          {/* Layers */}
          <div className="space-y-3">
            {architectureLayers.map((layer, i) => {
              const isSettlement = i === architectureLayers.length - 1;
              return (
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.14, duration: 0.6, ease }}
                  className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 ${
                    isSettlement
                      ? "border-transparent bg-ink text-paper"
                      : "border-line bg-paper"
                  }`}
                >
                  {isSettlement && (
                    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand/30 blur-3xl" />
                  )}
                  <div className="relative flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        isSettlement
                          ? "bg-brand text-paper"
                          : "border border-line bg-white text-ink"
                      }`}
                    >
                      {isSettlement ? (
                        <Logo size={28} className="rounded-lg" />
                      ) : (
                        <span className="font-display text-sm font-semibold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-[15px] font-semibold ${
                          isSettlement ? "text-paper" : "text-ink"
                        }`}
                      >
                        {layer.name}
                      </p>
                      <p
                        className={`mt-0.5 text-[13px] leading-snug ${
                          isSettlement ? "text-paper/60" : "text-ink-muted"
                        }`}
                      >
                        {layer.body}
                      </p>
                    </div>
                    {isSettlement && (
                      <span className="hidden items-center gap-2 rounded-full bg-paper/10 px-3 py-1.5 text-[12px] font-medium text-paper/80 sm:flex">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Solana Mainnet
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function FlowConnectors() {
  return (
    <div className="relative mx-auto my-5 h-10 w-full max-w-md">
      <svg
        viewBox="0 0 400 40"
        className="h-full w-full text-line"
        preserveAspectRatio="none"
        aria-hidden
      >
        {[40, 130, 200, 270, 360].map((x) => (
          <path
            key={x}
            d={`M${x} 0 C ${x} 20, 200 20, 200 40`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
        {[40, 130, 270, 360].map((x, i) => (
          <motion.circle
            key={x}
            r="2.5"
            fill="#7C5CFC"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              begin={`${i * 0.5}s`}
              path={`M${x} 0 C ${x} 20, 200 20, 200 40`}
            />
          </motion.circle>
        ))}
      </svg>
    </div>
  );
}

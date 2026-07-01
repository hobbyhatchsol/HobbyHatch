"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  getTimeLeft,
  LAUNCH_LABEL,
  LAUNCH_TIME_LABEL,
  type TimeLeft,
} from "@/lib/launch";
import { revealViewport, ease } from "@/lib/motion";

const UNITS: { key: keyof Omit<TimeLeft, "done">; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function Unit({ value, label }: { value: number | null; label: string }) {
  const display = value === null ? "--" : pad(value);
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-line bg-white/80 shadow-soft backdrop-blur-sm sm:h-28 sm:w-28">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: "60%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-60%", opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="font-display text-4xl font-semibold tabular-nums tracking-tightest text-ink sm:text-6xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted sm:text-[12px]">
        {label}
      </span>
    </div>
  );
}

export function LaunchCountdown() {
  // Null until mounted so server and first client render match (no time drift).
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const launched = time?.done ?? false;

  return (
    <section id="launch" className="relative py-24 sm:py-28 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.9, ease }}
          className="relative overflow-hidden rounded-[2.5rem] border border-line bg-white/60 px-6 py-16 text-center shadow-float backdrop-blur-xl sm:px-16 sm:py-20"
        >
          {/* ambient glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-[110px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(124,92,252,0.20), rgba(20,198,154,0.10), transparent 70%)",
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.18em] text-ink-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              {launched ? "We are live" : "Countdown to launch"}
            </span>

            <h2 className="mx-auto mt-6 max-w-3xl text-[clamp(2.1rem,5vw,3.6rem)] font-semibold leading-[1.02] tracking-tightest text-ink">
              {launched ? (
                <>HobbyHatch is live on Solana.</>
              ) : (
                <>
                  The hobby economy hatches in{" "}
                  <span className="bg-gradient-to-r from-brand via-sky to-mint bg-clip-text text-transparent">
                    days.
                  </span>
                </>
              )}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted">
              {launched
                ? "Connect your wallet and launch your community today."
                : `The platform is built and goes live in two weeks — ${LAUNCH_LABEL} · ${LAUNCH_TIME_LABEL}. Get early access before the first hobby economies open.`}
            </p>

            {!launched && (
              <div className="mt-12 flex items-start justify-center gap-3 sm:gap-6">
                {UNITS.map((u, i) => (
                  <div key={u.key} className="flex items-start gap-3 sm:gap-6">
                    <Unit value={time ? time[u.key] : null} label={u.label} />
                    {i < UNITS.length - 1 && (
                      <span className="mt-6 font-display text-3xl font-semibold text-line sm:mt-9 sm:text-5xl">
                        :
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/app" arrow>
                {launched ? "Launch your community" : "Get early access"}
              </Button>
              <Button href="#solana" variant="secondary">
                Why Solana
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

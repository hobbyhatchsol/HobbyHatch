"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { Wordmark, Logo } from "@/components/brand/Logo";
import {
  getTimeLeft,
  LAUNCH_LABEL,
  LAUNCH_TIME_LABEL,
  type TimeLeft,
} from "@/lib/launch";
import { ease } from "@/lib/motion";

const UNITS: { key: keyof Omit<TimeLeft, "done">; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * Pre-launch gate for the whole application. The product is built, but the
 * platform opens on the launch date — until then every app route shows this
 * locked "launching in 2 weeks" screen with an early-access waitlist.
 */
export function LaunchLock({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const t = getTimeLeft();
      setTime(t);
      setLaunched(t.done);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Before launch (and during SSR / first paint) the platform stays locked.
  if (mounted && launched) return <>{children}</>;

  return <LockScreen time={time} />;
}

function LockScreen({ time }: { time: TimeLeft | null }) {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return;
    try {
      localStorage.setItem("hobbyhatch-waitlist", email);
    } catch {
      /* ignore */
    }
    setJoined(true);
  };

  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden px-4 pb-16 pt-5 sm:px-6">
      {/* ambient glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(124,92,252,0.18), rgba(20,198,154,0.08), transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* top bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between">
        <Link href="/" aria-label="HobbyHatch home">
          <Wordmark size={32} priority />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-4 py-2 text-[14px] font-medium text-ink-soft backdrop-blur-sm transition-colors hover:border-ink/20 hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>

      {/* content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center text-center"
      >
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-brand/20 blur-2xl" />
          <Logo size={72} priority />
        </div>

        <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-[13px] font-medium text-ink-soft backdrop-blur-sm">
          <Lock className="h-3.5 w-3.5 text-brand" />
          Launching in 2 weeks
        </span>

        <h1 className="mt-6 text-[clamp(2rem,5vw,3.4rem)] font-display font-semibold leading-[1.03] tracking-tightest text-ink">
          The product is ready.
          <br className="hidden sm:block" /> The platform opens {LAUNCH_LABEL}.
        </h1>

        <p className="mt-5 max-w-xl text-pretty text-[16px] leading-relaxed text-ink-muted">
          HobbyHatch is built and in final testing. We&apos;re launching on
          Solana in two weeks and onboarding early beta testers first — join the
          list to build in public with us and get access before everyone else.
        </p>

        {/* countdown */}
        <div className="mt-10 flex items-center gap-2.5 sm:gap-4">
          {UNITS.map((u) => (
            <div
              key={u.key}
              className="flex h-[70px] w-[64px] flex-col items-center justify-center rounded-2xl border border-line bg-white/80 shadow-soft backdrop-blur-sm sm:h-20 sm:w-20"
            >
              <span className="font-display text-2xl font-semibold tabular-nums tracking-tightest text-ink sm:text-3xl">
                {time ? pad(time[u.key]) : "--"}
              </span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-muted">
                {u.label}
              </span>
            </div>
          ))}
        </div>

        {/* waitlist */}
        <div className="mt-10 w-full max-w-md">
          {joined ? (
            <div className="flex items-center justify-center gap-2.5 rounded-2xl border border-mint/30 bg-mint/10 px-5 py-4 text-[15px] font-medium text-ink">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint text-white">
                <Check className="h-4 w-4" />
              </span>
              You&apos;re on the list. We&apos;ll be in touch before launch.
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="flex flex-col gap-2.5 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="h-12 flex-1 rounded-full border border-line bg-white/80 px-5 text-[15px] text-ink placeholder:text-ink-faint backdrop-blur-sm focus:border-brand/50 focus:outline-none focus:ring-4 focus:ring-brand/10"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-[15px] font-medium text-paper transition-colors hover:bg-ink-soft"
              >
                Request early access
              </button>
            </form>
          )}
          <p className="mt-3 text-[13px] text-ink-faint">
            Built on Solana · $HOBBY launches on Orynth · {LAUNCH_LABEL} ·{" "}
            {LAUNCH_TIME_LABEL}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

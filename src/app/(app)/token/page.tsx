"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Coins,
  TrendingUp,
  PieChart,
  Lock,
  Users,
  Copy,
  Check,
  ArrowUpRight,
  Vote,
  Flame,
  Gift,
} from "lucide-react";

import { PageHeader } from "@/components/app/PageHeader";
import { Stat } from "@/components/ui/Stat";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";
import { formatUsd, formatNumber } from "@/lib/format";
import { fadeUp, ease, revealViewport } from "@/lib/motion";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const MINT_ADDRESS = "Htch7Xe9mQvK3pRnZ2yWqL8sVdA4uBcF6gJ1oKtHhAtc";

const PRICE = 0.42;
const CHANGE_24H = 8.3;

// 30-point, generally-upward price series for the chart.
const SERIES = [
  0.29, 0.28, 0.3, 0.31, 0.3, 0.33, 0.34, 0.33, 0.36, 0.35, 0.37, 0.38, 0.37,
  0.39, 0.41, 0.4, 0.39, 0.41, 0.42, 0.4, 0.43, 0.44, 0.43, 0.45, 0.44, 0.46,
  0.45, 0.44, 0.46, 0.47,
];

const TIMEFRAMES = ["24H", "7D", "30D", "1Y"] as const;
type Timeframe = (typeof TIMEFRAMES)[number];

const DISTRIBUTION = [
  { label: "Community", value: 40, color: "#7C5CFC" },
  { label: "Ecosystem & Grants", value: 20, color: "#38BDF8" },
  { label: "Team", value: 18, color: "#14C69A" },
  { label: "Treasury", value: 12, color: "#F5C451" },
  { label: "Liquidity", value: 10, color: "#FB7EA8" },
];

const UTILITY = [
  {
    icon: Vote,
    title: "Governance",
    body: "Vote on protocol parameters, grant rounds, and which hobby communities graduate to featured launches.",
  },
  {
    icon: Gift,
    title: "Staking & Rewards",
    body: "Stake $HOBBY to earn a share of protocol fees and boost the communities you believe in.",
  },
  {
    icon: Flame,
    title: "Fee Discounts",
    body: "Holders pay reduced mint, swap, and launch fees across every hobby economy on HobbyHatch.",
  },
  {
    icon: Lock,
    title: "Access",
    body: "Unlock gated drops, early community tokens, and creator tools reserved for $HOBBY members.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Price chart                                                                */
/* -------------------------------------------------------------------------- */

function PriceChart({ data }: { data: number[] }) {
  const width = 720;
  const height = 240;
  const padY = 24;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = padY + (1 - (v - min) / span) * (height - padY * 2);
    return [x, y] as const;
  });

  const line = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");

  const area = `${line} L${width},${height} L0,${height} Z`;
  const last = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-full w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="$HOBBY price chart"
    >
      <defs>
        <linearGradient id="hatch-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C5CFC" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#7C5CFC" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hatch-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9A80FF" />
          <stop offset="100%" stopColor="#7C5CFC" />
        </linearGradient>
      </defs>

      <motion.path
        d={area}
        fill="url(#hatch-area)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={revealViewport}
        transition={{ duration: 0.9, ease }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="url(#hatch-line)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={revealViewport}
        transition={{ duration: 1.3, ease }}
      />
      <motion.circle
        cx={last[0]}
        cy={last[1]}
        r={4.5}
        fill="#7C5CFC"
        stroke="#fff"
        strokeWidth={2}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={revealViewport}
        transition={{ delay: 1.1, duration: 0.4, ease }}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Distribution pie                                                           */
/* -------------------------------------------------------------------------- */

function DistributionPie({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) {
  let acc = 0;
  const stops = segments
    .map((s) => {
      const start = acc;
      acc += s.value;
      return `${s.color} ${start}% ${acc}%`;
    })
    .join(", ");

  return (
    <div className="relative aspect-square w-full max-w-[260px]">
      <div
        className="h-full w-full rounded-full"
        style={{ background: `conic-gradient(${stops})` }}
      />
      <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full bg-paper shadow-soft">
        <span className="font-display text-2xl font-semibold tracking-tight text-ink">
          1B
        </span>
        <span className="text-[12px] font-medium text-ink-muted">
          Total supply
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function TokenPage() {
  const [copied, setCopied] = useState(false);
  const [timeframe, setTimeframe] = useState<Timeframe>("30D");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(MINT_ADDRESS);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex flex-col gap-16 pb-8">
      {/* 1. Header ---------------------------------------------------------- */}
      <div className="flex flex-col gap-6">
        <PageHeader
          kicker="Protocol Token"
          title="$HOBBY"
          description="The token that coordinates the HobbyHatch protocol on Solana — governance, rewards, and access for tokenized hobby communities."
          actions={
            <>
              <Button size="md" arrow>
                Get $HOBBY
              </Button>
              <Button href="#" size="md" variant="secondary">
                View on Solana Explorer
              </Button>
            </>
          }
        />

        <button
          onClick={copy}
          className="group inline-flex w-fit items-center gap-3 rounded-full border border-line bg-white/70 py-2 pl-4 pr-2 backdrop-blur-sm transition-colors hover:border-ink/15"
        >
          <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-faint">
            Mint
          </span>
          <span className="font-mono text-[13px] text-ink-soft">
            {MINT_ADDRESS.slice(0, 6)}…{MINT_ADDRESS.slice(-6)}
          </span>
          <span
            className={cn(
              "inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors",
              copied ? "text-mint" : "text-ink-muted group-hover:text-ink"
            )}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </span>
        </button>
      </div>

      {/* 2. Price + stats -------------------------------------------------- */}
      <section className="flex flex-col gap-6">
        <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-iris/60 via-white/60 to-white/40 p-8 shadow-soft backdrop-blur-sm sm:p-10">
          <div className="flex flex-col gap-1">
            <span className="text-[13px] font-medium text-ink-muted">
              $HOBBY / USD
            </span>
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="font-display text-[clamp(2.5rem,6vw,3.75rem)] font-semibold leading-none tracking-tightest text-ink">
                {formatUsd(PRICE)}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/10 px-3 py-1 text-[15px] font-medium text-mint">
                <TrendingUp className="h-4 w-4" />+{CHANGE_24H}%
                <span className="text-ink-muted">24h</span>
              </span>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
        </Reveal>

        <RevealGroup className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <Stat
            label="Market cap"
            value={formatUsd(268_000_000, { compact: true })}
            icon={<Coins className="h-4 w-4" />}
          />
          <Stat
            label="Fully diluted value"
            value={formatUsd(420_000_000, { compact: true })}
            icon={<PieChart className="h-4 w-4" />}
          />
          <Stat
            label="Circulating supply"
            value={formatNumber(638_000_000)}
            icon={<Coins className="h-4 w-4" />}
          />
          <Stat
            label="Holders"
            value={formatNumber(42_180)}
            icon={<Users className="h-4 w-4" />}
          />
          <Stat
            label="24h volume"
            value={formatUsd(14_200_000, { compact: true })}
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <Stat
            label="Total supply"
            value={formatNumber(1_000_000_000)}
            icon={<PieChart className="h-4 w-4" />}
          />
        </RevealGroup>
      </section>

      {/* 3. Price chart ---------------------------------------------------- */}
      <Reveal className="rounded-3xl border border-line bg-white/70 p-6 shadow-soft backdrop-blur-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
              Price
            </h2>
            <p className="text-[13px] text-ink-muted">
              {formatUsd(PRICE)} · up {CHANGE_24H}% over the last day
            </p>
          </div>
          <div className="flex gap-1 rounded-full border border-line bg-paper/60 p-1">
            {TIMEFRAMES.map((tf) => {
              const active = tf === timeframe;
              return (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                    active ? "text-ink" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="tf-pill"
                      className="absolute inset-0 rounded-full bg-paper shadow-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tf}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 h-56 w-full sm:h-64">
          <PriceChart data={SERIES} />
        </div>
      </Reveal>

      {/* 4. Tokenomics ----------------------------------------------------- */}
      <section className="flex flex-col gap-6">
        <div>
          <span className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] text-ink-muted">
            <span className="h-px w-5 bg-brand" />
            Tokenomics
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
            Distribution
          </h2>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-muted">
            A fixed supply of one billion $HOBBY, weighted toward the communities
            and builders who make hobby economies thrive.
          </p>
        </div>

        <Reveal className="grid items-center gap-10 rounded-3xl border border-line bg-white/70 p-8 shadow-soft backdrop-blur-sm sm:p-10 lg:grid-cols-[auto_1fr]">
          <div className="flex justify-center lg:justify-start">
            <DistributionPie segments={DISTRIBUTION} />
          </div>

          <div className="flex flex-col gap-4">
            {/* stacked bar */}
            <div className="flex h-3 w-full overflow-hidden rounded-full">
              {DISTRIBUTION.map((s) => (
                <div
                  key={s.label}
                  style={{ width: `${s.value}%`, backgroundColor: s.color }}
                />
              ))}
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {DISTRIBUTION.map((s) => (
                <li
                  key={s.label}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-paper/60 px-4 py-3"
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="text-[14px] font-medium text-ink">
                      {s.label}
                    </span>
                  </span>
                  <span className="font-display text-[15px] font-semibold tracking-tight text-ink-soft">
                    {s.value}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* 5. Utility -------------------------------------------------------- */}
      <section className="flex flex-col gap-6">
        <div>
          <span className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] text-ink-muted">
            <span className="h-px w-5 bg-brand" />
            Utility
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
            What $HOBBY does
          </h2>
        </div>

        <RevealGroup className="grid gap-5 sm:grid-cols-2">
          {UTILITY.map((u) => {
            const Icon = u.icon;
            return (
              <Card key={u.title}>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-iris text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">
                  {u.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">
                  {u.body}
                </p>
              </Card>
            );
          })}
        </RevealGroup>
      </section>

      {/* 6. Closing CTA ---------------------------------------------------- */}
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-14 text-paper sm:px-14 sm:py-16">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-sky/20 blur-3xl" />
        <div className="relative flex max-w-2xl flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-paper/15 bg-paper/5 px-3.5 py-1.5 text-[13px] font-medium tracking-tight text-paper/80">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Launching on Orynth
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.08] tracking-tightest">
            Be there when $HOBBY goes live.
          </h2>
          <p className="max-w-lg text-[15px] leading-relaxed text-paper/70">
            The public launch begins on Orynth. Join early to shape governance,
            earn rewards, and help hobby communities hatch on Solana.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Button
              href="#"
              size="lg"
              variant="secondary"
              className="border-transparent bg-paper text-ink hover:bg-white"
            >
              <span className="flex items-center gap-2">
                Join the launch <ArrowUpRight className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

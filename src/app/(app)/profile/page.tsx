"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Copy,
  Check,
  AtSign,
  Globe,
  Coins,
  Users,
  Star,
  Calendar,
  BadgeCheck,
  Sparkles,
  Trophy,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";

import { AuthGate } from "@/components/app/AuthGate";
import { CommunityCard } from "@/components/app/CommunityCard";
import { EmptyState } from "@/components/app/EmptyState";
import { GradientLogo, BannerGradient } from "@/components/app/GradientLogo";
import { Stat } from "@/components/ui/Stat";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

import { communities } from "@/data/communities";
import type { Community } from "@/data/communities";
import { useUiStore } from "@/store/useUiStore";
import { useHobbyStore } from "@/store/useHobbyStore";
import { formatNumber, formatUsd, formatPct, shortAddress } from "@/lib/format";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

const MEMBER_SINCE = "March 2026";

const TABS = [
  { id: "holdings", label: "Holdings" },
  { id: "communities", label: "Communities" },
  { id: "activity", label: "Activity" },
  { id: "about", label: "About" },
] as const;

type Holding = {
  c: Community;
  amount: number;
};

type Activity = {
  id: string;
  kind: "join" | "earn" | "upvote" | "post" | "fund" | "streak";
  seed: string;
  title: string;
  detail: string;
  time: string;
};

export default function ProfilePage() {
  return (
    <AuthGate
      title="Connect your wallet"
      description="Your HobbyHatch profile is your Solana wallet."
    >
      <ProfileContent />
    </AuthGate>
  );
}

function ProfileContent() {
  const { publicKey } = useWallet();
  const address = publicKey?.toBase58() ?? "";

  const followed = useUiStore((s) => s.followed);
  const created = useHobbyStore((s) => s.created);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("holdings");
  const [copied, setCopied] = useState(false);

  // Communities you're part of: the ones you created + the ones you follow.
  // Fall back to a small demo set so a fresh wallet is never empty.
  const followedRaw = useMemo(() => {
    const all = [...created, ...communities];
    const createdSlugs = new Set(created.map((c) => c.slug));
    return all.filter(
      (c) => createdSlugs.has(c.slug) || followed.includes(c.slug)
    );
  }, [followed, created]);
  const isDemo = followedRaw.length === 0;
  const myCommunities = isDemo ? communities.slice(0, 2) : followedRaw;

  // Deterministic mock holdings pulled from the member's communities plus a
  // couple of protocol positions, so the numbers feel personal but stable.
  const holdings = useMemo<Holding[]>(() => {
    const source = (myCommunities.length >= 4
      ? myCommunities
      : [...myCommunities, ...communities].filter(
          (c, i, arr) => arr.findIndex((x) => x.slug === c.slug) === i
        )
    ).slice(0, 4);
    const amounts = [12_400, 8_650, 5_120, 3_300];
    return source.map((c, i) => ({ c, amount: amounts[i] ?? 2_000 }));
  }, [myCommunities]);

  const holdingsTotal = holdings.reduce(
    (sum, h) => sum + h.amount * h.c.token.priceUsd,
    0
  );

  const displayName = address ? shortAddress(address, 4) : "Anonymous";

  const copy = () => {
    if (!address) return;
    void navigator.clipboard.writeText(address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const activity: Activity[] = useMemo(() => {
    const a = myCommunities[0];
    const b = myCommunities[1] ?? myCommunities[0];
    return [
      {
        id: "1",
        kind: "earn",
        seed: address || "sol",
        title: `Earned ${formatNumber(120)} ${a?.token.symbol ?? "GRAIN"}`,
        detail: `for contributing to ${a?.name ?? "Analog Collective"}`,
        time: "2h ago",
      },
      {
        id: "2",
        kind: "upvote",
        seed: "mira.sol",
        title: "Upvoted a discussion",
        detail: `“Best developer for pushed Tri-X?” in ${a?.name ?? "Analog Collective"}`,
        time: "6h ago",
      },
      {
        id: "3",
        kind: "post",
        seed: address || "post",
        title: "Started a discussion",
        detail: `“Feedback thread: my first render” in ${b?.name ?? "Lo-Fi Guild"}`,
        time: "1d ago",
      },
      {
        id: "4",
        kind: "fund",
        seed: "treasury",
        title: `Funded a treasury with ${formatNumber(400)} ${b?.token.symbol ?? "LOOP"}`,
        detail: `${b?.name ?? "Lo-Fi Guild"} community fund`,
        time: "3d ago",
      },
      {
        id: "5",
        kind: "streak",
        seed: "streak",
        title: "Hit a 12-week contribution streak",
        detail: "Consistency reward unlocked",
        time: "5d ago",
      },
      {
        id: "6",
        kind: "join",
        seed: b?.slug ?? "join",
        title: `Joined ${b?.name ?? "Lo-Fi Guild"}`,
        detail: `Now holding $${b?.token.symbol ?? "LOOP"}`,
        time: "1w ago",
      },
    ];
  }, [myCommunities, address]);

  return (
    <div className="space-y-10">
      {/* ── Profile header ─────────────────────────────────────────────── */}
      <Reveal>
        <div className="overflow-hidden rounded-[2rem] border border-line bg-white/70 shadow-soft backdrop-blur-sm">
          <BannerGradient
            from="#7C5CFC"
            via="#38BDF8"
            to="#14C69A"
            className="h-32 rounded-b-none sm:h-44"
          />

          <div className="px-6 pb-6 sm:px-8 sm:pb-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="-mt-14 sm:-mt-16">
                  <Avatar
                    seed={address || "hobbyhatch"}
                    size={88}
                    className="ring-4 ring-white shadow-lift"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="font-display text-2xl font-semibold tracking-tightest text-ink sm:text-3xl">
                      {displayName}
                    </h1>
                    <Badge dot={false} className="gap-1.5 text-brand">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Wallet
                    </Badge>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <button
                      onClick={copy}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/70 px-3 py-1.5 font-mono text-[13px] text-ink-soft transition-colors hover:border-ink/20 hover:text-ink"
                      title="Copy address"
                    >
                      <span className="hidden sm:inline">
                        {shortAddress(address, 8)}
                      </span>
                      <span className="sm:hidden">
                        {shortAddress(address, 4)}
                      </span>
                      {copied ? (
                        <Check className="h-3.5 w-3.5 text-mint" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-ink-faint transition-colors group-hover:text-ink" />
                      )}
                    </button>

                    <span className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted">
                      <Calendar className="h-3.5 w-3.5 text-ink-faint" />
                      Member since {MEMBER_SINCE}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="secondary" size="md">
                  Edit profile
                </Button>
                <Button variant="primary" size="md">
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── Stat row ───────────────────────────────────────────────────── */}
      <RevealGroup className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <RevealItem>
          <Stat
            label="Communities joined"
            value={formatNumber(myCommunities.length, false)}
            icon={<Users className="h-4 w-4" />}
          />
        </RevealItem>
        <RevealItem>
          <Stat
            label="Tokens held"
            value={formatUsd(holdingsTotal, { compact: true })}
            icon={<Coins className="h-4 w-4" />}
          />
        </RevealItem>
        <RevealItem>
          <Stat
            label="Reputation"
            value={formatNumber(1_240, false)}
            icon={<Star className="h-4 w-4" />}
          />
        </RevealItem>
        <RevealItem>
          <Stat
            label="Contributions"
            value={formatNumber(86, false)}
            icon={<Sparkles className="h-4 w-4" />}
          />
        </RevealItem>
      </RevealGroup>

      {/* ── Tabs ───────────────────────────────────────────────────────── */}
      <div>
        <Tabs
          tabs={TABS.map((t) => ({ id: t.id, label: t.label }))}
          value={tab}
          onChange={(id) => setTab(id as (typeof TABS)[number]["id"])}
        />

        <div className="mt-8">
          {tab === "holdings" && (
            <HoldingsPanel holdings={holdings} total={holdingsTotal} />
          )}

          {tab === "communities" && (
            <CommunitiesPanel communities={myCommunities} isDemo={isDemo} />
          )}

          {tab === "activity" && <ActivityPanel items={activity} />}

          {tab === "about" && (
            <AboutPanel
              address={address}
              community={myCommunities[0]}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */

function HoldingsPanel({
  holdings,
  total,
}: {
  holdings: Holding[];
  total: number;
}) {
  return (
    <Reveal className="overflow-hidden rounded-3xl border border-line bg-white/70 shadow-soft backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-line px-6 py-5">
        <div>
          <p className="text-[13px] font-medium text-ink-muted">
            Portfolio value
          </p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
            {formatUsd(total)}
          </p>
        </div>
        <Badge dot={false} className="text-mint">
          <Coins className="h-3.5 w-3.5" />
          {holdings.length} tokens
        </Badge>
      </div>

      <div className="hidden grid-cols-12 gap-4 px-6 py-3 text-[12px] font-medium uppercase tracking-wide text-ink-faint sm:grid">
        <span className="col-span-5">Token</span>
        <span className="col-span-3 text-right">Amount</span>
        <span className="col-span-2 text-right">Value</span>
        <span className="col-span-2 text-right">24h</span>
      </div>

      <ul className="divide-y divide-line">
        {holdings.map((h) => {
          const value = h.amount * h.c.token.priceUsd;
          const up = h.c.token.change24h >= 0;
          return (
            <li
              key={h.c.slug}
              className="grid grid-cols-2 items-center gap-4 px-6 py-4 transition-colors hover:bg-white/60 sm:grid-cols-12"
            >
              <div className="col-span-2 flex items-center gap-3 sm:col-span-5">
                <GradientLogo
                  from={h.c.logo.from}
                  to={h.c.logo.to}
                  glyph={h.c.logo.glyph}
                  size={40}
                />
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-ink">
                    ${h.c.token.symbol}
                  </p>
                  <p className="truncate text-[13px] text-ink-muted">
                    {h.c.name}
                  </p>
                </div>
              </div>

              <div className="col-span-1 text-right sm:col-span-3">
                <p className="text-[15px] font-medium text-ink">
                  {formatNumber(h.amount, false)}
                </p>
                <p className="text-[12px] text-ink-faint sm:hidden">
                  {formatUsd(value)}
                </p>
              </div>

              <div className="col-span-1 hidden text-right sm:block sm:col-span-2">
                <p className="text-[15px] font-medium text-ink">
                  {formatUsd(value)}
                </p>
              </div>

              <div className="col-span-1 hidden text-right sm:block sm:col-span-2">
                <span
                  className={cn(
                    "text-[14px] font-medium",
                    up ? "text-mint" : "text-rose-500"
                  )}
                >
                  {formatPct(h.c.token.change24h)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </Reveal>
  );
}

function CommunitiesPanel({
  communities: list,
  isDemo,
}: {
  communities: Community[];
  isDemo: boolean;
}) {
  if (list.length === 0) {
    return (
      <EmptyState
        icon={<Users className="h-5 w-5" />}
        title="No communities yet"
        description="Follow a hobby community to see it here. Your holdings and reputation grow as you take part."
        action={
          <Button href="/discover" variant="primary" size="md" arrow>
            Explore communities
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {isDemo && (
        <p className="text-[13px] text-ink-muted">
          Showing a preview of your communities — follow more from{" "}
          <a href="/discover" className="font-medium text-brand hover:underline">
            Discover
          </a>
          .
        </p>
      )}
      <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((c) => (
          <CommunityCard key={c.slug} c={c} />
        ))}
      </RevealGroup>
    </div>
  );
}

function ActivityIcon({ kind }: { kind: Activity["kind"] }) {
  const map = {
    join: Users,
    earn: Coins,
    upvote: Star,
    post: MessageSquare,
    fund: Sparkles,
    streak: Trophy,
  } as const;
  const Icon = map[kind];
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-brand">
      <Icon className="h-4 w-4" />
    </span>
  );
}

function ActivityPanel({ items }: { items: Activity[] }) {
  return (
    <Reveal className="rounded-3xl border border-line bg-white/70 p-6 shadow-soft backdrop-blur-sm sm:p-8">
      <RevealGroup className="relative space-y-1">
        <span
          className="absolute left-[18px] top-2 bottom-2 w-px bg-line"
          aria-hidden
        />
        {items.map((item) => (
          <RevealItem key={item.id}>
            <div className="relative flex items-start gap-4 py-3">
              <ActivityIcon kind={item.kind} />
              <div className="min-w-0 flex-1 pt-1">
                <p className="text-[15px] font-medium text-ink">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[14px] text-ink-muted">
                  {item.detail}
                </p>
              </div>
              <span className="shrink-0 pt-1 text-[13px] text-ink-faint">
                {item.time}
              </span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Reveal>
  );
}

function AboutPanel({
  address,
  community,
}: {
  address: string;
  community?: Community;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <Reveal className="lg:col-span-2">
        <div className="h-full rounded-3xl border border-line bg-white/70 p-6 shadow-soft backdrop-blur-sm sm:p-8">
          <h3 className="text-[13px] font-medium uppercase tracking-wide text-ink-faint">
            Bio
          </h3>
          <p className="mt-3 text-pretty text-[15px] leading-relaxed text-ink-soft">
            Builder and hobbyist collecting communities the way others collect
            records. Mostly here for film photography and lo-fi — occasionally
            funding a treasury, always up for a print swap. Everything I own and
            everything I&apos;ve shipped lives on-chain.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/70 px-4 py-2 text-[14px] font-medium text-ink-soft transition-colors hover:border-ink/20 hover:text-ink"
            >
              <AtSign className="h-4 w-4 text-sky" />
              @hobbyist
              <ArrowUpRight className="h-3.5 w-3.5 text-ink-faint" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/70 px-4 py-2 text-[14px] font-medium text-ink-soft transition-colors hover:border-ink/20 hover:text-ink"
            >
              <Globe className="h-4 w-4 text-mint" />
              hobbyist.xyz
              <ArrowUpRight className="h-3.5 w-3.5 text-ink-faint" />
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="h-full rounded-3xl border border-line bg-white/70 p-6 shadow-soft backdrop-blur-sm">
          <h3 className="text-[13px] font-medium uppercase tracking-wide text-ink-faint">
            Wallet details
          </h3>

          <dl className="mt-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[14px] text-ink-muted">Network</dt>
              <dd className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                Solana devnet
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-[14px] text-ink-muted">Address</dt>
              <dd className="max-w-[60%] break-all text-right font-mono text-[13px] text-ink-soft">
                {address}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[14px] text-ink-muted">Top holding</dt>
              <dd className="inline-flex items-center gap-2 text-[14px] font-medium text-ink">
                {community && (
                  <GradientLogo
                    from={community.logo.from}
                    to={community.logo.to}
                    glyph={community.logo.glyph}
                    size={20}
                    rounded="rounded-md"
                  />
                )}
                ${community?.token.symbol ?? "—"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[14px] text-ink-muted">Member since</dt>
              <dd className="text-[14px] font-medium text-ink">
                {MEMBER_SINCE}
              </dd>
            </div>
          </dl>

          <div className="mt-6 rounded-2xl border border-line bg-paper/60 p-4">
            <p className="text-[13px] leading-relaxed text-ink-muted">
              Your profile is fully owned by your wallet. Disconnect any time —
              nothing is stored off-chain.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Users,
  Coins,
  Wallet,
  AtSign,
  Globe,
  MessagesSquare,
  Check,
  Plus,
} from "lucide-react";

import { BannerGradient, GradientLogo } from "@/components/app/GradientLogo";
import { Tabs } from "@/components/ui/Tabs";
import { Stat } from "@/components/ui/Stat";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/app/EmptyState";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

import { useCommunity } from "@/hooks/useCommunities";
import { useUiStore } from "@/store/useUiStore";
import { useHobbyStore } from "@/store/useHobbyStore";
import { formatUsd, formatNumber, shortAddress } from "@/lib/format";
import { explorerAddress } from "@/lib/solana/token";
import type { Community } from "@/data/communities";
import { cn } from "@/lib/cn";
import { fadeUp, ease } from "@/lib/motion";

type TabId = "overview" | "timeline" | "discussions" | "treasury" | "roadmap";

export default function CommunityProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data, isLoading } = useCommunity(slug);
  const [tab, setTab] = useState<TabId>("overview");

  const isFollowing = useUiStore((s) => s.isFollowing);
  const toggleFollow = useUiStore((s) => s.toggleFollow);
  const following = isFollowing(slug);

  const joined = useHobbyStore((s) => s.joined.includes(slug));
  const joinCommunity = useHobbyStore((s) => s.joinCommunity);
  const leaveCommunity = useHobbyStore((s) => s.leaveCommunity);
  const extraDiscussionCount = useHobbyStore(
    (s) => s.extraDiscussions[slug]?.length ?? 0
  );

  if (isLoading) {
    return <HeroSkeleton />;
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-1 py-10">
        <EmptyState
          title="Community not found"
          description="We couldn't find a community at this address. It may have been renamed or hasn't launched yet."
          action={
            <Button href="/discover" arrow>
              Explore communities
            </Button>
          }
        />
      </div>
    );
  }

  const community: Community = data;
  const { token } = community;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "timeline", label: "Timeline", count: community.timeline.length },
    {
      id: "discussions",
      label: "Discussions",
      count: community.discussions.length + extraDiscussionCount,
    },
    { id: "treasury", label: "Treasury" },
    { id: "roadmap", label: "Roadmap", count: community.roadmap.length },
  ];

  return (
    <div className="mx-auto max-w-5xl px-1 pb-16">
      {/* HERO */}
      <Reveal>
        <div className="relative">
          <BannerGradient
            from={community.banner.from}
            via={community.banner.via}
            to={community.banner.to}
            className="h-40 rounded-3xl sm:h-56"
          />
          <div className="absolute -bottom-8 left-6 sm:left-8">
            <GradientLogo
              from={community.logo.from}
              to={community.logo.to}
              glyph={community.logo.glyph}
              size={88}
              rounded="rounded-3xl"
              className="ring-4 ring-white shadow-float"
            />
          </div>
        </div>
      </Reveal>

      <div className="mt-12 flex flex-col gap-6 px-1 sm:mt-14 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-3xl font-semibold tracking-tightest text-ink sm:text-4xl">
              {community.name}
            </h1>
            {community.verified && (
              <BadgeCheck className="h-6 w-6 shrink-0 text-brand" />
            )}
          </div>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
            {community.tagline}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Badge dot={false}>{community.category}</Badge>
            <span className="text-[13px] text-ink-faint">
              Created {community.createdLabel}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant={following ? "primary" : "secondary"}
              size="md"
              onClick={() => toggleFollow(slug)}
              className={cn(following && "bg-brand text-white hover:bg-brand-600")}
            >
              {following ? (
                <>
                  <Check className="h-4 w-4" /> Following
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" /> Follow
                </>
              )}
            </Button>
            <Button
              variant="primary"
              size="md"
              arrow={!joined}
              onClick={() => (joined ? leaveCommunity(slug) : joinCommunity(slug))}
            >
              {joined ? (
                <>
                  <Check className="h-4 w-4" /> Joined
                </>
              ) : (
                <>Join community</>
              )}
            </Button>
          </div>
          {(community.socials.x ||
            community.socials.discord ||
            community.socials.web) && (
            <div className="flex items-center gap-2">
              {community.socials.x && (
                <SocialLink href={community.socials.x} label="X / AtSign">
                  <AtSign className="h-4 w-4" />
                </SocialLink>
              )}
              {community.socials.discord && (
                <SocialLink href={community.socials.discord} label="Discord">
                  <MessagesSquare className="h-4 w-4" />
                </SocialLink>
              )}
              {community.socials.web && (
                <SocialLink href={community.socials.web} label="Website">
                  <Globe className="h-4 w-4" />
                </SocialLink>
              )}
            </div>
          )}
        </div>
      </div>

      {/* STAT ROW */}
      <RevealGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <RevealItem>
          <Stat
            label="Members"
            value={formatNumber(community.members + (joined ? 1 : 0))}
            icon={<Users className="h-4 w-4" />}
          />
        </RevealItem>
        <RevealItem>
          <Stat
            label={`$${token.symbol} price`}
            value={formatUsd(token.priceUsd)}
            change={token.change24h}
            icon={<Coins className="h-4 w-4" />}
          />
        </RevealItem>
        <RevealItem>
          <Stat
            label="Market cap"
            value={formatUsd(token.marketCapUsd, { compact: true })}
            icon={<Coins className="h-4 w-4" />}
          />
        </RevealItem>
        <RevealItem>
          <Stat
            label="Treasury"
            value={formatUsd(community.treasuryUsd, { compact: true })}
            icon={<Wallet className="h-4 w-4" />}
          />
        </RevealItem>
      </RevealGroup>

      {/* TABS */}
      <div className="mt-10">
        <Tabs
          tabs={tabs}
          value={tab}
          onChange={(id) => setTab(id as TabId)}
          className="max-w-full"
        />
      </div>

      <div className="mt-8">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
        >
          {tab === "overview" && <Overview community={community} />}
          {tab === "timeline" && <Timeline community={community} />}
          {tab === "discussions" && <Discussions community={community} />}
          {tab === "treasury" && <Treasury community={community} />}
          {tab === "roadmap" && <Roadmap community={community} />}
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- helpers */

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/70 text-ink-muted transition-colors hover:border-ink/15 hover:text-ink"
    >
      {children}
    </a>
  );
}

function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-line bg-white/70 p-7 shadow-soft backdrop-blur-sm sm:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- overview */

function Overview({ community }: { community: Community }) {
  const { token } = community;
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Panel className="lg:col-span-2">
        <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
          About {community.name}
        </h2>
        <p className="mt-4 text-[15px] leading-[1.85] text-ink-soft">
          {community.description}
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-7 sm:grid-cols-3">
          <Meta label="Category" value={community.category} />
          <Meta label="Created" value={community.createdLabel} />
          <Meta label="Members" value={formatNumber(community.members)} />
          <Meta
            label="Verified"
            value={community.verified ? "Yes" : "—"}
          />
          <Meta
            label="Treasury"
            value={formatUsd(community.treasuryUsd, { compact: true })}
          />
          <Meta label="Token" value={`$${token.symbol}`} />
        </dl>
      </Panel>

      <Panel>
        <div className="flex items-center gap-2">
          <Coins className="h-4 w-4 text-brand" />
          <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
            Token
          </h2>
        </div>
        <p className="mt-1 text-[13px] text-ink-faint">
          Get ${token.symbol}
        </p>

        <div className="mt-6 space-y-4">
          <TokenRow label="Price" value={formatUsd(token.priceUsd)} />
          <TokenRow
            label="24h"
            value={`${token.change24h >= 0 ? "+" : ""}${token.change24h.toFixed(1)}%`}
            valueClassName={
              token.change24h >= 0 ? "text-mint" : "text-rose-500"
            }
          />
          <TokenRow
            label="Market cap"
            value={formatUsd(token.marketCapUsd, { compact: true })}
          />
          <TokenRow label="Supply" value={formatNumber(token.supply)} />
          <TokenRow label="Holders" value={formatNumber(token.holders)} />
          {token.mintAddress && (
            <div className="flex items-center justify-between border-b border-line/70 pb-4 last:border-none last:pb-0">
              <span className="text-[14px] text-ink-muted">Mint</span>
              <a
                href={explorerAddress(token.mintAddress)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[13px] font-medium text-brand hover:underline"
              >
                {shortAddress(token.mintAddress, 4)} ↗
              </a>
            </div>
          )}
        </div>

        <div className="mt-7">
          <Button variant="primary" size="md" arrow className="w-full">
            Get ${token.symbol}
          </Button>
        </div>
      </Panel>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[12px] font-medium uppercase tracking-wide text-ink-faint">
        {label}
      </dt>
      <dd className="mt-1 text-[15px] font-medium text-ink">{value}</dd>
    </div>
  );
}

function TokenRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line/70 pb-4 last:border-none last:pb-0">
      <span className="text-[14px] text-ink-muted">{label}</span>
      <span
        className={cn(
          "font-display text-[15px] font-semibold text-ink",
          valueClassName
        )}
      >
        {value}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------- timeline */

function Timeline({ community }: { community: Community }) {
  return (
    <Panel>
      <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
        Recent activity
      </h2>
      <RevealGroup className="mt-6" staggerChildren={0.06}>
        <ul className="relative space-y-6">
          {community.timeline.map((item, i) => (
            <RevealItem key={`${item.author}-${i}`}>
              <li className="relative flex gap-4">
                {i < community.timeline.length - 1 && (
                  <span className="absolute left-5 top-11 h-[calc(100%-4px)] w-px bg-line" />
                )}
                <Avatar seed={item.author} size={40} />
                <div className="pt-0.5">
                  <p className="text-[15px] leading-relaxed text-ink">
                    <span className="font-semibold">{item.author}</span>{" "}
                    <span className="text-ink-soft">{item.action}</span>
                  </p>
                  <p className="mt-1 text-[13px] text-ink-faint">
                    {item.time} ago
                  </p>
                </div>
              </li>
            </RevealItem>
          ))}
        </ul>
      </RevealGroup>
    </Panel>
  );
}

/* ------------------------------------------------------------- discussions */

function Discussions({ community }: { community: Community }) {
  const { publicKey } = useWallet();
  const addDiscussion = useHobbyStore((s) => s.addDiscussion);
  const extra = useHobbyStore((s) => s.extraDiscussions[community.slug]);
  const [title, setTitle] = useState("");

  const items = [...(extra ?? []), ...community.discussions];
  const author = publicKey ? shortAddress(publicKey.toBase58()) : "you";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    addDiscussion(community.slug, t, author);
    setTitle("");
  };

  return (
    <div className="space-y-5">
      <form
        onSubmit={submit}
        className="flex flex-col gap-3 rounded-2xl border border-line bg-white/70 p-4 shadow-soft backdrop-blur-sm sm:flex-row sm:items-center"
      >
        <Avatar seed={author} size={40} />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Start a discussion…"
          className="h-11 flex-1 rounded-xl border border-line bg-paper px-4 text-[15px] text-ink placeholder:text-ink-faint focus:border-brand/50 focus:outline-none focus:ring-4 focus:ring-brand/10"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-[14px] font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-50"
        >
          Post
        </button>
      </form>

      {items.length === 0 ? (
        <EmptyState
          icon={<MessagesSquare className="h-5 w-5" />}
          title="No discussions yet"
          description="Be the first to start a conversation in this community."
        />
      ) : (
        <RevealGroup className="space-y-3" staggerChildren={0.06}>
          {items.map((d, i) => (
            <RevealItem key={`${d.title}-${i}`}>
              <div className="group flex items-center gap-4 rounded-2xl border border-line bg-white/70 p-5 shadow-soft backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-ink/10 hover:shadow-lift">
                <Avatar seed={d.author} size={44} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-ink group-hover:text-brand">
                    {d.title}
                  </p>
                  <p className="mt-0.5 text-[13px] text-ink-faint">
                    {d.author} · {d.time === "now" ? "just now" : `${d.time} ago`}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 text-ink-muted">
                  <MessagesSquare className="h-4 w-4" />
                  <span className="text-[14px] font-medium">{d.replies}</span>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- treasury */

const ALLOCATIONS = [
  { label: "Grants", pct: 40, className: "bg-brand" },
  { label: "Rewards", pct: 35, className: "bg-sky" },
  { label: "Operations", pct: 25, className: "bg-mint" },
] as const;

function Treasury({ community }: { community: Community }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Panel className="lg:col-span-2">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-brand" />
          <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
            Community treasury
          </h2>
        </div>
        <p className="mt-4 font-display text-4xl font-semibold tracking-tightest text-ink sm:text-5xl">
          {formatUsd(community.treasuryUsd)}
        </p>
        <p className="mt-2 text-[14px] text-ink-muted">
          Total value held on-chain and governed by ${community.token.symbol}{" "}
          holders.
        </p>

        <div className="mt-8 space-y-6">
          {ALLOCATIONS.map((a) => (
            <div key={a.label}>
              <div className="flex items-center justify-between text-[14px]">
                <span className="font-medium text-ink">{a.label}</span>
                <span className="text-ink-muted">{a.pct}%</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink/[0.06]">
                <motion.div
                  className={cn("h-full rounded-full", a.className)}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${a.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel>
        <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
          Governed by the community
        </h2>
        <p className="mt-4 text-[14px] leading-[1.8] text-ink-soft">
          Every allocation is proposed and ratified by ${community.token.symbol}{" "}
          holders. Funds move only through passed proposals — no single member
          controls the treasury.
        </p>
        <ul className="mt-6 space-y-3">
          {[
            "Transparent, on-chain accounting",
            "One-token, one-vote proposals",
            "Multisig execution on Solana",
          ].map((note) => (
            <li key={note} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
              <span className="text-[14px] text-ink-soft">{note}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ---------------------------------------------------------------- roadmap */

function Roadmap({ community }: { community: Community }) {
  return (
    <Panel>
      <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
        Roadmap
      </h2>
      <RevealGroup className="mt-7" staggerChildren={0.08}>
        <ol className="relative space-y-8">
          {community.roadmap.map((r, i) => (
            <RevealItem key={`${r.title}-${i}`}>
              <li className="relative flex gap-5 pl-1">
                {i < community.roadmap.length - 1 && (
                  <span className="absolute left-[11px] top-7 h-[calc(100%+8px)] w-px bg-line" />
                )}
                <span
                  className={cn(
                    "relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                    r.done
                      ? "border-brand bg-brand text-white"
                      : "border-line bg-paper text-transparent"
                  )}
                >
                  {r.done && <Check className="h-3.5 w-3.5" />}
                </span>
                <div className="pt-0.5">
                  <p className="text-[15px] font-semibold text-ink">
                    {r.title}
                  </p>
                  <p className="mt-1 text-[13px] font-medium text-ink-faint">
                    {r.period}
                  </p>
                </div>
              </li>
            </RevealItem>
          ))}
        </ol>
      </RevealGroup>
    </Panel>
  );
}

/* ---------------------------------------------------------------- skeleton */

function HeroSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-1 pb-16">
      <Skeleton className="h-40 w-full rounded-3xl sm:h-56" />
      <div className="mt-12 flex items-start gap-4 px-1 sm:mt-14">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-6 w-32 rounded-full" />
        </div>
        <Skeleton className="h-11 w-40 rounded-full" />
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="mt-10 h-11 w-full max-w-md rounded-full" />
      <Skeleton className="mt-8 h-72 w-full rounded-3xl" />
    </div>
  );
}

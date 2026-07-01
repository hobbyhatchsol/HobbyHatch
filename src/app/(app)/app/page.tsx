"use client";

import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { Sparkles, Users, Wallet, TrendingUp, ArrowUpRight } from "lucide-react";

import { PageHeader } from "@/components/app/PageHeader";
import { CommunityCard } from "@/components/app/CommunityCard";
import { Stat } from "@/components/ui/Stat";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/Skeleton";
import { RevealGroup } from "@/components/ui/Reveal";

import { useFeatured } from "@/hooks/useCommunities";
import { communities, trendingHobbies } from "@/data/communities";
import { formatNumber, formatUsd, shortAddress } from "@/lib/format";
import type { Community } from "@/data/communities";

// Derive plausible portfolio numbers from the mock data so nothing is invented.
const totalMembers = communities.reduce((sum, c) => sum + c.members, 0);
const totalMarketCap = communities.reduce(
  (sum, c) => sum + c.token.marketCapUsd,
  0
);
const followed = communities.filter((c) => c.trending || c.featured).length;
const portfolioValue = Math.round(totalMarketCap * 0.0021);
const hatchBalance = 12480;

// A blended, time-ordered activity feed from a few communities.
const activity = communities
  .slice(0, 4)
  .flatMap((c) =>
    c.timeline.slice(0, 2).map((t) => ({
      ...t,
      community: c.name,
      slug: c.slug,
    }))
  )
  .slice(0, 7);

export default function AppHomePage() {
  const { publicKey, connected } = useWallet();
  const address = publicKey?.toBase58();
  const featured = useFeatured();

  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        kicker="Welcome back"
        title="Your hobby economy, at a glance"
        description={
          connected && address
            ? `Signed in as ${shortAddress(address, 5)}. Here's what's moving across the communities you back on HobbyHatch.`
            : "Track the communities you back, your portfolio, and what's launching next across the HobbyHatch network."
        }
        actions={
          <Button href="/create" size="md" arrow>
            Launch your community
          </Button>
        }
      />

      {/* Stats */}
      <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Communities you follow"
          value={followed}
          icon={<Sparkles className="h-4 w-4" />}
        />
        <Stat
          label="Portfolio value"
          value={formatUsd(portfolioValue, { compact: true })}
          change={8.6}
          icon={<Wallet className="h-4 w-4" />}
        />
        <Stat
          label="Total members reached"
          value={formatNumber(totalMembers)}
          change={4.2}
          icon={<Users className="h-4 w-4" />}
        />
        <Stat
          label="$HOBBY balance"
          value={formatNumber(hatchBalance)}
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </RevealGroup>

      {/* Featured communities */}
      <section className="flex flex-col gap-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tightest text-ink">
              Featured communities
            </h2>
            <p className="mt-1 text-[14px] text-ink-muted">
              Hand-picked hobby economies gaining momentum this week.
            </p>
          </div>
          <Button href="/discover" variant="secondary" size="md" arrow>
            Browse all
          </Button>
        </div>

        {featured.isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-line bg-white/70 shadow-soft"
              >
                <Skeleton className="h-24 rounded-none" />
                <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
                  <Skeleton className="h-14 w-14 rounded-2xl" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="mt-2 h-8 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(featured.data ?? []).slice(0, 6).map((c: Community) => (
              <CommunityCard key={c.slug} c={c} />
            ))}
          </RevealGroup>
        )}
      </section>

      {/* Lower two-column area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent activity */}
        <RevealGroup className="lg:col-span-2">
          <Card interactive={false} className="p-0">
            <div className="flex items-center justify-between border-b border-line px-6 py-5 sm:px-8">
              <div>
                <h2 className="font-display text-lg font-semibold tracking-tightest text-ink">
                  Recent activity
                </h2>
                <p className="mt-0.5 text-[13px] text-ink-muted">
                  Across the communities you follow.
                </p>
              </div>
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-mint">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
                </span>
                Live
              </span>
            </div>

            <ul className="divide-y divide-line">
              {activity.map((a, i) => (
                <li
                  key={`${a.slug}-${i}`}
                  className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-paper/60 sm:px-8"
                >
                  <Avatar seed={a.author} size={40} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] leading-relaxed text-ink-soft">
                      <span className="font-semibold text-ink">
                        {a.author}
                      </span>{" "}
                      {a.action}
                    </p>
                    <p className="mt-0.5 text-[12px] text-ink-faint">
                      <Link
                        href={`/community/${a.slug}`}
                        className="font-medium text-ink-muted transition-colors hover:text-brand"
                      >
                        {a.community}
                      </Link>
                      <span className="mx-1.5">·</span>
                      {a.time} ago
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </RevealGroup>

        {/* Right rail */}
        <RevealGroup className="flex flex-col gap-6">
          {/* Trending hobbies */}
          <Card interactive={false}>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-brand" />
              <h2 className="font-display text-lg font-semibold tracking-tightest text-ink">
                Trending hobbies
              </h2>
            </div>
            <p className="mt-1 text-[13px] text-ink-muted">
              What the network is minting around right now.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {trendingHobbies.map((hobby) => (
                <Link
                  key={hobby}
                  href={`/discover?q=${encodeURIComponent(hobby)}`}
                  className="inline-flex items-center gap-1 rounded-full border border-line bg-paper/70 px-3.5 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-brand/40 hover:text-brand"
                >
                  {hobby}
                </Link>
              ))}
            </div>
          </Card>

          {/* Launch promo */}
          <Card className="border-brand/20 bg-gradient-to-br from-iris to-white">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-[12px] font-semibold text-brand">
              <Sparkles className="h-3.5 w-3.5" />
              Build on Solana
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tightest text-ink">
              Turn your hobby into an on-chain economy
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
              Spin up a tokenized community, fund a shared treasury, and reward
              members — all in a few minutes on Solana.
            </p>
            <div className="mt-5">
              <Button href="/create" size="md" arrow className="w-full">
                Start a community
              </Button>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[12px] text-ink-faint">
              <ArrowUpRight className="h-3.5 w-3.5" />
              {formatUsd(totalMarketCap, { compact: true })} in community market
              cap so far
            </div>
          </Card>
        </RevealGroup>
      </div>
    </div>
  );
}

"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, TrendingUp } from "lucide-react";

import { PageHeader } from "@/components/app/PageHeader";
import { CommunityCard } from "@/components/app/CommunityCard";
import { EmptyState } from "@/components/app/EmptyState";
import { RevealGroup } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCommunities } from "@/hooks/useCommunities";
import { categories, trendingHobbies } from "@/data/communities";
import type { Category } from "@/data/communities";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/cn";

type SortKey = "trending" | "newest" | "members" | "marketcap";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "trending", label: "Trending" },
  { value: "newest", label: "Newest" },
  { value: "members", label: "Most members" },
  { value: "marketcap", label: "Market cap" },
];

const totalCommunities = categories.reduce((sum, c) => sum + c.count, 0);

function DiscoverInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<Category | "All">("All");
  const [sort, setSort] = useState<SortKey>("trending");

  const filters = useMemo(
    () => ({ category, query: query.trim(), sort }),
    [category, query, sort]
  );

  const { data, isLoading, isError } = useCommunities(filters);

  const results = data ?? [];
  const resultCount = results.length;

  const pills: { name: Category | "All"; count: number }[] = useMemo(
    () => [{ name: "All", count: totalCommunities }, ...categories],
    []
  );

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        kicker="Discover"
        title="Find your people."
        description="Browse tokenized hobby communities on Solana — from film photographers to bedroom producers. Each one runs its own treasury, token and roadmap, all on-chain."
      />

      {/* Controls */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search communities, tokens or hobbies…"
              aria-label="Search communities"
              className="pl-11"
            />
          </div>
          <div className="relative shrink-0 sm:w-56">
            <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort communities"
              className="pl-11"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Category pills */}
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {pills.map((p) => {
            const active = category === p.name;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => setCategory(p.name)}
                className={cn(
                  "group inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13.5px] font-medium tracking-tight transition-colors duration-300",
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-white/70 text-ink-soft hover:border-ink/25 hover:text-ink"
                )}
              >
                {p.name}
                <span
                  className={cn(
                    "text-[12px] tabular-nums",
                    active ? "text-paper/60" : "text-ink-faint"
                  )}
                >
                  {formatNumber(p.count)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Trending hobbies */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-muted">
            <TrendingUp className="h-3.5 w-3.5 text-mint" />
            Trending
          </span>
          {trendingHobbies.map((hobby) => (
            <button
              key={hobby}
              type="button"
              onClick={() => setQuery(hobby)}
              className="rounded-full border border-line bg-paper/70 px-3 py-1 text-[13px] text-ink-muted transition-colors hover:border-brand/40 hover:text-brand"
            >
              {hobby}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <p className="text-[14px] text-ink-muted">
          {isLoading ? (
            "Loading communities…"
          ) : (
            <>
              <span className="font-medium text-ink tabular-nums">
                {resultCount}
              </span>{" "}
              {resultCount === 1 ? "community" : "communities"}
              {category !== "All" && (
                <>
                  {" "}
                  in <span className="text-ink">{category}</span>
                </>
              )}
            </>
          )}
        </p>
      </div>

      {/* Results grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-3xl" />
          ))}
        </div>
      ) : isError ? (
        <EmptyState
          icon={<Search className="h-5 w-5" />}
          title="Couldn't load communities"
          description="Something went wrong fetching the directory. Please try again."
          action={
            <Button variant="secondary" size="md" onClick={() => setQuery("")}>
              Reset search
            </Button>
          }
        />
      ) : resultCount === 0 ? (
        <EmptyState
          icon={<Search className="h-5 w-5" />}
          title="No communities found"
          description="Try a different search or category."
          action={
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => (
            <CommunityCard key={c.slug} c={c} />
          ))}
        </RevealGroup>
      )}
    </div>
  );
}

function DiscoverFallback() {
  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        kicker="Discover"
        title="Find your people."
        description="Browse tokenized hobby communities on Solana — from film photographers to bedroom producers. Each one runs its own treasury, token and roadmap, all on-chain."
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<DiscoverFallback />}>
      <DiscoverInner />
    </Suspense>
  );
}

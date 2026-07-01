"use client";

import { useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  LayoutDashboard,
  Users,
  Coins,
  Bell,
  FileText,
  Wallet,
  Plus,
  ArrowUpRight,
} from "lucide-react";

import { AuthGate } from "@/components/app/AuthGate";
import { PageHeader } from "@/components/app/PageHeader";
import { CommunityCard } from "@/components/app/CommunityCard";
import { EmptyState } from "@/components/app/EmptyState";
import { GradientLogo } from "@/components/app/GradientLogo";
import { Stat } from "@/components/ui/Stat";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

import { communities, type Community } from "@/data/communities";
import { useUiStore } from "@/store/useUiStore";
import { useHobbyStore } from "@/store/useHobbyStore";
import {
  formatNumber,
  formatUsd,
  formatPct,
  shortAddress,
} from "@/lib/format";
import { cn } from "@/lib/cn";

/* --- personal, wallet-scoped slices of the mock data layer --- */
// Fallback demo set so the dashboard isn't empty before you create anything.
const demoCommunities = communities.slice(0, 3);

type TabId =
  | "communities"
  | "drafts"
  | "followers"
  | "notifications"
  | "wallet";

type Draft = {
  name: string;
  category: string;
  updated: string;
  logo: { from: string; to: string; glyph: string };
};

const drafts: Draft[] = [
  {
    name: "Kiln & Clay",
    category: "Art",
    updated: "Edited 2 hours ago",
    logo: { from: "#F5C451", to: "#F59E0B", glyph: "◔" },
  },
  {
    name: "Dawn Patrol",
    category: "Fitness",
    updated: "Edited yesterday",
    logo: { from: "#14C69A", to: "#0E9B7A", glyph: "≈" },
  },
];

const followers: { handle: string; name: string; note: string }[] = [
  { handle: "mira.sol", name: "Mira", note: "Analog Collective" },
  { handle: "juno.sol", name: "Juno", note: "Lo-Fi Guild" },
  { handle: "vex.sol", name: "Vex", note: "Pixel Arena" },
  { handle: "sena.sol", name: "Sena", note: "Trail Tribe" },
  { handle: "pia.sol", name: "Pia", note: "Riso Club" },
  { handle: "ren.sol", name: "Ren", note: "Longform" },
];

type Notice = {
  id: string;
  text: string;
  time: string;
  unread: boolean;
  icon: React.ReactNode;
  tone: string;
};

const notifications: Notice[] = [
  {
    id: "n1",
    text: "Pixel Arena reached 10,000 members",
    time: "1h ago",
    unread: true,
    icon: <Users className="h-4 w-4" />,
    tone: "text-sky",
  },
  {
    id: "n2",
    text: "GRAIN is up 12.4% in the last 24 hours",
    time: "3h ago",
    unread: true,
    icon: <ArrowUpRight className="h-4 w-4" />,
    tone: "text-mint",
  },
  {
    id: "n3",
    text: "Your draft “Kiln & Clay” was saved",
    time: "5h ago",
    unread: false,
    icon: <FileText className="h-4 w-4" />,
    tone: "text-brand",
  },
  {
    id: "n4",
    text: "mira.sol funded the Analog treasury with 400 GRAIN",
    time: "Yesterday",
    unread: false,
    icon: <Coins className="h-4 w-4" />,
    tone: "text-sun",
  },
  {
    id: "n5",
    text: "juno.sol started following you",
    time: "2 days ago",
    unread: false,
    icon: <Bell className="h-4 w-4" />,
    tone: "text-brand",
  },
];

export default function DashboardPage() {
  const { publicKey } = useWallet();
  const { followed } = useUiStore();
  const created = useHobbyStore((s) => s.created);
  const address = publicKey?.toBase58();

  const [tab, setTab] = useState<TabId>("communities");

  // Your real communities once you've created any; otherwise a demo set.
  const myCommunities = created.length ? created : demoCommunities;

  const holdings = useMemo(
    () =>
      myCommunities.slice(0, 4).map((c, i) => {
        const amount = [8400, 15200, 3100, 5200][i] ?? 1000;
        return {
          symbol: c.token.symbol,
          logo: c.logo,
          name: c.name,
          amount,
          value: amount * (c.token.priceUsd || 0.01),
          change: c.token.change24h,
        };
      }),
    [myCommunities]
  );

  const membersReached = useMemo(
    () => myCommunities.reduce((sum, c) => sum + c.members, 0),
    [myCommunities]
  );
  const portfolioValue = useMemo(
    () => holdings.reduce((sum, h) => sum + h.value, 0),
    [holdings]
  );

  const tabs = [
    { id: "communities", label: "My Communities", count: myCommunities.length },
    { id: "drafts", label: "Drafts", count: drafts.length },
    { id: "followers", label: "Followers", count: followers.length },
    {
      id: "notifications",
      label: "Notifications",
      count: notifications.filter((n) => n.unread).length,
    },
    { id: "wallet", label: "Wallet" },
  ];

  return (
    <AuthGate
      title="Connect to view your dashboard"
      description="Your communities, drafts, followers and holdings live here — connect a Solana wallet to pick up where you left off."
    >
      <div className="space-y-10 pb-16">
        <PageHeader
          kicker="Dashboard"
          title="Welcome back, builder"
          description="A single place for the communities you run, the people who follow you, and the tokens you hold on HobbyHatch."
          actions={
            <Button href="/create" size="md" arrow>
              <Plus className="h-4 w-4" />
              New community
            </Button>
          }
        />

        {/* --- top stat row --- */}
        <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <RevealItem>
            <Stat
              label="My communities"
              value={formatNumber(myCommunities.length, false)}
              icon={<LayoutDashboard className="h-4 w-4" />}
            />
          </RevealItem>
          <RevealItem>
            <Stat
              label="Members reached"
              value={formatNumber(membersReached)}
              icon={<Users className="h-4 w-4" />}
            />
          </RevealItem>
          <RevealItem>
            <Stat
              label="Portfolio value"
              value={formatUsd(portfolioValue, { compact: true })}
              change={9.6}
              icon={<Coins className="h-4 w-4" />}
            />
          </RevealItem>
          <RevealItem>
            <Stat
              label="Notifications"
              value={formatNumber(
                notifications.filter((n) => n.unread).length,
                false
              )}
              icon={<Bell className="h-4 w-4" />}
            />
          </RevealItem>
        </RevealGroup>

        {/* --- tabbed workspace --- */}
        <Reveal className="space-y-6">
          <Tabs
            tabs={tabs}
            value={tab}
            onChange={(id) => setTab(id as TabId)}
          />

          {tab === "communities" && <MyCommunitiesTab items={myCommunities} />}
          {tab === "drafts" && <DraftsTab />}
          {tab === "followers" && <FollowersTab />}
          {tab === "notifications" && <NotificationsTab />}
          {tab === "wallet" && (
            <WalletTab
              address={address}
              followedCount={followed.length}
              holdings={holdings}
            />
          )}
        </Reveal>
      </div>
    </AuthGate>
  );
}

/* ------------------------------------------------------------------ */

function MyCommunitiesTab({ items }: { items: Community[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={<LayoutDashboard className="h-5 w-5" />}
        title="No communities yet"
        description="Spin up your first tokenized hobby community — it takes about two minutes."
        action={
          <Button href="/create" size="md" arrow>
            <Plus className="h-4 w-4" />
            New community
          </Button>
        }
      />
    );
  }

  return (
    <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((c) => (
        <RevealItem key={c.slug}>
          <CommunityCard c={c} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

function DraftsTab() {
  return (
    <div className="space-y-3">
      {drafts.map((d) => (
        <div
          key={d.name}
          className="flex flex-col gap-4 rounded-3xl border border-line bg-white/70 p-5 backdrop-blur-sm transition-colors hover:border-ink/15 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <GradientLogo
              from={d.logo.from}
              to={d.logo.to}
              glyph={d.logo.glyph}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <p className="truncate font-display text-[17px] font-semibold tracking-tight text-ink">
                  {d.name}
                </p>
                <Badge dot={false} className="px-2.5 py-1 text-[11px]">
                  Draft
                </Badge>
              </div>
              <p className="mt-1 text-[13px] text-ink-muted">
                {d.category} · {d.updated}
              </p>
            </div>
          </div>
          <Button href="/create" variant="secondary" size="md" arrow>
            Continue
          </Button>
        </div>
      ))}
    </div>
  );
}

function FollowersTab() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white/70 backdrop-blur-sm">
      <ul className="divide-y divide-line">
        {followers.map((f) => (
          <li
            key={f.handle}
            className="flex items-center justify-between gap-4 px-5 py-4"
          >
            <div className="flex min-w-0 items-center gap-3.5">
              <Avatar seed={f.handle} label={f.name} size={44} />
              <div className="min-w-0">
                <p className="truncate text-[15px] font-medium text-ink">
                  {f.handle}
                </p>
                <p className="mt-0.5 text-[13px] text-ink-muted">
                  Follows you · {f.note}
                </p>
              </div>
            </div>
            <Button variant="secondary" size="md" className="h-9 px-4 text-[13px]">
              Follow back
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NotificationsTab() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white/70 backdrop-blur-sm">
      <ul className="divide-y divide-line">
        {notifications.map((n) => (
          <li
            key={n.id}
            className={cn(
              "flex items-start gap-4 px-5 py-4 transition-colors",
              n.unread && "bg-brand/[0.035]"
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-paper",
                n.tone
              )}
            >
              {n.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] leading-relaxed text-ink">{n.text}</p>
              <p className="mt-0.5 text-[12px] text-ink-faint">{n.time}</p>
            </div>
            {n.unread && (
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

type Holding = {
  symbol: string;
  logo: Community["logo"];
  name: string;
  amount: number;
  value: number;
  change: number;
};

function WalletTab({
  address,
  followedCount,
  holdings,
}: {
  address?: string;
  followedCount: number;
  holdings: Holding[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* balances */}
      <div className="lg:col-span-1">
        <div className="rounded-3xl border border-line bg-white/70 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-iris text-brand">
              <Wallet className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-ink-muted">
                Connected wallet
              </p>
              <p className="font-mono text-[14px] text-ink">
                {address ? shortAddress(address, 4) : "—"}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-line bg-paper px-4 py-3.5">
              <span className="text-[14px] text-ink-muted">SOL</span>
              <span className="font-display text-[17px] font-semibold tracking-tight text-ink">
                42.18
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-line bg-paper px-4 py-3.5">
              <span className="text-[14px] text-ink-muted">$HOBBY</span>
              <span className="font-display text-[17px] font-semibold tracking-tight text-ink">
                {formatNumber(12_540)}
              </span>
            </div>
          </div>

          <p className="mt-5 text-[12px] leading-relaxed text-ink-faint">
            Following {formatNumber(followedCount, false)}{" "}
            {followedCount === 1 ? "community" : "communities"} · Built on Solana
          </p>
        </div>
      </div>

      {/* holdings table */}
      <div className="lg:col-span-2">
        <div className="overflow-hidden rounded-3xl border border-line bg-white/70 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <p className="text-[14px] font-semibold tracking-tight text-ink">
              Community holdings
            </p>
            <span className="text-[12px] text-ink-faint">
              {holdings.length} tokens
            </span>
          </div>
          <ul className="divide-y divide-line">
            {holdings.map((h) => (
              <li
                key={h.symbol}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <GradientLogo
                    from={h.logo.from}
                    to={h.logo.to}
                    glyph={h.logo.glyph}
                    size={38}
                    rounded="rounded-xl"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-medium text-ink">
                      {h.symbol}
                    </p>
                    <p className="mt-0.5 text-[12px] text-ink-muted">
                      {formatNumber(h.amount)} · {h.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-[15px] font-semibold tracking-tight text-ink">
                    {formatUsd(h.value, { compact: true })}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 text-[12px] font-medium",
                      h.change >= 0 ? "text-mint" : "text-rose-500"
                    )}
                  >
                    {formatPct(h.change)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

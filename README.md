# HobbyHatch

**The Protocol for the Hobby Economy.** A Solana-native protocol for creating tokenized, community-owned hobby economies. Its **$HOBBY** protocol token launches on **Orynth**.

This repo contains both the flagship marketing site and the full web application, sharing one editorial design language: warm-white canvas, holographic Solana-aligned accents (violet → cyan → mint), massive whitespace, rounded cards, and premium Framer Motion throughout.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **TailwindCSS** — custom design-token theme
- **Framer Motion** — reveals, parallax, floating elements, micro-interactions
- **Solana Wallet Adapter** (`@solana/wallet-adapter-*`) — wallet-based auth (Phantom, Solflare, Backpack via Wallet Standard)
- **TanStack Query** — data fetching/caching
- **Zustand** — light client state (follows, UI)
- **lucide-react** — icons; **next/font** — Bricolage Grotesque (display) + Inter (body)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

> The wallet adapter defaults to **Solana devnet**. Connect a Solana wallet to unlock gated pages.

## Routes

| Route | Description |
| --- | --- |
| `/` | Marketing landing page (hero, story, protocol, Solana, roadmap, CTA) |
| `/app` | Authenticated app home / overview |
| `/discover` | Browse, search & filter hobby communities |
| `/create` | Launch a new community (wallet-gated) — persists and appears across the app |
| `/community/[slug]` | Community profile — join, post discussions, tabs: overview/timeline/discussions/treasury/roadmap |
| `/dashboard` | Personal dashboard (my communities, drafts, followers, notifications, wallet) |
| `/profile` | Wallet profile (holdings, communities, activity) |
| `/token` | $HOBBY protocol token — launches on Orynth (price, chart, tokenomics, utility) |
| `/settings` | Preferences, notifications, wallet, appearance, security |

## Architecture

```
src/
  app/
    layout.tsx, page.tsx        # root layout (Providers) + landing
    (app)/                      # route group — shares the AppShell (sidebar + topbar + mobile nav)
      layout.tsx, app, discover, create, community/[slug],
      dashboard, profile, token, settings, loading.tsx
    not-found.tsx
  providers/                    # WalletProvider (Solana), QueryProvider, Providers
  store/                        # Zustand UI store
  data/                         # mock community data + async API + shapes
  hooks/                        # React Query hooks
  lib/                          # motion presets, formatters, cn, content
  components/
    brand/                      # Logo, Wordmark, BrandLoader
    ui/                         # Button, Card, Badge, Container, Section, Input, Modal,
                                # Avatar, Stat, Tabs, Skeleton, Reveal, SectionHeader, icons
    layout/                     # Navbar, Footer (landing)
    app/                        # AppShell, Sidebar, Topbar, MobileNav, WalletButton,
                                # AuthGate, PageHeader, CommunityCard, GradientLogo, EmptyState
    hero/ , sections/           # landing hero pieces + story sections
```

## Brand logo

The official HobbyHatch mark ships as a faithful **SVG recreation** at
[`public/brand/logo.svg`](public/brand/logo.svg) (favicon: `public/icon.svg`, OG: `public/brand/og.svg`),
used across navbar, footer, loading screen, auth screens, dashboard and metadata via the reusable
[`<Logo>`](src/components/brand/Logo.tsx) / `<Wordmark>` components.

To swap in an exact raster export of the attached PNG, drop it in `public/` and set
`NEXT_PUBLIC_LOGO_SRC=/your-logo.png` — the `<Logo>` component picks it up automatically
(with graceful fallback to the SVG). It is never distorted or recolored (square aspect, preserved).

## Notes

- Authentication is **wallet-based** — no email. `AuthGate` wraps pages that need an identity.
- Community/token data is mock (`src/data`) shaped like a real API, so pages can move to live Solana data without UI changes.
- **Functional flows** are wired through a persisted client store (`src/store/useHobbyStore.ts`): creating a community persists it and surfaces it in Discover / Dashboard / Profile and at its own URL; joining, following, posting discussions, and profile/notification settings all persist across reloads.
- Respects `prefers-reduced-motion`; GPU-friendly transform/opacity animations; responsive desktop → tablet → mobile.

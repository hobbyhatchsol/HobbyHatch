import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Community, Category } from "@/data/communities";

export type Discussion = {
  author: string;
  title: string;
  replies: number;
  time: string;
};

export type CreateCommunityInput = {
  name: string;
  slug?: string;
  tagline: string;
  description: string;
  category: Category;
  logoFrom: string;
  logoTo: string;
  bannerFrom: string;
  bannerVia: string;
  bannerTo: string;
  glyph: string;
  tokenOn: boolean;
  tokenSymbol?: string;
  tokenSupply?: number;
  mintAddress?: string;
  x?: string;
  discord?: string;
  web?: string;
  visibility?: "public" | "unlisted";
  creator?: string;
};

export type ProfileData = {
  displayName: string;
  bio: string;
  x: string;
  website: string;
};

type HobbyState = {
  created: Community[];
  joined: string[];
  extraDiscussions: Record<string, Discussion[]>;
  profile: ProfileData;
  notifications: Record<string, boolean>;

  createCommunity: (input: CreateCommunityInput) => Community;
  joinCommunity: (slug: string) => void;
  leaveCommunity: (slug: string) => void;
  isJoined: (slug: string) => boolean;
  addDiscussion: (slug: string, title: string, author: string) => void;
  discussionsFor: (slug: string, seed: Discussion[]) => Discussion[];
  updateProfile: (patch: Partial<ProfileData>) => void;
  setNotification: (key: string, value: boolean) => void;
};

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

const DEFAULT_NOTIFICATIONS: Record<string, boolean> = {
  followers: true,
  activity: true,
  price: false,
  governance: true,
  launch: true,
  product: false,
};

export const useHobbyStore = create<HobbyState>()(
  persist(
    (set, get) => ({
      created: [],
      joined: [],
      extraDiscussions: {},
      profile: { displayName: "", bio: "", x: "", website: "" },
      notifications: DEFAULT_NOTIFICATIONS,

      createCommunity: (input) => {
        const existing = new Set([
          ...get().created.map((c) => c.slug),
        ]);
        let slug = input.slug?.trim() || slugify(input.name);
        if (!slug) slug = `community-${existing.size + 1}`;
        let unique = slug;
        let i = 2;
        while (existing.has(unique)) unique = `${slug}-${i++}`;

        const supply = input.tokenSupply && input.tokenSupply > 0 ? input.tokenSupply : 1_000_000;
        const price = 0.01;

        const community: Community = {
          slug: unique,
          name: input.name.trim() || "Untitled Community",
          tagline: input.tagline.trim() || "A new hobby community",
          category: input.category,
          description:
            input.description.trim() ||
            "A brand-new community on HobbyHatch. Add a description to tell people what it's about.",
          logo: { from: input.logoFrom, to: input.logoTo, glyph: input.glyph || "◆" },
          banner: { from: input.bannerFrom, via: input.bannerVia, to: input.bannerTo },
          token: {
            symbol: (input.tokenOn && input.tokenSymbol ? input.tokenSymbol : input.name.slice(0, 4))
              .toUpperCase()
              .replace(/[^A-Z0-9]/g, "") || "TOKEN",
            priceUsd: input.tokenOn ? price : 0,
            change24h: 0,
            marketCapUsd: input.tokenOn ? supply * price : 0,
            holders: 1,
            supply,
            mintAddress: input.mintAddress,
          },
          members: 1,
          treasuryUsd: 0,
          createdLabel: "just now",
          featured: false,
          trending: false,
          verified: false,
          socials: {
            x: input.x || undefined,
            discord: input.discord || undefined,
            web: input.web || undefined,
          },
          roadmap: [
            { title: "Community created", period: "Now", done: true },
            { title: "First 100 members", period: "Soon", done: false },
            { title: input.tokenOn ? "Token distribution" : "Launch token", period: "Later", done: false },
          ],
          timeline: [
            {
              author: input.creator || "you",
              action: "created the community",
              time: "now",
            },
          ],
          discussions: [],
        };

        set((s) => ({ created: [community, ...s.created], joined: [unique, ...s.joined] }));
        return community;
      },

      joinCommunity: (slug) =>
        set((s) =>
          s.joined.includes(slug) ? s : { joined: [slug, ...s.joined] }
        ),
      leaveCommunity: (slug) =>
        set((s) => ({ joined: s.joined.filter((x) => x !== slug) })),
      isJoined: (slug) => get().joined.includes(slug),

      addDiscussion: (slug, title, author) =>
        set((s) => ({
          extraDiscussions: {
            ...s.extraDiscussions,
            [slug]: [
              { author, title, replies: 0, time: "now" },
              ...(s.extraDiscussions[slug] ?? []),
            ],
          },
        })),
      discussionsFor: (slug, seed) => [
        ...(get().extraDiscussions[slug] ?? []),
        ...seed,
      ],

      updateProfile: (patch) =>
        set((s) => ({ profile: { ...s.profile, ...patch } })),
      setNotification: (key, value) =>
        set((s) => ({ notifications: { ...s.notifications, [key]: value } })),
    }),
    {
      name: "hobbyhatch-store",
      partialize: (s) => ({
        created: s.created,
        joined: s.joined,
        extraDiscussions: s.extraDiscussions,
        profile: s.profile,
        notifications: s.notifications,
      }),
    }
  )
);

/** Read user-created communities outside React (for the mock API layer). */
export function getCreatedCommunities(): Community[] {
  return useHobbyStore.getState().created;
}

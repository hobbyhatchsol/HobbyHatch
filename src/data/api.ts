import { communities, type Community, type Category } from "./communities";
import { getCreatedCommunities } from "@/store/useHobbyStore";

// Simulated async data access — mimics latency of a real API so React Query
// caching, loading and error states behave realistically. User-created
// communities (from the persisted client store) are merged in ahead of the seed.
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function allCommunities(): Community[] {
  return [...getCreatedCommunities(), ...communities];
}

export async function fetchCommunities(filters?: {
  category?: Category | "All";
  query?: string;
  sort?: "trending" | "newest" | "members" | "marketcap";
}): Promise<Community[]> {
  await delay(320);
  let list = allCommunities();
  const { category, query, sort } = filters ?? {};

  if (category && category !== "All") {
    list = list.filter((c) => c.category === category);
  }
  if (query) {
    const q = query.toLowerCase();
    list = list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.token.symbol.toLowerCase().includes(q)
    );
  }
  switch (sort) {
    case "members":
      list.sort((a, b) => b.members - a.members);
      break;
    case "marketcap":
      list.sort((a, b) => b.token.marketCapUsd - a.token.marketCapUsd);
      break;
    case "newest": {
      // User-created communities are newest; keep them first, seed after.
      const createdSlugs = new Set(getCreatedCommunities().map((c) => c.slug));
      list.sort(
        (a, b) => Number(createdSlugs.has(b.slug)) - Number(createdSlugs.has(a.slug))
      );
      break;
    }
    default:
      list.sort(
        (a, b) => Number(b.trending ?? false) - Number(a.trending ?? false)
      );
  }
  return list;
}

export async function fetchCommunity(slug: string): Promise<Community | null> {
  await delay(280);
  return allCommunities().find((c) => c.slug === slug) ?? null;
}

export async function fetchFeatured(): Promise<Community[]> {
  await delay(260);
  const created = getCreatedCommunities();
  const featured = communities.filter((c) => c.featured);
  // Surface freshly created communities first so a new launch feels alive.
  return [...created.slice(0, 2), ...featured].slice(0, 6);
}

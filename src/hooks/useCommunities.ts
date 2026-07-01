"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchCommunities,
  fetchCommunity,
  fetchFeatured,
} from "@/data/api";
import type { Category } from "@/data/communities";

export type CommunityFilters = {
  category?: Category | "All";
  query?: string;
  sort?: "trending" | "newest" | "members" | "marketcap";
};

export function useCommunities(filters: CommunityFilters = {}) {
  return useQuery({
    queryKey: ["communities", filters],
    queryFn: () => fetchCommunities(filters),
  });
}

export function useCommunity(slug: string) {
  return useQuery({
    queryKey: ["community", slug],
    queryFn: () => fetchCommunity(slug),
    enabled: !!slug,
  });
}

export function useFeatured() {
  return useQuery({ queryKey: ["featured"], queryFn: fetchFeatured });
}

/** Invalidate all community-related queries after a mutation (create/join). */
export function useRefreshCommunities() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: ["communities"] });
    qc.invalidateQueries({ queryKey: ["featured"] });
    qc.invalidateQueries({ queryKey: ["community"] });
  };
}

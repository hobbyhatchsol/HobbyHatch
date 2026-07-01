import { create } from "zustand";
import { persist } from "zustand/middleware";

type UiState = {
  sidebarOpen: boolean; // mobile drawer
  setSidebarOpen: (v: boolean) => void;
  followed: string[]; // community slugs
  toggleFollow: (slug: string) => void;
  isFollowing: (slug: string) => boolean;
};

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      sidebarOpen: false,
      setSidebarOpen: (v) => set({ sidebarOpen: v }),
      followed: [],
      toggleFollow: (slug) =>
        set((s) => ({
          followed: s.followed.includes(slug)
            ? s.followed.filter((x) => x !== slug)
            : [...s.followed, slug],
        })),
      isFollowing: (slug) => get().followed.includes(slug),
    }),
    { name: "hobbyhatch-ui", partialize: (s) => ({ followed: s.followed }) }
  )
);

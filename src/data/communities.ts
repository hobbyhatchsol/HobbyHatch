// Mock data layer for the HobbyHatch application. Shapes mirror what a real
// Solana-backed API would return, so pages can swap to live data later.

export type Category =
  | "Photography"
  | "Music"
  | "Gaming"
  | "Fitness"
  | "Travel"
  | "Cooking"
  | "Writing"
  | "Art";

export type Community = {
  slug: string;
  name: string;
  tagline: string;
  category: Category;
  description: string;
  logo: { from: string; to: string; glyph: string };
  banner: { from: string; via: string; to: string };
  token: {
    symbol: string;
    priceUsd: number;
    change24h: number;
    marketCapUsd: number;
    holders: number;
    supply: number;
    mintAddress?: string;
  };
  members: number;
  treasuryUsd: number;
  createdLabel: string;
  featured?: boolean;
  trending?: boolean;
  verified?: boolean;
  socials: { x?: string; discord?: string; web?: string };
  roadmap: { title: string; period: string; done: boolean }[];
  timeline: { author: string; action: string; time: string }[];
  discussions: { author: string; title: string; replies: number; time: string }[];
};

export const categories: { name: Category; count: number }[] = [
  { name: "Photography", count: 218 },
  { name: "Music", count: 342 },
  { name: "Gaming", count: 511 },
  { name: "Fitness", count: 176 },
  { name: "Travel", count: 143 },
  { name: "Cooking", count: 129 },
  { name: "Writing", count: 98 },
  { name: "Art", count: 264 },
];

const g = {
  violet: { from: "#7C5CFC", to: "#5B37D6" },
  sky: { from: "#38BDF8", to: "#0EA5E9" },
  mint: { from: "#14C69A", to: "#0E9B7A" },
  sun: { from: "#F5C451", to: "#F59E0B" },
  rose: { from: "#FB7EA8", to: "#EC4899" },
  teal: { from: "#7FE7D9", to: "#22B8A6" },
};

export const communities: Community[] = [
  {
    slug: "analog-collective",
    name: "Analog Collective",
    tagline: "Film photography, on-chain",
    category: "Photography",
    description:
      "A community of analog photographers preserving the craft of film. Members share darkroom techniques, trade prints and fund community film stock through the treasury.",
    logo: { ...g.violet, glyph: "◐" },
    banner: { from: "#7C5CFC", via: "#8B7CF6", to: "#38BDF8" },
    token: { symbol: "GRAIN", priceUsd: 0.184, change24h: 12.4, marketCapUsd: 2_400_000, holders: 4820, supply: 13_000_000 },
    members: 6120,
    treasuryUsd: 184_000,
    createdLabel: "8 months ago",
    featured: true,
    trending: true,
    verified: true,
    socials: { x: "#", discord: "#", web: "#" },
    roadmap: [
      { title: "Genesis mint", period: "Live", done: true },
      { title: "Print marketplace", period: "Q3 2026", done: false },
      { title: "Community darkroom grants", period: "Q4 2026", done: false },
    ],
    timeline: [
      { author: "mira.sol", action: "funded the film-stock treasury with 400 GRAIN", time: "2h" },
      { author: "leon", action: "published a darkroom guide", time: "6h" },
      { author: "aya", action: "joined Analog Collective", time: "1d" },
    ],
    discussions: [
      { author: "mira.sol", title: "Best developer for pushed Tri-X?", replies: 28, time: "3h" },
      { author: "kaz", title: "Community print swap #4 — sign up", replies: 61, time: "1d" },
    ],
  },
  {
    slug: "lofi-guild",
    name: "Lo-Fi Guild",
    tagline: "Producers building in public",
    category: "Music",
    description:
      "Bedroom producers pooling samples, splitting royalties on-chain and mentoring newcomers. The guild treasury funds sample packs everyone co-owns.",
    logo: { ...g.rose, glyph: "♪" },
    banner: { from: "#FB7EA8", via: "#B7A6F3", to: "#7C5CFC" },
    token: { symbol: "LOOP", priceUsd: 0.052, change24h: -3.1, marketCapUsd: 890_000, holders: 3110, supply: 17_000_000 },
    members: 4380,
    treasuryUsd: 96_500,
    createdLabel: "5 months ago",
    featured: true,
    trending: true,
    verified: true,
    socials: { x: "#", discord: "#" },
    roadmap: [
      { title: "Shared sample vault", period: "Live", done: true },
      { title: "On-chain royalty splits", period: "Q3 2026", done: false },
      { title: "Guild label launch", period: "2027", done: false },
    ],
    timeline: [
      { author: "juno", action: "released pack 'Rain Tapes Vol. 2'", time: "4h" },
      { author: "sable", action: "earned 120 LOOP for mentoring", time: "9h" },
    ],
    discussions: [
      { author: "juno", title: "Splitting royalties for the compilation", replies: 34, time: "5h" },
      { author: "mel", title: "Feedback thread: my first beat", replies: 47, time: "2d" },
    ],
  },
  {
    slug: "pixel-arena",
    name: "Pixel Arena",
    tagline: "Indie game night, every night",
    category: "Gaming",
    description:
      "A competitive community for indie multiplayer games. Ladders, tournaments and prize pools all settle in the community token.",
    logo: { ...g.sky, glyph: "◈" },
    banner: { from: "#38BDF8", via: "#7C5CFC", to: "#14C69A" },
    token: { symbol: "ARENA", priceUsd: 0.311, change24h: 27.8, marketCapUsd: 5_600_000, holders: 9240, supply: 18_000_000 },
    members: 12840,
    treasuryUsd: 420_000,
    createdLabel: "11 months ago",
    featured: true,
    trending: true,
    verified: true,
    socials: { x: "#", discord: "#", web: "#" },
    roadmap: [
      { title: "Season 1 ladder", period: "Live", done: true },
      { title: "Prize-pool automation", period: "Q3 2026", done: true },
      { title: "Creator tournaments", period: "Q4 2026", done: false },
    ],
    timeline: [
      { author: "vex", action: "won the weekly cup (+800 ARENA)", time: "1h" },
      { author: "nova", action: "opened a bracket for Friday", time: "7h" },
    ],
    discussions: [
      { author: "vex", title: "Meta shifts after the balance patch", replies: 88, time: "2h" },
      { author: "ki", title: "LFG — ranked duos this weekend", replies: 52, time: "1d" },
    ],
  },
  {
    slug: "trail-tribe",
    name: "Trail Tribe",
    tagline: "Run further, together",
    category: "Fitness",
    description:
      "Trail runners logging miles, sharing routes and rewarding consistency. Verified runs earn tokens that fund community race entries.",
    logo: { ...g.mint, glyph: "▲" },
    banner: { from: "#14C69A", via: "#7FE7D9", to: "#38BDF8" },
    token: { symbol: "MILE", priceUsd: 0.089, change24h: 6.2, marketCapUsd: 1_300_000, holders: 5410, supply: 15_000_000 },
    members: 7260,
    treasuryUsd: 142_000,
    createdLabel: "6 months ago",
    trending: true,
    verified: true,
    socials: { x: "#", web: "#" },
    roadmap: [
      { title: "Run verification", period: "Live", done: true },
      { title: "Route marketplace", period: "Q4 2026", done: false },
      { title: "Sponsored races", period: "2027", done: false },
    ],
    timeline: [
      { author: "sena", action: "logged a 21km run (+42 MILE)", time: "3h" },
      { author: "dario", action: "created route 'Ridgeline Loop'", time: "1d" },
    ],
    discussions: [
      { author: "sena", title: "Zone 2 training — does it work for trails?", replies: 19, time: "8h" },
    ],
  },
  {
    slug: "slow-roads",
    name: "Slow Roads",
    tagline: "Travel that isn't in a hurry",
    category: "Travel",
    description:
      "Slow-travel storytellers sharing itineraries, local guides and photo essays. The treasury funds member-written city guides.",
    logo: { ...g.sun, glyph: "❋" },
    banner: { from: "#F5C451", via: "#FB7EA8", to: "#7C5CFC" },
    token: { symbol: "ROAM", priceUsd: 0.127, change24h: 2.0, marketCapUsd: 1_050_000, holders: 2870, supply: 9_000_000 },
    members: 3910,
    treasuryUsd: 71_000,
    createdLabel: "4 months ago",
    verified: true,
    socials: { x: "#", discord: "#" },
    roadmap: [
      { title: "Guide standard", period: "Live", done: true },
      { title: "Local host program", period: "Q1 2027", done: false },
    ],
    timeline: [
      { author: "ivo", action: "published 'Lisbon in 5 days'", time: "5h" },
    ],
    discussions: [
      { author: "ivo", title: "Underrated slow-travel cities?", replies: 41, time: "1d" },
    ],
  },
  {
    slug: "ferment",
    name: "Ferment",
    tagline: "Home cooks fermenting everything",
    category: "Cooking",
    description:
      "A cooking community obsessed with fermentation. Members trade cultures, publish recipes and vote on the next community cookbook.",
    logo: { ...g.teal, glyph: "✿" },
    banner: { from: "#7FE7D9", via: "#14C69A", to: "#38BDF8" },
    token: { symbol: "CRUM", priceUsd: 0.041, change24h: -1.4, marketCapUsd: 540_000, holders: 1990, supply: 12_000_000 },
    members: 2740,
    treasuryUsd: 38_500,
    createdLabel: "3 months ago",
    socials: { discord: "#" },
    roadmap: [
      { title: "Recipe registry", period: "Live", done: true },
      { title: "Community cookbook", period: "Q4 2026", done: false },
    ],
    timeline: [
      { author: "bo", action: "added a miso recipe", time: "6h" },
    ],
    discussions: [
      { author: "bo", title: "Rescuing an over-salted batch", replies: 12, time: "2d" },
    ],
  },
  {
    slug: "longform",
    name: "Longform",
    tagline: "Writers shipping weekly",
    category: "Writing",
    description:
      "An accountability community for writers. Weekly shipping streaks earn tokens; the treasury funds a rotating writer-in-residence.",
    logo: { ...g.violet, glyph: "✎" },
    banner: { from: "#7C5CFC", via: "#38BDF8", to: "#14C69A" },
    token: { symbol: "DRAFT", priceUsd: 0.066, change24h: 4.4, marketCapUsd: 720_000, holders: 2410, supply: 11_000_000 },
    members: 3180,
    treasuryUsd: 54_000,
    createdLabel: "5 months ago",
    verified: true,
    socials: { x: "#", web: "#" },
    roadmap: [
      { title: "Shipping streaks", period: "Live", done: true },
      { title: "Writer-in-residence", period: "Q3 2026", done: false },
    ],
    timeline: [
      { author: "ren", action: "hit a 12-week streak", time: "2h" },
    ],
    discussions: [
      { author: "ren", title: "How do you outline longform?", replies: 23, time: "1d" },
    ],
  },
  {
    slug: "riso-club",
    name: "Riso Club",
    tagline: "Risograph printers & illustrators",
    category: "Art",
    description:
      "Illustrators and riso printers sharing color separations, running print drops and co-owning a community press.",
    logo: { ...g.rose, glyph: "◆" },
    banner: { from: "#FB7EA8", via: "#F5C451", to: "#7C5CFC" },
    token: { symbol: "INK", priceUsd: 0.152, change24h: 9.1, marketCapUsd: 1_600_000, holders: 3560, supply: 10_500_000 },
    members: 4590,
    treasuryUsd: 88_000,
    createdLabel: "7 months ago",
    trending: true,
    verified: true,
    socials: { x: "#", discord: "#", web: "#" },
    roadmap: [
      { title: "Print drops", period: "Live", done: true },
      { title: "Shared press fund", period: "Q4 2026", done: false },
    ],
    timeline: [
      { author: "pia", action: "launched a 2-color drop", time: "4h" },
    ],
    discussions: [
      { author: "pia", title: "Trapping tips for 3-color riso", replies: 17, time: "1d" },
    ],
  },
];

export const trendingHobbies = [
  "Film photography",
  "Lo-fi production",
  "Trail running",
  "Risograph",
  "Fermentation",
  "Speedrunning",
  "Slow travel",
  "Longform writing",
];

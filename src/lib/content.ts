// Single source of truth for all landing-page copy and structured content.
// HobbyHatch is a Solana-native protocol. Its $HOBBY protocol token launches on Orynth.

export const hobbies = [
  { id: "photography", label: "Photography", hue: "#8FD3F4", hue2: "#7FE7D9" },
  { id: "music", label: "Music", hue: "#B7A6F3", hue2: "#8FD3F4" },
  { id: "gaming", label: "Gaming", hue: "#7FE7D9", hue2: "#FCE38A" },
  { id: "cooking", label: "Cooking", hue: "#FCE38A", hue2: "#F5A97F" },
  { id: "travel", label: "Travel", hue: "#8FD3F4", hue2: "#B7A6F3" },
  { id: "fitness", label: "Fitness", hue: "#7FE7D9", hue2: "#8FD3F4" },
] as const;

export const heroStats = [
  { value: "10K+", label: "Builders onboarded" },
  { value: "$40M+", label: "Community value" },
  { value: "400ms", label: "Slot finality" },
] as const;

export const trustBadges = [
  { text: "Built on Solana", tone: "brand" as const },
  { text: "$HOBBY on Orynth", tone: "brand" as const },
  { text: "Open Protocol", tone: "ink" as const },
  { text: "Community Owned", tone: "ink" as const },
];

export const economyPoints = [
  {
    k: "01",
    title: "Passion is the new capital",
    body: "Billions of people pour time, craft and identity into hobbies. That devotion already creates value — it just has nowhere to accrue.",
  },
  {
    k: "02",
    title: "Communities are the new companies",
    body: "The tightest markets on earth form around shared obsession. A hobby community out-cares any brand, but owns none of the upside.",
  },
  {
    k: "03",
    title: "Every hobby wants an economy",
    body: "From analog film to trail running, each niche has a currency of reputation and contribution. HobbyHatch makes it real and ownable on Solana.",
  },
];

export const solutionPillars = [
  {
    title: "A protocol, not a platform",
    body: "HobbyHatch is neutral Solana infrastructure. No gatekeeping, no rent extraction — just open rails any hobby community can build on.",
  },
  {
    title: "Ownership by default",
    body: "Value flows to the people who create it. Members hold their community's token, treasury and direction from day one.",
  },
  {
    title: "Composable by design",
    body: "Communities, tokens and reputation are open primitives. Anyone can extend a hobby economy the way anyone can build on Solana.",
  },
];

export const steps = [
  {
    n: "1",
    title: "Create your hobby",
    body: "Set up your community — banner, logo, description and categories — and define how contribution turns into reward.",
  },
  {
    n: "2",
    title: "Launch your community",
    body: "Bring your community live on HobbyHatch. Members join, contribute and earn reputation from the start.",
  },
  {
    n: "3",
    title: "Launch a token",
    body: "Mint a community token on Solana backed by real participation. Fund a treasury and align everyone's upside.",
  },
  {
    n: "4",
    title: "Grow together",
    body: "Govern collectively, reward contributors and compound value as the economy grows — owned by its people.",
  },
];

export const features = [
  {
    title: "Communities",
    body: "Native membership, roles and shared treasuries for every hobby collective.",
    icon: "community" as const,
  },
  {
    title: "Tokenization",
    body: "Issue SPL tokens backed by contribution — not speculation — with built-in guardrails.",
    icon: "token" as const,
  },
  {
    title: "Governance",
    body: "Transparent, on-chain decisions. Every member has a voice and a vote.",
    icon: "governance" as const,
  },
  {
    title: "Marketplace",
    body: "Trade goods, access and creations natively between hobby economies.",
    icon: "marketplace" as const,
  },
  {
    title: "Blueprints",
    body: "Composable templates that turn any hobby into a working economy in minutes.",
    icon: "blueprint" as const,
  },
  {
    title: "Reputation",
    body: "Portable, earned reputation that follows contributors across every economy.",
    icon: "reputation" as const,
  },
];

export const solanaReasons = [
  { value: "65,000+", label: "Transactions per second", note: "Throughput for real communities." },
  { value: "~$0.0003", label: "Median fee", note: "Micro-contributions stay viable." },
  { value: "400ms", label: "Slot finality", note: "Interactions feel instant." },
  { value: "Global", label: "Creator economy", note: "A worldwide, always-on ecosystem." },
];

export const architectureLayers = [
  {
    name: "Application Layer",
    body: "Community apps, marketplaces and dashboards built by anyone.",
  },
  {
    name: "Protocol Layer",
    body: "Communities, tokenization, governance and reputation primitives.",
  },
  {
    name: "Settlement Layer",
    body: "Solana — high throughput, fast finality, negligible fees.",
  },
];

export const roadmap = [
  {
    phase: "Phase 01",
    period: "Now",
    title: "Genesis",
    body: "Core protocol and the first hobby communities live on Solana devnet.",
    done: true,
  },
  {
    phase: "Phase 02",
    period: "Q3 2026",
    title: "$HOBBY on Orynth",
    body: "The $HOBBY protocol token launches on Orynth, alongside the tokenization module and community marketplace.",
    done: false,
  },
  {
    phase: "Phase 03",
    period: "Q1 2027",
    title: "Governance",
    body: "On-chain governance, portable reputation graph and grants for builders.",
    done: false,
  },
  {
    phase: "Phase 04",
    period: "2027+",
    title: "The Hobby Economy",
    body: "Thousands of self-owned economies, fully composable across Solana.",
    done: false,
  },
];

export const nav = [
  { label: "Economy", href: "#economy" },
  { label: "How it works", href: "#how" },
  { label: "Protocol", href: "#features" },
  { label: "Solana", href: "#solana" },
  { label: "Roadmap", href: "#roadmap" },
];

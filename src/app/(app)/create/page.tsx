"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import {
  ImageIcon,
  Sparkles,
  Check,
  AtSign,
  Link as LinkIcon,
  MessageCircle,
  Coins,
  Globe,
  Lock,
} from "lucide-react";
import { AuthGate } from "@/components/app/AuthGate";
import { PageHeader } from "@/components/app/PageHeader";
import { Field, Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { GradientLogo, BannerGradient } from "@/components/app/GradientLogo";
import { Reveal } from "@/components/ui/Reveal";
import { categories, type Category } from "@/data/communities";
import { useHobbyStore } from "@/store/useHobbyStore";
import { useRefreshCommunities } from "@/hooks/useCommunities";
import { shortAddress } from "@/lib/format";
import { cn } from "@/lib/cn";
import { fadeUp, ease } from "@/lib/motion";

// -- Selectable brand gradient presets. `via` powers the banner sweep. --
type Preset = { key: string; from: string; via: string; to: string };
const PRESETS: Preset[] = [
  { key: "violet", from: "#7C5CFC", via: "#8B7CF6", to: "#38BDF8" },
  { key: "sky", from: "#38BDF8", via: "#4CC6F0", to: "#0EA5E9" },
  { key: "mint", from: "#14C69A", via: "#4BD9B5", to: "#0E9B7A" },
  { key: "sun", from: "#F5C451", via: "#F7B34A", to: "#F59E0B" },
  { key: "rose", from: "#FB7EA8", via: "#F573B0", to: "#EC4899" },
  { key: "teal", from: "#7FE7D9", via: "#4FD4C4", to: "#22B8A6" },
];

const GLYPHS = ["◐", "♪", "◈", "▲", "❋", "✿", "✎", "◆"];

function Section({
  step,
  title,
  hint,
  children,
}: {
  step: number;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="rounded-3xl border border-line bg-white/70 p-6 shadow-soft sm:p-8">
      <div className="mb-6 flex items-start gap-4">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-iris text-[13px] font-semibold text-brand">
          {step}
        </span>
        <div>
          <h2 className="text-[17px] font-semibold tracking-tight text-ink">
            {title}
          </h2>
          {hint && <p className="mt-1 text-[13.5px] text-ink-muted">{hint}</p>}
        </div>
      </div>
      {children}
    </Reveal>
  );
}

function slugify(v: string) {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40);
}

export default function CreatePage() {
  // Identity
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [handleTouched, setHandleTouched] = useState(false);
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");

  // Appearance
  const [category, setCategory] = useState<string>(categories[0].name);
  const [presetKey, setPresetKey] = useState(PRESETS[0].key);
  const [glyph, setGlyph] = useState(GLYPHS[0]);

  // Token
  const [tokenOn, setTokenOn] = useState(true);
  const [tokenName, setTokenName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");

  // Links
  const [x, setX] = useState("");
  const [discord, setDiscord] = useState("");
  const [website, setWebsite] = useState("");

  // Visibility
  const [visibility, setVisibility] = useState<"public" | "unlisted">("public");

  // Flow
  const [launching, setLaunching] = useState(false);
  const [done, setDone] = useState(false);
  const [newSlug, setNewSlug] = useState("");

  const router = useRouter();
  const { publicKey } = useWallet();
  const createCommunity = useHobbyStore((s) => s.createCommunity);
  const refresh = useRefreshCommunities();

  const preset = useMemo(
    () => PRESETS.find((p) => p.key === presetKey) ?? PRESETS[0],
    [presetKey]
  );

  const effectiveHandle = handleTouched ? handle : slugify(name);

  const canSubmit = name.trim().length > 1 && description.trim().length > 4;

  function onNameChange(v: string) {
    setName(v);
    if (!handleTouched) setHandle(slugify(v));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || launching) return;
    setLaunching(true);
    window.setTimeout(() => {
      const community = createCommunity({
        name,
        slug: effectiveHandle,
        tagline,
        description,
        category: category as Category,
        logoFrom: preset.from,
        logoTo: preset.to,
        bannerFrom: preset.from,
        bannerVia: preset.via,
        bannerTo: preset.to,
        glyph,
        tokenOn,
        tokenSymbol: symbol,
        tokenSupply: supply ? Number(supply.replace(/[^0-9]/g, "")) : undefined,
        x,
        discord,
        web: website,
        visibility,
        creator: publicKey ? shortAddress(publicKey.toBase58()) : "you",
      });
      setNewSlug(community.slug);
      refresh();
      setLaunching(false);
      setDone(true);
    }, 1200);
  }

  const previewName = name.trim() || "Your community";
  const previewTagline = tagline.trim() || "A short, memorable tagline";
  const previewSymbol = (symbol || "TOKEN").toUpperCase();

  return (
    <AuthGate
      title="Connect to launch"
      description="Connect a Solana wallet to create your community on HobbyHatch."
    >
      <div className="mx-auto max-w-6xl">
        <PageHeader
          kicker="Create a community"
          title="Create your community"
          description="Give your hobby a home, a brand and — if you want — a token. Everything below updates the live preview in real time."
          actions={<Badge>Solana-native</Badge>}
        />

        <form onSubmit={onSubmit} className="mt-10">
          <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
            {/* ---- FORM ---- */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              {/* 1. Identity */}
              <Section
                step={1}
                title="Identity"
                hint="The name and words people will find you by."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Community name"
                    htmlFor="name"
                    required
                    className="sm:col-span-2"
                  >
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => onNameChange(e.target.value)}
                      placeholder="Analog Collective"
                      maxLength={48}
                    />
                  </Field>

                  <Field
                    label="Handle"
                    htmlFor="handle"
                    hint="Your on-chain slug — auto-filled from the name."
                  >
                    <div className="flex items-center rounded-2xl border border-line bg-white/80 pl-3.5 transition-colors focus-within:border-brand/50 focus-within:ring-4 focus-within:ring-brand/10">
                      <span className="text-[15px] text-ink-faint">hh/</span>
                      <input
                        id="handle"
                        value={effectiveHandle}
                        onChange={(e) => {
                          setHandleTouched(true);
                          setHandle(slugify(e.target.value));
                        }}
                        placeholder="analog-collective"
                        className="h-12 w-full bg-transparent px-1 text-[15px] text-ink placeholder:text-ink-faint focus:outline-none"
                      />
                    </div>
                  </Field>

                  <Field label="Tagline" htmlFor="tagline">
                    <Input
                      id="tagline"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="Film photography, on-chain"
                      maxLength={60}
                    />
                  </Field>

                  <Field
                    label="Description"
                    htmlFor="description"
                    required
                    className="sm:col-span-2"
                    hint="Two or three sentences on what this community is about."
                  >
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="A community of makers preserving a craft they love — sharing techniques, funding shared resources through the treasury, and building together."
                      maxLength={400}
                    />
                  </Field>
                </div>
              </Section>

              {/* 2. Appearance */}
              <Section
                step={2}
                title="Appearance"
                hint="Pick a category and a brand mark. The gradient becomes your logo and banner."
              >
                <div className="flex flex-col gap-6">
                  <Field label="Category" htmlFor="category">
                    <Select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <div>
                    <p className="mb-3 text-[14px] font-medium text-ink">
                      Brand gradient
                    </p>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {PRESETS.map((p) => {
                        const active = p.key === presetKey;
                        return (
                          <button
                            key={p.key}
                            type="button"
                            onClick={() => setPresetKey(p.key)}
                            aria-label={`${p.key} gradient`}
                            aria-pressed={active}
                            className={cn(
                              "relative aspect-square rounded-2xl ring-1 ring-black/5 transition-transform duration-200",
                              active
                                ? "scale-[1.04] shadow-lift ring-2 ring-brand ring-offset-2 ring-offset-paper"
                                : "hover:scale-[1.03]"
                            )}
                            style={{
                              background: `linear-gradient(140deg, ${p.from}, ${p.via}, ${p.to})`,
                            }}
                          >
                            {active && (
                              <span className="absolute inset-0 flex items-center justify-center">
                                <Check
                                  className="h-5 w-5 text-white drop-shadow"
                                  strokeWidth={3}
                                />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-[14px] font-medium text-ink">Glyph</p>
                    <div className="flex flex-wrap gap-2.5">
                      {GLYPHS.map((gy) => {
                        const active = gy === glyph;
                        return (
                          <button
                            key={gy}
                            type="button"
                            onClick={() => setGlyph(gy)}
                            aria-label={`Glyph ${gy}`}
                            aria-pressed={active}
                            className={cn(
                              "flex h-12 w-12 items-center justify-center rounded-2xl border text-lg transition-colors",
                              active
                                ? "border-brand bg-iris text-brand"
                                : "border-line bg-white/70 text-ink-soft hover:border-ink/20"
                            )}
                          >
                            {gy}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "Upload banner", sub: "1600×400 · optional" },
                      { label: "Upload logo", sub: "Square · optional" },
                    ].map((u) => (
                      <div
                        key={u.label}
                        className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line bg-canvas/40 px-4 py-7 text-center"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-muted shadow-soft">
                          <ImageIcon className="h-5 w-5" />
                        </span>
                        <span className="text-[14px] font-medium text-ink-soft">
                          {u.label}
                        </span>
                        <span className="text-[12px] text-ink-faint">
                          {u.sub} — the gradient acts as your mark for now
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Section>

              {/* 3. Token */}
              <Section
                step={3}
                title="Community token"
                hint="Optionally mint a token so members can hold a stake in the community."
              >
                <button
                  type="button"
                  onClick={() => setTokenOn((v) => !v)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-colors",
                    tokenOn
                      ? "border-brand/40 bg-iris/60"
                      : "border-line bg-white/60 hover:border-ink/15"
                  )}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand shadow-soft">
                    <Coins className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[15px] font-medium text-ink">
                      Launch a community token
                    </span>
                    <span className="block text-[13px] text-ink-muted">
                      Minted as an SPL token on Solana.
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                      tokenOn ? "bg-brand" : "bg-line"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                        tokenOn ? "translate-x-[22px]" : "translate-x-0.5"
                      )}
                    />
                  </span>
                </button>

                {tokenOn && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.35, ease }}
                    className="mt-5 grid gap-5 overflow-hidden sm:grid-cols-2"
                  >
                    <Field label="Token name" htmlFor="tokenName">
                      <Input
                        id="tokenName"
                        value={tokenName}
                        onChange={(e) => setTokenName(e.target.value)}
                        placeholder="Grain"
                      />
                    </Field>
                    <Field label="Symbol" htmlFor="symbol">
                      <Input
                        id="symbol"
                        value={symbol}
                        onChange={(e) =>
                          setSymbol(
                            e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8)
                          )
                        }
                        placeholder="GRAIN"
                      />
                    </Field>
                    <Field
                      label="Initial supply"
                      htmlFor="supply"
                      className="sm:col-span-2"
                    >
                      <Input
                        id="supply"
                        type="number"
                        min={0}
                        value={supply}
                        onChange={(e) => setSupply(e.target.value)}
                        placeholder="13000000"
                      />
                    </Field>
                  </motion.div>
                )}
              </Section>

              {/* 4. Links */}
              <Section
                step={4}
                title="Links"
                hint="Where else can members find you? All optional."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="X / AtSign" htmlFor="x">
                    <div className="relative">
                      <AtSign className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                      <Input
                        id="x"
                        value={x}
                        onChange={(e) => setX(e.target.value)}
                        placeholder="@yourcommunity"
                        className="pl-10"
                      />
                    </div>
                  </Field>
                  <Field label="Discord" htmlFor="discord">
                    <div className="relative">
                      <MessageCircle className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                      <Input
                        id="discord"
                        value={discord}
                        onChange={(e) => setDiscord(e.target.value)}
                        placeholder="discord.gg/…"
                        className="pl-10"
                      />
                    </div>
                  </Field>
                  <Field label="Website" htmlFor="website" className="sm:col-span-2">
                    <div className="relative">
                      <LinkIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                      <Input
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://…"
                        className="pl-10"
                      />
                    </div>
                  </Field>
                </div>
              </Section>

              {/* 5. Visibility */}
              <Section
                step={5}
                title="Visibility"
                hint="Choose how your community appears across HobbyHatch."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      {
                        key: "public",
                        icon: Globe,
                        title: "Public",
                        sub: "Listed on Discover — anyone can find and join.",
                      },
                      {
                        key: "unlisted",
                        icon: Lock,
                        title: "Unlisted",
                        sub: "Only people with the link can find it.",
                      },
                    ] as const
                  ).map((opt) => {
                    const active = visibility === opt.key;
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setVisibility(opt.key)}
                        aria-pressed={active}
                        className={cn(
                          "flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors",
                          active
                            ? "border-brand/50 bg-iris/60"
                            : "border-line bg-white/60 hover:border-ink/15"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                            active
                              ? "bg-brand text-white"
                              : "bg-white text-ink-muted shadow-soft"
                          )}
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <span>
                          <span className="block text-[15px] font-medium text-ink">
                            {opt.title}
                          </span>
                          <span className="mt-0.5 block text-[13px] text-ink-muted">
                            {opt.sub}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "ml-auto mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                            active ? "border-brand bg-brand" : "border-line"
                          )}
                        >
                          {active && (
                            <Check className="h-3 w-3 text-white" strokeWidth={3} />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Section>

              {/* Submit */}
              <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button variant="ghost" onClick={() => undefined}>
                  Save draft
                </Button>
                <button
                  type="submit"
                  disabled={!canSubmit || launching}
                  className={cn(
                    "group inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-ink px-7 text-base font-medium tracking-tight text-paper shadow-lift transition-all duration-300",
                    "hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                    (!canSubmit || launching) && "cursor-not-allowed opacity-50"
                  )}
                >
                  {launching ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
                      Launching…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Launch your community
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ---- LIVE PREVIEW ---- */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-6">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] text-ink-muted">
                    <span className="h-px w-5 bg-brand" />
                    Preview
                  </div>

                  <div className="overflow-hidden rounded-3xl border border-line bg-white/70 shadow-lift">
                    <BannerGradient
                      from={preset.from}
                      via={preset.via}
                      to={preset.to}
                      className="h-24"
                    >
                      <span className="absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-ink backdrop-blur-sm">
                        {visibility === "public" ? "Public" : "Unlisted"}
                      </span>
                    </BannerGradient>

                    <div className="px-5 pb-5">
                      <div className="-mt-7 flex items-end justify-between">
                        <GradientLogo
                          from={preset.from}
                          to={preset.to}
                          glyph={glyph}
                          size={56}
                          className="ring-4 ring-white"
                        />
                        <span className="mb-1 rounded-full border border-line bg-paper px-2.5 py-1 text-[12px] font-medium text-ink-muted">
                          {category}
                        </span>
                      </div>

                      <h3 className="mt-3 text-[17px] font-semibold tracking-tight text-ink">
                        {previewName}
                      </h3>
                      <p className="mt-0.5 line-clamp-1 text-[14px] text-ink-muted">
                        {previewTagline}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-[13px]">
                        <span className="text-ink-muted">
                          {tokenOn ? "Token" : "No token"}
                        </span>
                        {tokenOn && (
                          <span className="font-medium text-ink">
                            ${previewSymbol}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="px-1 text-[12.5px] leading-relaxed text-ink-faint">
                    This is how your community card appears across HobbyHatch.
                    Everything updates as you edit.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* SUCCESS MODAL */}
      <Modal
        open={done}
        onClose={() => setDone(false)}
        title="🎉 Your community is ready to hatch"
        description="It’s live on HobbyHatch. Members can join and — if you enabled it — trade your token right away."
      >
        <div className="rounded-2xl border border-line bg-canvas/50 p-4">
          <div className="flex items-center gap-3">
            <GradientLogo
              from={preset.from}
              to={preset.to}
              glyph={glyph}
              size={44}
            />
            <div>
              <p className="text-[15px] font-semibold text-ink">
                {previewName}
              </p>
              <p className="text-[13px] text-ink-muted">
                hh/{effectiveHandle || "your-community"}
                {tokenOn && ` · $${previewSymbol}`}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="ghost" size="md" href="/dashboard">
            Go to dashboard
          </Button>
          <Button
            size="md"
            arrow
            onClick={() => newSlug && router.push(`/community/${newSlug}`)}
          >
            View community
          </Button>
        </div>
      </Modal>
    </AuthGate>
  );
}

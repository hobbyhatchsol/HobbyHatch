"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  User,
  Bell,
  Wallet,
  Palette,
  Shield,
  Check,
  LogOut,
  Trash2,
} from "lucide-react";
import { AuthGate } from "@/components/app/AuthGate";
import { PageHeader } from "@/components/app/PageHeader";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Tabs } from "@/components/ui/Tabs";
import { Reveal } from "@/components/ui/Reveal";
import { shortAddress } from "@/lib/format";
import { useHobbyStore } from "@/store/useHobbyStore";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Reusable inline toggle switch                                       */
/* ------------------------------------------------------------------ */

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20",
        checked ? "bg-brand" : "bg-ink/[0.12]"
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 520, damping: 34 }}
        className={cn(
          "absolute h-5 w-5 rounded-full bg-white shadow-soft",
          checked ? "right-1" : "left-1"
        )}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Section card shell                                                  */
/* ------------------------------------------------------------------ */

function SectionCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="rounded-3xl border border-line bg-white/70 p-6 backdrop-blur-sm sm:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-iris text-brand">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tightest text-ink">
            {title}
          </h2>
          <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-7">{children}</div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type NotifKey =
  | "followers"
  | "activity"
  | "priceAlerts"
  | "governance"
  | "orynth"
  | "product";

const NOTIF_ROWS: { key: NotifKey; label: string; description: string }[] = [
  {
    key: "followers",
    label: "New followers",
    description: "When someone follows your profile or joins a community you steward.",
  },
  {
    key: "activity",
    label: "Community activity",
    description: "Posts, milestones and drops from the communities you belong to.",
  },
  {
    key: "priceAlerts",
    label: "Token price alerts",
    description: "Meaningful moves on tokens you hold or watch.",
  },
  {
    key: "governance",
    label: "Governance proposals",
    description: "New proposals and votes across your communities.",
  },
  {
    key: "orynth",
    label: "$HOBBY launch updates",
    description: "Milestones for the $HOBBY token launch on Orynth.",
  },
  {
    key: "product",
    label: "Product news",
    description: "Occasional updates on new features. No noise.",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function SettingsPage() {
  return (
    <AuthGate
      title="Connect to manage settings"
      description="Sign in with a Solana wallet to update your profile, notifications and preferences."
    >
      <SettingsInner />
    </AuthGate>
  );
}

function SettingsInner() {
  const { publicKey, disconnect } = useWallet();
  const address = publicKey?.toBase58();

  const [tab, setTab] = useState("profile");

  // Persisted profile + notification prefs
  const storeProfile = useHobbyStore((s) => s.profile);
  const updateProfile = useHobbyStore((s) => s.updateProfile);
  const storeNotifs = useHobbyStore((s) => s.notifications);
  const setNotification = useHobbyStore((s) => s.setNotification);

  // Profile fields (seeded from the persisted store)
  const [displayName, setDisplayName] = useState(storeProfile.displayName);
  const [bio, setBio] = useState(storeProfile.bio);
  const [twitter, setTwitter] = useState(storeProfile.x);
  const [website, setWebsite] = useState(storeProfile.website);
  const [saved, setSaved] = useState(false);

  // Notifications
  const [notifs, setNotifs] = useState<Record<NotifKey, boolean>>(() => ({
    followers: storeNotifs.followers ?? true,
    activity: storeNotifs.activity ?? true,
    priceAlerts: storeNotifs.priceAlerts ?? false,
    governance: storeNotifs.governance ?? true,
    orynth: storeNotifs.orynth ?? true,
    product: storeNotifs.product ?? false,
  }));

  // Appearance
  const [theme, setTheme] = useState<"light" | "system">("light");

  // Modals
  const [disconnectOpen, setDisconnectOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleSave = () => {
    updateProfile({ displayName, bio, x: twitter, website });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  const setNotif = (key: NotifKey, v: boolean) => {
    setNotifs((prev) => ({ ...prev, [key]: v }));
    setNotification(key, v); // persist immediately
  };

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "notifications", label: "Notifications" },
    { id: "wallet", label: "Wallet" },
    { id: "appearance", label: "Appearance" },
    { id: "security", label: "Security" },
  ];

  return (
    <div className="space-y-10">
      <PageHeader
        kicker="Settings"
        title="Preferences"
        description="Tune your HobbyHatch identity, alerts and connected wallet. Everything here is yours — no email, no clutter."
      />

      <Tabs tabs={tabs} value={tab} onChange={setTab} className="max-w-xl" />

      {/* PROFILE */}
      {tab === "profile" && (
        <SectionCard
          icon={User}
          title="Profile"
          description="How you appear across communities and token pages."
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Display name" htmlFor="displayName" className="sm:col-span-2">
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Ari Meadows"
              />
            </Field>
            <Field
              label="Bio"
              htmlFor="bio"
              hint="A sentence or two on the hobbies you're building around."
              className="sm:col-span-2"
            >
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Ceramicist, trail runner, and founder of the Kiln Club."
              />
            </Field>
            <Field label="X / AtSign handle" htmlFor="twitter">
              <Input
                id="twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="@yourhandle"
              />
            </Field>
            <Field label="Website" htmlFor="website">
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://"
              />
            </Field>
          </div>
          <div className="mt-7 flex items-center gap-4">
            <Button size="md" onClick={handleSave}>
              {saved ? "Saved ✓" : "Save changes"}
            </Button>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[13px] font-medium text-mint"
              >
                Your profile has been updated.
              </motion.span>
            )}
          </div>
        </SectionCard>
      )}

      {/* NOTIFICATIONS */}
      {tab === "notifications" && (
        <SectionCard
          icon={Bell}
          title="Notifications"
          description="Choose what reaches you. Toggle anything off, anytime."
        >
          <div className="divide-y divide-line/70">
            {NOTIF_ROWS.map((row) => (
              <div
                key={row.key}
                className="flex items-center justify-between gap-6 py-5 first:pt-0 last:pb-0"
              >
                <div className="max-w-md">
                  <p className="text-[15px] font-medium text-ink">{row.label}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-ink-muted">
                    {row.description}
                  </p>
                </div>
                <Toggle
                  checked={notifs[row.key]}
                  onChange={(v) => setNotif(row.key, v)}
                  label={row.label}
                />
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* WALLET */}
      {tab === "wallet" && (
        <SectionCard
          icon={Wallet}
          title="Wallet"
          description="Your connected Solana wallet is your HobbyHatch identity."
        >
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-paper/60 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar seed={address ?? "wallet"} size={48} />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-[15px] font-medium text-ink">
                    {address ? shortAddress(address) : "—"}
                  </p>
                  <Badge dot={false} className="text-[12px]">
                    Solana devnet
                  </Badge>
                </div>
                <p className="mt-1 text-[13px] text-ink-muted">
                  Balance{" "}
                  <span className="font-medium text-ink">12.84 SOL</span>
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="md"
              onClick={() => setDisconnectOpen(true)}
              className="self-start sm:self-auto"
            >
              <LogOut className="h-4 w-4" />
              Disconnect wallet
            </Button>
          </div>
        </SectionCard>
      )}

      {/* APPEARANCE */}
      {tab === "appearance" && (
        <SectionCard
          icon={Palette}
          title="Appearance"
          description="HobbyHatch is warm and light by design. More themes are on the way."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {(
              [
                {
                  id: "light" as const,
                  name: "Light",
                  note: "Warm paper — the HobbyHatch signature.",
                  swatch: "linear-gradient(135deg, #FBFAF7, #F1EEE8)",
                },
                {
                  id: "system" as const,
                  name: "System",
                  note: "Follow your device. Renders light for now.",
                  swatch: "linear-gradient(135deg, #FBFAF7, #E6E2DB)",
                },
              ]
            ).map((opt) => {
              const active = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTheme(opt.id)}
                  className={cn(
                    "group relative flex flex-col gap-3 rounded-2xl border p-4 text-left transition-colors",
                    active
                      ? "border-brand/50 bg-iris/60 shadow-soft"
                      : "border-line bg-white/60 hover:border-ink/20"
                  )}
                >
                  <span
                    className="h-16 w-full rounded-xl border border-line"
                    style={{ background: opt.swatch }}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-medium text-ink">
                      {opt.name}
                    </span>
                    {active && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                  <span className="text-[13px] leading-relaxed text-ink-muted">
                    {opt.note}
                  </span>
                </button>
              );
            })}

            <div className="relative flex flex-col gap-3 rounded-2xl border border-dashed border-line bg-paper/40 p-4 opacity-70">
              <span className="h-16 w-full rounded-xl border border-line bg-gradient-to-br from-ink/80 to-ink" />
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-medium text-ink-muted">Dark</span>
                <Badge dot={false} className="text-[11px]">
                  Coming soon
                </Badge>
              </div>
              <span className="text-[13px] leading-relaxed text-ink-faint">
                A low-light theme is in the works.
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-paper/50 p-4">
            <span className="h-6 w-6 shrink-0 rounded-full bg-brand ring-4 ring-brand/15" />
            <p className="text-[13px] leading-relaxed text-ink-muted">
              Accent color is <span className="font-medium text-brand">brand violet</span>.
              Custom accents will arrive alongside dark mode.
            </p>
          </div>
        </SectionCard>
      )}

      {/* SECURITY / DANGER */}
      {tab === "security" && (
        <SectionCard
          icon={Shield}
          title="Security"
          description="Your keys stay in your wallet — HobbyHatch never holds them."
        >
          <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-md">
                <p className="text-[15px] font-semibold text-rose-700">
                  Delete account data
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-rose-600/90">
                  Permanently remove your HobbyHatch profile, preferences and
                  activity. This cannot be undone. Your wallet and tokens are
                  never affected.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDeleteOpen(true)}
                className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-rose-600 px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete data
              </button>
            </div>
          </div>
        </SectionCard>
      )}

      {/* DISCONNECT MODAL */}
      <Modal
        open={disconnectOpen}
        onClose={() => setDisconnectOpen(false)}
        title="Disconnect wallet?"
        description="You'll be signed out of HobbyHatch. Reconnect anytime — nothing is lost."
      >
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setDisconnectOpen(false)}
          >
            Cancel
          </Button>
          <button
            type="button"
            onClick={() => {
              disconnect();
              setDisconnectOpen(false);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-paper shadow-lift transition-colors hover:bg-ink-soft"
          >
            <LogOut className="h-4 w-4" />
            Disconnect
          </button>
        </div>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete account data?"
        description="This permanently removes your HobbyHatch profile and preferences. This action cannot be undone."
      >
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/70 p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
            <Trash2 className="h-4 w-4" />
          </span>
          <p className="text-[13px] leading-relaxed text-rose-700">
            Your wallet, tokens and on-chain holdings are never touched — only
            HobbyHatch app data is cleared.
          </p>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setDeleteOpen(false)}
          >
            Cancel
          </Button>
          <button
            type="button"
            onClick={() => setDeleteOpen(false)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-600 px-5 py-2.5 text-[14px] font-medium text-white shadow-lift transition-colors hover:bg-rose-700"
          >
            <Trash2 className="h-4 w-4" />
            Delete data
          </button>
        </div>
      </Modal>
    </div>
  );
}

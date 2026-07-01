import { cn } from "@/lib/cn";

type IconProps = { className?: string };

const s = (className?: string) => cn("shrink-0", className);
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={s(className)} {...stroke}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={s(className)} {...stroke}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

export function BlueprintIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={s(className)} {...stroke}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M3.5 9h17M8 9v10.5M8 14h5.5" />
    </svg>
  );
}

export function CommunityIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={s(className)} {...stroke}>
      <circle cx="8" cy="9" r="2.6" />
      <circle cx="16" cy="9" r="2.6" />
      <path d="M4 18.5c0-2.4 1.9-4 4-4s4 1.6 4 4M12 18.5c0-2.4 1.9-4 4-4s4 1.6 4 4" />
    </svg>
  );
}

export function GovernanceIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={s(className)} {...stroke}>
      <path d="M12 3v3M5 8h14M6 8l-1.5 7h4L7 8M17 8l-1.5 7h4L18 8M4.5 15c0 1.4 1.1 2.3 2.5 2.3S9.5 16.4 9.5 15M14.5 15c0 1.4 1.1 2.3 2.5 2.3s2.5-.9 2.5-2.3M9 20.5h6" />
    </svg>
  );
}

export function MarketplaceIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={s(className)} {...stroke}>
      <path d="M4 8.5 5 5h14l1 3.5M4 8.5h16M4 8.5c0 1.3 1 2.2 2.2 2.2S8.4 9.8 8.4 8.5c0 1.3 1 2.2 2.3 2.2S13 9.8 13 8.5c0 1.3 1 2.2 2.3 2.2s2.2-.9 2.2-2.2M5.5 10.5V19h13v-8.5" />
    </svg>
  );
}

export function TokenIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={s(className)} {...stroke}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v10M9.5 9.5c0-1.1 1.1-1.8 2.5-1.8s2.5.7 2.5 1.8-1.1 1.8-2.5 1.8-2.5.7-2.5 1.8 1.1 1.8 2.5 1.8 2.5-.7 2.5-1.8" />
    </svg>
  );
}

export function ReputationIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={s(className)} {...stroke}>
      <path d="M12 3.5l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 9.2l5.4-.8z" />
    </svg>
  );
}

export const featureIcons = {
  blueprint: BlueprintIcon,
  community: CommunityIcon,
  governance: GovernanceIcon,
  marketplace: MarketplaceIcon,
  token: TokenIcon,
  reputation: ReputationIcon,
} as const;

export function LogoMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={s(className)} aria-hidden>
      <path
        d="M14 2.5c1.8 4.2 4.6 7 8.8 8.8-4.2 1.8-7 4.6-8.8 8.8-1.8-4.2-4.6-7-8.8-8.8C9.4 9.5 12.2 6.7 14 2.5Z"
        fill="currentColor"
      />
      <circle cx="14" cy="22.5" r="2.6" fill="currentColor" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={s(className)} fill="currentColor">
      <path d="M17.6 3h3l-6.6 7.6L21.8 21h-6.1l-4.8-6.2L5.4 21H2.4l7.1-8.1L2.2 3h6.2l4.3 5.7L17.6 3Zm-1.1 16.2h1.7L7.6 4.7H5.8L16.5 19.2Z" />
    </svg>
  );
}

export function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={s(className)} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function DiscordIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={s(className)} fill="currentColor">
      <path d="M19.3 5.4A16.7 16.7 0 0 0 15.1 4l-.2.4a12.6 12.6 0 0 1 3.7 1.9 12 12 0 0 0-10.9 0A12.6 12.6 0 0 1 11.4 4.4L11.2 4A16.7 16.7 0 0 0 7 5.4C4.3 9.3 3.6 13.1 3.9 16.8a16.8 16.8 0 0 0 5.1 2.6l.6-.9c-.6-.2-1.2-.5-1.7-.8l.4-.3a12 12 0 0 0 10.3 0l.4.3c-.5.3-1.1.6-1.7.8l.6.9a16.8 16.8 0 0 0 5.1-2.6c.4-4.3-.7-8.1-3.7-11.4ZM9.7 14.6c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7Zm4.6 0c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7Z" />
    </svg>
  );
}

import { cn } from "@/lib/cn";

/** Renders a community's brand mark: a rounded gradient tile with its glyph. */
export function GradientLogo({
  from,
  to,
  glyph,
  size = 48,
  rounded = "rounded-2xl",
  className,
}: {
  from: string;
  to: string;
  glyph: string;
  size?: number;
  rounded?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center font-semibold text-white ring-1 ring-black/5",
        rounded,
        className
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.44,
        background: `linear-gradient(140deg, ${from}, ${to})`,
      }}
      aria-hidden
    >
      {glyph}
    </span>
  );
}

export function BannerGradient({
  from,
  via,
  to,
  className,
  children,
}: {
  from: string;
  via: string;
  to: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: `linear-gradient(120deg, ${from}, ${via}, ${to})` }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,rgba(255,255,255,0.35),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      {children}
    </div>
  );
}

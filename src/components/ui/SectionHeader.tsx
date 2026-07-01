import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function Kicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.18em] text-ink-muted",
        className
      )}
    >
      <span className="h-px w-6 bg-brand" />
      {children}
    </span>
  );
}

export function SectionHeader({
  kicker,
  title,
  intro,
  align = "left",
  className,
  titleClassName,
}: {
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-6",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {kicker && (
        <Reveal>
          <Kicker>{kicker}</Kicker>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "text-[clamp(2.1rem,4.6vw,3.7rem)] font-semibold leading-[1.02] tracking-tightest text-ink",
            titleClassName
          )}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

import { cn } from "@/lib/cn";

const palette = [
  ["#7C5CFC", "#5B37D6"],
  ["#38BDF8", "#0EA5E9"],
  ["#14C69A", "#0E9B7A"],
  ["#F5C451", "#F59E0B"],
  ["#FB7EA8", "#EC4899"],
  ["#7FE7D9", "#22B8A6"],
];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

/** Deterministic gradient avatar derived from a seed string (name / wallet). */
export function Avatar({
  seed,
  size = 40,
  className,
  label,
}: {
  seed: string;
  size?: number;
  className?: string;
  label?: string;
}) {
  const [from, to] = palette[hash(seed) % palette.length];
  const initials = (label ?? seed).replace(/[^a-zA-Z0-9]/g, "").slice(0, 2).toUpperCase();
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ring-2 ring-white",
        className
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `linear-gradient(135deg, ${from}, ${to})`,
      }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

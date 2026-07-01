import { cn } from "@/lib/cn";
import { formatPct } from "@/lib/format";

export function Stat({
  label,
  value,
  change,
  icon,
  className,
}: {
  label: string;
  value: React.ReactNode;
  change?: number;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-white/70 p-5 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-ink-muted">{label}</p>
        {icon && <span className="text-ink-faint">{icon}</span>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="font-display text-2xl font-semibold tracking-tight text-ink">
          {value}
        </p>
        {typeof change === "number" && (
          <span
            className={cn(
              "text-[13px] font-medium",
              change >= 0 ? "text-mint" : "text-rose-500"
            )}
          >
            {formatPct(change)}
          </span>
        )}
      </div>
    </div>
  );
}

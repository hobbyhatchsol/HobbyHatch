import { cn } from "@/lib/cn";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-white/40 px-6 py-16 text-center",
        className
      )}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-paper text-ink-muted">
          {icon}
        </div>
      )}
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">
        {title}
      </h3>
      {description && (
        <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-ink-muted">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

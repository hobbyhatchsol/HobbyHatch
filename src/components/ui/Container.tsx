import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-10",
        wide ? "max-w-[1440px]" : "max-w-container",
        className
      )}
    >
      {children}
    </div>
  );
}

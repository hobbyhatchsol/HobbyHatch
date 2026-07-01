// Barely-visible editorial vertical guides. Server component — pure CSS.
export function GridLines({ columns = 6 }: { columns?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, rgba(16,15,14,0.05) 0, rgba(16,15,14,0.05) 1px, transparent 1px, transparent calc(100% / var(--cols)))",
        ["--cols" as string]: columns,
      }}
    />
  );
}

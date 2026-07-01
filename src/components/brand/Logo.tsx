"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

// Drop the official raster export at /public/logo.png and it's used everywhere
// automatically (falls back to the SVG mark if absent). You can also point at a
// custom path via NEXT_PUBLIC_LOGO_SRC. Never distorted or recolored.
const PRIMARY = process.env.NEXT_PUBLIC_LOGO_SRC || "/logo.png";
const FALLBACK = "/brand/logo.svg";

/**
 * Brand mark — the HobbyHatch hatching-egg coin. Circular, with a subtle ring
 * so it stays clearly visible on white surfaces.
 */
export function Logo({
  size = 32,
  className,
  priority = false,
  ring = true,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
  ring?: boolean;
}) {
  const [src, setSrc] = useState(PRIMARY);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      onError={() => src !== FALLBACK && setSrc(FALLBACK)}
      width={size}
      height={size}
      alt="HobbyHatch"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn(
        "select-none rounded-full",
        ring && "ring-1 ring-ink/5 shadow-[0_1px_4px_rgba(16,15,14,0.08)]",
        className
      )}
      style={{ width: size, height: size }}
      draggable={false}
    />
  );
}

export function Wordmark({
  size = 36,
  className,
  textClassName,
  priority = false,
}: {
  size?: number;
  className?: string;
  textClassName?: string;
  priority?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Logo size={size} priority={priority} />
      <span
        className={cn(
          "text-[18px] font-semibold tracking-tight text-ink",
          textClassName
        )}
      >
        HobbyHatch
      </span>
    </span>
  );
}

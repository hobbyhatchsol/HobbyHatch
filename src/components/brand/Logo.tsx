"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

// Uses the SVG badge by default. To use an official raster export instead,
// set NEXT_PUBLIC_LOGO_SRC (e.g. "/logo.png") — it overrides with graceful fallback.
const PRIMARY = process.env.NEXT_PUBLIC_LOGO_SRC || "/brand/logo.svg";
const FALLBACK = "/brand/logo.svg";

/**
 * Brand mark. Renders the official raster logo when present at /public/logo.png,
 * otherwise a faithful SVG badge. Never distorted or recolored — square aspect.
 */
export function Logo({
  size = 32,
  className,
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
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
      className={cn("select-none rounded-[22%]", className)}
      style={{ width: size, height: size }}
      draggable={false}
    />
  );
}

export function Wordmark({
  size = 32,
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
          "text-[17px] font-semibold tracking-tight text-ink",
          textClassName
        )}
      >
        HobbyHatch
      </span>
    </span>
  );
}

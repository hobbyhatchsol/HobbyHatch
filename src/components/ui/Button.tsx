"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "./icons";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

const sizes = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-[54px] px-7 text-base",
} as const;

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper shadow-lift hover:bg-ink-soft",
  secondary:
    "bg-paper text-ink border border-line hover:border-ink/25 hover:bg-white",
  ghost: "text-ink-soft hover:text-ink",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "lg",
  className,
  arrow = false,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
}) {
  const content = (
    <>
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-brand/0 via-brand/0 to-brand/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowIcon className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </>
  );

  const cls = cn(base, sizes[size], variants[variant], className);

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={cls}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0, scale: 0.985 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cls}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.985 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
    >
      {content}
    </motion.button>
  );
}

"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { nav } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-[1360px] items-center justify-between rounded-full px-3 py-2.5 pl-5 transition-all duration-500",
          scrolled
            ? "glass border border-line shadow-soft"
            : "border border-transparent"
        )}
      >
        <a href="#top" aria-label="HobbyHatch home">
          <Wordmark size={34} priority />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-muted transition-colors hover:bg-ink/[0.04] hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button href="/app" size="md" className="hidden sm:inline-flex">
            Get early access
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
          >
            <div className="flex flex-col gap-1">
              <span
                className={cn(
                  "h-px w-4 bg-ink transition-transform",
                  open && "translate-y-[3px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-4 bg-ink transition-transform",
                  open && "-translate-y-[3px] -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-x-3 top-[4.5rem] rounded-3xl border border-line bg-paper/95 p-3 shadow-lift backdrop-blur-xl md:hidden"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-[15px] font-medium text-ink-soft hover:bg-ink/[0.04]"
            >
              {item.label}
            </a>
          ))}
          <div className="p-2">
            <Button href="/app" size="md" className="w-full" onClick={() => setOpen(false)}>
              Get early access
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

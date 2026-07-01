"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Wordmark } from "@/components/brand/Logo";
import { appNav } from "./nav";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href === "/app") return pathname === "/app";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col border-r border-line bg-paper/60 px-4 py-6 backdrop-blur-sm lg:flex">
      <Link href="/" className="px-2" aria-label="HobbyHatch home">
        <Wordmark size={32} priority />
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {appNav.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors",
                active ? "text-ink" : "text-ink-muted hover:text-ink"
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-white shadow-soft ring-1 ring-line"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span
                className={cn(
                  "relative z-10 flex h-8 w-8 items-center justify-center rounded-lg",
                  item.primary && !active && "bg-brand/10 text-brand",
                  active && "text-brand"
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="rounded-2xl border border-line bg-white/70 p-4">
        <p className="text-[13px] font-semibold text-ink">$HOBBY on Orynth</p>
        <p className="mt-1 text-[12px] leading-snug text-ink-muted">
          The HobbyHatch protocol token launches on Orynth. Be there early.
        </p>
        <Link
          href="/token"
          className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-full bg-ink text-[13px] font-medium text-paper transition-colors hover:bg-ink-soft"
        >
          View $HOBBY
        </Link>
      </div>
    </aside>
  );
}

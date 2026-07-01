"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, Users, TrendingUp } from "lucide-react";
import { GradientLogo, BannerGradient } from "./GradientLogo";
import { fadeUp, ease } from "@/lib/motion";
import { formatNumber, formatUsd, formatPct } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Community } from "@/data/communities";

export function CommunityCard({ c }: { c: Community }) {
  const up = c.token.change24h >= 0;
  return (
    <motion.article variants={fadeUp}>
      <Link href={`/community/${c.slug}`} className="group block">
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4, ease }}
          className="overflow-hidden rounded-3xl border border-line bg-white/70 shadow-soft transition-shadow duration-500 group-hover:border-ink/10 group-hover:shadow-lift"
        >
          <BannerGradient
            from={c.banner.from}
            via={c.banner.via}
            to={c.banner.to}
            className="h-24"
          >
            {c.trending && (
              <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-ink backdrop-blur-sm">
                <TrendingUp className="h-3 w-3 text-mint" />
                Trending
              </span>
            )}
          </BannerGradient>

          <div className="px-5 pb-5">
            <div className="-mt-7 flex items-end justify-between">
              <GradientLogo
                from={c.logo.from}
                to={c.logo.to}
                glyph={c.logo.glyph}
                size={56}
                className="ring-4 ring-white"
              />
              <span className="mb-1 rounded-full border border-line bg-paper px-2.5 py-1 text-[12px] font-medium text-ink-muted">
                {c.category}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-1.5">
              <h3 className="text-[17px] font-semibold tracking-tight text-ink">
                {c.name}
              </h3>
              {c.verified && <BadgeCheck className="h-4 w-4 text-brand" />}
            </div>
            <p className="mt-0.5 line-clamp-1 text-[14px] text-ink-muted">
              {c.tagline}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <span className="flex items-center gap-1.5 text-[13px] text-ink-muted">
                <Users className="h-4 w-4" />
                {formatNumber(c.members)}
              </span>
              <span className="flex items-center gap-2 text-[13px]">
                <span className="font-medium text-ink">${c.token.symbol}</span>
                <span className="text-ink-muted">
                  {formatUsd(c.token.priceUsd)}
                </span>
                <span
                  className={cn(
                    "font-medium",
                    up ? "text-mint" : "text-rose-500"
                  )}
                >
                  {formatPct(c.token.change24h)}
                </span>
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}

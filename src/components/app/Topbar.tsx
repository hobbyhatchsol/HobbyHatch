"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Wordmark } from "@/components/brand/Logo";
import { WalletButton } from "./WalletButton";

export function Topbar() {
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/70 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="lg:hidden" aria-label="HobbyHatch home">
          <Wordmark size={30} />
        </Link>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(q ? `/discover?q=${encodeURIComponent(q)}` : "/discover");
          }}
          className="ml-auto hidden max-w-sm flex-1 items-center gap-2.5 rounded-full border border-line bg-white/70 px-4 md:flex lg:ml-0"
        >
          <Search className="h-4 w-4 text-ink-faint" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search communities, hobbies, tokens…"
            className="h-11 w-full bg-transparent text-[15px] text-ink placeholder:text-ink-faint focus:outline-none"
          />
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-4">
          <Link
            href="/discover"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:text-ink md:hidden"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>
          <WalletButton />
        </div>
      </div>
    </header>
  );
}

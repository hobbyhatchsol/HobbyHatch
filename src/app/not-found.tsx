import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <Logo size={64} priority />
      <p className="mt-8 text-[13px] font-medium uppercase tracking-[0.18em] text-ink-muted">
        Error 404
      </p>
      <h1 className="mt-4 text-[clamp(2rem,5vw,3.2rem)] font-display font-semibold tracking-tightest text-ink">
        This hobby hasn&apos;t hatched yet.
      </h1>
      <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist. Explore live
        communities or launch your own on HobbyHatch.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/discover"
          className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-[15px] font-medium text-paper transition-colors hover:bg-ink-soft"
        >
          Explore communities
        </Link>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-paper px-6 text-[15px] font-medium text-ink transition-colors hover:border-ink/20"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}

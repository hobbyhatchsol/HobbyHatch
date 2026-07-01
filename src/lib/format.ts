// Deterministic compact formatter — avoids Intl's compact notation, whose
// output differs between Node (SSR) and browser ICU ("$268.0M" vs "$268M")
// and caused hydration mismatches.
function compact(n: number): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  const fmt = (v: number, suffix: string) => {
    const r = Math.round(v * 10) / 10;
    const s = r % 1 === 0 ? r.toFixed(0) : r.toFixed(1);
    return `${sign}${s}${suffix}`;
  };
  if (abs >= 1_000_000_000) return fmt(abs / 1_000_000_000, "B");
  if (abs >= 1_000_000) return fmt(abs / 1_000_000, "M");
  if (abs >= 1_000) return fmt(abs / 1_000, "K");
  return `${sign}${abs}`;
}

export function formatUsd(n: number, opts: { compact?: boolean } = {}): string {
  if (opts.compact) return `$${compact(n)}`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n < 1 ? 4 : 2,
  }).format(n);
}

export function formatNumber(n: number, useCompact = true): string {
  if (useCompact) return compact(n);
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatPct(n: number): string {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}

export function shortAddress(addr: string, chars = 4): string {
  if (addr.length <= chars * 2 + 2) return addr;
  return `${addr.slice(0, chars)}…${addr.slice(-chars)}`;
}

import type { Metadata } from "next";
import { AppShell } from "@/components/app/AppShell";
import { LaunchLock } from "@/components/app/LaunchLock";

export const metadata: Metadata = {
  title: "HobbyHatch — Launching July 15, 2026",
  robots: { index: false, follow: false },
};

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The platform is locked until launch — every app route shows the
  // "launching in 2 weeks" gate until the launch date passes.
  return (
    <LaunchLock>
      <AppShell>{children}</AppShell>
    </LaunchLock>
  );
}

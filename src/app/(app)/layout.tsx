import type { Metadata } from "next";
import { AppShell } from "@/components/app/AppShell";
import { LaunchLock } from "@/components/app/LaunchLock";

export const metadata: Metadata = {
  title: "HobbyHatch App — Live on Solana",
};

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // LaunchLock passes through while LAUNCHED is true (live); it re-arms the
  // pre-launch gate only if that switch is turned off.
  return (
    <LaunchLock>
      <AppShell>{children}</AppShell>
    </LaunchLock>
  );
}

// Master switch — the platform is LIVE. Flip to false to re-arm the
// pre-launch lock + countdown against LAUNCH_DATE below.
export const LAUNCHED = true;

// Platform launch reference date (kept for the roadmap / historical copy).
export const LAUNCH_DATE = new Date("2026-07-15T16:00:00Z");
export const LAUNCH_LABEL = "July 15, 2026";
export const LAUNCH_TIME_LABEL = "16:00 UTC";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

export function getTimeLeft(now: number = Date.now()): TimeLeft {
  const diff = Math.max(0, LAUNCH_DATE.getTime() - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
    done: diff === 0,
  };
}

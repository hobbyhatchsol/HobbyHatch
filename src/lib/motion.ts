import type { Variants, Transition } from "framer-motion";

// Signature easing — a refined, slightly overshoot-free ease used site-wide.
export const ease = [0.22, 1, 0.36, 1] as const;
export const easeSoft = [0.4, 0, 0.2, 1] as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.9,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease } },
};

// Shared viewport config for scroll reveals.
export const revealViewport = { once: true, margin: "-12% 0px -12% 0px" } as const;

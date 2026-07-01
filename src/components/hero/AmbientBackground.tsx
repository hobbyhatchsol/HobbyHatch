"use client";

import { motion } from "framer-motion";

// Deterministic particle field — fixed seeds avoid SSR/CSR hydration drift.
const particles = [
  { x: "8%", y: "22%", s: 6, d: 14, delay: 0 },
  { x: "18%", y: "68%", s: 4, d: 18, delay: 1.2 },
  { x: "31%", y: "40%", s: 3, d: 16, delay: 0.6 },
  { x: "44%", y: "80%", s: 5, d: 20, delay: 2.1 },
  { x: "57%", y: "18%", s: 4, d: 15, delay: 0.9 },
  { x: "69%", y: "58%", s: 6, d: 19, delay: 1.6 },
  { x: "80%", y: "30%", s: 3, d: 17, delay: 0.3 },
  { x: "90%", y: "72%", s: 5, d: 21, delay: 2.4 },
  { x: "12%", y: "48%", s: 3, d: 22, delay: 1.9 },
  { x: "74%", y: "84%", s: 4, d: 16, delay: 0.5 },
];

export function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft ambient color blooms */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[-18%] h-[52rem] w-[52rem] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(237,233,254,0.9), rgba(237,233,254,0) 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[-8%] top-[8%] h-[34rem] w-[34rem] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(20,198,154,0.16), rgba(20,198,154,0) 70%)",
        }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-[-6%] bottom-[6%] h-[30rem] w-[30rem] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(124,92,252,0.08), rgba(124,92,252,0) 70%)",
        }}
        animate={{ x: [0, 30, 0], y: [0, -16, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting particles */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand/25"
          style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

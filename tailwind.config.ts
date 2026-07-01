import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm neutrals
        paper: "#FBFAF8",
        canvas: "#F4F2EE",
        ink: {
          DEFAULT: "#100F0E",
          soft: "#37332F",
          muted: "#6B655E",
          faint: "#A29B92",
        },
        line: "#E7E2DA",
        // Solana-native holographic accents (echoing the HobbyHatch mark)
        brand: {
          DEFAULT: "#7C5CFC",
          600: "#6D48F0",
          700: "#5B37D6",
        },
        sky: "#38BDF8",
        mint: "#14C69A",
        sun: "#F5C451",
        iris: "#EDE9FE",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        container: "1280px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,15,14,0.04), 0 12px 32px -12px rgba(16,15,14,0.10)",
        lift: "0 2px 4px rgba(16,15,14,0.04), 0 24px 64px -24px rgba(16,15,14,0.18)",
        float: "0 30px 90px -40px rgba(16,15,14,0.30)",
        glow: "0 20px 60px -20px rgba(124,92,252,0.35)",
      },
      keyframes: {
        "drift-slow": {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(2%, -3%, 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "drift-slow": "drift-slow 24s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

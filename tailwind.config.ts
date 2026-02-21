import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: "#1A1C33",
          green: "#176D48",
        },
        gd: {
          bg: "#1A1C33",
          surface: "#0F1124",
          panel: "#252844",
          result: "#1E2140",
          stroke: "#3A3E63",
          ink: "#FFFFFF",
          muted: "#A0A8B8",
          secondary: "#F0F0F0",
          whatsapp: "#25D366",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        georgian: ["var(--font-noto-georgian)", "sans-serif"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
        "grid-strong":
          "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
        dots: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
      },
      boxShadow: {
        "glow-green": "0 18px 60px rgba(23,109,72,0.35)",
        "glow-navy": "0 22px 80px rgba(26,28,51,0.55)",
        elevated: "0 4px 24px rgba(0,0,0,0.4)",
      },
      keyframes: {
        rain: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "-220px 520px" },
        },
        "pulse-soft": {
          "0%": { transform: "scale(1)", opacity: "0.65" },
          "50%": { transform: "scale(1.08)", opacity: "0.22" },
          "100%": { transform: "scale(1)", opacity: "0.65" },
        },
      },
      animation: {
        rain: "rain 1.6s linear infinite",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        steel: {
          950: "#14171A",
          900: "#1C2024",
          800: "#262B30",
          700: "#363D44",
          600: "#4E575F",
          400: "#8B949C",
          200: "#C7CDD2",
        },
        corten: {
          700: "#7A3A22",
          600: "#9A472A",
          500: "#B5502E",
          400: "#C36A44",
        },
        amber: {
          500: "#E8A33D",
          400: "#F0B85E",
        },
        bone: "#EDE9DF",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        corrugated:
          "repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 2px, transparent 2px, transparent 14px)",
      },
    },
  },
  plugins: [],
};
export default config;

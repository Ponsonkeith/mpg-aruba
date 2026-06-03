import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // MPG Aruba design tokens
        navy: {
          DEFAULT: "#10293e",
          50:  "#eef4f8",
          100: "#d6e6ef",
          200: "#aecde0",
          300: "#7aaec9",
          400: "#4a8caf",
          500: "#2d6f94",
          600: "#1e5478",
          700: "#163f5c",
          800: "#102c42",
          900: "#10293e",
          950: "#071822",
        },
        sand: {
          DEFAULT: "#d7b98f",
          50:  "#fdf9f4",
          100: "#f8efe1",
          200: "#f0ddc2",
          300: "#e5c89e",
          400: "#d7b98f",
          500: "#c49a6a",
          600: "#a97d4e",
          700: "#8a6239",
          800: "#6d4d2d",
          900: "#523a22",
        },
        gold: {
          DEFAULT: "#b8863b",
          50:  "#fdf8ee",
          100: "#f8edd4",
          200: "#f0d8a3",
          300: "#e5bc68",
          400: "#d9a23c",
          500: "#b8863b",
          600: "#9a6d2e",
          700: "#7b5424",
          800: "#5e3f1c",
          900: "#452e14",
        },
        cream: "#faf9f6",
        ink:   "#10202d",
        mist:  "#f3f1ec",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body:    ["var(--font-body)",    "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)",    "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "luxury":    "0 4px 24px 0 rgba(16,41,62,0.10), 0 1px 4px 0 rgba(16,41,62,0.06)",
        "luxury-lg": "0 12px 48px 0 rgba(16,41,62,0.14), 0 2px 8px 0 rgba(16,41,62,0.08)",
        "luxury-xl": "0 24px 80px 0 rgba(16,41,62,0.18), 0 4px 16px 0 rgba(16,41,62,0.10)",
        "card-hover":"0 20px 60px 0 rgba(16,41,62,0.16)",
      },
      backgroundImage: {
        "gradient-navy": "linear-gradient(135deg, #10293e 0%, #1e5478 60%, #0a1b27 100%)",
        "gradient-sand": "linear-gradient(135deg, #d7b98f 0%, #c49a6a 100%)",
        "gradient-hero": "linear-gradient(180deg, rgba(16,41,62,0.72) 0%, rgba(16,41,62,0.32) 60%, rgba(16,41,62,0.64) 100%)",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      animation: {
        "fade-up":    "fadeUp 0.5s cubic-bezier(0.25,0.46,0.45,0.94) both",
        "fade-in":    "fadeIn 0.4s ease both",
        "slide-up":   "slideUp 0.4s cubic-bezier(0.25,0.46,0.45,0.94) both",
      },
      keyframes: {
        fadeUp:  { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "none" } },
        fadeIn:  { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { transform: "translateY(100%)" }, to: { transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};

export default config;

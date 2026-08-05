import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        uni: {
          pink: "#ff007a",
          pinkSoft: "#ff5cae",
          purple: "#8f5cff",
          bg: "#0d0e12",
          card: "#16171d",
          card2: "#1c1d26",
          line: "#282a36",
          text: "#f5f6fb",
          muted: "#9096a8",
          up: "#31d68a",
          down: "#ff5c5c",
          gold: "#ffcf5a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        pink: "0 0 0 1px rgba(255,0,122,0.25), 0 18px 50px -20px rgba(255,0,122,0.5)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        blink: { "0%,90%,100%": { transform: "scaleY(1)" }, "95%": { transform: "scaleY(0.1)" } },
        pop: { from: { transform: "scale(0.96)", opacity: "0" }, to: { transform: "scale(1)", opacity: "1" } },
        shimmer: { "0%": { backgroundPosition: "0% 50%" }, "100%": { backgroundPosition: "200% 50%" } },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        blink: "blink 5s infinite",
        pop: "pop 0.25s ease both",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

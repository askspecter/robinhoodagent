import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        uni: {
          green: "#ff3ba7",
          greenDim: "#b02a73",
          text: "#e9efe3",
          muted: "#c579a4",
          bg: "#070208",
          card: "#0b040a",
          line: "#3d1c31",
          pink: "#ff2e88",
          pinkSoft: "#ff77b6",
          purple: "#b06bff",
          up: "#35ff7a",
          down: "#ff5c5c",
          gold: "#ffcf5a",
          cyan: "#45d6ff",
        },
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        flicker: { "0%,100%": { opacity: "0.97" }, "8%": { opacity: "0.82" }, "10%": { opacity: "0.97" }, "50%": { opacity: "0.99" }, "72%": { opacity: "0.86" } },
        pop: { from: { opacity: "0", transform: "translateY(4px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        glitch: { "0%,100%": { transform: "translate(0)" }, "20%": { transform: "translate(-3px,1px)" }, "40%": { transform: "translate(3px,-1px)" }, "60%": { transform: "translate(-2px,-1px)" }, "80%": { transform: "translate(2px,1px)" } },
        scan: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100vh)" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        flicker: "flicker 4s infinite",
        pop: "pop 0.2s ease both",
        glitch: "glitch 0.18s steps(2) infinite",
        scan: "scan 6s linear infinite",
        floaty: "floaty 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

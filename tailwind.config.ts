import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Green phosphor CRT palette
        stonk: {
          green: "#3bff88",
          greenDim: "#1f7a4a",
          bright: "#b6ffd2",
          amber: "#ffb000",
          gold: "#ffb000",
          ink: "#030603",
          panel: "#06110a",
          panel2: "#0a1a10",
          line: "#123a24",
          red: "#ff5c5c",
          muted: "#4f8f6a",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(59,255,136,0.25), 0 0 40px -10px rgba(59,255,136,0.5)",
      },
      keyframes: {
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        flicker: {
          "0%,100%": { opacity: "0.97" },
          "8%": { opacity: "0.86" },
          "9%": { opacity: "0.97" },
          "20%": { opacity: "0.9" },
          "50%": { opacity: "0.99" },
          "72%": { opacity: "0.88" },
        },
        scan: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100vh)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        pulseGlow: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.5" } },
        bootfade: { to: { opacity: "0", visibility: "hidden" } },
        rise: { from: { opacity: "0", transform: "translateY(6px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        flicker: "flicker 4s infinite",
        scan: "scan 6s linear infinite",
        marquee: "marquee 30s linear infinite",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        rise: "rise 0.5s ease both",
      },
    },
  },
  plugins: [],
};

export default config;

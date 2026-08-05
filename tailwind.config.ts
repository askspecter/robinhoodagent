import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // StonkBrokers-faithful: yellow-lime on near-black
        stonk: {
          green: "#c6f24d",
          greenDim: "#8a9a5f",
          bright: "#eef3e6",
          amber: "#ffcf5a",
          gold: "#ffcf5a",
          ink: "#0a0a0a",
          panel: "#131414",
          panel2: "#191a1a",
          line: "#2a2c26",
          red: "#ff6b6b",
          muted: "#8b8f86",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(196,248,44,0.22), 0 0 40px -10px rgba(196,248,44,0.45)",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        pulseGlow: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.5" } },
        rise: { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        rise: "rise 0.5s ease both",
      },
    },
  },
  plugins: [],
};

export default config;

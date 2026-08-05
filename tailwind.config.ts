import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zaibatsu-style green terminal
        stonk: {
          green: "#4fe37f",
          greenDim: "#3a6b4c",
          bright: "#7dffa6",
          blue: "#6f8dff",
          blueBright: "#8fa6ff",
          amber: "#ffcf5a",
          gold: "#ffcf5a",
          ink: "#050705",
          panel: "#0a0e0a",
          panel2: "#0d120d",
          line: "#1c3324",
          red: "#ff6b6b",
          muted: "#6a8f79",
        },
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        pixel: ["var(--font-pixel)", "ui-monospace", "monospace"],
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

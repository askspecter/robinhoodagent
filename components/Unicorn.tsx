"use client";

import type { Mood } from "@/lib/unia/engine";

const AURA: Record<Mood, string> = {
  euphoric: "#35ff7a",
  happy: "#7dffb0",
  neutral: "#35ff7a",
  nervous: "#ffb000",
  crying: "#45d6ff",
  rekt: "#ff4d4d",
};

function Eye({ mood, c }: { mood: Mood; c: string }) {
  const x = 150, y = 128;
  if (mood === "rekt")
    return <g stroke={c} strokeWidth="3.5" strokeLinecap="round"><path d={`M${x - 6},${y - 6} l12,12 M${x + 6},${y - 6} l-12,12`} /></g>;
  if (mood === "euphoric")
    return <text x={x} y={y + 7} fill={c} fontSize="22" textAnchor="middle" fontWeight="bold">*</text>;
  if (mood === "crying")
    return <g stroke={c} strokeWidth="3" fill="none" strokeLinecap="round"><path d={`M${x - 7},${y} q7,7 14,0`} /><path d={`M${x - 3},${y + 5} q-3,16 -1,30`} /></g>;
  if (mood === "nervous")
    return <circle cx={x} cy={y} r="3" fill={c} />;
  return <g><circle cx={x} cy={y} r="5.5" fill={c} /><circle cx={x + 1.5} cy={y - 1.5} r="1.6" fill="#031007" /></g>;
}

export function Unicorn({ mood, speech, glitching }: { mood: Mood; speech?: string; glitching?: boolean }) {
  const c = AURA[mood];
  return (
    <div className="flex flex-col items-center w-full">
      <div className={`relative ${glitching ? "animate-glitch" : "animate-floaty"}`} style={{ filter: `drop-shadow(0 0 30px ${c}55)` }}>
        <svg width="320" height="320" viewBox="0 0 300 300">
          <defs>
            <radialGradient id="uglow"><stop offset="0" stopColor={c} stopOpacity="0.38" /><stop offset="1" stopColor={c} stopOpacity="0" /></radialGradient>
          </defs>
          <circle cx="150" cy="155" r="135" fill="url(#uglow)" />

          {/* flowing mane (magenta / purple) down the neck/back */}
          <g fill="none" strokeWidth="7" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 7px rgba(255,46,136,0.6))" }}>
            <path d="M176,86 C210,96 216,150 202,205 C196,232 208,250 214,262" stroke="#ff2e88" />
            <path d="M168,80 C206,84 222,140 214,200 C210,232 224,248 228,262" stroke="#b06bff" opacity="0.85" />
            <path d="M184,96 C206,120 206,160 196,196" stroke="#ff77b6" opacity="0.8" />
          </g>

          {/* unicorn head + neck bust, facing left (line-art) */}
          <path
            d="M52,182
               C50,170 60,154 82,144
               C110,122 138,108 156,96
               C166,88 176,86 186,96
               C200,116 210,158 222,208
               C230,236 234,254 226,266
               L150,266
               C132,266 120,254 116,232
               C106,214 94,206 80,202
               C66,198 56,192 52,182 Z"
            fill={`${c}0f`} stroke={c} strokeWidth="3.5" strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 0 5px ${c})` }}
          />

          {/* ear */}
          <path d="M172,90 C168,60 190,52 200,74 C196,88 186,92 172,90 Z" fill={`${c}0f`} stroke={c} strokeWidth="3" />

          {/* spiral horn (points up-forward) */}
          <g style={{ filter: "drop-shadow(0 0 9px rgba(255,176,0,0.85))" }}>
            <path d="M150,96 L126,20 L166,92 Z" fill="rgba(255,176,0,0.16)" stroke="#ffb000" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M143,78 l16,-3 M146,66 l14,-3 M149,54 l12,-3 M151,42 l10,-3 M153,30 l7,-2" stroke="#ffb000" strokeWidth="2" fill="none" />
          </g>
          {mood === "euphoric" && <circle cx="128" cy="26" r="7" fill="#fff0a8" opacity="0.9" />}

          <Eye mood={mood} c={c} />
          {/* nostril near muzzle tip */}
          <ellipse cx="70" cy="176" rx="5" ry="4" fill="none" stroke={c} strokeWidth="2.5" />
          {mood === "nervous" && <path d="M196,150 q6,10 0,20 q-6,-10 0,-20 Z" fill="#45d6ff" />}
        </svg>
      </div>

      <div className="mt-3 text-center w-full max-w-md min-h-[3em]">
        {speech && (
          <p className={`text-sm ${glitching ? "text-uni-down glow-mag" : "text-uni-text"} leading-snug`}>
            <span className="text-uni-pink">unia&gt;</span> {speech}
          </p>
        )}
      </div>
    </div>
  );
}

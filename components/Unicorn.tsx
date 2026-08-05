"use client";

import type { Mood } from "@/lib/unia/engine";

const AURA: Record<Mood, string> = {
  euphoric: "#31d68a",
  happy: "#69e0a6",
  neutral: "#ff5cae",
  nervous: "#ffcf5a",
  crying: "#ff8ad4",
  rekt: "#ff5c5c",
};

function Eyes({ mood }: { mood: Mood }) {
  const s = "#1a1030";
  if (mood === "euphoric")
    return (
      <g fill="none" stroke={s} strokeWidth="4" strokeLinecap="round">
        <path d="M70 92 l7 -8 7 8 M70 84 l7 8 7 -8" />
        <path d="M116 92 l7 -8 7 8 M116 84 l7 8 7 -8" />
      </g>
    );
  if (mood === "happy")
    return (
      <g fill="none" stroke={s} strokeWidth="5" strokeLinecap="round">
        <path d="M70 90 q7 -10 14 0" />
        <path d="M116 90 q7 -10 14 0" />
      </g>
    );
  if (mood === "nervous")
    return (
      <g fill={s}>
        <circle cx="77" cy="90" r="4" />
        <circle cx="123" cy="90" r="4" />
      </g>
    );
  if (mood === "crying")
    return (
      <g stroke={s} strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M70 90 q7 8 14 0" />
        <path d="M116 90 q7 8 14 0" />
        <path d="M77 96 q-3 12 -1 22" stroke="#6cc9ff" />
        <path d="M123 96 q-3 12 -1 22" stroke="#6cc9ff" />
      </g>
    );
  if (mood === "rekt")
    return (
      <g stroke={s} strokeWidth="4" strokeLinecap="round">
        <path d="M71 84 l12 12 M83 84 l-12 12" />
        <path d="M117 84 l12 12 M129 84 l-12 12" />
      </g>
    );
  return (
    <g fill={s}>
      <circle cx="77" cy="89" r="6" />
      <circle cx="123" cy="89" r="6" />
      <circle cx="79" cy="87" r="2" fill="#fff" />
      <circle cx="125" cy="87" r="2" fill="#fff" />
    </g>
  );
}

function Mouth({ mood }: { mood: Mood }) {
  const s = "#1a1030";
  const d =
    mood === "euphoric" ? "M84 116 q16 20 32 0 q-16 8 -32 0" :
    mood === "happy" ? "M88 116 q12 12 24 0" :
    mood === "nervous" ? "M90 118 q5 -6 10 0 q5 6 10 0" :
    mood === "crying" ? "M90 122 q10 -12 20 0" :
    mood === "rekt" ? "M88 120 q6 -5 12 0 q6 5 12 0" :
    "M92 117 q8 6 16 0";
  return <path d={d} fill={mood === "euphoric" ? "#ff3d8a" : "none"} stroke={s} strokeWidth="4" strokeLinecap="round" />;
}

export function Unicorn({ mood, speech }: { mood: Mood; speech?: string }) {
  const aura = AURA[mood];
  return (
    <div className="relative flex flex-col items-center">
      {speech && (
        <div className="card animate-pop max-w-xs mb-4 px-4 py-3 text-sm text-uni-text text-center relative shadow-pink">
          {speech}
          <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 rotate-45 bg-uni-card border-r border-b border-uni-line" />
        </div>
      )}
      <div className="relative animate-float" style={{ filter: `drop-shadow(0 12px 40px ${aura}66)` }}>
        <svg width="230" height="230" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="horn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff0a8" />
              <stop offset="1" stopColor="#ffcf5a" />
            </linearGradient>
            <radialGradient id="glow">
              <stop offset="0" stopColor={aura} stopOpacity="0.55" />
              <stop offset="1" stopColor={aura} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="105" r="92" fill="url(#glow)" />
          {/* mane */}
          <path d="M60 60 q-22 20 -14 54 q-18 -6 -8 -34 q-12 6 -6 -14 q10 -20 40 -18Z" fill="#8f5cff" />
          <path d="M140 60 q22 20 14 54 q18 -6 8 -34 q12 6 6 -14 q-10 -20 -40 -18Z" fill="#ff007a" />
          {/* ears */}
          <path d="M64 58 l10 -18 10 16Z" fill="#ff8ad4" />
          <path d="M136 58 l-10 -18 -10 16Z" fill="#ff8ad4" />
          {/* horn */}
          <path d="M100 12 l10 40 l-20 0Z" fill="url(#horn)" stroke="#e6a92e" strokeWidth="1.5" />
          {mood === "euphoric" && <circle cx="100" cy="20" r="6" fill="#fff0a8" opacity="0.9" />}
          {/* head */}
          <ellipse cx="100" cy="102" rx="62" ry="58" fill="#ff9ed6" />
          <ellipse cx="100" cy="112" rx="40" ry="34" fill="#ffc3e6" />
          {/* cheeks */}
          <circle cx="64" cy="112" r="9" fill="#ff5cae" opacity="0.55" />
          <circle cx="136" cy="112" r="9" fill="#ff5cae" opacity="0.55" />
          <Eyes mood={mood} />
          <Mouth mood={mood} />
          {/* nostrils */}
          <circle cx="94" cy="126" r="2.2" fill="#c94f92" />
          <circle cx="106" cy="126" r="2.2" fill="#c94f92" />
          {mood === "nervous" && <path d="M132 78 q6 10 0 18 q-6 -8 0 -18Z" fill="#6cc9ff" />}
          {mood === "euphoric" && (
            <g fill="#ffcf5a">
              <path d="M40 50 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3Z" />
              <path d="M162 66 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2Z" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

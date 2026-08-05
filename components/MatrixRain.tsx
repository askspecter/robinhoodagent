"use client";

import { useEffect, useRef } from "react";

export function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight);
    const font = 14;
    let cols = Math.floor(w / font);
    let drops = Array(cols).fill(0).map(() => Math.random() * -50);
    const chars = "01Ξ₿UNIA<>/{}#$%*+=".split("");
    const onResize = () => {
      w = c.width = window.innerWidth; h = c.height = window.innerHeight;
      cols = Math.floor(w / font); drops = Array(cols).fill(0).map(() => Math.random() * -50);
    };
    window.addEventListener("resize", onResize);
    let raf = 0, last = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 55) return;
      last = t;
      ctx.fillStyle = "rgba(3,6,3,0.12)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${font}px monospace`;
      for (let i = 0; i < cols; i++) {
        ctx.fillStyle = Math.random() < 0.02 ? "rgba(255,46,136,0.55)" : "rgba(53,255,122,0.35)";
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * font, drops[i] * font);
        if (drops[i] * font > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 z-0 opacity-[0.16] pointer-events-none" />;
}

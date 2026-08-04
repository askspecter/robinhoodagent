"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Types `text` character-by-character. Optionally waits `startDelay` ms,
 * then calls `onDone`. Shows a blinking cursor while typing (and after,
 * if `keepCursor`).
 */
export function Typewriter({
  text,
  speed = 26,
  startDelay = 0,
  className = "",
  keepCursor = false,
  onDone,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  keepCursor?: boolean;
  onDone?: () => void;
}) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
          doneRef.current?.();
        }
      }, speed);
    }, startDelay);

    timer = start;
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={className}>
      {out}
      {(!done || keepCursor) && <span className="cursor align-middle" />}
    </span>
  );
}

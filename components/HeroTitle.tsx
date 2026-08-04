"use client";

import { useState } from "react";
import { Typewriter } from "./Typewriter";

/**
 * Types the title once, then switches to a periodic RGB-split glitch.
 */
export function HeroTitle({ text }: { text: string }) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <span className="glitch glow" data-text={text}>
        {text}
      </span>
    );
  }
  return <Typewriter text={text} speed={38} onDone={() => setDone(true)} />;
}

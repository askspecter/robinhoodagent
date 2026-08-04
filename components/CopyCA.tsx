"use client";

import { useState } from "react";

export function CopyCA({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="btn px-4 py-2 text-xs"
      onClick={() => {
        navigator.clipboard?.writeText(value).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
    >
      {copied ? "copied ✓" : "copy CA"}
    </button>
  );
}

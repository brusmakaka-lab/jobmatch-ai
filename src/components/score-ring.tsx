"use client";

import { useEffect, useState } from "react";

export function ScoreRing({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, score));
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(clamped), 50);
    return () => clearTimeout(timeout);
  }, [clamped]);

  return (
    <div
      className="relative grid h-32 w-32 place-items-center rounded-full"
      role="img"
      aria-label={`Compatibility score: ${clamped} out of 100`}
      style={{
        background: `conic-gradient(var(--primary) ${animated * 3.6}deg, var(--muted) 0deg)`,
      }}
    >
      <div className="absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
      <div className="grid h-24 w-24 place-items-center rounded-full bg-card shadow-sm ring-1 ring-foreground/[0.06]">
        <div className="text-center">
          <p className="text-3xl font-semibold tracking-tight">{clamped}</p>
          <p className="text-xs font-medium text-muted-foreground">score</p>
        </div>
      </div>
    </div>
  );
}

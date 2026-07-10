"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

export default function StartScreen() {
  const [started, setStarted] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = started ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [started]);

  const handleStart = () => {
    window.dispatchEvent(new Event("site-start"));
    setStarted(true);
    window.setTimeout(() => setHidden(true), 700);
  };

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${
        started ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]" />

      <div className="relative flex flex-col items-center px-6 text-center">
        <p className="section-label text-xs font-semibold uppercase tracking-[0.35em] text-accent">
          Portfolio
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-3 text-sm text-muted sm:text-base">{profile.tagline}</p>

        <button
          type="button"
          onClick={handleStart}
          className="group relative mt-12 flex h-20 w-20 items-center justify-center rounded-full border border-accent/50 transition-transform duration-300 hover:scale-105"
          aria-label="Start"
        >
          <span className="absolute inset-0 rounded-full border border-accent/40 animate-ping" />
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            Start
          </span>
        </button>
        <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Click to enter with sound
        </span>
      </div>
    </div>
  );
}

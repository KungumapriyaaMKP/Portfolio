"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { profile } from "@/data/portfolio";

export default function StartScreen() {
  const [hidden, setHidden] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = hidden ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

  useEffect(() => {
    if (!contentRef.current) return;
    const targets = contentRef.current.querySelectorAll("[data-animate]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: 24, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.15,
        }
      );

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.15,
          opacity: 0.75,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          y: -4,
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.6,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleStart = () => {
    window.dispatchEvent(new Event("site-start"));

    gsap.to(rootRef.current, {
      autoAlpha: 0,
      scale: 1.06,
      filter: "blur(12px)",
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: () => setHidden(true),
    });
  };

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 opacity-50 blur-[140px]"
      />

      <div ref={contentRef} className="relative flex flex-col items-center px-6 text-center">
        <p
          data-animate
          className="section-label text-xs font-semibold uppercase tracking-[0.35em] text-accent"
        >
          Portfolio
        </p>
        <h1
          data-animate
          className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-5xl"
        >
          {profile.name}
        </h1>
        <p data-animate className="mt-3 text-sm text-muted sm:text-base">
          {profile.tagline}
        </p>

        <button
          ref={buttonRef}
          data-animate
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
        <span
          data-animate
          className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
        >
          Click to enter with sound
        </span>
      </div>
    </div>
  );
}

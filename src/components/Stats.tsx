"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuBrainCircuit, LuCpu, LuDatabase } from "react-icons/lu";
import {
  SiMongodb,
  SiPython,
  SiReact,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiHuggingface,
  SiOpencv,
  SiNumpy,
} from "react-icons/si";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { profile, stats } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function parseStatValue(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { number: 0, decimals: 0, suffix: value };
  const [, numStr, suffix] = match;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { number: parseFloat(numStr), decimals, suffix };
}

const statMax = [12, 15, 20, 10];

function StatRing({ value, max, delay }: { value: string; max: number; delay: number }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const size = 88;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const numEl = numRef.current;
    const ringEl = ringRef.current;
    if (!numEl || !ringEl) return;
    const { number, decimals, suffix } = parseStatValue(value);
    const counter = { val: 0 };
    const pct = Math.min(1, number / max);

    ringEl.style.strokeDasharray = String(circumference);
    ringEl.style.strokeDashoffset = String(circumference);

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: number,
        duration: 1.5,
        delay: delay / 1000,
        ease: "power2.out",
        scrollTrigger: {
          trigger: numEl,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          numEl.textContent = counter.val.toFixed(decimals) + suffix;
        },
      });
      gsap.to(ringEl, {
        strokeDashoffset: circumference * (1 - pct),
        duration: 1.5,
        delay: delay / 1000,
        ease: "power2.out",
        scrollTrigger: {
          trigger: numEl,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [value, max, delay, circumference]);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border)" strokeWidth={strokeWidth} />
        <circle
          ref={ringRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span ref={numRef} className="font-display text-xl font-bold text-foreground">
          0
        </span>
      </div>
    </div>
  );
}

const asideIcons = [
  { icon: LuBrainCircuit, glyph: null },
  { icon: SiTensorflow, glyph: null },
  { icon: SiPytorch, glyph: null },
  { icon: SiScikitlearn, glyph: null },
  { icon: SiHuggingface, glyph: null },
  { icon: SiOpencv, glyph: null },
  { icon: SiPython, glyph: null },
  { icon: SiNumpy, glyph: null },
  { icon: SiReact, glyph: null },
  { icon: SiMongodb, glyph: null },
  { icon: LuDatabase, glyph: null },
  { icon: LuCpu, glyph: null },
] as const;

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const quickGlowX = useRef<((value: number) => void) | null>(null);
  const quickGlowY = useRef<((value: number) => void) | null>(null);
  const quickStageX = useRef<((value: number) => void) | null>(null);
  const quickStageY = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const photoWrap = photoWrapRef.current;

    if (glow) {
      quickGlowX.current = gsap.quickTo(glow, "x", { duration: 0.9, ease: "power3.out" });
      quickGlowY.current = gsap.quickTo(glow, "y", { duration: 0.9, ease: "power3.out" });
    }
    if (photoWrap) {
      quickStageX.current = gsap.quickTo(photoWrap, "rotationY", { duration: 0.7, ease: "power3.out" });
      quickStageY.current = gsap.quickTo(photoWrap, "rotationX", { duration: 0.7, ease: "power3.out" });
    }

    const ctx = gsap.context(() => {
      if (photoWrap) {
        gsap.fromTo(
          photoWrap,
          { autoAlpha: 0, scale: 0.7 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: photoWrap,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      iconRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 24, scale: 0.6 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: 0.15 + i * 0.06,
            ease: "back.out(1.8)",
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    quickGlowX.current?.(px * 60);
    quickGlowY.current?.(py * 60);
    quickStageX.current?.(px * 16);
    quickStageY.current?.(-py * 16);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative overflow-hidden border-t border-border bg-surface/40 py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <Reveal className="flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 border border-border bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to Work
          </span>
          <span className="inline-flex items-center gap-2 border border-border bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur-sm">
            Based in India
          </span>
        </Reveal>

        <div
          ref={stageRef}
          className="mx-auto mt-16 flex max-w-2xl flex-col items-center gap-10 lg:flex-row lg:justify-center lg:gap-14"
        >
          <div style={{ perspective: "1200px" }} className="relative shrink-0">
            <div ref={photoWrapRef} className="relative" style={{ transformStyle: "preserve-3d" }}>
              <div className="absolute inset-0 -z-10 scale-125 bg-accent/20 blur-3xl" />
              <TiltCard max={10} className="relative overflow-hidden border border-accent/30">
                <img
                  src="/images/pfp.jpg"
                  alt={profile.name}
                  loading="lazy"
                  decoding="async"
                  className="h-[260px] w-[220px] object-cover object-[50%_79%] sm:h-[280px] sm:w-[240px]"
                />
              </TiltCard>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 lg:grid-cols-3">
            {asideIcons.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  ref={(el) => {
                    iconRefs.current[i] = el;
                  }}
                  className="flex h-14 w-14 items-center justify-center border border-accent/40 bg-surface/85 text-accent shadow-[0_8px_24px_-6px_rgba(245,149,74,0.35)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:border-accent/70"
                >
                  {Icon ? (
                    <Icon style={{ width: "42%", height: "42%" }} />
                  ) : (
                    <span className="font-mono text-xs font-semibold">{item.glyph}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="h-full">
              <TiltCard
                max={10}
                className="flex h-full flex-col items-center gap-3 border border-border bg-surface/60 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-accent/40"
              >
                <StatRing value={s.value} max={statMax[i]} delay={i * 90} />
                <p className="text-xs text-muted">{s.label}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuGraduationCap, LuAward } from "react-icons/lu";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import Watermark from "@/components/Watermark";
import { education } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Journey() {
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const desktopProgressRef = useRef<HTMLDivElement>(null);
  const desktopDotRef = useRef<HTMLDivElement>(null);
  const desktopMarkerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobileMarkerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mobileSegmentRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const markerStops = education.map((_, i) =>
        education.length === 1 ? 0 : (i / (education.length - 1)) * 100
      );

      // Desktop: horizontal draw
      if (desktopTrackRef.current && desktopProgressRef.current && desktopDotRef.current) {
        const dot = desktopDotRef.current;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: desktopTrackRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          desktopProgressRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: "power2.inOut" },
          0
        )
          .fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.2, ease: "back.out(3)" }, 0)
          .fromTo(
            dot,
            { left: "16.66%" },
            { left: "83.33%", duration: 1.1, ease: "power2.inOut" },
            0
          );

        desktopMarkerRefs.current.forEach((marker, i) => {
          if (!marker) return;
          tl.fromTo(
            marker,
            { scale: 0.6, boxShadow: "0 0 0px 0px rgba(245,149,74,0)" },
            {
              scale: 1,
              boxShadow: "0 0 22px 4px rgba(245,149,74,0.55)",
              duration: 0.3,
              ease: "back.out(3)",
              onComplete: () => {
                gsap.to(marker, {
                  boxShadow: "0 0 0px 0px rgba(245,149,74,0)",
                  duration: 0.6,
                  ease: "power1.out",
                });
              },
            },
            (markerStops[i] / 100) * 1.1
          );
        });

        // continuous traveling pulse along the line once the draw-in finishes
        gsap.to(dot, {
          keyframes: [{ left: "83.33%" }, { left: "16.66%" }],
          duration: 3.2,
          delay: 1.3,
          repeat: -1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: desktopTrackRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Mobile: vertical draw, dot-by-dot down the page
      if (mobileTrackRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mobileTrackRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        education.forEach((_, i) => {
          const marker = mobileMarkerRefs.current[i];
          const segment = mobileSegmentRefs.current[i];
          const step = i * 0.35;

          if (marker) {
            tl.fromTo(
              marker,
              { scale: 0.4, boxShadow: "0 0 0px 0px rgba(245,149,74,0)" },
              {
                scale: 1,
                boxShadow: "0 0 16px 3px rgba(245,149,74,0.55)",
                duration: 0.25,
                ease: "back.out(3)",
                onComplete: () => {
                  gsap.to(marker, {
                    boxShadow: "0 0 0px 0px rgba(245,149,74,0)",
                    duration: 0.6,
                    ease: "power1.out",
                  });
                },
              },
              step
            );
          }

          if (segment) {
            tl.fromTo(
              segment,
              { scaleY: 0 },
              { scaleY: 1, duration: 0.3, ease: "power2.inOut" },
              step + 0.1
            );
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      className="relative overflow-hidden border-t border-border py-28"
    >
      <Watermark text="Journey" />

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-accent/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-accent-dark/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading eyebrow="Journey" title="Where I've been" />

        <div className="mb-8 flex items-center gap-4">
          <p className="section-label whitespace-nowrap text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Education
          </p>
          <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>

        {/* Desktop: horizontal timeline */}
        <div ref={desktopTrackRef} className="relative hidden lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="pointer-events-none absolute inset-x-[16.66%] top-7 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div
            ref={desktopProgressRef}
            className="pointer-events-none absolute inset-x-[16.66%] top-7 h-px origin-left bg-gradient-to-r from-accent-dark via-accent to-accent-light shadow-[0_0_12px_1px_rgba(245,149,74,0.6)]"
            style={{ transform: "scaleX(0)" }}
          />
          <div
            ref={desktopDotRef}
            className="pointer-events-none absolute top-7 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-light shadow-[0_0_16px_5px_rgba(245,149,74,0.8)]"
            style={{ left: "16.66%", transform: "scale(0)" }}
          />
          {education.map((item, i) => (
            <div key={item.degree} className="h-full">
              <Reveal delay={i * 110} className="h-full">
                <TiltCard className="h-full" max={5}>
                  <div className="relative flex h-full flex-col pt-16">
                    <div
                      ref={(el) => {
                        desktopMarkerRefs.current[i] = el;
                      }}
                      className="absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 items-center justify-center border border-accent/50 bg-gradient-to-br from-surface to-background text-accent"
                    >
                      <LuGraduationCap className="h-6 w-6" />
                      <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center border border-accent bg-background font-mono text-[10px] font-semibold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="group relative flex h-full flex-1 flex-col overflow-hidden border border-border bg-gradient-to-b from-surface to-surface/60 p-6 shadow-[0_0_0_1px_rgba(0,0,0,0)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10">
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="inline-flex w-fit items-center border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                        {item.period}
                      </span>
                      <h3 className="mt-3 font-display text-base font-semibold leading-snug text-foreground">
                        {item.degree}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{item.school}</p>
                      <div className="mt-auto flex items-center gap-2 border-t border-border/60 pt-4 text-sm">
                        <LuAward className="h-4 w-4 shrink-0 text-accent" />
                        <span className="font-semibold text-foreground">{item.detail}</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div ref={mobileTrackRef} className="mx-auto max-w-2xl lg:hidden">
          {education.map((item, i) => (
            <div key={item.degree} className="relative flex gap-5 pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                <span
                  ref={(el) => {
                    mobileMarkerRefs.current[i] = el;
                  }}
                  className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-accent/50 bg-gradient-to-br from-surface to-background text-accent"
                  style={{ transform: "scale(0.4)" }}
                >
                  <LuGraduationCap className="h-4 w-4" />
                </span>
                {i < education.length - 1 && (
                  <span className="relative mt-1 w-px flex-1 bg-border">
                    <span
                      ref={(el) => {
                        mobileSegmentRefs.current[i] = el;
                      }}
                      className="absolute inset-0 origin-top bg-gradient-to-b from-accent to-accent-dark"
                      style={{ transform: "scaleY(0)" }}
                    />
                  </span>
                )}
              </div>
              <Reveal delay={i * 90} className="flex-1">
                <div className="group relative overflow-hidden border border-border bg-gradient-to-b from-surface to-surface/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10">
                  <span className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {item.degree}
                    </h3>
                    <span className="inline-flex items-center border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{item.school}</p>
                  <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-4 text-sm">
                    <LuAward className="h-4 w-4 shrink-0 text-accent" />
                    <span className="font-semibold text-foreground">{item.detail}</span>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

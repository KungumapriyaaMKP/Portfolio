"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 48, rotationX: 12, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.9,
          delay: delay / 1000,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div className={className} style={{ perspective: "1200px" }}>
      <div
        ref={ref}
        className={className}
        style={{ opacity: 0, transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}

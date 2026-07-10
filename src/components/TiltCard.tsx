"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { gsap } from "gsap";

export default function TiltCard({
  children,
  className = "",
  max = 8,
  restRotateX = 0,
  restRotateY = 0,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  /** Baseline rotation the card rests at when the pointer isn't hovering it, for a persistent 3D lean. */
  restRotateX?: number;
  restRotateY?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const quickRotateX = useRef<((value: number) => void) | null>(null);
  const quickRotateY = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { rotationX: restRotateX, rotationY: restRotateY, transformPerspective: 1200 });
    quickRotateX.current = gsap.quickTo(el, "rotationX", {
      duration: 0.5,
      ease: "power3.out",
    });
    quickRotateY.current = gsap.quickTo(el, "rotationY", {
      duration: 0.5,
      ease: "power3.out",
    });
  }, [restRotateX, restRotateY]);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    quickRotateY.current?.(restRotateY + px * max);
    quickRotateX.current?.(restRotateX + -py * max);
  };

  const onMouseLeave = () => {
    quickRotateX.current?.(restRotateX);
    quickRotateY.current?.(restRotateY);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, [role='button'], label";
const SIZE = 36;
const ARM = 10;

export default function CustomCursor() {
  const frameRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const frame = frameRef.current;
    const dot = dotRef.current;
    const coords = coordsRef.current;
    if (!frame || !dot || !coords) return;

    document.documentElement.classList.add("custom-cursor-active");

    gsap.set([frame, dot], { x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const quickFrameX = gsap.quickTo(frame, "x", { duration: 0.12, ease: "power2.out" });
    const quickFrameY = gsap.quickTo(frame, "y", { duration: 0.12, ease: "power2.out" });
    const quickDotX = gsap.quickTo(dot, "x", { duration: 0.04, ease: "power2.out" });
    const quickDotY = gsap.quickTo(dot, "y", { duration: 0.04, ease: "power2.out" });

    let hasMoved = false;
    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        gsap.set([frame, dot], { x: e.clientX, y: e.clientY });
        gsap.to([frame, dot, coords], { autoAlpha: 1, duration: 0.2 });
      }
      quickFrameX(e.clientX);
      quickFrameY(e.clientY);
      quickDotX(e.clientX);
      quickDotY(e.clientY);
      coords.textContent = `X:${String(Math.round(e.clientX)).padStart(4, "0")} Y:${String(
        Math.round(e.clientY)
      ).padStart(4, "0")}`;
      coords.style.transform = `translate(${e.clientX + 22}px, ${e.clientY + 18}px)`;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest(INTERACTIVE_SELECTOR)) {
        frame.classList.add("cursor-frame-active");
        dot.classList.add("cursor-dot-active");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest(INTERACTIVE_SELECTOR)) {
        frame.classList.remove("cursor-frame-active");
        dot.classList.remove("cursor-dot-active");
      }
    };

    const onMouseDown = () => frame.classList.add("cursor-frame-down");
    const onMouseUp = () => frame.classList.remove("cursor-frame-down");

    const onMouseLeave = () => {
      gsap.to([frame, dot, coords], { autoAlpha: 0, duration: 0.2 });
    };
    const onMouseEnter = () => {
      gsap.to([frame, dot, coords], { autoAlpha: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={frameRef}
        aria-hidden="true"
        className="cursor-frame pointer-events-none fixed left-0 top-0 z-[10000] -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{ width: SIZE, height: SIZE }}
      >
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
          <path d={`M1 ${ARM} V1 H${ARM}`} stroke="var(--accent)" strokeWidth="1.5" />
          <path d={`M${SIZE - ARM} 1 H${SIZE - 1} V${ARM}`} stroke="var(--accent)" strokeWidth="1.5" />
          <path
            d={`M${SIZE - 1} ${SIZE - ARM} V${SIZE - 1} H${SIZE - ARM}`}
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <path d={`M${ARM} ${SIZE - 1} H1 V${SIZE - ARM}`} stroke="var(--accent)" strokeWidth="1.5" />
        </svg>
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[10000] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0"
      />
      <div
        ref={coordsRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[10000] whitespace-nowrap font-mono text-[10px] text-accent/70 opacity-0"
      >
        X:0000 Y:0000
      </div>
    </>
  );
}

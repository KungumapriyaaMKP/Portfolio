"use client";

import { useEffect, useRef, useState } from "react";
import { LuX } from "react-icons/lu";
import SectionHeading from "@/components/SectionHeading";
import SlideReveal from "@/components/SlideReveal";
import TiltCard from "@/components/TiltCard";
import Watermark from "@/components/Watermark";
import { leadership } from "@/data/portfolio";

function LeadershipImage({ image, alt }: { image: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [image]);

  return (
    <div className="absolute inset-0 bg-background">
      <div
        className={`absolute inset-0 bg-gradient-to-br from-accent/15 to-background transition-opacity duration-300 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl ${
          loaded ? "opacity-40" : "opacity-0"
        }`}
      />
      <img
        ref={imgRef}
        src={image}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-contain [image-rendering:high-quality] contrast-[1.08] saturate-[1.12] transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default function Leadership() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  return (
    <section id="leadership" className="relative overflow-hidden border-t border-border py-28">
      <Watermark text="Leadership" />

      <div className="pointer-events-none absolute left-1/2 top-24 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Leadership"
          title="Where I Lead"
          description="Community roles and open-source contributions alongside my coursework."
        />

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          {leadership.map((item, i) => (
            <SlideReveal
              key={item.role}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 110}
              className="h-full"
            >
              <TiltCard max={7} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden border border-border bg-surface transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-8 z-10 select-none font-display text-[6rem] font-bold leading-none text-foreground/[0.05] transition-colors duration-300 group-hover:text-accent/[0.1]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-dark via-accent to-accent-light transition-transform duration-500 group-hover:scale-x-100" />

                  <button
                    type="button"
                    onClick={() => setLightbox({ src: item.image, alt: item.role })}
                    className="relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden sm:aspect-square"
                  >
                    <LeadershipImage image={item.image} alt={item.role} />
                  </button>
                  <div className="relative flex items-center justify-between gap-3 p-5">
                    <p className="text-base font-semibold leading-snug text-foreground">
                      {item.role}
                    </p>
                    <span className="h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(245,149,74,0.6)] transition-transform duration-300 group-hover:scale-125" />
                  </div>
                </div>
              </TiltCard>
            </SlideReveal>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-6 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center border border-border bg-surface text-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            <LuX className="h-5 w-5" />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </section>
  );
}

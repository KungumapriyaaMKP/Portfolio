"use client";

import { useEffect, useState } from "react";
import { LuX } from "react-icons/lu";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Watermark from "@/components/Watermark";
import { certifications } from "@/data/portfolio";

function CertCard({
  cert,
  onView,
}: {
  cert: (typeof certifications)[number];
  onView: (cert: (typeof certifications)[number]) => void;
}) {
  const inner = (
    <>
      <div className="h-20 w-28 shrink-0 overflow-hidden border border-border bg-background/40 sm:h-28 sm:w-40">
        {cert.image ? (
          <img
            src={cert.image}
            alt={`${cert.name} certificate`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-9 w-9"
            >
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
          <p className="text-base font-medium text-foreground">{cert.name}</p>
          <span className="shrink-0 font-mono text-sm text-accent">{cert.date}</span>
        </div>
        <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
      </div>
    </>
  );

  return (
    <li className="group flex items-center gap-4 border border-border bg-surface px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md hover:shadow-accent/10 sm:gap-5 sm:px-6 sm:py-5">
      {cert.image ? (
        <button
          type="button"
          onClick={() => onView(cert)}
          className="flex w-full cursor-zoom-in items-center gap-4 text-left"
        >
          {inner}
        </button>
      ) : (
        inner
      )}
    </li>
  );
}

export default function Certifications() {
  const leftCol = certifications.filter((_, i) => i % 2 === 0);
  const rightCol = certifications.filter((_, i) => i % 2 === 1);

  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  const openCert = (cert: (typeof certifications)[number]) => {
    if (!cert.image) return;
    setLightbox({ src: cert.image, alt: `${cert.name} certificate` });
  };

  return (
    <section
      id="certifications"
      className="relative overflow-hidden border-t border-border py-28"
    >
      <Watermark text="Certifications" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading eyebrow="Credentials" title="Certifications" />

        <Reveal>
          <div className="relative h-[720px] overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-background to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-background to-transparent" />

            <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
              <div className="overflow-hidden">
                <ul className="marquee-vertical flex flex-col gap-4">
                  {[...leftCol, ...leftCol].map((cert, i) => (
                    <CertCard key={`${cert.name}-${i}`} cert={cert} onView={openCert} />
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden">
                <ul className="marquee-vertical marquee-reverse flex flex-col gap-4">
                  {[...rightCol, ...rightCol].map((cert, i) => (
                    <CertCard key={`${cert.name}-${i}`} cert={cert} onView={openCert} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
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

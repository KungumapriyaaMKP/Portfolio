"use client";

import { useEffect, useRef, useState } from "react";
import { LuTrophy, LuMedal, LuAward, LuFlame, LuX, LuPlay } from "react-icons/lu";
import type { IconType } from "react-icons";
import SectionHeading from "@/components/SectionHeading";
import SlideReveal from "@/components/SlideReveal";
import TiltCard from "@/components/TiltCard";
import Watermark from "@/components/Watermark";
import { achievements } from "@/data/portfolio";

type Tier = {
  icon: IconType;
  label: string;
  text: string;
  ring: string;
  from: string;
};

const TIERS: Record<"win" | "runnerUp" | "finalist" | "highlight", Tier> = {
  win: {
    icon: LuTrophy,
    label: "Win",
    text: "text-accent-light",
    ring: "border-accent-light/50",
    from: "from-accent-light/20",
  },
  runnerUp: {
    icon: LuMedal,
    label: "Runner-up",
    text: "text-accent",
    ring: "border-accent/50",
    from: "from-accent/20",
  },
  finalist: {
    icon: LuAward,
    label: "Finalist",
    text: "text-accent-dark",
    ring: "border-accent-dark/50",
    from: "from-accent-dark/20",
  },
  highlight: {
    icon: LuFlame,
    label: "Highlight",
    text: "text-muted",
    ring: "border-border",
    from: "from-border/30",
  },
};

function tierFor(title: string): Tier {
  const t = title.toLowerCase();
  if (t.includes("1st") || t.includes("first place") || t.includes("winner")) return TIERS.win;
  if (t.includes("runner up") || t.includes("2nd") || t.includes("4th")) return TIERS.runnerUp;
  if (t.includes("finalist") || t.includes("top 10")) return TIERS.finalist;
  return TIERS.highlight;
}

function AchievementImage({
  image,
  alt,
  tier,
}: {
  image?: string;
  alt: string;
  tier: Tier;
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const Icon = tier.icon;

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [image]);

  return (
    <div className="absolute inset-0 bg-background">
      <div
        className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${tier.from} to-background ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <Icon className={`h-12 w-12 ${tier.text} opacity-50`} />
      </div>
      {image && (
        <>
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
            className={`absolute inset-0 h-full w-full object-contain [image-rendering:high-quality] contrast-[1.08] saturate-[1.12] ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </>
      )}
    </div>
  );
}

export default function Recognition() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  const videoItems = achievements.filter((item) => item.video);
  const cardItems = achievements.filter((item) => !item.video);

  return (
    <section id="recognition" className="relative overflow-hidden py-28">
      <Watermark text="Recognition" />

      <div className="pointer-events-none absolute left-1/2 top-24 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading eyebrow="Recognition" title="Achievements" />

        {/* Video highlight(s) */}
        {videoItems.map((item) => {
          const tier = tierFor(item.title);
          return (
            <SlideReveal key={item.title} direction="left" className="mx-auto mb-8 max-w-3xl">
              <div className="overflow-hidden border border-accent/50 bg-surface shadow-[0_20px_50px_-25px_rgba(245,149,74,0.4)]">
                <div className="relative aspect-video w-full overflow-hidden bg-background">
                  {item.video && playingVideo === item.video ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${item.video}?autoplay=1`}
                      title={item.title}
                      allow="accelerate; autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => item.video && setPlayingVideo(item.video)}
                      className="group relative block h-full w-full cursor-pointer"
                    >
                      <AchievementImage image={item.image} alt={item.title} tier={tier} />
                      <span className="absolute inset-0 flex items-center justify-center bg-background/20 transition-colors duration-300 group-hover:bg-background/35">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-background/70 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                          <LuPlay className="ml-1 h-6 w-6 text-foreground" />
                        </span>
                      </span>
                      <span className="absolute left-3 top-3 border border-accent/40 bg-background/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-accent backdrop-blur-sm">
                        Latest
                      </span>
                    </button>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${tier.text}`}>
                      {tier.label}
                    </span>
                    <span className="font-mono text-xs text-muted">{item.date}</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold leading-snug text-foreground">
                    {item.title}
                  </p>
                </div>
              </div>
            </SlideReveal>
          );
        })}

        {/* Gallery */}
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:gap-6">
          {cardItems.map((item, i) => {
            const tier = tierFor(item.title);
            const Icon = tier.icon;
            const isFeatured = i === 0;
            return (
              <SlideReveal
                key={item.title}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={Math.floor(i / 2) * 100}
                className="h-full"
              >
                <TiltCard max={5} className="h-full">
                  <div
                    className={`group flex h-full flex-col overflow-hidden border bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                      isFeatured
                        ? "border-accent/50 shadow-[0_20px_50px_-25px_rgba(245,149,74,0.4)] hover:border-accent/70 hover:shadow-accent/20"
                        : "border-border hover:border-accent/50 hover:shadow-accent/10"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => item.image && setLightbox({ src: item.image, alt: item.title })}
                      className="relative block aspect-square w-full cursor-zoom-in overflow-hidden"
                    >
                      <AchievementImage image={item.image} alt={item.title} tier={tier} />

                      {isFeatured && (
                        <span className="absolute left-2 top-2 border border-accent/40 bg-background/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-accent backdrop-blur-sm">
                          Latest
                        </span>
                      )}
                      <span
                        className={`absolute right-2 top-2 flex h-6 w-6 items-center justify-center border ${tier.ring} bg-background/70 backdrop-blur-sm`}
                      >
                        <Icon className={`h-3 w-3 ${tier.text}`} />
                      </span>
                    </button>

                    <div className="p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`font-mono text-[9px] uppercase tracking-[0.2em] ${tier.text}`}>
                          {tier.label}
                        </span>
                        <span className="font-mono text-[10px] text-muted">{item.date}</span>
                      </div>
                      <p className="mt-1 text-xs font-semibold leading-snug text-foreground">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </SlideReveal>
            );
          })}
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

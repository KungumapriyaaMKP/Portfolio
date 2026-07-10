"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SlideReveal from "@/components/SlideReveal";
import Tag from "@/components/Tag";
import { projects } from "@/data/portfolio";

export default function Projects() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const imageOnRightFlags = useMemo(
    () =>
      projects.reduce<{ flags: boolean[]; slot: number }>(
        (acc, project) => {
          const showImage = Boolean(project.image) && !failedImages[project.name];
          const onRight = showImage ? acc.slot % 2 === 0 : false;
          return {
            flags: [...acc.flags, onRight],
            slot: showImage ? acc.slot + 1 : acc.slot,
          };
        },
        { flags: [], slot: 0 }
      ).flags,
    [failedImages]
  );

  return (
    <section id="projects" className="py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Work"
          title="Featured Projects"
          description="A mix of AI research and full-stack engineering, from graph neural networks to real-time computer vision systems."
        />

        <div className="flex flex-col gap-16">
          {projects.map((project, i) => {
            const showImage = Boolean(project.image) && !failedImages[project.name];
            const imageOnRight = imageOnRightFlags[i];

            const baseDelay = i * 60;

            const imageBox = showImage && (
              <div className="w-full lg:flex-1">
                <SlideReveal
                  direction={imageOnRight ? "right" : "left"}
                  delay={baseDelay + 120}
                >
                  <div className="relative w-full self-center overflow-hidden shadow-[0_30px_70px_-20px_rgba(0,0,0,0.75)] transition-shadow duration-300 hover:shadow-[0_40px_80px_-20px_rgba(245,149,74,0.3)]">
                    <img
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [project.name]: true }))
                      }
                      className="block h-auto w-full"
                      style={{ animation: "kenburns 12s ease-in-out infinite alternate" }}
                    />
                  </div>
                </SlideReveal>
              </div>
            );

            const textBox = (
              <div className="relative flex flex-1 flex-col">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-6 -top-16 select-none font-display text-[13rem] font-bold leading-none text-foreground/[0.04]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <Reveal delay={baseDelay} className="relative">
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                </Reveal>

                <Reveal delay={baseDelay + 70} className="relative mt-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <h3 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                      {project.name}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-[#1a0800]"
                      >
                        View Live
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </Reveal>

                <Reveal delay={baseDelay + 140} className="relative mt-2">
                  <p className="text-base font-medium text-accent">
                    {project.subtitle}
                  </p>
                </Reveal>

                <Reveal delay={baseDelay + 210} className="relative mt-5 flex-1">
                  <p className="text-sm leading-7 text-muted sm:text-base">
                    {project.description}
                  </p>
                </Reveal>

                <Reveal delay={baseDelay + 280} className="relative mt-8">
                  <div className="flex flex-wrap items-center gap-3">
                    {project.tech.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </Reveal>
              </div>
            );

            return (
              <div
                key={project.name}
                className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14"
              >
                {!imageOnRight && imageBox}
                {textBox}
                {imageOnRight && imageBox}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Watermark from "@/components/Watermark";
import { techIcons, toolIcons } from "@/data/techIcons";
import { skills } from "@/data/portfolio";
import type { IconType } from "react-icons";

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-28">
      <Watermark text="Skills" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading eyebrow="Toolbox" title="Skills" />

        <div className="flex flex-col gap-6">
          <Reveal delay={0}>
            <IconChipGroup title="Tech Stack" items={skills.tech} icons={techIcons} rows={2} />
          </Reveal>
          <Reveal delay={90}>
            <IconChipGroup title="Tools" items={skills.tools} icons={toolIcons} rows={2} />
          </Reveal>
          <Reveal delay={180}>
            <SkillGroup title="Soft Skills" items={skills.soft} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="h-full border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10">
      <h3 className="font-display text-lg font-semibold text-foreground">
        {title}
      </h3>
      <div className="mt-4 flex flex-wrap gap-3">
        {items.map((item) => (
          <span
            key={item}
            className="border border-border bg-background/40 px-4 py-2.5 font-mono text-sm text-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Chip({
  item,
  meta,
}: {
  item: string;
  meta?: { icon: IconType; color: string };
}) {
  const Icon = meta?.icon;
  return (
    <div className="flex shrink-0 items-center gap-2.5 border border-border bg-background/40 px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-background/70">
      {Icon && <Icon className="h-5 w-5 shrink-0" style={{ color: meta!.color }} />}
      <span className="whitespace-nowrap text-sm text-foreground">{item}</span>
    </div>
  );
}

function IconChipGroup({
  title,
  items,
  icons,
  rows = 2,
}: {
  title: string;
  items: string[];
  icons: Record<string, { icon: IconType; color: string }>;
  rows?: number;
}) {
  const tracks: string[][] = Array.from({ length: rows }, () => []);
  items.forEach((item, i) => tracks[i % rows].push(item));

  return (
    <div className="h-full border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10">
      <h3 className="font-display text-lg font-semibold text-foreground">
        {title}
      </h3>
      <div className="mt-4 flex flex-col gap-2">
        {tracks.map((track, rowIndex) => (
          <div key={rowIndex} className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-surface to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-surface to-transparent" />
            <div
              className={`marquee-horizontal flex w-max gap-2 ${rowIndex % 2 === 1 ? "marquee-reverse" : ""}`}
              style={{ animationDuration: `${18 + track.length * 2}s` }}
            >
              {[...track, ...track].map((item, i) => (
                <Chip key={`${item}-${i}`} item={item} meta={icons[item]} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

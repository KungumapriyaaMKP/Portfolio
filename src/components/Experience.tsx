import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import Watermark from "@/components/Watermark";
import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden border-t border-border py-28"
    >
      <Watermark text="Experience" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading eyebrow="Experience" title="What I've worked on" />

        <div className="mb-8 flex items-center gap-4">
          <p className="section-label whitespace-nowrap text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {String(experience.length).padStart(2, "0")} Roles
          </p>
          <span className="h-px flex-1 bg-border" />
          <p className="whitespace-nowrap font-mono text-xs text-muted">
            {experience[experience.length - 1].period} &ndash; {experience[0].period}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experience.map((item, i) => (
            <Reveal key={item.role} delay={i * 110} className="h-full">
              <TiltCard className="h-full" max={5}>
                <div className="group relative flex h-full border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10">
                  <span className="w-1 shrink-0 origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100" />

                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-mono text-xs text-accent">{item.period}</span>

                    <h3 className="mt-2 font-display text-base font-semibold text-foreground">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{item.company}</p>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                      {item.description}
                    </p>

                    {item.tech && (
                      <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="border border-border bg-background/40 px-2.5 py-1 font-mono text-[11px] text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

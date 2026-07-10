import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Watermark from "@/components/Watermark";
import { certifications } from "@/data/portfolio";

function CertCard({ cert }: { cert: (typeof certifications)[number] }) {
  const inner = (
    <>
      <div className="h-20 w-28 shrink-0 overflow-hidden border border-border bg-background/40">
        {cert.image ? (
          <img
            src={cert.image}
            alt={`${cert.name} certificate`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-8 w-8"
            >
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-base font-medium text-foreground">{cert.name}</p>
        <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
      </div>
      <span className="shrink-0 font-mono text-sm text-accent">{cert.date}</span>
    </>
  );

  return (
    <li className="group flex items-center gap-5 border border-border bg-surface px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md hover:shadow-accent/10">
      {cert.image ? (
        <a
          href={cert.image}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center gap-4"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}

export default function Certifications() {
  const leftCol = certifications.filter((_, i) => i % 2 === 0);
  const rightCol = certifications.filter((_, i) => i % 2 === 1);

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
                    <CertCard key={`${cert.name}-${i}`} cert={cert} />
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden">
                <ul className="marquee-vertical marquee-reverse flex flex-col gap-4">
                  {[...rightCol, ...rightCol].map((cert, i) => (
                    <CertCard key={`${cert.name}-${i}`} cert={cert} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

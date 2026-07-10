import Reveal from "@/components/Reveal";
import Watermark from "@/components/Watermark";
import { profile } from "@/data/portfolio";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border py-28"
    >
      <Watermark text={profile.name} />
      <Reveal className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <p className="section-label text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Contact
        </p>
        <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
          Let&apos;s build something intelligent together.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted">
          Open to internships, collaborations and interesting AI/ML problems.
          Reach out, I usually reply within a day.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="bg-accent px-6 py-3 text-sm font-semibold text-[#1a0800] transition-colors hover:bg-accent-light"
          >
            {profile.email}
          </a>
          <a
            href={profile.resumeFile}
            download
            className="border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/60"
          >
            Download Resume
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm font-medium text-muted">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <span className="text-border">·</span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <span className="text-border">·</span>
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="transition-colors hover:text-accent"
          >
            {profile.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

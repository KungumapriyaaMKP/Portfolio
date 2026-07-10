import Reveal from "@/components/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mx-auto mb-16 max-w-2xl text-center">
      <p className="section-label text-xs font-semibold uppercase tracking-[0.3em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-7 text-muted">{description}</p>
      )}
    </Reveal>
  );
}

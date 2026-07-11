import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Watermark from "@/components/Watermark";
import { keywords, profile } from "@/data/portfolio";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-border bg-surface/40 py-28"
    >
      <Watermark text="About" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="A little about me"
          description={profile.bio}
        />
      </div>

      <Reveal className="relative mt-14 w-full">
        <Marquee items={keywords} />
      </Reveal>
    </section>
  );
}

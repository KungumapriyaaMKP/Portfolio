import CodingStatCards from "@/components/CodingStatCards";
import SectionHeading from "@/components/SectionHeading";
import Watermark from "@/components/Watermark";

export default function CodingProfiles() {
  return (
    <section
      id="coding-profiles"
      className="relative overflow-hidden border-t border-border bg-surface/40 py-28"
    >
      <Watermark text="Profiles" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading eyebrow="Practice" title="Coding Profiles" />
        <CodingStatCards />
      </div>
    </section>
  );
}

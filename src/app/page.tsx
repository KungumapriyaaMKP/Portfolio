import Navbar from "@/components/Navbar";
import VideoIntro from "@/components/cinematic/VideoIntro";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Experience from "@/components/Experience";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import CodingProfiles from "@/components/CodingProfiles";
import Certifications from "@/components/Certifications";
import Leadership from "@/components/Leadership";
import Recognition from "@/components/Recognition";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <VideoIntro />
        <About />
        <Journey />
        <Experience />
        <Stats />
        <Projects />
        <Skills />
        <CodingProfiles />
        <Certifications />
        <Leadership />
        <Recognition />
        <Contact />
      </main>
    </>
  );
}

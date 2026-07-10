"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { heroMedia, profile } from "@/data/portfolio";
import styles from "./VideoIntro.module.css";

export default function VideoIntro() {
  const isVideo = heroMedia.type === "video";

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!contentRef.current) return;
    const targets = contentRef.current.querySelectorAll("[data-animate]");
    const tl = gsap.timeline({ delay: 0.3 });

    if (nameRef.current) {
      tl.fromTo(
        nameRef.current,
        { y: 46, opacity: 0, scale: 0.94, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
        }
      );
    }

    tl.fromTo(
      targets,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      },
      "-=0.75"
    );
  }, []);

  // Browsers block unmuted autoplay outright, so start muted (always allowed)
  // and let the visitor opt into sound with a real click via the Start button.
  useEffect(() => {
    if (!isVideo) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [isVideo]);

  // Once the hero scrolls out of view, mute the video so it doesn't keep
  // playing sound in the background while the visitor reads the rest of the page.
  useEffect(() => {
    if (!isVideo) return;
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.muted) {
          video.muted = true;
          setMuted(true);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isVideo]);

  // The global StartScreen gate dispatches this once the visitor clicks
  // "Start", which is the real user gesture browsers require to allow sound.
  useEffect(() => {
    if (!isVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const onSiteStart = () => {
      video.muted = false;
      video
        .play()
        .then(() => {
          setMuted(false);
          setPlaying(true);
        })
        .catch(() => {});
    };

    window.addEventListener("site-start", onSiteStart);
    return () => window.removeEventListener("site-start", onSiteStart);
  }, [isVideo]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
    } else {
      video.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" ref={sectionRef} className={styles.hero}>
      <div className={styles.row}>
        <div ref={contentRef} className={styles.content}>
          <h1 ref={nameRef} className={styles.name}>
            {profile.name}
          </h1>
          <p className={styles.role} data-animate>
            {profile.tagline}
          </p>
          <p className={styles.subtitle} data-animate>
            {profile.heroSubtitle}
          </p>
          <div className={styles.ctaRow} data-animate>
            <a href="#projects" className={styles.ctaPrimary}>
              View Projects
            </a>
            <a href="#contact" className={styles.ctaSecondary}>
              Get in Touch
            </a>
          </div>
          <div className={styles.socials} data-animate>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`}>Email</a>
          </div>
        </div>

        <div className={styles.videoCol}>
          {isVideo ? (
            <video
              ref={videoRef}
              src={heroMedia.src}
              loop
              playsInline
              aria-label={`${profile.name} introduction video`}
            />
          ) : (
            <img src={heroMedia.src} alt={profile.name} />
          )}
        </div>
      </div>

      {isVideo && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.glassButton}
            onClick={togglePlay}
            aria-label={playing ? "Pause video" : "Play video"}
          >
            {playing ? "❚❚" : "►"}
          </button>
          <button
            type="button"
            className={styles.glassButton}
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      )}

      <button
        type="button"
        className={styles.scrollIndicator}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollLine} />
        Scroll
      </button>
    </section>
  );
}

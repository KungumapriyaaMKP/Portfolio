"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { nav, profile } from "@/data/portfolio";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    gsap.to(panel, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: 0.35,
      ease: open ? "power3.out" : "power3.in",
    });
  }, [open]);

  return (
    <header
      className={`absolute top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-center px-6 py-4 lg:px-8">
        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-muted transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-foreground transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center gap-3 md:flex">
        <a
          href={profile.resumeFile}
          download
          className="bg-accent px-5 py-2 text-sm font-medium text-[#1a0800] transition-colors hover:bg-accent-light"
        >
          Resume
        </a>
        <a
          href="#contact"
          className="bg-accent px-5 py-2 text-sm font-medium text-[#1a0800] transition-colors hover:bg-accent-light"
        >
          Let&apos;s talk
        </a>
      </div>

      <div
        ref={panelRef}
        aria-hidden={!open}
        className="overflow-hidden bg-background md:hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <ul className="flex flex-col border-t border-border px-6 py-4">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base font-medium text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.resumeFile}
              download
              onClick={() => setOpen(false)}
              className="mt-2 block border border-accent px-5 py-3 text-center text-sm font-medium text-accent"
            >
              Resume
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block bg-accent px-5 py-3 text-center text-sm font-medium text-[#1a0800]"
            >
              Let&apos;s talk
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const FACTS = [
  "Quarter century in real estate",
  "55+ community expert",
  "20+ agent team",
];

const SENTENCE: Array<{ t: string; b?: boolean }> = [
  { t: "Tracey has spent a" },
  { t: "quarter century", b: true },
  { t: "mastering the game of real estate. Each team member gets direct mentorship from her. She is especially excited to share her expertise in 55+ communities such as Sun City West. Today she leads a team of more than 20 productive thriving agents." },
];

const WORDS = SENTENCE.flatMap((segment) =>
  segment.t
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => ({ w, b: segment.b === true })),
);

export function TeamLead() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress =
        scrollable > 0
          ? Math.min(1, Math.max(0, -rect.top / scrollable))
          : 1;
      const raw = (progress - 0.1) / 0.6;
      const count = Math.round(Math.min(1, Math.max(0, raw)) * WORDS.length);
      setRevealed((prev) => (prev === count ? prev : count));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="the-team"
      ref={sectionRef}
      className="w-full relative"
      style={{ background: "#F35527", height: "220vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="max-w-[1200px] mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Photo */}
            <div className="lg:col-span-5">
              <div className="relative max-w-[420px] mx-auto lg:mx-0">
                <div
                  className="absolute inset-0 translate-x-4 translate-y-4 rounded-[24px] bg-cream/40"
                  aria-hidden="true"
                />
                <Image
                  src="/brand/tracey-portrait.png"
                  alt="Tracey, team lead of the West Team, wearing her red cowboy hat"
                  width={1024}
                  height={1024}
                  className="relative w-full h-auto rounded-[24px]"
                  style={{ boxShadow: "rgba(9, 41, 61, 0.12) 0px 8px 32px 0px" }}
                  priority
                />
                <div className="absolute bottom-4 left-4 rounded-[8px] bg-paper px-3 py-2">
                  <p className="font-serif text-[16px] text-ink leading-tight">
                    Tracey
                  </p>
                  <p className="text-caption text-graphite leading-tight">
                    Team Lead · West Team
                  </p>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-[32px] lg:text-[40px] leading-[1.15] text-navy tracking-tight max-w-[24ch]">
                Your new team lead.
              </h2>
              <p className="text-lead text-cream leading-lead mt-6 max-w-[54ch]">
                {WORDS.map((word, i) => (
                  <span key={i}>
                    <span
                      className={i < revealed ? "opacity-100" : "opacity-30"}
                      style={{ transition: "opacity 400ms ease" }}
                    >
                      {word.b ? <b>{word.w}</b> : word.w}
                    </span>{" "}
                  </span>
                ))}
              </p>

              <div className="flex flex-wrap gap-2.5 mt-6">
                {FACTS.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-2 rounded-[8px] bg-paper text-ink text-[12px] font-medium px-3 py-1.5"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-orange"
                      aria-hidden="true"
                    />
                    {f}
                  </span>
                ))}
              </div>

              <blockquote className="mt-10 border-l-4 border-gold pl-5">
                <p className="font-serif text-[24px] leading-[1.33] text-cream max-w-[40ch]">
                  &ldquo;I built the team I wish I&#39;d had when I started.&rdquo;
                </p>
                <footer className="text-caption text-cream/70 mt-3">
                  — Tracey, Team Lead
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import HeroBackground from "./hero_background";

function PixelIcons({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-[3px]" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-[6px] w-[6px]"
          style={{
            background: i < count ? "currentColor" : "transparent",
            boxShadow: i < count ? "none" : "inset 0 0 0 1px currentColor",
            opacity: i < count ? 1 : 0.4,
          }}
        />
      ))}
    </span>
  );
}

export function Hero() {
  const [mode, setMode] = useState<"hard" | "easy">("hard");

  return (
    <section className="w-full min-h-[calc(100svh-4rem)] bg-cream flex flex-col">
      {/* Copy — one flex item, auto height, centered in whatever remains */}
      <div
        className="flex-1 min-h-0 flex flex-col items-center justify-center text-center px-6"
        style={{
          paddingTop: "clamp(16px, 3.5vh, 40px)",
          paddingBottom: "clamp(12px, 2.5vh, 28px)",
        }}
      >
        <h1
          className="font-serif text-ink leading-display tracking-tight max-w-[16ch] text-center"
          style={{
            fontSize: "clamp(36px, 6vh, 64px)",
          }}
        >
          The <em>closing</em> trail.
          <br />
          Together.
          <span className="inline-block align-middle ml-3 h-2 w-2 rounded-full bg-orange" aria-hidden="true" />
        </h1>

        <p
          className="text-graphite max-w-[46ch]"
          style={{
            marginTop: "clamp(12px, 2vh, 24px)",
            fontSize: "clamp(14px, 1.9vh, 17px)",
            lineHeight: 1.6,
          }}
        >
          <b>West Team</b> is <em>the</em> real estate team for the Phoenix
          metro west side. Mentorship, accountability, and results. So you stop pulling the whole wagon alone.
        </p>

        {/* Arcade difficulty select */}
        <div
          className="flex flex-col items-center"
          style={{ marginTop: "clamp(14px, 2.2vh, 26px)", gap: "clamp(8px, 1.2vh, 12px)" }}
        >
          <span
            id="dw-mode-label"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-ashen"
          >
            Select difficulty
          </span>
          <div
            role="group"
            aria-labelledby="dw-mode-label"
            className="inline-flex items-stretch border-2 border-navy rounded-[8px] overflow-hidden bg-cream"
          >
            <button
              type="button"
              onClick={() => setMode("easy")}
              aria-pressed={mode === "easy"}
              className="font-mono text-[12px] uppercase tracking-[0.12em] px-5 sm:px-7 py-2.5 flex items-center gap-3 cursor-pointer transition-colors duration-150"
              style={{
                background: mode === "easy" ? "#09293D" : "transparent",
                color: mode === "easy" ? "#FAF5EE" : "#09293D",
              }}
            >
              <PixelIcons count={3} />
              Easy mode
            </button>
            <button
              type="button"
              onClick={() => setMode("hard")}
              aria-pressed={mode === "hard"}
              className="font-mono text-[12px] uppercase tracking-[0.12em] px-5 sm:px-7 py-2.5 flex items-center gap-3 cursor-pointer border-l-2 border-navy transition-colors duration-150"
              style={{
                background: mode === "hard" ? "#F97828" : "transparent",
                color: "#09293D",
              }}
            >
              <PixelIcons count={1} />
              Hard mode
            </button>
          </div>
        </div>

        <a
          href="#"
          className="inline-flex items-center rounded-[8px] bg-navy text-cream text-[15px] font-medium px-5 py-3 hover:bg-ink transition-colors duration-200"
          style={{ marginTop: "clamp(14px, 2.2vh, 26px)" }}
        >
          Join the team
        </a>
      </div>

      {/* Full-bleed wagon scene + status band */}
      <HeroBackground mode={mode} />
    </section>
  );
}

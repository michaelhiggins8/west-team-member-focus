"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const IMG_BASE = "/home_page/community/";

const BENEFITS = [
  {
    title: "Weekly meetings",
    body: "Come stop in every tuesday and hear from speakers from accross the valley.",
    img: "pexels-skills-media-437558258-16859955.jpg",
    alt: "West Valley gathering spot",
  },
  {
    title: "Shared open houses",
    body: "Trade open house opportunities across the west side. Sit someone's Sunday open house and they'll sit yours. More coverage, fewer burned weekends.",
    img: "pexels-derwin-edwards-163348797-10855269.jpg",
    alt: "West Valley street scene",
  },
  {
    title: "Shared insights",
    body: "The team talks: what buyers are whispering, which streets are moving, what sellers want to hear. You never pitch blind.",
    img: "pexels-rpnickson-3068519.jpg",
    alt: "Water scene",
  },
  {
    title: "Community knowledge",
    body: "From Arizona's retirement communities to the newest west-side builds, members pool local knowledge so every agent performs like a 25-year veteran.",
    img: "pexels-steve-31009988.jpg",
    alt: "Sun City West community",
  },
];

const N = BENEFITS.length;
const ROT = [-3, 2.5, -1.5, 3.5];

// Deterministic scatter so server and client renders agree.
const ROCKS = [14, 52, 96, 132, 176, 212, 34, 118, 188];
const FLECKS = [24, 78, 150, 200];
const SHIMMER = [10, 38, 66, 94, 122, 150, 178, 206];
const BUBBLES = [
  { x: 30, delay: "0s", dur: "4.5s" },
  { x: 88, delay: "1.6s", dur: "5.5s" },
  { x: 148, delay: "0.8s", dur: "5s" },
  { x: 208, delay: "2.4s", dur: "4s" },
];

// Deterministic values so server and client renders agree.
const CARD_BUBBLES = [
  { left: "6%", size: 16, delay: "0s", dur: "9s", sway: 18, op: 0.22 },
  { left: "16%", size: 10, delay: "2.2s", dur: "11s", sway: -14, op: 0.18 },
  { left: "27%", size: 22, delay: "4.1s", dur: "8s", sway: 22, op: 0.28 },
  { left: "38%", size: 12, delay: "1.3s", dur: "12s", sway: -16, op: 0.2 },
  { left: "49%", size: 28, delay: "5.6s", dur: "10s", sway: 26, op: 0.24 },
  { left: "61%", size: 11, delay: "3.4s", dur: "9.5s", sway: -18, op: 0.18 },
  { left: "72%", size: 18, delay: "0.7s", dur: "8.5s", sway: 20, op: 0.26 },
  { left: "83%", size: 9, delay: "4.8s", dur: "12.5s", sway: -12, op: 0.18 },
  { left: "92%", size: 14, delay: "2.9s", dur: "10.5s", sway: 16, op: 0.22 },
];

const C = {
  navy: "#09293D",
  gold: "#FBA333",
  red: "#F35527",
  cream: "#FAF5EE",
};

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const easeOut = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);

// Each benefit owns one scroll segment; within it the card rises from below
// the viewport, grows toward the viewer, settles, then recedes slightly
// before the next card comes up.
const RISE = 0.42;
const HOLD_END = 0.8;

function cardPose(p: number, i: number) {
  const local = clamp01(p) * N - i;
  if (local <= 0) return { y: 108, scale: 0.7, opacity: 0 };
  if (local < RISE) {
    const e = easeOut(local / RISE);
    return {
      y: (1 - e) * 108,
      scale: 0.7 + 0.34 * e,
      opacity: clamp01(local / (RISE * 0.3)),
    };
  }
  if (local < HOLD_END) {
    const e = (local - RISE) / (HOLD_END - RISE);
    return { y: 0, scale: 1.04 - 0.04 * e, opacity: 1 };
  }
  if (i === N - 1) return { y: 0, scale: 1, opacity: 1 };
  const e = clamp01((local - HOLD_END) / (1 - HOLD_END));
  return { y: -14 * e, scale: 1 - 0.09 * e, opacity: 1 };
}

function rowPose(p: number, i: number) {
  const local = clamp01(p) * N - i;
  if (local <= 0) return { scale: 0.94, opacity: 0.35 };
  if (local < RISE) {
    const e = easeOut(local / RISE);
    return { scale: 0.94 + 0.12 * e, opacity: 0.35 + 0.65 * e };
  }
  if (local < HOLD_END) return { scale: 1.06, opacity: 1 };
  const e = clamp01((local - HOLD_END) / (1 - HOLD_END));
  if (i === N - 1) return { scale: 1.04, opacity: 1 };
  return { scale: 1.06 - 0.11 * e, opacity: 1 - 0.6 * e };
}

function markerColors(i: number) {
  if (i === 1) return ["bg-orange", "bg-orange"];
  if (i === 2) return ["bg-gold", "bg-orange"];
  return ["bg-gold", "bg-gold"];
}

function Strata() {
  return (
    <div
      className="w-full overflow-hidden bg-navy"
      style={{ height: "clamp(110px, 15vh, 190px)" }}
    >
      <style>{`
        .ug-bubble{animation:ugrise linear infinite}
        @keyframes ugrise{0%{transform:translateY(0);opacity:0}15%{opacity:1}100%{transform:translateY(-15px);opacity:0}}
        @media (prefers-reduced-motion:reduce){.ug-bubble{animation:none !important;opacity:0.6}}
      `}</style>
      <svg
        className="block w-full h-full"
        viewBox="0 0 240 64"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {/* red sand */}
        <rect x="0" y="0" width="240" height="18" fill={C.red} />
        {/* deeper sand */}
        <rect x="0" y="18" width="240" height="9" fill="#B03A24" />
        <rect x="0" y="27" width="240" height="9" fill="#6E3124" />
        {/* water table */}
        <rect x="0" y="36" width="240" height="6" fill="#1E4258" />
        {/* aquifer */}
        <rect x="0" y="42" width="240" height="22" fill={C.navy} />
        <rect x="0" y="42" width="240" height="1.5" fill="#3C5464" />

        {/* buried rocks */}
        {ROCKS.map((x, i) => (
          <rect key={`r${i}`} x={x} y={i % 2 ? 21 : 13} width="3" height="2.5" fill={C.navy} opacity="0.45" />
        ))}
        {/* gold ore flecks */}
        {FLECKS.map((x, i) => (
          <rect key={`f${i}`} x={x} y={i % 2 ? 30 : 6} width="1.5" height="1.5" fill={C.gold} opacity="0.55" />
        ))}
        {/* water shimmer */}
        {SHIMMER.map((x, i) => (
          <rect key={`s${i}`} x={x} y={46 + (i % 4) * 5} width="7" height="1" fill="#3C5464" />
        ))}
        {/* rising bubbles */}
        {BUBBLES.map((b, i) => (
          <g key={`b${i}`} className="ug-bubble" style={{ animationDuration: b.dur, animationDelay: b.delay }}>
            <rect x={b.x} y="58" width="2.5" height="2.5" fill={C.gold} opacity="0.7" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function CardBubbles() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <style>{`
        .uw-bubble{position:absolute;bottom:-40px;border-radius:9999px;border:1.5px solid rgba(250,245,238,0.45);background:rgba(250,245,238,0.22);animation:uwrise linear infinite,uwsway ease-in-out infinite alternate;will-change:transform}
        @keyframes uwrise{0%{transform:translateY(0);opacity:0}10%{opacity:var(--op)}90%{opacity:var(--op)}100%{transform:translateY(calc(-100vh - 80px));opacity:0}}
        @keyframes uwsway{from{margin-left:calc(var(--sway) * -1)}to{margin-left:var(--sway)}}
        @media (prefers-reduced-motion:reduce){.uw-bubble{animation-play-state:paused !important}}
      `}</style>
      {CARD_BUBBLES.map((b, i) => (
        <span
          key={i}
          className="uw-bubble"
          style={
            {
              left: b.left,
              width: b.size,
              height: b.size,
              animationDuration: `${b.dur}, ${b.dur}`,
              animationDelay: `${b.delay}, ${b.delay}`,
              "--op": b.op,
              "--sway": `${b.sway}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function Underground() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const stageH = window.innerHeight - 64;
      const scrollable = rect.height - stageH;
      const p =
        scrollable > 0
          ? Math.min(1, Math.max(0, -rect.top / scrollable))
          : 1;
      setProgress((prev) => (prev === p ? prev : p));
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

  const active = Math.min(N - 1, Math.floor(clamp01(progress) * N));

  return (
    <>
      <Strata />
      <section
        id="underground"
        ref={sectionRef}
        className="w-full relative"
        style={{ background: C.navy, height: `calc(100vh + ${N * 100}vh - 64px)` }}
      >
        <div className="sticky top-16 h-[calc(100vh-64px)] overflow-hidden flex items-center">
          <CardBubbles />
          <div className="max-w-[1200px] mx-auto px-6 w-full">
            <h2 className="font-serif text-[32px] lg:text-[40px] leading-[1.15] text-cream tracking-tight max-w-[26ch]">
              Community as clear as water.
            </h2>
            <p className="text-lead text-cream/70 leading-lead mt-4 max-w-[54ch]">
              The community comes with the badge. West Team members share the
              work, the intel, and the wins.
            </p>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mt-8 lg:mt-12">
              {/* Left: benefit rows, emphasized one at a time */}
              <div className="bg-cream rounded-[24px] p-7 lg:p-10">
                <ul>
                  {BENEFITS.map((b, i) => {
                    const pose = rowPose(progress, i);
                    const markers = markerColors(i);
                    return (
                      <li
                        key={b.title}
                        className="relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 py-5 border-b border-mist last:border-b-0 first:pt-0 last:pb-0"
                        style={{
                          opacity: pose.opacity,
                          transform: `scale(${pose.scale})`,
                          transformOrigin: "left center",
                          zIndex: i === active ? 2 : 1,
                        }}
                      >
                        <div
                          className="flex gap-1.5 shrink-0 sm:mt-1.5"
                          aria-hidden="true"
                        >
                          <span
                            className={`h-3 w-3 rounded-[3px] ${markers[0]}`}
                          />
                          <span
                            className={`h-3 w-3 rounded-[3px] ${markers[1]}`}
                          />
                        </div>
                        <div>
                          <h3 className="font-serif text-heading-sm text-ink leading-heading-sm">
                            {b.title}
                          </h3>
                          <p className="text-body text-graphite leading-body mt-2">
                            {b.body}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Right: deck of image cards rising from below the fold */}
              <div className="relative h-[280px] sm:h-[340px] lg:h-[440px]">
                {BENEFITS.map((b, i) => {
                  const pose = cardPose(progress, i);
                  return (
                    <div
                      key={b.title}
                      className="absolute left-1/2 top-1/2 w-[min(64vw,240px)] sm:w-[min(50vw,300px)] lg:w-[min(56vh,350px)] aspect-square rounded-[24px] overflow-hidden bg-paper"
                      style={{
                        transform: `translate(-50%, calc(-50% + ${(pose.y + i * -10).toFixed(2)}vh)) translateX(${(i * 8 - 12).toFixed(1)}px) scale(${pose.scale.toFixed(4)}) rotate(${ROT[i]}deg)`,
                        opacity: pose.opacity,
                        zIndex: 10 + i,
                        boxShadow: "rgba(9, 41, 61, 0.2) 0px 12px 36px 0px",
                      }}
                    >
                      <Image
                        src={`${IMG_BASE}${b.img}`}
                        alt={b.alt}
                        fill
                        sizes="(max-width: 640px) 64vw, (max-width: 1024px) 50vw, 350px"
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

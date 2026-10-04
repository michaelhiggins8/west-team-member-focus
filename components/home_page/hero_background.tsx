"use client";

import { useEffect, useState } from "react";

const C = {
  navy: "#09293D",
  gold: "#FBA333",
  orange: "#F97828",
  red: "#F35527",
  cream: "#FAF5EE",
};

const MODES = {
  hard: {
    label: "Hard mode",
    speed: 2.2,
    lines: ["Team: Just you", "Load: Every listing in town", "Morale: Rough"],
  },
  easy: {
    label: "Easy mode",
    speed: 1,
    lines: ["Team: 3 agents", "Load: Shared", "Morale: Closing deals"],
  },
};

function useViewportSize() {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

function Wheel({ cx, cy, r, speed }: { cx: number; cy: number; r: number; speed: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.navy} strokeWidth="4" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.gold} strokeWidth="2" />
      <g className="dw-spin" style={{ animationDuration: `${speed * (r / 7)}s`, transformOrigin: `${cx}px ${cy}px` }}>
        {[0, 45, 90, 135].map((a) => (
          <rect key={a} x={cx - r + 1} y={cy - 0.5} width={2 * r - 2} height="1" fill={C.navy} transform={`rotate(${a} ${cx} ${cy})`} />
        ))}
        <rect x={cx - r + 1} y={cy - 1} width="2" height="2" fill={C.red} />
      </g>
      <rect x={cx - 2} y={cy - 2} width="4" height="4" fill={C.orange} stroke={C.navy} strokeWidth="1" />
    </g>
  );
}

function Arm({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.navy} strokeWidth="4" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" />
      <rect x={x2 - 1.5} y={y2 - 1.5} width="3" height="3" fill={C.cream} stroke={C.navy} strokeWidth="1" />
    </g>
  );
}

// role: "pull" | "push". strain: leaning, sweating, grimacing.
function Agent({
  ox,
  blazer,
  hair,
  role = "pull",
  strain = false,
  key_ = false,
  speed,
}: {
  ox: number;
  blazer: string;
  hair: string;
  role?: "pull" | "push";
  strain?: boolean;
  key_?: boolean;
  speed: number;
}) {
  const d = { animationDuration: `${speed * 0.5}s` };
  return (
    <g className="dw-bob" style={d}>
      <g transform={`translate(${ox} 0)`}>
        <g transform={strain ? "rotate(12 8 64)" : undefined}>
          {/* legs */}
          <rect className="dw-legA" style={d} x="2" y="56" width="5" height="9" fill={C.navy} />
          <rect className="dw-legB" style={d} x="8" y="56" width="5" height="9" fill={C.navy} />
          <rect className="dw-legA" style={d} x="2" y="63" width="7" height="2" fill={C.gold} />
          <rect className="dw-legB" style={d} x="8" y="63" width="7" height="2" fill={C.gold} />
          {/* back arm */}
          {role === "push" ? (
            <Arm x1={4} y1={44} x2={15} y2={52} color={blazer} />
          ) : (
            <Arm x1={4} y1={44} x2={-4} y2={52} color={blazer} />
          )}
          {/* blazer */}
          <rect x="0" y="40" width="14" height="17" fill={blazer} stroke={C.navy} strokeWidth="1" />
          <polygon points="4,40 7,48 10,40" fill={C.cream} />
          <rect x="10" y="50" width="3" height="2" fill={C.gold} />
          {/* front arm */}
          {role === "push" && <Arm x1={12} y1={44} x2={17} y2={50} color={blazer} />}
          {role === "pull" && strain && <Arm x1={12} y1={44} x2={-2} y2={53} color={blazer} />}
          {role === "pull" && !strain && <Arm x1={12} y1={44} x2={19} y2={48} color={blazer} />}
          {key_ && (
            <g>
              <rect x="21" y="46" width="4" height="1" fill={C.gold} />
              <rect x="24" y="47" width="1" height="2" fill={C.gold} />
            </g>
          )}
          {/* head */}
          <rect x="2" y="29" width="12" height="11" fill={C.cream} stroke={C.navy} strokeWidth="1" />
          <rect x="2" y="27" width="12" height="4" fill={hair} />
          <rect x="2" y="30" width="2" height="3" fill={hair} />
          <rect x="9" y="32" width="5" height="3" fill="none" stroke={C.navy} strokeWidth="1" />
          {strain ? (
            <g>
              <rect x="10" y="33" width="3" height="1" fill={C.navy} />
              <rect x="8" y="37" width="5" height="1" fill={C.red} />
              <rect x="7" y="38" width="1" height="1" fill={C.red} />
              <rect x="13" y="38" width="1" height="1" fill={C.red} />
              <g className="dw-sweat" style={d}>
                <rect x="15" y="28" width="2" height="3" fill={C.navy} />
                <rect x="-1" y="31" width="2" height="3" fill={C.navy} />
              </g>
            </g>
          ) : (
            <g>
              <rect x="11" y="33" width="1" height="1" fill={C.navy} />
              <rect x="7" y="36" width="6" height="1" fill={C.red} />
              <rect x="13" y="35" width="1" height="1" fill={C.red} />
            </g>
          )}
        </g>
      </g>
    </g>
  );
}

function Box({ x, y, w, h, fill }: { x: number; y: number; w: number; h: number; fill: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={C.navy} strokeWidth="1.5" />
      <rect x={x + w / 2 - 1} y={y} width="2" height={h} fill={C.navy} opacity="0.35" />
    </g>
  );
}

function Wagon({ hard, speed, bobStyle }: { hard: boolean; speed: number; bobStyle: { animationDuration: string } }) {
  return (
    <g>
      {/* tongue */}
      <rect x="74" y="51" width={hard ? 20 : 46} height="2" fill={C.navy} />
      <g className="dw-bob" style={bobStyle}>
        <g transform={hard ? "rotate(-2 44 58)" : undefined}>
          {/* boat-shaped bed */}
          <polygon points="12,38 17,43 69,43 74,38 70,53 16,53" fill={C.red} stroke={C.navy} strokeWidth="2" />
          <rect x="18" y="46" width="50" height="1" fill={C.navy} opacity="0.6" />
          <rect x="18" y="49" width="50" height="1" fill={C.navy} opacity="0.6" />
          {/* water barrel between the wheels */}
          <rect x="42" y="44" width="7" height="9" fill={C.gold} stroke={C.navy} strokeWidth="1.5" />
          <rect x="42" y="47" width="7" height="1" fill={C.navy} />
          <rect x="42" y="50" width="7" height="1" fill={C.navy} />
          {/* canvas bonnet */}
          <path d="M16 42 C13 24 30 20 44 20 C58 20 75 24 72 42 Z" fill={C.cream} />
          <g clipPath="url(#dw-bonnet)">
            <rect x="10" y="34" width="68" height="8" fill={C.gold} opacity="0.35" />
            <rect x="10" y="37" width="68" height="2" fill={C.red} />
            {[24, 33, 42, 51, 60, 68].map((x) => (
              <rect key={x} x={x} y="18" width="1" height="26" fill={C.navy} opacity="0.35" />
            ))}
            <polygon points="67,26 73,24 73,42 67,42" fill={C.navy} />
          </g>
          <path d="M16 42 C13 24 30 20 44 20 C58 20 75 24 72 42" fill="none" stroke={C.navy} strokeWidth="2" />
          <text x="42" y="33" fontSize="6" textAnchor="middle" fill={C.navy} fontFamily="inherit">
            {hard ? "SOLO" : "SOLD"}
          </text>
          {/* driver bench */}
          <rect x="64" y="39" width="8" height="2" fill={C.gold} stroke={C.navy} strokeWidth="1" />
          {/* hitch */}
          <rect x="72" y="49" width="4" height="5" fill={C.navy} />
          {hard && (
            <g>
              <Box x={28} y={11} w={14} h={10} fill={C.gold} />
              <Box x={42} y={12} w={14} h={9} fill={C.cream} />
              <Box x={35} y={2} w={12} h={9} fill={C.orange} />
              <rect x="62" y="6" width="2" height="24" fill={C.navy} />
              <rect x="54" y="3" width="16" height="8" fill={C.cream} stroke={C.navy} strokeWidth="1" />
              <rect x="56" y="6" width="12" height="1" fill={C.red} />
              <rect x="56" y="8" width="9" height="1" fill={C.red} />
            </g>
          )}
        </g>
      </g>
      <Wheel cx={26} cy={55} r={9} speed={speed} />
      <Wheel cx={62} cy={57} r={7} speed={speed} />
    </g>
  );
}

function Cactus({ x, h = 12 }: { x: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={64 - h} width="4" height={h} fill={C.navy} />
      <rect x={x - 4} y={64 - h + 3} width="4" height="2" fill={C.navy} />
      <rect x={x - 4} y={64 - h + 1} width="2" height="2" fill={C.navy} />
      <rect x={x + 4} y={64 - h + 5} width="4" height="2" fill={C.navy} />
      <rect x={x + 6} y={64 - h + 3} width="2" height="2" fill={C.navy} />
    </g>
  );
}

function Rock({ x }: { x: number }) {
  return (
    <g fill={C.navy} opacity="0.7">
      <rect x={x} y="74" width="5" height="3" />
      <rect x={x + 7} y="76" width="4" height="2" />
    </g>
  );
}

function Flag({ x, color }: { x: number; color: string }) {
  return (
    <g>
      <rect x={x} y="46" width="2" height="18" fill={C.navy} />
      <polygon points={`${x + 2},46 ${x + 2},50 ${x + 10},48`} fill={color} />
    </g>
  );
}

function Tent({ x }: { x: number }) {
  return (
    <g>
      <polygon points={`${x},78 ${x + 15},56 ${x + 30},78`} fill={C.cream} stroke={C.navy} strokeWidth="1.5" />
      <polygon points={`${x + 10},78 ${x + 15},64 ${x + 20},78`} fill={C.navy} opacity="0.35" />
    </g>
  );
}

function Campfire({ x }: { x: number }) {
  return (
    <g>
      <rect x={x} y="66" width="5" height="7" fill={C.orange} />
      <rect x={x + 2} y="69" width="5" height="6" fill={C.gold} />
      <rect x={x - 2} y="75" width="12" height="2" fill={C.navy} />
      <rect x={x + 2} y="77" width="8" height="1" fill={C.navy} opacity="0.6" />
    </g>
  );
}

function Cloud({ x, y, scale = 1, duration = 7, delay = 0 }: { x: number; y: number; scale?: number; duration?: number; delay?: number }) {
  return (
    <g
      className="dw-cloud"
      style={{ transformOrigin: `${x}px ${y}px`, animationDuration: `${duration}s`, animationDelay: `-${delay}s` }}
    >
      <rect x={x} y={y} width={14 * scale} height={3 * scale} fill="#FFFFFF" opacity="0.9" />
      <rect x={x + 3 * scale} y={y - 3 * scale} width={7 * scale} height={3 * scale} fill="#FFFFFF" opacity="0.9" />
    </g>
  );
}

/** Pixel scene spanning `w` units, 90 tall. Crew and full story always inside. */
function SceneContent({
  w,
  hard,
  speed,
  bobStyle,
}: {
  w: number;
  hard: boolean;
  speed: number;
  bobStyle: { animationDuration: string };
}) {
  const hills = Array.from({ length: Math.floor(w / 80) + 2 }, (_, i) => i * 80);
  const tufts = Array.from({ length: Math.floor(w / 16) + 2 }, (_, i) => i * 16);
  const cx = Math.round((w - 160) / 2); // crew (wagon + agents) spans ~160 units, centered

  const sunX = Math.min(Math.max(Math.round(w * 0.82), cx + 220), w - 26);

  // Desert dressing slots — evenly spread across the trail, never over the crew.
  const slotFractions = [0.05, 0.13, 0.28, 0.72, 0.8, 0.88, 0.95];
  const props = ["flagRed", "cactus", "rock", "cactus9", "tent", "fire", "flagGold"] as const;

  return (
    <g>
      {/* sky */}
      <rect width={w} height="90" fill={C.cream} />
      <rect y="30" width={w} height="34" fill={C.gold} opacity="0.35" />
      <rect y="42" width={w} height="22" fill={C.gold} opacity="0.5" />

      {/* sun */}
      <circle cx={sunX} cy="20" r="9" fill={C.orange} />
      <circle cx={sunX} cy="20" r="6" fill={C.gold} />

      {/* clouds — spread across the whole sky, drifting at varied speeds */}
      {Array.from({ length: Math.floor(w / 55) + 2 }, (_, i) => {
        const x = Math.round(i * 55 + (i % 3) * 14);
        const y = 2 + ((i * 7) % 22);
        return (
          <Cloud
            key={i}
            x={x}
            y={y}
            scale={i % 3 === 0 ? 1.4 : i % 3 === 1 ? 1 : 0.8}
            duration={9 + (i % 5) * 3}
            delay={i * 1.7}
          />
        );
      })}

      {/* hills */}
      <g className="dw-hills" style={{ animationDuration: `${speed * 14}s` }}>
        {hills.map((x) => (
          <g key={x}>
            <polygon points={`${x},64 ${x + 20},40 ${x + 34},50 ${x + 54},34 ${x + 80},64`} fill={C.navy} />
            <polygon points={`${x + 54},34 ${x + 60},41 ${x + 48},41`} fill={C.cream} />
            <polygon points={`${x + 20},40 ${x + 24},45 ${x + 16},45`} fill={C.cream} />
          </g>
        ))}
      </g>

      {/* ground */}
      <rect y="64" width={w} height="26" fill={C.orange} />
      <rect y="64" width={w} height="2" fill={C.navy} />
      <rect y="80" width={w} height="10" fill={C.red} />
      <g className="dw-ground" style={{ animationDuration: `${speed * 0.5}s` }}>
        {tufts.map((x, i) => (
          <g key={x}>
            <rect x={x + 3} y={70 + (i % 2) * 3} width="4" height="1" fill={C.navy} />
            <rect x={x + 10} y={84 + (i % 3)} width="3" height="1" fill={C.navy} />
          </g>
        ))}
      </g>

      {/* desert dressing */}
      {slotFractions.map((f, i) => {
        const x = Math.round(f * w);
        const clear = x < cx - 40 || x > cx + 200;
        if (!clear) return null;
        const kind = props[i % props.length];
        if (kind === "flagRed") return <Flag key={f} x={x} color={C.red} />;
        if (kind === "cactus") return <Cactus key={f} x={x} />;
        if (kind === "rock") return <Rock key={f} x={x} />;
        if (kind === "cactus9") return <Cactus key={f} x={x} h={9} />;
        if (kind === "tent") return w >= 480 ? <Tent key={f} x={x} /> : null;
        if (kind === "fire") return <Campfire key={f} x={x} />;
        return <Flag key={f} x={x} color={C.gold} />;
      })}

      {/* main crew centered */}
      <g transform={`translate(${cx} 0)`}>
        <Wagon hard={hard} speed={speed} bobStyle={bobStyle} />
        {hard ? (
          <Agent ox={100} blazer={C.orange} hair={C.navy} strain speed={speed} />
        ) : (
          <g>
            <Agent ox={-1} blazer={C.gold} hair={C.navy} role="push" speed={speed} />
            <Agent ox={98} blazer={C.orange} hair={C.navy} speed={speed} />
            <Agent ox={122} blazer={C.red} hair={C.gold} key_ speed={speed} />
          </g>
        )}
      </g>
    </g>
  );
}

export default function HeroBackground({ mode }: { mode: "hard" | "easy" }) {
  const hard = mode === "hard";
  const s = MODES[mode].speed;
  const bobStyle = { animationDuration: `${s * 0.5}s` };
  const size = useViewportSize();

  // Scene band height: a fixed slice of the viewport, like a game stage.
  const H = size ? Math.round(Math.min(Math.max(size.h * 0.38, 300), 460)) : 330;
  // World width computed so the FULL 90-unit story fills the band at this height.
  const W = size ? Math.ceil((size.w * 90) / H) : 720;

  return (
    <div className="dw-root w-full">
      <style>{`
        .dw-svg{display:block;width:100%;height:100%;image-rendering:pixelated;shape-rendering:crispEdges}
        .dw-spin{animation:dwspin linear infinite;transform-box:view-box}
        @keyframes dwspin{to{transform:rotate(360deg)}}
        .dw-ground{animation:dwscroll linear infinite}
        @keyframes dwscroll{to{transform:translateX(-16px)}}
        .dw-hills{animation:dwhills linear infinite}
        @keyframes dwhills{to{transform:translateX(-80px)}}
        .dw-cloud{animation:dwcloud ease-in-out infinite alternate}
        @keyframes dwcloud{from{transform:translate(0,0)}to{transform:translate(28px,2px)}}
        .dw-bob{animation:dwbob steps(2) infinite}
        @keyframes dwbob{50%{transform:translateY(-1px)}}
        .dw-legA{animation:dwlegA steps(2) infinite;transform-box:fill-box;transform-origin:50% 0}
        .dw-legB{animation:dwlegB steps(2) infinite;transform-box:fill-box;transform-origin:50% 0}
        @keyframes dwlegA{0%{transform:rotate(25deg)}100%{transform:rotate(-25deg)}}
        @keyframes dwlegB{0%{transform:rotate(-25deg)}100%{transform:rotate(25deg)}}
        .dw-sweat{animation:dwsweat steps(3) infinite}
        @keyframes dwsweat{0%{transform:translateY(-2px);opacity:1}100%{transform:translateY(5px);opacity:0}}
        @media (prefers-reduced-motion:reduce){.dw-root *{animation-play-state:paused !important}}
      `}</style>

      {/* Fixed-height pixel stage — the art scales UP with viewport height */}
      <div className="hidden md:block w-full overflow-hidden" style={{ height: `${H}px` }}>
        <svg
          className="dw-svg"
          viewBox={`0 0 ${W} 90`}
          preserveAspectRatio="none"
          aria-label={
            hard
              ? "A real estate agent struggles to pull a covered wagon piled high with boxes across the desert"
              : "Three real estate agents on a team easily move a covered wagon together across the desert"
          }
          role="img"
        >
          <defs>
            <clipPath id="dw-bonnet">
              <path d="M16 42 C13 24 30 20 44 20 C58 20 75 24 72 42 Z" />
            </clipPath>
          </defs>
          <SceneContent w={W} hard={hard} speed={s} bobStyle={bobStyle} />
        </svg>
      </div>

      {/* Compact scene for small screens — same art, tighter window */}
      <div className="md:hidden w-full overflow-hidden" style={{ aspectRatio: "240 / 90" }}>
        <svg className="dw-svg" viewBox="0 0 240 90" preserveAspectRatio="none" aria-hidden="true">
          <SceneContent w={240} hard={hard} speed={s} bobStyle={bobStyle} />
        </svg>
      </div>

      {/* Ground continues downward — the section band picks up the trail color */}
      <div className="w-full" style={{ background: C.red }}>
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
          <div className="flex-1 min-w-0">
            <p
              className="text-caption font-medium uppercase tracking-widest mb-0.5"
              style={{ color: C.navy }}
            >
              {hard ? "Going solo" : "On the team"}
            </p>
            <p className="text-body text-cream leading-caption">
              {MODES[mode].lines.join(" · ")}
            </p>
          </div>
          <p className="text-caption text-cream/60 shrink-0 font-mono">
            {hard ? "no crew · every lead yours" : "crew of 3 · leads shared"}
          </p>
        </div>
      </div>
    </div>
  );
}

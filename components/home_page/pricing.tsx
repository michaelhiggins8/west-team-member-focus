const C = {
  navy: "#09293D",
  gold: "#FBA333",
  orange: "#F97828",
  red: "#F35527",
  cream: "#FAF5EE",
};

const FACTS = [
  { label: "20% per closing", dot: "bg-gold" },
  { label: "$8,500 annual cap", dot: "bg-orange" },
  { label: "100% after the cap", dot: "bg-navy" },
];

// Chart math — cumulative split paid over 12 closings in one year.
const DEALS = 12;
const PER_DEAL = 1800; // 20% of an average $9,000 commission
const CAP = 8500;
const MAX = 24000;
const X0 = 52;
const X1 = 540;
const Y0 = 28;
const Y1 = 168;
const GRIDS = [6000, 12000, 18000, 24000];

function xi(i: number) {
  return X0 + ((i - 1) / (DEALS - 1)) * (X1 - X0);
}
function yv(v: number) {
  return Y1 - (v / MAX) * (Y1 - Y0);
}

const OTHERS = Array.from(
  { length: DEALS },
  (_, k) => `${xi(k + 1)},${yv((k + 1) * PER_DEAL)}`,
).join(" ");
const CAPPED = Array.from(
  { length: DEALS },
  (_, k) => `${xi(k + 1)},${yv(Math.min((k + 1) * PER_DEAL, CAP))}`,
).join(" ");
const CAP_X = xi(5); // first closing where contributions reach the cap
const CAP_Y = yv(CAP);
const MONO = "var(--font-geist-mono), monospace";

// Breaking the surface — the water section ends and the cream sky returns.
function Surfacing() {
  return (
    <div className="w-full bg-navy" aria-hidden="true">
      <style>{`
        .pr-bubble{animation:prrise ease-in-out infinite}
        @keyframes prrise{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-30px);opacity:0}}
        @media (prefers-reduced-motion:reduce){.pr-bubble{animation:none !important;opacity:0}}
      `}</style>
      <svg
        className="block w-full"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        style={{ height: "clamp(56px, 9vh, 110px)" }}
      >
        <path
          d="M0 44 C180 20 360 64 560 40 C760 16 960 66 1160 38 C1270 22 1360 46 1440 34 L1440 90 L0 90 Z"
          fill={C.cream}
        />
        <path
          d="M0 44 C180 20 360 64 560 40 C760 16 960 66 1160 38 C1270 22 1360 46 1440 34"
          fill="none"
          stroke={C.gold}
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        <rect
          className="pr-bubble"
          x="500"
          y="60"
          width="3"
          height="3"
          fill={C.gold}
          opacity="0.8"
          style={{ animationDuration: "4.5s" }}
        />
        <rect
          className="pr-bubble"
          x="980"
          y="68"
          width="2.5"
          height="2.5"
          fill={C.gold}
          opacity="0.7"
          style={{ animationDuration: "5.5s", animationDelay: "2.2s" }}
        />
      </svg>
    </div>
  );
}

function SplitChart() {
  return (
    <figure className="bg-stone rounded-[16px] p-5 lg:p-7 mt-10 lg:mt-0">
      <figcaption className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="inline-flex items-center gap-2 text-[12px] font-medium text-ink">
          <span
            className="h-2.5 w-2.5 rounded-[2px]"
            style={{ background: C.navy }}
            aria-hidden="true"
          />
          West Team — capped
        </span>
        <span className="inline-flex items-center gap-2 text-[12px] font-medium text-ink">
          <span
            className="h-2.5 w-2.5 rounded-[2px]"
            style={{ background: C.red }}
            aria-hidden="true"
          />
          A team with no cap
        </span>
      </figcaption>

      <svg
        viewBox="0 0 560 210"
        className="block w-full h-auto mt-4"
        role="img"
        aria-label="Chart comparing cumulative commission split paid to the team over 12 closings. West Team's line stops at the $8,500 cap; a team with no cap keeps climbing past $21,000."
      >
        {/* gridlines */}
        {GRIDS.map((v) => (
          <g key={v}>
            <line
              x1={X0 - 6}
              x2={X1 + 6}
              y1={yv(v)}
              y2={yv(v)}
              stroke="#d8ddd6"
              strokeWidth="1"
            />
            <text
              x={X0 - 12}
              y={yv(v) + 3}
              textAnchor="end"
              fontSize="10"
              fill="#9aa8b0"
              fontFamily={MONO}
            >
              ${v / 1000}k
            </text>
          </g>
        ))}

        {/* baseline + x numerals */}
        <line x1={X0 - 6} x2={X1 + 6} y1={Y1} y2={Y1} stroke="#9aa8b0" strokeWidth="1" />
        {Array.from({ length: DEALS }, (_, k) => (
          <text
            key={`d${k}`}
            x={xi(k + 1)}
            y={Y1 + 18}
            textAnchor="middle"
            fontSize="10"
            fill="#9aa8b0"
            fontFamily={MONO}
          >
            {k + 1}
          </text>
        ))}

        {/* cap line */}
        <line
          x1={X0 - 6}
          x2={X1 + 6}
          y1={CAP_Y}
          y2={CAP_Y}
          stroke={C.gold}
          strokeDasharray="5 4"
          strokeWidth="1.5"
        />
        <text
          x={X1}
          y={CAP_Y - 7}
          textAnchor="end"
          fontSize="11"
          fontWeight="600"
          fill={C.navy}
          fontFamily={MONO}
        >
          $8,500 cap
        </text>

        {/* drop line where the cap is reached */}
        <line
          x1={CAP_X}
          x2={CAP_X}
          y1={CAP_Y}
          y2={Y1}
          stroke={C.gold}
          strokeDasharray="2 4"
          opacity="0.9"
        />

        {/* team with no cap — keeps climbing */}
        <polyline points={OTHERS} fill="none" stroke={C.red} strokeWidth="2" />
        {/* west team — plateaus at the cap */}
        <polyline
          points={CAPPED}
          fill="none"
          stroke={C.navy}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <rect
          x={CAP_X - 3}
          y={CAP_Y - 3}
          width="6"
          height="6"
          fill={C.gold}
          stroke={C.cream}
          strokeWidth="1.5"
        />
      </svg>

      <p className="text-caption text-ashen leading-body mt-4">
        Cumulative split paid to the team across 12 closings in one year. After
        the cap is reached, the West Team line goes flat — yours never does.
      </p>
    </figure>
  );
}

export function Pricing() {
  return (
    <>
      <Surfacing />
      <section id="pricing" className="w-full bg-cream">
        <div className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24">
          
          
          
          <h2 className="font-serif text-[32px] lg:text-[40px] leading-[1.15] text-ink tracking-tight max-w-[26ch] mt-3">
            We <b>stop</b> at $8,500.
          </h2>
          <p className="text-lead text-graphite leading-lead mt-4 max-w-[56ch]">
            Most teams take 20% of every closing — all year, every year. Forever. Here,
            20% is just how the cap gets paid. Once your self generated leads total
            $8,500 for the year, we’re done taking. Everything after that
            is yours to keep.
          </p>

          <div
            className="bg-paper rounded-[24px] p-8 lg:p-12 mt-12"
            style={{ boxShadow: "rgba(9, 41, 61, 0.08) 0px 8px 32px 0px" }}
          >
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
              {/* Cap anatomy */}
              <div>
                <h3 className="font-serif text-heading-sm text-ink leading-heading-sm">
                  Membership
                </h3>
                <div className="flex items-baseline gap-3 mt-3 flex-wrap">
                  <span
                    className="font-serif text-ink leading-none"
                    style={{ fontSize: "clamp(48px, 6vw, 68px)" }}
                  >
                    $8,500
                  </span>
                  <span className="text-lead text-graphite">cap · per year</span>
                </div>
                <p className="text-body text-ashen leading-body mt-3 max-w-[48ch]">
                  Collected as 20% of each closing until it adds up. Then West
                  Team steps back for the rest of the year.
                </p>

                <div className="flex flex-wrap gap-2.5 mt-6">
                  {FACTS.map((f) => (
                    <span
                      key={f.label}
                      className="inline-flex items-center gap-2 rounded-[8px] bg-stone text-ink text-[12px] font-medium px-3 py-1.5"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${f.dot}`} aria-hidden="true" />
                      {f.label}
                    </span>
                  ))}
                </div>

                <p className="text-body text-graphite leading-body mt-8 max-w-[52ch]">
                  No caps means your best year is your most expensive year. A
                  cap means the opposite: the more you close, the more of every
                  commission you keep.
                </p>

                <div className="flex flex-wrap items-center gap-6 mt-8">
                  <a
                    href="#"
                    className="inline-flex items-center rounded-[8px] bg-navy text-cream text-[15px] font-medium px-5 py-3 hover:bg-ink transition-colors duration-200"
                  >
                    Join the team
                  </a>
                  <a
                    href="#the-team"
                    className="text-[15px] font-medium text-graphite underline underline-offset-4 decoration-mist hover:text-ink hover:decoration-pebble transition-colors duration-200"
                  >
                    Meet Tracey
                  </a>
                </div>
              </div>

              {/* The math, drawn */}
              <SplitChart />
            </div>
          </div>

          <p className="text-caption text-pebble leading-caption mt-5 max-w-[70ch]">
            Illustration assumes 12 closings at an average $9,000 commission —
            $1,800 to the team per deal at 20%. Your deals will vary. The cap
            won’t.
          </p>
        </div>
      </section>
    </>
  );
}

/**
 * Exploded-layer diagram of an engineered floor construction — the
 * signature hero graphic. Each layer floats independently (CSS animation,
 * disabled under prefers-reduced-motion).
 */

const layers = [
  { y: 150, h: 26, label: "UV 耐磨层", grad: "hero-l1", stroke: "rgba(143,173,253,0.5)" },
  { y: 240, h: 34, label: "高清装饰膜", grad: "hero-l2", stroke: "rgba(255,255,255,0.25)" },
  { y: 330, h: 74, label: "刚性矿物芯层", grad: "hero-l3", stroke: "rgba(255,255,255,0.14)" },
  { y: 462, h: 44, label: "声学背垫", grad: "hero-l4", stroke: "rgba(255,255,255,0.1)" },
];

export function HeroArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 620" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hero-l1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fadfd" stopOpacity="0.34" />
          <stop offset="1" stopColor="#8fadfd" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="hero-l2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dfe5f0" />
          <stop offset="1" stopColor="#adb9cf" />
        </linearGradient>
        <linearGradient id="hero-l3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b4a6b" />
          <stop offset="1" stopColor="#232e49" />
        </linearGradient>
        <linearGradient id="hero-l4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c2640" />
          <stop offset="1" stopColor="#121a2e" />
        </linearGradient>
        <filter id="hero-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>

      {/* ground glow */}
      <ellipse cx="272" cy="576" rx="220" ry="30" fill="#3f66ea" opacity="0.12" filter="url(#hero-blur)" />

      {/* measure rail */}
      <g stroke="rgba(255,255,255,0.18)" strokeWidth="1">
        <line x1="40" y1="138" x2="40" y2="520" />
        <line x1="34" y1="138" x2="46" y2="138" />
        <line x1="34" y1="520" x2="46" y2="520" />
      </g>
      <text
        x="28"
        y="330"
        fill="#6a7793"
        fontSize="9"
        letterSpacing="0.22em"
        transform="rotate(-90 28 330)"
        textAnchor="middle"
        className="font-mono"
      >
        TOTAL BUILD 8.0 MM
      </text>

      {layers.map((l, i) => {
        const skewDrop = Math.tan((9 * Math.PI) / 180) * 360; // right edge rise
        const labelY = l.y + l.h / 2 - skewDrop;
        return (
          <g
            key={l.label}
            className="animate-float-slow"
            style={{ animationDelay: `${i * 0.9}s` }}
          >
            {/* tick on the measure rail */}
            <line
              x1="36"
              y1={l.y + l.h / 2}
              x2="44"
              y2={l.y + l.h / 2}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
            <g transform={`translate(84 ${l.y}) skewY(-9)`}>
              <rect
                width="360"
                height={l.h}
                rx="7"
                fill={`url(#${l.grad})`}
                stroke={l.stroke}
                strokeWidth="1"
              />
            </g>
            <line
              x1="450"
              y1={labelY}
              x2="478"
              y2={labelY}
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1"
            />
            <text
              x="486"
              y={labelY + 3.5}
              fill="#93a0bc"
              fontSize="10"
              letterSpacing="0.18em"
              className="font-mono"
            >
              {l.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

import type { TextureKind } from "@/data/products";

/**
 * Procedural material renders — abstract, art-directed stand-ins for
 * photography that stay on-brand at any size. Purely decorative.
 */
export function MaterialTexture({ kind }: { kind: TextureKind }) {
  if (kind === "lvt") return <TextureLvt />;
  if (kind === "wall") return <TextureWall />;
  return <TextureCarpet />;
}

const svgProps = {
  className: "h-full w-full",
  preserveAspectRatio: "xMidYMid slice" as const,
  "aria-hidden": true as const,
  focusable: "false" as const,
};

function TextureLvt() {
  return (
    <svg {...svgProps} viewBox="0 0 800 600">
      <defs>
        <linearGradient id="lvt-a" x1="0" y1="0" x2="1" y2="0.15">
          <stop offset="0" stopColor="#cdb89e" />
          <stop offset="1" stopColor="#bda683" />
        </linearGradient>
        <linearGradient id="lvt-b" x1="0" y1="0" x2="1" y2="0.15">
          <stop offset="0" stopColor="#b9a184" />
          <stop offset="1" stopColor="#a99070" />
        </linearGradient>
        <linearGradient id="lvt-c" x1="0" y1="0" x2="1" y2="0.15">
          <stop offset="0" stopColor="#c4ae92" />
          <stop offset="1" stopColor="#b29a7a" />
        </linearGradient>
        <linearGradient id="lvt-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="0.4" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.72" stopColor="#ffffff" stopOpacity="0.07" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="lvt-vig" cx="0.5" cy="0.42" r="0.9">
          <stop offset="0.55" stopColor="#4a3a26" stopOpacity="0" />
          <stop offset="1" stopColor="#4a3a26" stopOpacity="0.28" />
        </radialGradient>
        <filter id="lvt-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width="800" height="600" fill="url(#lvt-a)" />
      <rect y="100" width="800" height="100" fill="url(#lvt-b)" />
      <rect y="300" width="800" height="100" fill="url(#lvt-c)" />
      <rect y="400" width="800" height="100" fill="url(#lvt-b)" />
      <rect y="200" width="800" height="100" fill="url(#lvt-c)" />
      <rect y="500" width="800" height="100" fill="url(#lvt-a)" />

      {/* wood grain */}
      <g stroke="#8a7358" strokeWidth="1.3" fill="none" opacity="0.5">
        <path d="M0,38 C140,30 260,48 420,40 S700,34 800,44" opacity="0.5" />
        <path d="M0,72 C180,66 320,80 480,72 S720,68 800,76" opacity="0.35" />
        <path d="M0,136 C120,128 300,146 460,138 S740,132 800,142" opacity="0.5" />
        <path d="M0,178 C200,170 360,184 520,176 S760,172 800,180" opacity="0.3" />
        <path d="M0,238 C160,230 300,248 440,240 S700,234 800,244" opacity="0.5" />
        <path d="M0,272 C220,266 380,280 540,272 S760,268 800,276" opacity="0.3" />
        <path d="M0,340 C140,332 280,350 440,342 S720,336 800,346" opacity="0.5" />
        <path d="M0,376 C180,370 340,384 500,376 S740,372 800,380" opacity="0.32" />
        <path d="M0,438 C120,430 300,448 460,440 S740,434 800,444" opacity="0.5" />
        <path d="M0,474 C200,468 360,482 520,474 S760,470 800,478" opacity="0.3" />
        <path d="M0,540 C160,532 320,550 480,542 S720,536 800,546" opacity="0.5" />
        <path d="M0,574 C220,568 380,582 540,574 S760,570 800,578" opacity="0.32" />
      </g>
      {/* knots */}
      <g fill="none" stroke="#7d6448" opacity="0.4">
        <ellipse cx="588" cy="152" rx="26" ry="9" strokeWidth="1.4" />
        <ellipse cx="588" cy="152" rx="13" ry="4.5" strokeWidth="1.2" />
        <ellipse cx="216" cy="452" rx="30" ry="10" strokeWidth="1.4" />
        <ellipse cx="216" cy="452" rx="15" ry="5" strokeWidth="1.2" />
      </g>

      {/* plank joints */}
      <g fill="#6d5b42" opacity="0.5">
        <rect y="99" width="800" height="2" />
        <rect y="199" width="800" height="2" />
        <rect y="299" width="800" height="2" />
        <rect y="399" width="800" height="2" />
        <rect y="499" width="800" height="2" />
        <rect x="318" y="0" width="2" height="100" />
        <rect x="558" y="100" width="2" height="100" />
        <rect x="178" y="200" width="2" height="100" />
        <rect x="638" y="300" width="2" height="100" />
        <rect x="398" y="400" width="2" height="100" />
        <rect x="238" y="500" width="2" height="100" />
      </g>

      <rect width="800" height="600" fill="url(#lvt-sheen)" />
      <rect width="800" height="600" fill="url(#lvt-vig)" />
      <rect width="800" height="600" filter="url(#lvt-noise)" opacity="0.06" />
    </svg>
  );
}

function TextureWall() {
  const slats = [
    "#24334f", "#2b3c5c", "#1e2b46", "#33477c", "#28395a",
    "#22304c", "#2d3f60", "#1e2b46", "#3a5290", "#263654", "#2b3c5c",
  ];
  return (
    <svg {...svgProps} viewBox="0 0 800 600">
      <defs>
        <linearGradient id="wall-lit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="wall-glow" cx="0.22" cy="0.1" r="0.85">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.09" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="wall-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width="800" height="600" fill="#111a2e" />
      {slats.map((fill, i) => (
        <g key={i}>
          <rect x={10 + i * 72} y="-8" width="56" height="616" rx="5" fill={fill} />
          <rect x={10 + i * 72} y="-8" width="56" height="616" rx="5" fill="url(#wall-lit)" />
          <rect x={10 + i * 72 + 52} y="-8" width="4" height="616" fill="#000000" opacity="0.22" />
        </g>
      ))}
      <rect width="800" height="600" fill="url(#wall-glow)" />
      <rect width="800" height="600" filter="url(#wall-noise)" opacity="0.1" />
    </svg>
  );
}

function TextureCarpet() {
  const flecks: Array<[number, number, string]> = [
    [66, 90, "#4f6db8"], [210, 42, "#43598c"], [342, 138, "#5a79c9"],
    [546, 66, "#43598c"], [678, 186, "#4f6db8"], [114, 282, "#5a79c9"],
    [438, 258, "#43598c"], [594, 330, "#4f6db8"], [258, 378, "#5a79c9"],
    [90, 450, "#43598c"], [390, 474, "#4f6db8"], [690, 438, "#5a79c9"],
    [522, 522, "#43598c"], [174, 546, "#4f6db8"],
  ];
  return (
    <svg {...svgProps} viewBox="0 0 800 600">
      <defs>
        <pattern id="carpet-p1" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="5.4" fill="#35435c" />
          <circle cx="18" cy="18" r="5.4" fill="#2d3a52" />
        </pattern>
        <pattern id="carpet-p2" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="18" cy="6" r="5.4" fill="#3d4c68" />
          <circle cx="6" cy="18" r="5.4" fill="#31405c" />
        </pattern>
        <radialGradient id="carpet-vig" cx="0.5" cy="0.4" r="0.95">
          <stop offset="0.5" stopColor="#0d1526" stopOpacity="0" />
          <stop offset="1" stopColor="#0d1526" stopOpacity="0.4" />
        </radialGradient>
        <radialGradient id="carpet-lit" cx="0.2" cy="0.08" r="0.7">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="carpet-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width="800" height="600" fill="#232e40" />
      <rect width="800" height="600" fill="url(#carpet-p1)" />
      <rect width="800" height="600" fill="url(#carpet-p2)" />
      {flecks.map(([cx, cy, fill], i) => (
        <circle key={i} cx={cx} cy={cy} r="5.4" fill={fill} opacity="0.85" />
      ))}
      <rect width="800" height="600" fill="url(#carpet-lit)" />
      <rect width="800" height="600" fill="url(#carpet-vig)" />
      <rect width="800" height="600" filter="url(#carpet-noise)" opacity="0.08" />
    </svg>
  );
}

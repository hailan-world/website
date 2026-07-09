/**
 * Stylised dot-matrix world map. Land masses are simplified silhouettes
 * used as a mask over a dot grid; markers show HAILAN's export hubs.
 */

const hubs: Array<{ x: number; y: number; label?: string }> = [
  { x: 862, y: 208, label: "JINHUA HQ" },
  { x: 508, y: 148 }, // Rotterdam
  { x: 140, y: 190 }, // Los Angeles
  { x: 296, y: 172 }, // New York
  { x: 344, y: 344 }, // São Paulo
  { x: 634, y: 244 }, // Dubai
  { x: 486, y: 296 }, // Lagos
  { x: 790, y: 308 }, // Singapore
  { x: 894, y: 414 }, // Sydney
];

const arcs = [
  "M862,208 Q660,52 508,148",
  "M862,208 Q520,16 140,190",
  "M862,208 Q590,28 296,172",
  "M862,208 Q610,470 344,344",
  "M862,208 Q750,168 634,244",
  "M862,208 Q690,384 486,296",
  "M862,208 Q900,320 894,414",
  "M862,208 Q832,278 790,308",
];

export function WorldMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 520"
      className={className}
      role="img"
      aria-label="World map showing HAILAN export destinations across six continents"
    >
      <defs>
        <pattern id="wm-dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="1.8" cy="1.8" r="1.5" fill="#31405f" />
        </pattern>
        <mask id="wm-land">
          <rect width="1000" height="520" fill="black" />
          <g fill="white">
            {/* North America */}
            <path d="M52,158 C40,132 58,104 96,94 C128,74 190,66 244,72 C292,76 316,96 312,120 C330,128 336,146 322,160 C332,178 318,196 296,200 C290,220 272,236 252,238 C244,258 230,272 216,270 C208,256 206,240 210,226 C186,222 160,210 142,196 C108,190 68,180 52,158 Z" />
            {/* Greenland */}
            <path d="M336,58 C350,44 380,44 392,58 C398,72 388,88 370,92 C352,94 336,84 332,72 C332,66 333,61 336,58 Z" />
            {/* South America */}
            <path d="M282,300 C296,282 326,278 344,294 C360,310 362,338 352,364 C344,392 330,420 316,442 C308,454 300,458 296,450 C286,430 280,404 280,378 C272,352 270,322 282,300 Z" />
            {/* Europe */}
            <path d="M470,168 C462,150 472,130 494,120 C514,108 546,104 566,112 C582,118 586,132 578,144 C586,152 582,164 568,170 C550,180 522,184 500,182 C486,180 474,178 470,168 Z" />
            {/* UK */}
            <path d="M470,124 C476,116 486,116 490,124 C492,132 486,140 478,140 C470,138 466,130 470,124 Z" />
            {/* Scandinavia */}
            <path d="M524,72 C536,60 556,60 564,74 C570,88 562,104 548,112 C536,118 524,110 522,96 C520,86 520,78 524,72 Z" />
            {/* Africa */}
            <path d="M476,220 C494,202 528,198 552,210 C572,222 578,246 570,272 C562,300 548,330 532,356 C520,376 508,388 500,384 C488,368 480,344 476,318 C468,290 464,252 476,220 Z" />
            {/* Madagascar */}
            <path d="M586,346 C592,338 602,338 606,348 C608,358 602,370 594,372 C586,372 582,362 584,352 Z" />
            {/* Asia */}
            <path d="M590,170 C578,148 590,120 622,104 C668,84 738,78 796,90 C848,98 890,114 904,136 C914,152 906,168 886,176 C894,190 886,206 866,212 C858,228 840,240 820,240 C810,256 792,266 774,262 C762,276 742,280 726,272 C710,280 690,278 678,266 C654,264 630,254 618,238 C602,226 592,206 590,190 C588,183 588,176 590,170 Z" />
            {/* India */}
            <path d="M700,268 C710,262 722,264 728,274 C732,288 726,306 716,318 C708,326 700,322 696,308 C692,294 692,278 700,268 Z" />
            {/* SE Asia */}
            <path d="M782,290 C790,284 800,286 804,296 C806,306 800,316 790,318 C782,318 776,308 778,298 Z" />
            <path d="M828,318 C836,312 846,316 848,326 C848,334 840,340 832,338 C824,334 822,324 828,318 Z" />
            {/* Japan */}
            <path d="M892,196 C900,190 908,194 908,204 C906,214 898,220 890,216 C884,210 886,201 892,196 Z" />
            {/* Australia */}
            <path d="M806,382 C824,364 862,360 888,372 C906,382 910,402 898,416 C882,432 848,436 826,426 C808,418 798,398 806,382 Z" />
            {/* New Zealand */}
            <path d="M928,442 C934,436 942,438 944,446 C944,454 936,460 930,456 C926,452 925,447 928,442 Z" />
          </g>
        </mask>
      </defs>

      <rect width="1000" height="520" fill="url(#wm-dots)" mask="url(#wm-land)" />

      {/* export routes */}
      <g fill="none" stroke="#3f66ea" strokeWidth="1" strokeDasharray="3 6" opacity="0.4">
        {arcs.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      {/* hubs */}
      {hubs.map(({ x, y, label }) => (
        <g key={`${x}-${y}`}>
          <circle
            cx={x}
            cy={y}
            r={label ? 5 : 3.5}
            fill="#6489f7"
            opacity="0.45"
            className="origin-center animate-pulse-dot [transform-box:fill-box]"
          />
          <circle cx={x} cy={y} r={label ? 3.4 : 2.4} fill="#8fadfd" />
          {label && (
            <text
              x={x - 14}
              y={y + 4}
              textAnchor="end"
              fill="#b9ceff"
              fontSize="11"
              letterSpacing="0.18em"
              className="font-mono"
            >
              {label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

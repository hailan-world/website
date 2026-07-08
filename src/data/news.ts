export interface Article {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  category: "Events" | "Manufacturing" | "Sustainability" | "Company";
  excerpt: string;
  body: string[];
}

export const articles: Article[] = [
  {
    slug: "domotex-asia-2026",
    title:
      "HAILAN showcases next-generation acoustic wall systems at Domotex Asia 2026",
    date: "2026-06-12",
    category: "Events",
    excerpt:
      "Three new PET slat constructions and a 24 mm high-absorption panel headlined our largest trade fair presence to date in Shanghai.",
    body: [
      "Shanghai — HAILAN closed its largest trade fair presence to date at Domotex Asia/ChinaFloor 2026, where the company introduced three new PET slat wall constructions and a 24 mm high-absorption acoustic panel developed for open-plan offices and education projects.",
      "The new constructions pair routed polyester felt with a structural felt substrate, reaching NRC values up to 0.85 in standard ceiling-gap mounting. All three launch colourways were developed with European specifiers and will be stocked for container-mix programs from Q4 2026.",
      "Visitor interest concentrated on combined programs — partners sourcing LVT, wall panels and carpet tiles under one quality system and one shipping schedule. Over the four fair days our export team held more than 140 scheduled meetings with importers and brands from 38 countries.",
      "Samples of the full 2026 acoustic collection are available now through our OEM sampling studio. Distribution partners can request the fair briefing pack from their account manager.",
    ],
  },
  {
    slug: "pet-carpet-line-expansion",
    title: "New PET carpet line adds 40% tufting capacity ahead of 2027 demand",
    date: "2026-03-18",
    category: "Manufacturing",
    excerpt:
      "A fourth tufting line and automated backing station came online in March, lifting annual carpet capacity to 4.2 million square metres.",
    body: [
      "Huzhou — HAILAN commissioned its fourth tufting line in March, together with an automated backing and cutting station, lifting annual carpet capacity by roughly 40% to 4.2 million square metres.",
      "The line runs 1/10 and 1/12 gauge loop and cut-loop constructions and is dedicated primarily to solution-dyed PET programs, where order volume from workplace and hospitality brands has grown for nine consecutive quarters.",
      "Alongside the tufting expansion, the new backing station applies our lighter PET-composite backing in-line, cutting station-to-station handling and reducing per-tile weight variance to under 3%. The investment shortens standard production lead times for carpet programs by approximately one week.",
      "Capacity from the new line is already allocated for pilot programs entering mass production in Q3 2026. Partners planning 2027 volume are encouraged to lock forecasts with our planning team early.",
    ],
  },
  {
    slug: "sustainability-report-2025",
    title:
      "2025 Sustainability Report: recycled content reaches 38% across PET lines",
    date: "2025-11-06",
    category: "Sustainability",
    excerpt:
      "Annual reporting now covers fibre sourcing, factory energy mix and end-of-life programs — with third-party verified recycled content.",
    body: [
      "HAILAN has published its 2025 Sustainability Report, the company’s third annual disclosure covering material sourcing, factory operations and product end-of-life.",
      "Average verified recycled content across PET wall and carpet lines reached 38% in 2025, up from 31% the previous year, driven by expanded post-consumer bottle-flake supply agreements and the qualification of a second recycled-yarn source.",
      "On the operations side, rooftop photovoltaics now supply 22% of factory electricity, and a closed-loop water system on the calendering lines reduced process water intake by 17% year over year. All figures are verified by an independent third-party auditor.",
      "The full report, including FloorScore, REACH and fire-test documentation for every active product line, is available to partners on request — and ships as standard in every OEM compliance pack.",
    ],
  },
  {
    slug: "oem-sampling-studio",
    title: "HAILAN opens dedicated sampling studio for OEM partners",
    date: "2025-09-24",
    category: "Company",
    excerpt:
      "A 1,800 m² studio compresses decor development, pressing and photography into a single building — cutting sampling cycles to 7–10 days.",
    body: [
      "Huzhou — HAILAN has opened a dedicated 1,800 m² sampling studio at its Nanxun campus, consolidating decor development, small-batch pressing, CNC profiling and product photography into a single facility.",
      "The studio operates its own laboratory press and single-head tufting rig, allowing LVT, wall panel and carpet samples to be produced without interrupting mass-production lines. Standard sampling cycles now run 7–10 days from approved artwork to couriered sample.",
      "For private-label partners, the studio also produces retail-ready sample boards, folders and merchandising displays — matched to each brand’s artwork and shipped alongside first production orders.",
      "The investment reflects a simple observation: programs win or lose at the sampling stage. Giving development its own space, equipment and team removes the bottleneck between a partner’s idea and a factory-exact sample.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

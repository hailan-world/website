export type TextureKind = "lvt" | "wall" | "carpet";

export interface Product {
  slug: string;
  name: string;
  category: string;
  headline: string;
  short: string;
  description: string[];
  specs: { label: string; value: string }[];
  features: { title: string; text: string }[];
  applications: string[];
  formats: string[];
  compliance: string[];
  texture: TextureKind;
}

export const products: Product[] = [
  {
    slug: "lvt-flooring",
    name: "LVT Flooring",
    category: "Resilient Flooring",
    headline: "Commercial-grade resilient flooring, engineered plank by plank.",
    short:
      "Luxury vinyl tile and plank with high-definition decors, register embossing and wear layers built for demanding commercial traffic.",
    description: [
      "HAILAN LVT combines a dimensionally stable core, high-definition decor films and UV-cured wear layers into a floor that performs consistently — batch after batch, container after container. Every construction is calibrated on our own extrusion and lamination lines, giving partners full control over thickness, wear class and surface texture.",
      "Programs range from project-specific dry back ranges to click systems with integrated acoustic backing. Decor development is handled in-house: our design studio tracks European and North American interior trends and translates them into wood, stone and abstract visuals with matched embossing plates.",
    ],
    specs: [
      { label: "Total thickness", value: "2.0 – 8.0 mm" },
      { label: "Wear layer", value: "0.3 / 0.5 / 0.7 mm" },
      { label: "Plank sizes", value: "152 × 914 · 178 × 1219 · 229 × 1524 mm" },
      { label: "Tile sizes", value: "305 × 610 · 457 × 914 mm" },
      { label: "Surface", value: "EIR · deep embossed · smooth matte" },
      { label: "Bevel", value: "Micro · painted · pressed" },
      { label: "Installation", value: "Dry back · click · loose lay" },
      { label: "Fire rating", value: "EN 13501-1 Bfl-s1 · ASTM E648 Class 1" },
      { label: "Slip resistance", value: "DIN 51130 R9 – R10" },
    ],
    features: [
      {
        title: "Dimensional stability",
        text: "Annealed cores and controlled cooling keep planks flat through climate swings — verified against ISO 23999 on every production lot.",
      },
      {
        title: "Register embossing",
        text: "Embossing plates aligned to the decor film give surfaces the tactile depth of sawn oak, travertine and woven textile.",
      },
      {
        title: "Acoustic constructions",
        text: "Integrated IXPE or cork backing reduces impact sound by up to 19 dB for multi-storey residential and hospitality projects.",
      },
      {
        title: "Waterproof core",
        text: "SPC and dry back constructions are 100% waterproof, suited to wet rooms, entrances and coastal climates.",
      },
    ],
    applications: [
      "Retail chains",
      "Hospitality",
      "Healthcare",
      "Corporate offices",
      "Education",
      "Multi-family residential",
    ],
    formats: ["Dry back", "SPC click", "Loose lay", "Acoustic click"],
    compliance: ["CE · EN 14041", "FloorScore®", "REACH", "EN 13501-1 Bfl-s1"],
    texture: "lvt",
  },
  {
    slug: "pet-wall-coverings",
    name: "PET Wall Coverings",
    category: "Acoustic Wall Systems",
    headline: "Acoustic wall systems that turn noise into design.",
    short:
      "Polyester acoustic felt panels — flat sheets, slat systems and CNC-cut shapes — with up to 60% recycled content.",
    description: [
      "Our PET wall coverings are needle-punched and thermoformed from polyester fibre, a large share of it recovered from post-consumer bottles. The result is a rigid, colour-through acoustic panel that can be routed, wrapped and mounted without visible fixings — a favourite of architects specifying offices, schools and public interiors.",
      "HAILAN supplies the full system: flat sheets for direct mounting, finished slat panels on acoustic felt substrates, and CNC-cut geometries produced to project drawings. Colour development runs through our in-house fibre-dyeing partners, so brand programs can hold a palette across years of reorders.",
    ],
    specs: [
      { label: "Material", value: "100% polyester fibre (PET)" },
      { label: "Recycled content", value: "Up to 60% post-consumer" },
      { label: "Thickness", value: "9 / 12 / 24 mm" },
      { label: "Sheet size", value: "1220 × 2440 mm · custom cut" },
      { label: "Density", value: "≈ 1950 g/m² (9 mm)" },
      { label: "Acoustics", value: "NRC 0.40 – 0.85 (mounting dependent)" },
      { label: "Fire rating", value: "EN 13501-1 B-s1,d0 · ASTM E84 Class A" },
      { label: "Colours", value: "36 standard · custom on request" },
    ],
    features: [
      {
        title: "Engineered acoustics",
        text: "Fibre density and panel thickness are tuned to absorption targets, with ISO 354 test data available for every construction.",
      },
      {
        title: "Colour-through material",
        text: "Dyed fibre — not surface print — means edges, cuts and routed details show the same colour as the face.",
      },
      {
        title: "CNC fabrication",
        text: "In-house routing produces slats, perforations, bevels and project-specific geometries with clean, sealed edges.",
      },
      {
        title: "Circular material",
        text: "Each square metre of 12 mm panel diverts roughly 62 plastic bottles from landfill, documented in our sustainability reporting.",
      },
    ],
    applications: [
      "Open-plan offices",
      "Education",
      "Hospitality",
      "Media & broadcast rooms",
      "Public buildings",
      "Retail interiors",
    ],
    formats: ["Flat sheets", "Slat wall systems", "CNC-cut shapes", "Tiles & baffles"],
    compliance: ["ASTM E84 Class A", "EN 13501-1 B-s1,d0", "REACH", "ISO 354 tested"],
    texture: "wall",
  },
  {
    slug: "pet-carpet-coverings",
    name: "PET Carpet Coverings",
    category: "Modular Textile Flooring",
    headline: "Solution-dyed carpet surfaces built for heavy traffic.",
    short:
      "Modular carpet tiles and planks tufted from solution-dyed PET yarn — inherently stain-resistant, colourfast and specification-ready.",
    description: [
      "HAILAN carpet coverings are tufted from solution-dyed polyester yarn: colour is locked into the fibre itself, so tiles shrug off bleach, UV exposure and aggressive cleaning regimes that would fade conventional carpet. It is the construction global workplace brands specify when floors must look consistent for a decade.",
      "Modular formats — squares, planks and large-format tiles — install fast, replace selectively and ship efficiently. Backing options run from standard bitumen to our lighter PET-composite backing, which keeps a full container within road-weight limits in most markets.",
    ],
    specs: [
      { label: "Yarn", value: "Solution-dyed PET · 100% polyester" },
      { label: "Construction", value: "Tufted loop · cut pile · cut-loop" },
      { label: "Pile weight", value: "500 – 1000 g/m²" },
      { label: "Tile size", value: "500 × 500 mm" },
      { label: "Plank size", value: "250 × 1000 mm" },
      { label: "Backing", value: "Bitumen · PET-composite · cushion" },
      { label: "Fire rating", value: "EN 13501-1 Bfl-s1 · ASTM E648 Class 1" },
      { label: "Static", value: "≤ 2.0 kV (AATCC 134)" },
    ],
    features: [
      {
        title: "Inherent stain resistance",
        text: "Solution-dyed fibre carries no dye sites for stains to bond to — spills clean with water and standard maintenance.",
      },
      {
        title: "Colourfast for a decade",
        text: "Xenon-arc tested beyond 400 hours with negligible shift, keeping large floors uniform through years of partial replacement.",
      },
      {
        title: "Modular efficiency",
        text: "Tiles and planks cut installation waste below 4% and allow single-tile replacement in high-wear zones.",
      },
      {
        title: "Recycled yarn program",
        text: "Yarn lines with certified recycled PET content support project LEED and BREEAM documentation.",
      },
    ],
    applications: [
      "Corporate offices",
      "Co-working",
      "Hospitality",
      "Transport hubs",
      "Education",
      "Public administration",
    ],
    formats: ["Carpet tiles", "Carpet planks", "Custom tufted programs"],
    compliance: ["EN 13501-1 Bfl-s1", "ASTM E648 Class 1", "FloorScore®", "REACH"],
    texture: "carpet",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

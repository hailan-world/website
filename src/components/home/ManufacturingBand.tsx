import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

const pillars = [
  {
    n: "A",
    title: "Automated production",
    text: "25 extrusion, calendering and tufting lines run under MES tracking, with laser thickness gauging in-line — not after the fact.",
  },
  {
    n: "B",
    title: "In-line quality control",
    text: "Dimensional, surface and colour checks every production hour, recorded against the batch code that ships on every carton.",
  },
  {
    n: "C",
    title: "R&D and tooling",
    text: "In-house decor development, embossing plates and a laboratory press turn a partner’s idea into a factory-exact sample in days.",
  },
  {
    n: "D",
    title: "OEM capability",
    text: "A dedicated sampling studio and bilingual project managers carry private-label programs from first brief to loaded container.",
  },
];

const processSteps = [
  "Material preparation",
  "Extrusion & calendering",
  "Lamination & pressing",
  "UV curing",
  "Precision profiling",
  "100% inspection",
];

export function ManufacturingBand() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-36">
      <div
        className="pointer-events-none absolute -left-52 top-16 h-[30rem] w-[30rem] rounded-full bg-azure-600/10 blur-[150px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            on="dark"
            eyebrow="03 — Manufacturing excellence"
            title="Precision at industrial scale."
            lede="One integrated campus takes raw polymer and fibre through to finished, packed, batch-coded product — nothing critical is outsourced."
          />
          <Reveal delay={0.15} className="hidden pb-2 md:block">
            <ArrowLink href="/manufacturing" on="dark">
              Inside our manufacturing
            </ArrowLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.09}>
              <div className="border-t border-white/12 pt-7">
                <span className="font-mono text-[11px] tracking-[0.22em] text-azure-300">
                  {pillar.n}
                </span>
                <h3 className="mt-4 text-lg font-medium tracking-[-0.01em]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-300">
                  {pillar.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 md:hidden">
          <ArrowLink href="/manufacturing" on="dark">
            Inside our manufacturing
          </ArrowLink>
        </Reveal>
      </Container>

      {/* production-line ticker */}
      <div className="relative mt-20 border-y border-white/10 py-5" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap pl-10">
          {[...processSteps, ...processSteps].map((step, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.28em] text-ink-300"
            >
              {step}
              <span className="h-1.5 w-1.5 rotate-45 bg-azure-500/70" />
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">
        Production process: {processSteps.join(", ")}.
      </p>
    </section>
  );
}

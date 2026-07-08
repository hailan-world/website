import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "Manufacturing",
  description:
    "Inside HAILAN's 120,000 m² integrated campus: 25 production lines, MES-tracked automation and in-line quality control from raw polymer to batch-coded, export-packed product.",
};

const capabilities = [
  {
    value: stats.facility,
    suffix: " m²",
    label: "Integrated production campus",
  },
  { value: stats.lines, suffix: "", label: "Extrusion, calendering & tufting lines" },
  { value: stats.capacity, suffix: "M m²", label: "Annual production capacity" },
  { value: 24, suffix: "/7", label: "MES-monitored operation" },
];

const processSteps = [
  {
    step: "01",
    title: "Material preparation",
    text: "Virgin and certified-recycled polymer, plasticiser, stabiliser and fibre are batched by recipe, with every incoming lot tested against specification before release to production.",
  },
  {
    step: "02",
    title: "Extrusion & calendering",
    text: "Twin-screw extruders and four-roll calenders form core and wear layers to tolerance, with in-line laser thickness gauging feeding corrections back to the line in real time.",
  },
  {
    step: "03",
    title: "Lamination & pressing",
    text: "Decor film, wear layer and core are bonded under heat and pressure. Register-embossing plates align surface texture to the printed decor for natural depth.",
  },
  {
    step: "04",
    title: "Surface treatment & UV curing",
    text: "Polyurethane coatings are applied and UV-cured to the gloss level and scratch resistance each program specifies — matte to satin, verified by gloss meter every hour.",
  },
  {
    step: "05",
    title: "Precision profiling",
    text: "CNC double-end tenoners cut click profiles, bevels and formats to ±0.15 mm. PET panels move through routing cells for slats, perforations and project geometries.",
  },
  {
    step: "06",
    title: "Inspection, packing & loading",
    text: "Every piece passes visual and dimensional inspection before batch-coded cartons are palletised, load-planned and containerised — photographed at every loading stage.",
  },
];

const automation = [
  {
    title: "MES production tracking",
    text: "Every order is tracked through the manufacturing execution system from raw material lot to container number — the same data partners see in shipment documentation.",
  },
  {
    title: "In-line measurement",
    text: "Laser thickness gauges, colour spectrophotometers and vision systems measure continuously during production, not on samples after the fact.",
  },
  {
    title: "Automated handling",
    text: "Robotic palletising and AGV transfer between lines reduce handling damage and keep surface quality consistent through packing.",
  },
  {
    title: "Energy & water systems",
    text: "Rooftop photovoltaics supply 22% of electricity; a closed-loop system on the calendering lines cut process water intake by 17% year over year.",
  },
];

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title="From raw polymer to loaded container. One campus."
        lede="Nothing critical is outsourced. Extrusion, lamination, tufting, profiling, inspection and packing all happen on one MES-tracked site in Huzhou — which is why the hundredth container matches the first."
      />

      {/* Capability stats */}
      <section className="py-20 md:py-28">
        <Container>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {capabilities.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <dd className="text-4xl font-medium tracking-[-0.02em] text-ink-950 md:text-[2.75rem]">
                  <Counter value={item.value} />
                  <span className="text-azure-600">{item.suffix}</span>
                </dd>
                <dt className="mt-2.5 max-w-[16rem] text-sm text-mist-500">
                  {item.label}
                </dt>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-mist-50 py-24 md:py-32">
        <Container>
          <SectionHead
            eyebrow="The line"
            title="Six stages. Zero handoffs outside our control."
            lede="Each stage feeds measurement data forward to the next — so problems are corrected at the source, not discovered at inspection."
          />
          <ol className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.07}>
                <li className="border-t border-ink-950/10 pt-7">
                  <span className="font-mono text-[11px] tracking-[0.22em] text-azure-600">
                    {step.step}
                  </span>
                  <h3 className="mt-4 text-lg font-medium tracking-[-0.01em] text-ink-950">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist-600">
                    {step.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Automation */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-32">
        <div
          className="pointer-events-none absolute -right-56 top-10 h-[32rem] w-[32rem] rounded-full bg-azure-600/10 blur-[150px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />
        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <SectionHead
                on="dark"
                eyebrow="Automation"
                title="Machines measure. People decide."
                lede="Automation at HAILAN is not about removing people — it is about removing variance. Instruments watch every metre of production so our engineers can act on data, not guesswork."
              />
              <Reveal delay={0.2}>
                <ArrowLink href="/quality" on="dark" className="mt-10">
                  How we control quality
                </ArrowLink>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
                {automation.map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.08}>
                    <div className="border-t border-white/12 pt-7">
                      <h3 className="text-lg font-medium tracking-[-0.01em]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-ink-300">
                        {item.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Export logistics */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHead
                eyebrow="Export logistics"
                title="Engineered up to the ship's rail."
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                Manufacturing excellence means nothing if the container arrives
                late or damaged. Our logistics team load-plans every shipment
                for weight limits and mixed-product programs, produces
                destination-correct export documentation, and photographs each
                loading stage. Shanghai and Ningbo ports are within three hours
                of the campus.
              </p>
              <ul className="mt-8 grid gap-3 text-[15px] text-mist-600 sm:grid-cols-2">
                {[
                  "Container mixing across product lines",
                  "Road-weight-optimised load plans",
                  "Destination-specific documentation",
                  "98.6% on-time shipment record",
                ].map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-azure-600" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Audit us. Seriously."
        lede="The fastest way to trust a factory is to walk it. We host partner audits and factory visits year-round — or start with a live video tour."
        cta="Arrange a factory visit"
      />
    </>
  );
}

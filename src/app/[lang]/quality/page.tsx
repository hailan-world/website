import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { certifications } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quality",
  description:
    "One quality system governs every HAILAN line: incoming material testing, hourly in-line checks, laboratory verification and full batch traceability from raw material lot to container.",
};

const gates = [
  {
    step: "Gate 01",
    title: "Incoming materials",
    text: "Every lot of polymer, film, yarn and additive is sampled and tested against purchase specification before release. Non-conforming lots are quarantined and returned — they never reach a line.",
  },
  {
    step: "Gate 02",
    title: "In-line, every hour",
    text: "Thickness, dimensions, colour delta-E, gloss and surface quality are measured hourly on every running line and logged against the batch code. Drift triggers correction at the machine, not at final inspection.",
  },
  {
    step: "Gate 03",
    title: "Laboratory verification",
    text: "Our on-site laboratory runs wear, dimensional stability, curl, peel strength, acoustic and colourfastness tests on every production batch — to the same ISO, EN and ASTM methods third-party labs use.",
  },
  {
    step: "Gate 04",
    title: "Pre-shipment inspection",
    text: "Finished goods are inspected to AQL 2.5 before packing, and again at container loading with photographic records. Partners receive inspection data with their shipping documents.",
  },
];

const labTests = [
  { test: "Abrasion & wear resistance", standard: "EN 660 · ASTM F510" },
  { test: "Dimensional stability & curl", standard: "ISO 23999 · EN 434" },
  { test: "Residual indentation", standard: "ISO 24343-1" },
  { test: "Colour fastness to light", standard: "ISO 105-B02 (xenon-arc)" },
  { test: "Reaction to fire", standard: "EN 13501-1 · ASTM E648 / E84" },
  { test: "Sound absorption (PET panels)", standard: "ISO 354 · ASTM C423" },
  { test: "Impact sound reduction", standard: "ISO 10140-3" },
  { test: "VOC emissions", standard: "FloorScore® · ISO 16000" },
  { test: "Slip resistance", standard: "DIN 51130 · EN 13893" },
  { test: "Peel & bond strength", standard: "EN 431 · ISO 24345" },
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality"
        title="The hundredth container must match the first sample."
        lede="That single sentence is our entire quality philosophy. Everything on this page — the gates, the laboratory, the traceability — exists to make it true, shipment after shipment."
      />

      {/* Four gates */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHead
            eyebrow="The system"
            title="Four gates between raw material and your warehouse."
            lede="Quality is not a department that inspects at the end. It is a series of gates a product must pass through — and each gate keeps records."
          />
          <div className="mt-16 grid gap-x-14 gap-y-14 md:grid-cols-2">
            {gates.map((gate, i) => (
              <Reveal key={gate.step} delay={i * 0.08}>
                <div className="border-t border-ink-950/10 pt-8">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-azure-600">
                    {gate.step}
                  </span>
                  <h3 className="mt-4 text-xl font-medium tracking-[-0.01em] text-ink-950">
                    {gate.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist-600">
                    {gate.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Laboratory */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-32">
        <div
          className="pointer-events-none absolute -left-52 top-16 h-[30rem] w-[30rem] rounded-full bg-azure-600/10 blur-[64px] md:blur-[150px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />
        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <SectionHead
                on="dark"
                eyebrow="On-site laboratory"
                title="Tested to the methods your market regulates."
                lede="Our laboratory runs the same ISO, EN and ASTM procedures as the certification bodies — so third-party results never surprise us, or you."
              />
            </div>
            <Reveal delay={0.15} className="lg:col-span-7">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Laboratory tests and their reference standards
                </caption>
                <thead>
                  <tr className="border-b border-white/15">
                    <th
                      scope="col"
                      className="pb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-400"
                    >
                      Test
                    </th>
                    <th
                      scope="col"
                      className="pb-4 text-right font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-400"
                    >
                      Method
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {labTests.map((row) => (
                    <tr key={row.test} className="border-b border-white/8">
                      <td className="py-3.5 pr-6 text-[15px]">{row.test}</td>
                      <td className="py-3.5 text-right font-mono text-[12px] tracking-[0.04em] text-ink-300">
                        {row.standard}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Traceability */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHead
                eyebrow="Traceability"
                title="Every carton answers for itself."
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                Every carton HAILAN ships carries a batch code that resolves —
                inside our MES — to the raw material lots, the production line,
                the shift, the in-line measurements and the laboratory results
                behind it. If a partner ever raises a claim, we answer with
                data within 48 hours, not with opinions.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-mist-600">
                The same records feed our continuous improvement loop: claim
                rates, first-pass yield and colour consistency are reviewed
                weekly by the same engineers who run the lines.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="bg-mist-50 py-24 md:py-32">
        <Container>
          <SectionHead
            eyebrow="Certifications"
            title="Documentation that clears customs and specifications."
            lede="Certificates are maintained continuously and shipped as a compliance pack with every program — ready for importers, specifiers and retail chains."
            align="center"
            className="mx-auto"
          />
          <Reveal className="mt-12">
            <ul
              className="flex flex-wrap justify-center gap-3"
              aria-label="Certifications and standards"
            >
              {certifications.map((c) => (
                <li key={c}>
                  <Chip className="px-5 py-2.5 text-[13px]">{c}</Chip>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title="Request our compliance pack."
        lede="Test reports, certificates and technical data sheets for any product line — organised by destination market, delivered within one business day."
        cta="Request documentation"
      />
    </>
  );
}

import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

export const metadata: Metadata = {
  title: "OEM / ODM",
  description:
    "Private-label and custom development programs for flooring and acoustic surfaces: in-house decor development, 7–10 day sampling, retail-ready packaging and full compliance packs.",
};

const steps = [
  {
    step: "01",
    title: "Brief & feasibility",
    text: "Share your market, price position, target constructions and volumes. Within days you receive a feasibility read: what we recommend, what it costs and how fast it ships.",
    meta: "2–5 days",
  },
  {
    step: "02",
    title: "Decor & construction development",
    text: "Our design studio develops decors, colourways and surface textures to your brand direction — or engineers your existing range for better cost and performance.",
    meta: "1–2 weeks",
  },
  {
    step: "03",
    title: "Sampling",
    text: "The dedicated sampling studio produces factory-exact samples on laboratory equipment — the construction you approve is the construction that ships.",
    meta: "7–10 days",
  },
  {
    step: "04",
    title: "Pilot production",
    text: "A pilot run validates the construction at line speed. You receive pilot samples, full lab results and final packaging proofs before committing to volume.",
    meta: "2–3 weeks",
  },
  {
    step: "05",
    title: "Mass production",
    text: "Production is scheduled against your forecast, tracked in MES and inspected at every gate. Standard lead times run 25–35 days from order confirmation.",
    meta: "25–35 days",
  },
  {
    step: "06",
    title: "Logistics & reorders",
    text: "Load-planned containers, destination-correct documents and photographed loading. Running programs hold safety stock and tooling for fast reorders.",
    meta: "Ongoing",
  },
];

const services = [
  {
    title: "Private-label manufacturing",
    text: "Your brand, your packaging, your specifications — produced under our quality system. From carton artwork to display boards, everything ships retail-ready.",
  },
  {
    title: "Custom product development",
    text: "New constructions, thicknesses, formats and acoustic targets engineered to your market's price point — with our tooling, film library and fibre suppliers behind it.",
  },
  {
    title: "Decor & colour studio",
    text: "In-house designers track European and North American interior trends and translate them into wood, stone, textile and abstract decors exclusive to your program.",
  },
  {
    title: "Merchandising & sampling",
    text: "Sample boards, folders, chain sets and shop displays produced in the same studio as the product — matched to your artwork and shipped with first orders.",
  },
  {
    title: "Compliance ownership",
    text: "We maintain the certificates your market demands — CE, FloorScore®, REACH, fire classification — and ship a complete compliance pack with every program.",
  },
  {
    title: "Program management",
    text: "One English-speaking project manager owns your program from brief to reorder, with a 24-hour response commitment and full visibility into production status.",
  },
];

const assurances = [
  "Your designs and decors remain your property — exclusivity is contractual",
  "Transparent constructions: full material specifications disclosed",
  "Pilot approval before any volume commitment",
  "Safety stock and tooling reserved for running programs",
];

export default function OemOdmPage() {
  return (
    <>
      <PageHero
        eyebrow="OEM / ODM"
        title="Your brand. Our factory. One accountable partner."
        lede="Most of what HAILAN produces carries our partners' names. Private-label and custom development are not a side business — they are the business, with a studio, team and process built specifically for it."
      />

      {/* Process */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHead
            eyebrow="The program path"
            title="From first brief to loaded container in six steps."
            lede="Every step has a named owner, a deliverable and a timeline — so you always know where your program stands."
          />
          <ol className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.07}>
                <li className="flex h-full flex-col border-t border-ink-950/10 pt-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-[11px] tracking-[0.22em] text-azure-600">
                      {s.step}
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-mist-400">
                      {s.meta}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-medium tracking-[-0.01em] text-ink-950">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist-600">
                    {s.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Services */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-32">
        <div
          className="pointer-events-none absolute -right-56 top-10 h-[32rem] w-[32rem] rounded-full bg-azure-600/10 blur-[64px] md:blur-[150px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />
        <Container className="relative">
          <SectionHead
            on="dark"
            eyebrow="What we take off your plate"
            title="Everything between your idea and your warehouse."
          />
          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.07}>
                <div className="border-t border-white/12 pt-7">
                  <h3 className="text-lg font-medium tracking-[-0.01em]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-300">
                    {service.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Assurances */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHead
                eyebrow="Partnership terms"
                title="Built on protections, not promises."
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                A private-label relationship only works when the brand owner is
                protected. These commitments are written into every OEM and ODM
                agreement we sign:
              </p>
              <ul className="mt-8 space-y-4">
                {assurances.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-[15px] leading-relaxed text-mist-600"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-azure-600"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Bring us your next range."
        lede="A construction target, a competitor sample or just a price point — that's enough to start. Feasibility feedback within days, samples within two weeks."
        cta="Start an OEM conversation"
      />
    </>
  );
}

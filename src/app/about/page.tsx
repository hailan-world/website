import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { certifications, site, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "HAILAN — Hailan New Materials Co., Ltd. — is a global decorative building materials manufacturer supplying LVT flooring, PET wall coverings and PET carpet coverings to partners in 60+ countries.",
};

const values = [
  {
    title: "Engineering first",
    text: "Every product decision starts on the production line, not the brochure. If a construction cannot be manufactured consistently at scale, we do not sell it.",
  },
  {
    title: "Radical reliability",
    text: "Partners plan seasons, store openings and project schedules around our confirmations. We treat a confirmed date as a contract — 98.6% of containers ship on time.",
  },
  {
    title: "Design fluency",
    text: "We read the same trend reports, visit the same fairs and track the same architecture press as our customers — so decor development speaks their language.",
  },
  {
    title: "Long-term partnership",
    text: "Our oldest export programs have run for over a decade. We price, plan and invest for relationships measured in years, not purchase orders.",
  },
];

const milestones = [
  {
    year: "2008",
    title: "Founded in Huzhou",
    text: "Hailan New Materials is established in Zhejiang's flooring cluster, producing resilient flooring for domestic projects.",
  },
  {
    year: "2012",
    title: "First export programs",
    text: "The first dedicated export lines ship LVT to European importers; an international sales and documentation team is built.",
  },
  {
    year: "2016",
    title: "SPC & click systems",
    text: "Investment in extrusion and profiling lines adds rigid-core SPC and click constructions to the flooring portfolio.",
  },
  {
    year: "2019",
    title: "PET acoustic line",
    text: "A needle-punch and thermoforming line brings PET acoustic wall panels into production, opening the architectural specification market.",
  },
  {
    year: "2021",
    title: "Campus expansion",
    text: "The Nanxun campus grows to 120,000 m², consolidating flooring, wall and warehouse operations on a single site.",
  },
  {
    year: "2023",
    title: "Carpet coverings launch",
    text: "Tufting lines for solution-dyed PET carpet tiles and planks complete the floor-and-wall interior offer.",
  },
  {
    year: "2025",
    title: "OEM sampling studio",
    text: "A dedicated 1,800 m² studio compresses decor development and sampling cycles to 7–10 days for private-label partners.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About HAILAN"
        title="A factory that thinks like a brand."
        lede={`${site.legalName} designs, manufactures and exports decorative building materials from an integrated campus in Huzhou, China — for partners who put their own name on the box.`}
      />

      {/* Story */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHead
                eyebrow="Our story"
                title="Built in the world's densest flooring cluster."
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                HAILAN was founded in {site.founded} in Huzhou, Zhejiang — a
                region that produces a remarkable share of the world&apos;s
                resilient flooring. Growing up inside that cluster shaped us:
                suppliers, toolmakers and testing labs are minutes away, and the
                bar for manufacturing competence is set by neighbours who export
                to every continent.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-mist-600">
                From the beginning we chose a narrower, deeper path than most:
                fewer product categories, engineered properly, produced on our
                own lines and documented to the standards of the strictest
                destination market. First LVT flooring, then PET acoustic wall
                coverings, then PET carpet coverings — three surfaces, one
                quality system.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-mist-600">
                Today our products are installed in offices, hotels, schools and
                homes in more than {stats.countries} countries — usually under
                our partners&apos; brands. That is by design. HAILAN&apos;s
                ambition is to be the most dependable manufacturer behind the
                world&apos;s decorative building material brands, and
                increasingly, a brand worth asking for by name.
              </p>
            </Reveal>
          </div>

          <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-ink-950/10 pt-12 lg:grid-cols-4">
            {[
              { value: site.founded, label: "Founded", raw: true },
              { value: stats.facility, suffix: " m²", label: "Production campus" },
              { value: stats.lines, suffix: "", label: "Production lines" },
              { value: stats.team, suffix: "+", label: "Specialists & engineers" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <dd className="text-4xl font-medium tracking-[-0.02em] text-ink-950 md:text-[2.75rem]">
                  {"raw" in item && item.raw ? (
                    String(item.value)
                  ) : (
                    <>
                      <Counter value={item.value} />
                      <span className="text-azure-600">{item.suffix}</span>
                    </>
                  )}
                </dd>
                <dt className="mt-2.5 text-sm text-mist-500">{item.label}</dt>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-mist-50 py-24 md:py-32">
        <Container>
          <SectionHead
            eyebrow="How we work"
            title="Four principles govern every program."
            lede="They are not wall posters. They are the operating rules our partners experience in every quotation, sample and container."
          />
          <div className="mt-16 grid gap-x-14 gap-y-14 md:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <div className="flex gap-7 border-t border-ink-950/10 pt-8">
                  <span
                    className="select-none text-[2.6rem] font-medium leading-none tracking-[-0.03em] text-mist-300"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.01em] text-ink-950">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-mist-600">
                      {value.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-32">
        <div
          className="pointer-events-none absolute -left-52 top-24 h-[30rem] w-[30rem] rounded-full bg-azure-600/10 blur-[150px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />
        <Container className="relative">
          <SectionHead
            on="dark"
            eyebrow="Milestones"
            title="Eighteen years of deliberate growth."
          />
          <ol className="mt-16">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.05}>
                <li className="grid gap-3 border-t border-white/10 py-8 md:grid-cols-[8rem_16rem_1fr] md:gap-8">
                  <span className="font-mono text-sm tracking-[0.18em] text-azure-300">
                    {m.year}
                  </span>
                  <h3 className="text-lg font-medium tracking-[-0.01em]">
                    {m.title}
                  </h3>
                  <p className="max-w-xl text-[15px] leading-relaxed text-ink-300">
                    {m.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Certifications strip */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHead
                eyebrow="Compliance"
                title="Certified for the strictest destination."
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                Every product line is developed against the regulatory
                requirements of the European Union, North America and the Gulf
                — then documented so partners can specify, import and install
                without friction.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Certifications">
                {certifications.map((c) => (
                  <li key={c}>
                    <Chip>{c}</Chip>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Meet the team behind the label."
        lede="Visit our campus in Huzhou, meet us at the next trade fair, or start with a conversation about your program."
      />
    </>
  );
}

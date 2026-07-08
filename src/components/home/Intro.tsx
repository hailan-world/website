import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { stats } from "@/lib/site";

const statItems = [
  { value: stats.countries, suffix: "+", label: "Export countries" },
  { value: stats.facility, suffix: " m²", label: "Production campus" },
  { value: stats.capacity, suffix: "M m²", label: "Annual capacity" },
  { value: stats.team, suffix: "+", label: "Specialists & engineers" },
];

export function Intro() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>01 — Who we are</Eyebrow>
            <h2 className="mt-5 text-balance text-[2rem] font-medium leading-[1.12] tracking-[-0.02em] text-ink-950 md:text-[2.75rem] md:leading-[1.08]">
              A manufacturing partner built for global brands.
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-mist-600">
              HAILAN is a global decorative building materials manufacturer
              headquartered in Huzhou, China — home to one of the world’s
              densest flooring production clusters. From a single integrated
              campus, we develop, produce and export LVT flooring, PET acoustic
              wall coverings and PET carpet coverings.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-mist-600">
              Our products carry other people’s names as often as our own. For
              importers, retail chains and home-improvement brands on every
              continent, HAILAN is the quiet capability behind the label:
              stable quality, honest lead times and a team that treats your
              program like its own.
            </p>
            <ArrowLink href="/about" className="mt-9">
              More about HAILAN
            </ArrowLink>
          </Reveal>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-ink-950/10 pt-12 lg:grid-cols-4">
          {statItems.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <dd className="text-4xl font-medium tracking-[-0.02em] text-ink-950 md:text-[2.75rem]">
                <Counter value={item.value} />
                <span className="text-azure-600">{item.suffix}</span>
              </dd>
              <dt className="mt-2.5 text-sm text-mist-500">{item.label}</dt>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}

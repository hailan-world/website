import { WorldMap } from "@/components/graphics/WorldMap";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const figureValues = [
  { value: 60, suffix: "+" },
  { value: 6, suffix: "" },
  { value: 2400, suffix: "+" },
];

export function GlobalMarkets({ dict }: { dict: Dictionary }) {
  const t = dict.markets;

  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-36">
      <div
        className="pointer-events-none absolute -right-64 top-0 h-[36rem] w-[36rem] rounded-full bg-azure-600/10 blur-[150px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />

      <Container className="relative">
        <SectionHead on="dark" eyebrow={t.eyebrow} title={t.title} lede={t.lede} />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1.55fr_1fr]">
          <Reveal>
            <WorldMap className="h-auto w-full" />
          </Reveal>

          <div>
            {t.regions.map((region, i) => (
              <Reveal key={region.name} delay={i * 0.06}>
                <div className="flex items-baseline justify-between gap-6 border-b border-white/10 py-4.5">
                  <h3 className="text-[15px] font-medium">{region.name}</h3>
                  <p className="text-end font-mono text-[10.5px] tracking-[0.06em] text-ink-300">
                    {region.markets}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-10 border-t border-white/10 pt-12 sm:grid-cols-3">
          {t.figures.map((figure, i) => (
            <Reveal key={figure.label} delay={i * 0.08}>
              <dd className="text-4xl font-medium tracking-[-0.02em]">
                <Counter value={figureValues[i].value} />
                <span className="text-azure-300">{figureValues[i].suffix}</span>
              </dd>
              <dt className="mt-2 text-sm text-ink-300">{figure.label}</dt>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}

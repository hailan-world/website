import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { certifications, site, stats } from "@/lib/site";
import { getDictionary } from "../dictionaries";

interface AboutPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.about.meta.title,
    description: dict.about.meta.description,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const t = dict.about;

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lede={t.hero.lede}
      />

      {/* Story */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHead eyebrow={t.story.eyebrow} title={t.story.title} />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                {t.story.para1}
              </p>
              <p className="mt-6 text-lg leading-relaxed text-mist-600">
                {t.story.para2}
              </p>
              <p className="mt-6 text-lg leading-relaxed text-mist-600">
                {t.story.para3}
              </p>
            </Reveal>
          </div>

          <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-ink-950/10 pt-12 lg:grid-cols-4">
            {[
              { value: site.founded, label: t.story.stats.founded, raw: true },
              { value: stats.facility, suffix: " m²", label: t.story.stats.facility },
              { value: stats.lines, suffix: "", label: t.story.stats.lines },
              { value: stats.team, suffix: "+", label: t.story.stats.team },
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
            eyebrow={t.values.eyebrow}
            title={t.values.title}
            lede={t.values.lede}
          />
          <div className="mt-16 grid gap-x-14 gap-y-14 md:grid-cols-2">
            {t.values.items.map((value, i) => (
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
          className="pointer-events-none absolute -left-52 top-24 h-[30rem] w-[30rem] rounded-full bg-azure-600/10 blur-[64px] md:blur-[150px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />
        <Container className="relative">
          <SectionHead
            on="dark"
            eyebrow={t.timeline.eyebrow}
            title={t.timeline.title}
          />
          <ol className="mt-16">
            {t.timeline.items.map((m, i) => (
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
                eyebrow={t.compliance.eyebrow}
                title={t.compliance.title}
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                {t.compliance.text}
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

      <CtaBand title={t.cta.title} lede={t.cta.lede} cta={dict.cta.button} />
    </>
  );
}

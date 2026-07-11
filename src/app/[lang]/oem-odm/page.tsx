import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { getDictionary } from "../dictionaries";

interface OemOdmPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: OemOdmPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.oemOdmPage.meta.title,
    description: dict.oemOdmPage.meta.description,
  };
}

export default async function OemOdmPage({ params }: OemOdmPageProps) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const t = dict.oemOdmPage;

  const steps = t.process.steps.map((s, i) => ({
    step: String(i + 1).padStart(2, "0"),
    title: s.title,
    text: s.text,
    meta: s.meta,
  }));

  const services = t.services.items;
  const assurances = t.assurances.points;

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lede={t.hero.lede} />

      {/* Process */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHead
            eyebrow={t.process.eyebrow}
            title={t.process.title}
            lede={t.process.lede}
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
            eyebrow={t.services.eyebrow}
            title={t.services.title}
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
                eyebrow={t.assurances.eyebrow}
                title={t.assurances.title}
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                {t.assurances.intro}
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

      <CtaBand title={t.cta.title} lede={t.cta.lede} cta={t.cta.button} />
    </>
  );
}

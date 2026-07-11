import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { stats } from "@/lib/site";
import { getDictionary } from "../dictionaries";

interface ManufacturingPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: ManufacturingPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.manufacturingPage.meta.title,
    description: dict.manufacturingPage.meta.description,
  };
}

export default async function ManufacturingPage({
  params,
}: ManufacturingPageProps) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const t = dict.manufacturingPage;

  const capabilities = [
    { value: stats.facility, suffix: " m²", label: t.capabilities[0] },
    { value: stats.lines, suffix: "", label: t.capabilities[1] },
    { value: stats.capacity, suffix: "M m²", label: t.capabilities[2] },
    { value: 24, suffix: "/7", label: t.capabilities[3] },
  ];

  const processSteps = t.process.steps.map((step, i) => ({
    step: String(i + 1).padStart(2, "0"),
    title: step.title,
    text: step.text,
  }));

  const automation = t.automation.items;

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lede={t.hero.lede} />

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
            eyebrow={t.process.eyebrow}
            title={t.process.title}
            lede={t.process.lede}
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
          className="pointer-events-none absolute -right-56 top-10 h-[32rem] w-[32rem] rounded-full bg-azure-600/10 blur-[64px] md:blur-[150px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />
        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <SectionHead
                on="dark"
                eyebrow={t.automation.eyebrow}
                title={t.automation.title}
                lede={t.automation.lede}
              />
              <Reveal delay={0.2}>
                <ArrowLink href="/quality" on="dark" className="mt-10">
                  {t.automation.link}
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
                eyebrow={t.logistics.eyebrow}
                title={t.logistics.title}
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                {t.logistics.text}
              </p>
              <ul className="mt-8 grid gap-3 text-[15px] text-mist-600 sm:grid-cols-2">
                {t.logistics.points.map((point) => (
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

      <CtaBand title={t.cta.title} lede={t.cta.lede} cta={t.cta.button} />
    </>
  );
}

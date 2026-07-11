import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { certifications } from "@/lib/site";
import { getDictionary } from "../dictionaries";

interface QualityPageProps {
  params: Promise<{ lang: string }>;
}

// Reference standards are universal codes — not localized.
const labStandards = [
  "EN 660 · ASTM F510",
  "ISO 23999 · EN 434",
  "ISO 24343-1",
  "ISO 105-B02 (xenon-arc)",
  "EN 13501-1 · ASTM E648 / E84",
  "ISO 354 · ASTM C423",
  "ISO 10140-3",
  "FloorScore® · ISO 16000",
  "DIN 51130 · EN 13893",
  "EN 431 · ISO 24345",
];

export async function generateMetadata({
  params,
}: QualityPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.qualityPage.meta.title,
    description: dict.qualityPage.meta.description,
  };
}

export default async function QualityPage({ params }: QualityPageProps) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const t = dict.qualityPage;

  const gates = t.gates.items.map((gate, i) => ({
    step: `${t.gates.gateLabel} ${String(i + 1).padStart(2, "0")}`,
    title: gate.title,
    text: gate.text,
  }));

  const labTests = t.lab.tests.map((test, i) => ({
    test,
    standard: labStandards[i],
  }));

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lede={t.hero.lede} />

      {/* Four gates */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHead
            eyebrow={t.gates.eyebrow}
            title={t.gates.title}
            lede={t.gates.lede}
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
                eyebrow={t.lab.eyebrow}
                title={t.lab.title}
                lede={t.lab.lede}
              />
            </div>
            <Reveal delay={0.15} className="lg:col-span-7">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">{t.lab.caption}</caption>
                <thead>
                  <tr className="border-b border-white/15">
                    <th
                      scope="col"
                      className="pb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-400"
                    >
                      {t.lab.colTest}
                    </th>
                    <th
                      scope="col"
                      className="pb-4 text-right font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-400"
                    >
                      {t.lab.colMethod}
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
                eyebrow={t.trace.eyebrow}
                title={t.trace.title}
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                {t.trace.para1}
              </p>
              <p className="mt-6 text-lg leading-relaxed text-mist-600">
                {t.trace.para2}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="bg-mist-50 py-24 md:py-32">
        <Container>
          <SectionHead
            eyebrow={t.certs.eyebrow}
            title={t.certs.title}
            lede={t.certs.lede}
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

      <CtaBand title={t.cta.title} lede={t.cta.lede} cta={t.cta.button} />
    </>
  );
}

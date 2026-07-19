import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  getLvtPilot,
  type LvtPilotLocale,
} from "@/lib/content/lvt-pilot";

export const metadata: Metadata = {
  title: "LVT CMS Pilot",
  description: "Preview-only bilingual CMS workflow test.",
  robots: { index: false, follow: false },
};

function isPilotLocale(locale: string): locale is LvtPilotLocale {
  return locale === "en" || locale === "zh";
}

function pilotIsVisible() {
  return (
    process.env.NODE_ENV !== "production" ||
    process.env.VERCEL_ENV === "preview"
  );
}

export default async function LvtPilotPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  await connection();

  const { lang } = await params;
  if (!pilotIsVisible() || !isPilotLocale(lang)) notFound();

  const content = getLvtPilot(lang);
  if (!content) notFound();

  const copy =
    lang === "zh"
      ? {
          eyebrow: "CMS 试点 · 不对外发布",
          overview: "试点说明",
          specs: "测试字段",
          evidence: "审核记录",
          noApproval: "尚未批准",
          productLink: "返回已核实公开信息页",
        }
      : {
          eyebrow: "CMS pilot · not for publication",
          overview: "Pilot overview",
          specs: "Test fields",
          evidence: "Review record",
          noApproval: "Not approved yet",
          productLink: "Return to verified public information",
        };

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={content.title}
        lede={content.headline}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-7">
              <Eyebrow>{copy.overview}</Eyebrow>
              <p className="mt-5 text-xl leading-relaxed text-ink-950">
                {content.short}
              </p>
              {content.description.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-5 text-[16px] leading-relaxed text-mist-600"
                >
                  {paragraph}
                </p>
              ))}
              <div className="mt-8 flex flex-wrap gap-2">
                {content.formats.map((format) => (
                  <Chip key={format}>{format}</Chip>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-5">
              <div className="rounded-2xl border border-ink-950/10 bg-mist-50 p-7 md:p-9">
                <Eyebrow>{copy.specs}</Eyebrow>
                <dl className="mt-5 divide-y divide-ink-950/8">
                  {content.specs.map((spec) => (
                    <div key={spec.label} className="py-4">
                      <dt className="text-sm text-mist-500">{spec.label}</dt>
                      <dd className="mt-1 text-sm font-medium text-ink-950">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 border-t border-ink-950/10 pt-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-500">
                    {copy.evidence}
                  </p>
                  <p className="mt-2 text-sm text-ink-950">
                    {content.approvedBy || copy.noApproval}
                  </p>
                  {content.approvalReference && (
                    <p className="mt-1 text-sm text-mist-600">
                      {content.approvalReference}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-12 border-t border-ink-950/10 pt-8">
            <a
              href={`/verified/${lang}`}
              className="text-sm font-medium text-azure-600 hover:text-azure-700"
            >
              {copy.productLink} →
            </a>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

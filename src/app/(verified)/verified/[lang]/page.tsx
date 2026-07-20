import type { CSSProperties } from "react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Logo } from "@/components/graphics/Logo";
import { verifiedSite } from "@/lib/verified-site";

type PublicLocale = "en" | "zh" | "ru";

const languageLinks = [
  { locale: "en", label: "EN", hrefLang: "en" },
  { locale: "zh", label: "中文", hrefLang: "zh-CN" },
  { locale: "ru", label: "RU", hrefLang: "ru" },
] as const;

/**
 * The three product lines below (LVT flooring, polyester carpet, PET wall
 * materials) and their primary materials were confirmed by the company
 * owner on 2026-07-20. Do not expand these entries with specifications,
 * certifications or export
 * claims without a separate source and approval reference.
 */
const copy = {
  en: {
    metaTitle: "HAILAN — Materials manufacturing and B2B supply",
    metaDescription:
      "HAILAN serves business customers through materials manufacturing, product supply and related technical services from Jinhua, China.",
    languageLabel: "Language",
    eyebrow: "Jinhua · China",
    title: "Materials manufacturing and supply for business.",
    intro:
      "Established in Jinhua in 2020, HAILAN works with business customers across materials manufacturing, product supply and related technical services.",
    primaryAction: "Start a business enquiry",
    secondaryAction: "Meet our commercial director",
    factsTitle: "Company profile",
    facts: [
      { label: "Operating entity", value: verifiedSite.legalNameZh },
      { label: "Established", value: "7 April 2020" },
      { label: "Based in", value: "Jinhua, Zhejiang, China" },
      { label: "Business model", value: "B2B" },
    ],
    activitiesEyebrow: "Product lines",
    activitiesTitle: "Our product lines",
    activitiesIntro:
      "HAILAN serves business customers across three core product lines.",
    activities: [
      {
        number: "01",
        title: "LVT Flooring",
        description: "Supplied to business customers as LVT flooring.",
      },
      {
        number: "02",
        title: "PES Carpet",
        description: "Supplied to business customers as PES (polyester) carpet.",
      },
      {
        number: "03",
        title: "PET Wall Materials",
        description: "Supplied to business customers as PET wall materials.",
      },
    ],
    ctaEyebrow: "Work with HAILAN",
    ctaTitle: "Tell us what your project requires.",
    ctaText:
      "Share the application, quantity, destination market and requested timeline. Our commercial team will confirm current availability, specifications and supporting documents for your enquiry.",
    emailAction: "Email our commercial team",
    contactAction: "View business contact",
    footerText: "LVT Flooring · PES Carpet · PET Wall Materials",
  },
  zh: {
    metaTitle: "HAILAN 海蓝 — 材料制造与 B2B 供应",
    metaDescription:
      "海蓝立足中国金华，面向企业客户提供材料制造、产品供应及相关技术服务。",
    languageLabel: "语言",
    eyebrow: "中国 · 金华",
    title: "面向企业客户的材料制造与供应。",
    intro:
      "金华市海蓝新材料有限公司成立于 2020 年，立足浙江金华，面向企业客户开展材料制造、产品供应及相关技术服务。",
    primaryAction: "发起商务询盘",
    secondaryAction: "联系商务总监",
    factsTitle: "公司概况",
    facts: [
      { label: "经营主体", value: verifiedSite.legalNameZh },
      { label: "成立时间", value: "2020 年 4 月 7 日" },
      { label: "所在地", value: "中国浙江省金华市" },
      { label: "业务模式", value: "B2B" },
    ],
    activitiesEyebrow: "产品线",
    activitiesTitle: "我们的产品线",
    activitiesIntro: "海蓝面向企业客户，提供三条核心产品线。",
    activities: [
      {
        number: "01",
        title: "LVT 地板",
        description: "面向企业客户供应的 LVT 地板产品线。",
      },
      {
        number: "02",
        title: "PES 地毯",
        description: "面向企业客户供应的 PES（涤纶）地毯产品线。",
      },
      {
        number: "03",
        title: "PET 墙面",
        description: "面向企业客户供应的 PET 墙面产品线。",
      },
    ],
    ctaEyebrow: "与海蓝合作",
    ctaTitle: "告诉我们您的项目需求。",
    ctaText:
      "请提供应用场景、需求数量、目的市场和期望时间。商务团队将根据具体询盘确认当前供应情况、产品参数及可提供的支持文件。",
    emailAction: "邮件联系商务团队",
    contactAction: "查看商务联系方式",
    footerText: "LVT 地板 · PES 地毯 · PET 墙面",
  },
  ru: {
    metaTitle: "HAILAN — Производство материалов и поставки B2B",
    metaDescription:
      "HAILAN работает с корпоративными клиентами в сфере производства материалов, поставок продукции и технических услуг из города Цзиньхуа, Китай.",
    languageLabel: "Язык",
    eyebrow: "Цзиньхуа · Китай",
    title: "Производство и поставка материалов для бизнеса.",
    intro:
      "Компания HAILAN основана в 2020 году в городе Цзиньхуа, провинция Чжэцзян, и работает с корпоративными клиентами в сфере производства материалов, поставок продукции и сопутствующих технических услуг.",
    primaryAction: "Отправить деловой запрос",
    secondaryAction: "Связаться с коммерческим директором",
    factsTitle: "О компании",
    facts: [
      { label: "Юридическое лицо", value: verifiedSite.legalNameZh },
      { label: "Дата основания", value: "7 апреля 2020 года" },
      { label: "Местонахождение", value: "Цзиньхуа, Чжэцзян, Китай" },
      { label: "Модель работы", value: "B2B" },
    ],
    activitiesEyebrow: "Продуктовые линейки",
    activitiesTitle: "Наши продуктовые линейки",
    activitiesIntro:
      "HAILAN работает с корпоративными клиентами по трём основным продуктовым линейкам.",
    activities: [
      {
        number: "01",
        title: "Покрытия LVT",
        description:
          "Поставляются корпоративным клиентам как напольные покрытия LVT.",
      },
      {
        number: "02",
        title: "Ковровые покрытия из полиэстера",
        description:
          "Поставляются корпоративным клиентам как ковровые покрытия из полиэстера.",
      },
      {
        number: "03",
        title: "Стеновые панели из ПЭТ",
        description:
          "Поставляются корпоративным клиентам как стеновые панели из ПЭТ.",
      },
    ],
    ctaEyebrow: "Сотрудничество с HAILAN",
    ctaTitle: "Расскажите нам о требованиях вашего проекта.",
    ctaText:
      "Укажите область применения, объём, целевой рынок и желаемые сроки. Коммерческий отдел подтвердит актуальную доступность, характеристики и сопроводительные документы по вашему запросу.",
    emailAction: "Написать в коммерческий отдел",
    contactAction: "Открыть деловые контакты",
    footerText: "Покрытия LVT · Ковровые покрытия из полиэстера · Стеновые панели из ПЭТ",
  },
} as const;

function isPublicLocale(lang: string): lang is PublicLocale {
  return lang === "en" || lang === "zh" || lang === "ru";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isPublicLocale(lang)) return {};

  const content = copy[lang];
  return {
    metadataBase: new URL(verifiedSite.url),
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        "x-default": "/en",
        en: "/en",
        "zh-Hans": "/zh",
        ru: "/ru",
      },
    },
    openGraph: {
      type: "website",
      siteName: verifiedSite.brand,
      title: content.metaTitle,
      description: content.metaDescription,
      url: `/${lang}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function PublicCompanyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isPublicLocale(lang)) notFound();

  const content = copy[lang];

  return (
    <div className="min-h-svh bg-paper text-ink-950">
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-52 -top-52 h-[38rem] w-[38rem] rounded-full bg-azure-600/20 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-56 -left-48 h-[32rem] w-[32rem] rounded-full bg-azure-400/10 blur-[120px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" aria-hidden="true" />

        <header className="relative border-b border-white/10">
          <div className="mx-auto flex h-20 w-full max-w-[76rem] items-center justify-between px-6 md:px-10">
            <NextLink href={`/${lang}`} aria-label={verifiedSite.brand}>
              <Logo on="dark" />
            </NextLink>
            <nav aria-label={content.languageLabel} className="flex items-center gap-2">
              {languageLinks.map((language) => (
                <NextLink
                  key={language.locale}
                  href={`/${language.locale}`}
                  hrefLang={language.hrefLang}
                  aria-current={lang === language.locale ? "page" : undefined}
                  className={`rounded-full border px-3.5 py-2 font-mono text-xs transition-colors ${
                    lang === language.locale
                      ? "border-azure-300 text-azure-200"
                      : "border-white/20 text-ink-200 hover:border-white/50 hover:text-white"
                  }`}
                >
                  {language.label}
                </NextLink>
              ))}
            </nav>
          </div>
        </header>

        <main id="main" className="relative">
          <div className="mx-auto grid min-h-[720px] w-full max-w-[76rem] items-center gap-14 px-6 py-20 md:px-10 lg:grid-cols-12 lg:py-28">
            <div className="lg:col-span-8">
              <p
                className="hero-rise font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-azure-300"
                style={{ "--delay": "0.1s", "--rise": "14px" } as CSSProperties}
              >
                {content.eyebrow}
              </p>
              <h1 className="mt-7 max-w-5xl text-balance text-5xl font-medium leading-[0.98] tracking-[-0.05em] sm:text-6xl md:text-7xl">
                <span className="-mb-1 block overflow-hidden pb-1">
                  <span
                    className="hero-line block"
                    style={{ "--delay": "0.18s" } as CSSProperties}
                  >
                    {content.title}
                  </span>
                </span>
              </h1>
              <p
                className="hero-rise mt-8 max-w-2xl text-lg leading-relaxed text-ink-200 md:text-xl"
                style={{ "--delay": "0.5s", "--rise": "18px" } as CSSProperties}
              >
                {content.intro}
              </p>
              <div
                className="hero-rise mt-10 flex flex-wrap gap-3"
                style={{ "--delay": "0.7s", "--rise": "18px" } as CSSProperties}
              >
                <a
                  href={`mailto:${verifiedSite.email}`}
                  className="inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-medium text-ink-950 transition-colors hover:bg-azure-100"
                >
                  {content.primaryAction}
                </a>
                <NextLink
                  href={`/linus/${lang}`}
                  className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10"
                >
                  {content.secondaryAction}
                </NextLink>
              </div>
            </div>

            <div
              className="hero-rise lg:col-span-4"
              style={{ "--delay": "0.45s", "--rise": "40px" } as CSSProperties}
            >
              <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.055] p-7 backdrop-blur-sm md:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-azure-300">
                  {content.factsTitle}
                </p>
                <dl className="mt-5 divide-y divide-white/10">
                  {content.facts.map((fact) => (
                    <div key={fact.label} className="py-4 first:pt-0 last:pb-0">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
                        {fact.label}
                      </dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-white">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </main>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-[76rem] px-6 md:px-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-azure-600">
                {content.activitiesEyebrow}
              </p>
              <h2 className="mt-5 text-balance text-4xl font-medium tracking-[-0.035em] md:text-5xl">
                {content.activitiesTitle}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-mist-600">
                {content.activitiesIntro}
              </p>
            </div>

            <div className="grid gap-4 lg:col-span-7">
              {content.activities.map((activity) => (
                <article
                  key={activity.number}
                  className="grid gap-5 rounded-2xl border border-ink-950/10 bg-white p-6 md:grid-cols-[4rem_1fr] md:p-8"
                >
                  <p className="font-mono text-xs tracking-[0.18em] text-azure-600">
                    {activity.number}
                  </p>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.02em]">
                      {activity.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist-600 md:text-base">
                      {activity.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink-950/10 bg-mist-50 py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[76rem] gap-8 px-6 md:px-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-azure-600">
              {content.ctaEyebrow}
            </p>
            <h2 className="mt-5 text-balance text-4xl font-medium tracking-[-0.035em] md:text-5xl">
              {content.ctaTitle}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist-600">
              {content.ctaText}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
            <a
              href={`mailto:${verifiedSite.email}`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink-950 px-6 text-sm font-medium text-white transition-colors hover:bg-azure-700"
            >
              {content.emailAction}
            </a>
            <NextLink
              href={`/linus/${lang}`}
              className="inline-flex h-12 items-center justify-center rounded-full border border-ink-950/15 px-6 text-sm font-medium text-ink-950 transition-colors hover:border-ink-950/30 hover:bg-white"
            >
              {content.contactAction}
            </NextLink>
          </div>
        </div>
      </section>

      <footer>
        <div className="mx-auto flex w-full max-w-[76rem] flex-col gap-2 px-6 py-8 text-sm text-mist-500 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            © {new Date().getFullYear()} {verifiedSite.legalNameZh}
          </p>
          <p>{content.footerText}</p>
        </div>
      </footer>
    </div>
  );
}

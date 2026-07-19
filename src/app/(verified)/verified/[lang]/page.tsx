import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Logo } from "@/components/graphics/Logo";
import { verifiedSite } from "@/lib/verified-site";

type VerifiedLocale = "en" | "zh" | "ru";

const languageLinks = [
  { locale: "en", label: "EN", hrefLang: "en" },
  { locale: "zh", label: "中文", hrefLang: "zh-CN" },
  { locale: "ru", label: "RU", hrefLang: "ru" },
] as const;

const copy = {
  en: {
    metaTitle: "Verified public information — HAILAN",
    metaDescription:
      "HAILAN public information currently retained after source review.",
    languageLabel: "Language",
    eyebrow: "Verified public information",
    title: "Only confirmed information is shown here.",
    intro:
      "We are reviewing every company figure, product specification, certificate and market claim before it returns to the website.",
    statusLabel: "Publication status",
    status: "Source review in progress",
    confirmedTitle: "Currently retained",
    entityLabel: "Operating entity",
    domainLabel: "Official website",
    domain: verifiedSite.domain,
    withheldTitle: "Temporarily withheld",
    withheldIntro:
      "These categories will remain offline until an accountable owner supplies evidence and publication approval:",
    withheld: [
      "Production area, capacity and production-line figures",
      "Export-country, customer and delivery-performance figures",
      "Certificates, test reports and compliance claims",
      "Product specifications, performance and application claims",
    ],
    note:
      "No unverified product, certification, capacity or market data is displayed on this page.",
  },
  zh: {
    metaTitle: "已核实公开信息 — HAILAN",
    metaDescription: "HAILAN 完成来源检查后当前保留的公开信息。",
    languageLabel: "语言",
    eyebrow: "已核实公开信息",
    title: "这里只展示已经确认的信息。",
    intro:
      "公司数字、产品参数、认证和市场声明正在逐项核对来源；完成负责人确认与发布批准前，不会重新出现在官网。",
    statusLabel: "发布状态",
    status: "来源核对中",
    confirmedTitle: "当前保留",
    entityLabel: "经营主体",
    domainLabel: "官方网站",
    domain: verifiedSite.domain,
    withheldTitle: "暂时撤下",
    withheldIntro:
      "以下信息须由责任人提供证据并完成发布批准后才能恢复：",
    withheld: [
      "生产面积、产能和生产线数量",
      "出口国家、客户数量和交付表现",
      "认证、检测报告和合规声明",
      "产品参数、性能和应用声明",
    ],
    note: "本页不展示未经核实的产品、认证、产能或市场数据。",
  },
  ru: {
    metaTitle: "Проверенная публичная информация — HAILAN",
    metaDescription:
      "Публичная информация HAILAN, сохранённая после проверки источников.",
    languageLabel: "Язык",
    eyebrow: "Проверенная публичная информация",
    title: "Здесь публикуется только подтверждённая информация.",
    intro:
      "Мы проверяем источники всех данных о компании, характеристик продукции, сертификатов и заявлений о рынках. До подтверждения ответственным лицом и разрешения на публикацию они не появятся на сайте.",
    statusLabel: "Статус публикации",
    status: "Проверка источников продолжается",
    confirmedTitle: "Подтверждено",
    entityLabel: "Юридическое лицо",
    domainLabel: "Официальный сайт",
    domain: verifiedSite.domain,
    withheldTitle: "Временно снято с публикации",
    withheldIntro:
      "Следующие сведения будут восстановлены только после предоставления доказательств ответственным лицом и разрешения на публикацию:",
    withheld: [
      "Площадь производства, мощности и количество производственных линий",
      "Количество стран экспорта, клиентов и показатели поставок",
      "Сертификаты, протоколы испытаний и заявления о соответствии",
      "Характеристики продукции, её свойства и области применения",
    ],
    note:
      "На этой странице нет неподтверждённых данных о продукции, сертификации, мощностях или рынках.",
  },
} as const;

function isVerifiedLocale(lang: string): lang is VerifiedLocale {
  return lang === "en" || lang === "zh" || lang === "ru";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isVerifiedLocale(lang)) return {};

  const content = copy[lang];
  return {
    metadataBase: new URL(verifiedSite.url),
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: `/verified/${lang}`,
      languages: {
        "x-default": "/verified/en",
        en: "/verified/en",
        "zh-Hans": "/verified/zh",
        ru: "/verified/ru",
      },
    },
    openGraph: {
      type: "website",
      siteName: verifiedSite.brand,
      title: content.metaTitle,
      description: content.metaDescription,
      url: `/verified/${lang}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function VerifiedPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isVerifiedLocale(lang)) notFound();

  const content = copy[lang];

  return (
    <div className="relative min-h-svh overflow-hidden bg-ink-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-52 -top-52 h-[34rem] w-[34rem] rounded-full bg-azure-600/[0.18] blur-[120px]"
        aria-hidden="true"
      />

      <header className="relative border-b border-white/10">
        <div className="mx-auto flex h-20 w-full max-w-[76rem] items-center justify-between px-6 md:px-10">
          <Logo on="dark" />
          <nav aria-label={content.languageLabel} className="flex items-center gap-2">
            {languageLinks.map((language) => (
              <NextLink
                key={language.locale}
                href={`/verified/${language.locale}`}
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
        <div className="mx-auto w-full max-w-[76rem] px-6 py-20 md:px-10 md:py-28">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-azure-300">
              {content.eyebrow}
            </p>
            <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.08] tracking-[-0.03em] md:text-6xl">
              {content.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-200">
              {content.intro}
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-azure-300/25 bg-azure-300/[0.08] px-4 py-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-300 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-300" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-azure-200">
                {content.statusLabel}: {content.status}
              </span>
            </div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-white/12 bg-white/[0.045] p-7 md:p-9">
              <h2 className="text-xl font-medium">{content.confirmedTitle}</h2>
              <dl className="mt-6 divide-y divide-white/10">
                <div className="py-5 first:pt-0">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
                    {content.entityLabel}
                  </dt>
                  <dd className="mt-2 text-lg text-white">
                    {verifiedSite.legalNameZh}
                  </dd>
                </div>
                <div className="py-5 last:pb-0">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
                    {content.domainLabel}
                  </dt>
                  <dd className="mt-2 text-lg text-white">{content.domain}</dd>
                </div>
              </dl>
            </section>

            <section className="rounded-2xl border border-white/12 bg-white/[0.045] p-7 md:p-9">
              <h2 className="text-xl font-medium">{content.withheldTitle}</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-300">
                {content.withheldIntro}
              </p>
              <ul className="mt-6 space-y-3">
                {content.withheld.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-200">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-ink-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>

      <footer className="relative border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[76rem] flex-col gap-2 px-6 py-8 text-sm text-ink-400 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            © {new Date().getFullYear()} {verifiedSite.legalNameZh}
          </p>
          <p>{content.note}</p>
        </div>
      </footer>
    </div>
  );
}

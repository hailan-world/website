import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import {
  GlobeIcon,
  MailIcon,
  QrIcon,
  WhatsAppIcon,
} from "@/components/contact/icons";
import { Logo } from "@/components/graphics/Logo";
import { verifiedSite } from "@/lib/verified-site";

type PublicLocale = "en" | "zh" | "ru";

const languageLinks = [
  { locale: "en", label: "EN", hrefLang: "en" },
  { locale: "zh", label: "中文", hrefLang: "zh-CN" },
  { locale: "ru", label: "RU", hrefLang: "ru" },
] as const;

const copy = {
  en: {
    metaTitle: "Linus Lin — General Manager & Commercial Director",
    metaDescription: "Verified business contact for Linus Lin at HAILAN.",
    languageLabel: "Language",
    eyebrow: "Verified business contact",
    role: "General Manager | Commercial Director",
    contact: "Business enquiries",
    emailLabel: "Email",
    websiteLabel: "Website",
    download: "Download vCard",
    whatsapp: "Scan to contact on WhatsApp",
    wecom: "Scan to contact on WeCom",
    verifiedPage: "Verified company information",
    note: "Email and verified messaging channels only. No public phone contact.",
  },
  zh: {
    metaTitle: "Linus Lin — 总经理兼商务总监",
    metaDescription: "HAILAN Linus Lin 的已核实商务联系方式。",
    languageLabel: "语言",
    eyebrow: "已核实商务联系方式",
    role: "总经理｜商务总监",
    contact: "商务联系",
    emailLabel: "邮箱",
    websiteLabel: "网站",
    download: "下载 vCard",
    whatsapp: "扫码通过 WhatsApp 联系",
    wecom: "扫码通过企业微信联系",
    verifiedPage: "已核实公司信息",
    note: "仅提供邮箱与已核实的即时通讯渠道，不公开电话联系方式。",
  },
  ru: {
    metaTitle: "Linus Lin — Генеральный и коммерческий директор",
    metaDescription: "Проверенные деловые контакты Linus Lin в HAILAN.",
    languageLabel: "Язык",
    eyebrow: "Проверенные деловые контакты",
    role: "Генеральный директор | Коммерческий директор",
    contact: "Деловые контакты",
    emailLabel: "Электронная почта",
    websiteLabel: "Веб-сайт",
    download: "Скачать vCard",
    whatsapp: "Отсканируйте код для связи в WhatsApp",
    wecom: "Отсканируйте код для связи в WeCom",
    verifiedPage: "Проверенная информация о компании",
    note:
      "Только электронная почта и проверенные мессенджеры. Публичный номер телефона не указан.",
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
      canonical: `/linus/${lang}`,
      languages: {
        "x-default": "/linus/en",
        en: "/linus/en",
        "zh-Hans": "/linus/zh",
        ru: "/linus/ru",
      },
    },
    openGraph: {
      type: "profile",
      siteName: verifiedSite.brand,
      title: content.metaTitle,
      description: content.metaDescription,
      url: `/linus/${lang}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LinusPublicPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isPublicLocale(lang)) notFound();

  const content = copy[lang];
  const contactMethods = [
    {
      icon: <MailIcon className="h-5 w-5" />,
      label: content.emailLabel,
      value: verifiedSite.email,
      href: `mailto:${verifiedSite.email}`,
    },
    {
      icon: <GlobeIcon className="h-5 w-5" />,
      label: content.websiteLabel,
      value: verifiedSite.domain,
      href: verifiedSite.url,
    },
  ];

  return (
    <div className="min-h-svh bg-paper text-ink-950">
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-52 -top-52 h-[38rem] w-[38rem] rounded-full bg-azure-600/20 blur-[120px]"
          aria-hidden="true"
        />

        <header className="relative border-b border-white/10">
          <div className="mx-auto flex h-20 w-full max-w-[76rem] items-center justify-between px-6 md:px-10">
            <NextLink href={`/verified/${lang}`} aria-label={content.verifiedPage}>
              <Logo on="dark" />
            </NextLink>
            <nav aria-label={content.languageLabel} className="flex items-center gap-2">
              {languageLinks.map((language) => (
                <NextLink
                  key={language.locale}
                  href={`/linus/${language.locale}`}
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
          <div className="mx-auto grid min-h-[650px] w-full max-w-[76rem] items-center gap-14 px-6 py-20 md:px-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-azure-300">
                {content.eyebrow}
              </p>
              <h1 className="mt-7 text-6xl font-medium leading-[0.92] tracking-[-0.055em] sm:text-7xl md:text-8xl">
                Linus <span className="text-ink-300">Lin.</span>
              </h1>
              <p className="mt-8 max-w-xl text-xl leading-relaxed text-ink-200 md:text-2xl">
                {content.role}
              </p>
              <p className="mt-3 text-sm text-ink-400">
                {verifiedSite.legalNameZh}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={`mailto:${verifiedSite.email}`}
                  className="inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-medium text-ink-950 transition-colors hover:bg-azure-100"
                >
                  {content.contact}
                </a>
                <a
                  href="/linus-lin.vcf"
                  download
                  className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10"
                >
                  {content.download}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-[430px] lg:mx-0 lg:ms-auto">
                <div
                  className="absolute -inset-5 rounded-[2rem] border border-white/10 bg-white/[0.025]"
                  aria-hidden="true"
                />
                <div className="relative aspect-[1.586/1] overflow-hidden rounded-[1.4rem] border border-white/15 bg-gradient-to-br from-ink-800 to-ink-950 p-7 shadow-2xl shadow-black/40 sm:p-9">
                  <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden="true" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <Logo on="dark" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400">
                        01 / LN
                      </span>
                    </div>
                    <div>
                      <p className="text-2xl font-medium tracking-[-0.035em] sm:text-3xl">
                        Linus Lin
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-300 sm:text-sm">
                        {content.role}
                      </p>
                    </div>
                    <div className="flex items-end justify-between gap-5 border-t border-white/10 pt-4 font-mono text-[9px] leading-relaxed tracking-[0.06em] text-ink-400 sm:text-[10px]">
                      <span>{verifiedSite.email}</span>
                      <span className="text-end">JINHUA · CHINA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[76rem] gap-14 px-6 md:px-10 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-500">
              {content.contact}
            </p>
            <div className="mt-7 divide-y divide-ink-950/10 border-y border-ink-950/10">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  className="group flex items-center gap-4 py-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-azure-600/[0.08] text-azure-600">
                    {method.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
                      {method.label}
                    </span>
                    <span className="mt-1 block truncate text-[15px] font-medium md:text-base">
                      {method.value}
                    </span>
                  </span>
                  <span className="text-mist-400 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              ))}
            </div>
            <NextLink
              href={`/verified/${lang}`}
              className="mt-8 inline-flex text-sm font-medium text-azure-600 hover:text-azure-700"
            >
              {content.verifiedPage} →
            </NextLink>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            <div className="rounded-[1.75rem] border border-ink-950/10 bg-mist-50 p-6 sm:p-7">
              <div className="flex items-center justify-center gap-3">
                <WhatsAppIcon className="h-5 w-5 text-azure-600" />
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-600">
                  WhatsApp
                </p>
              </div>
              <div className="relative mx-auto mt-5 aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl bg-white shadow-sm shadow-ink-950/5">
                <Image
                  src="/images/linus-whatsapp-qr-source.jpeg"
                  alt="Linus Lin WhatsApp QR code"
                  width={1179}
                  height={2556}
                  unoptimized
                  className="absolute left-1/2 top-1/2 h-auto w-[180%] max-w-none"
                  style={{ transform: "translate(-50%, -50.2%)" }}
                />
              </div>
              <p className="mt-5 text-center text-sm leading-relaxed text-mist-500">
                {content.whatsapp}
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-ink-950/10 bg-mist-50 p-6 sm:p-7">
              <div className="flex items-center justify-center gap-3">
                <QrIcon className="h-5 w-5 text-azure-600" />
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-600">
                  WeCom
                </p>
              </div>
              <div className="relative mx-auto mt-5 aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl bg-white shadow-sm shadow-ink-950/5">
                <Image
                  src="/images/linus-wecom-qr-source.jpeg"
                  alt="Linus Lin WeCom QR code"
                  width={1179}
                  height={2556}
                  unoptimized
                  className="absolute left-1/2 top-1/2 h-auto w-[168%] max-w-none"
                  style={{ transform: "translate(-50.2%, -58.1%)" }}
                />
              </div>
              <p className="mt-5 text-center text-sm leading-relaxed text-mist-500">
                {content.wecom}
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-950/10">
        <div className="mx-auto flex w-full max-w-[76rem] flex-col gap-2 px-6 py-8 text-sm text-mist-500 md:flex-row md:items-center md:justify-between md:px-10">
          <p>© {new Date().getFullYear()} {verifiedSite.legalNameZh}</p>
          <p>{content.note}</p>
        </div>
      </footer>
    </div>
  );
}

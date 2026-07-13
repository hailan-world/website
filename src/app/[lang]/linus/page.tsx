import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import {
  GlobeIcon,
  MailIcon,
  QrIcon,
  WhatsAppIcon,
} from "@/components/contact/icons";
import { Logo } from "@/components/graphics/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { getDictionary } from "../dictionaries";

const EMAIL = "linus@hailanworld.com";
// wa.me expects digits only, country code first.
const WHATSAPP_NUMBER = "8613566785896";
const WHATSAPP_LABEL = "+86 135 6678 5896";

interface LinusPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: LinusPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return {
    title: dict.linusPage.meta.title,
    description: dict.linusPage.meta.description,
    alternates: { canonical: `/${locale}/linus` },
    openGraph: {
      title: dict.linusPage.meta.title,
      description: dict.linusPage.meta.description,
      url: `/${locale}/linus`,
    },
  };
}

function ArrowIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3.5 9h11M10 4.5 14.5 9 10 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function LinusContactPage({ params }: LinusPageProps) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const t = dict.linusPage;

  const contactMethods = [
    {
      icon: <MailIcon className="h-5 w-5" />,
      label: t.labels.email,
      value: EMAIL,
      href: `mailto:${EMAIL}`,
    },
    {
      icon: <WhatsAppIcon className="h-5 w-5" />,
      label: "WhatsApp",
      value: WHATSAPP_LABEL,
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
    },
    {
      icon: <GlobeIcon className="h-5 w-5" />,
      label: "Website",
      value: "hailanworld.com",
      href: site.url,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-32 top-0 h-[38rem] w-[38rem] rounded-full bg-azure-600/20 blur-[90px] md:blur-[150px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />

        <Container className="relative grid min-h-[760px] items-center gap-16 pb-20 pt-32 md:pt-40 lg:grid-cols-12 lg:gap-12 lg:pb-28">
          <div className="hero-rise lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-azure-400" aria-hidden="true" />
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-azure-300">
                {site.name} · 01 / LN
              </p>
            </div>

            <h1 className="mt-9 text-balance text-6xl font-medium leading-[0.92] tracking-[-0.055em] sm:text-7xl md:text-8xl">
              Linus
              <span className="block text-ink-300">Lin.</span>
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-relaxed text-ink-200 md:text-2xl">
              {t.hero.role}
            </p>
            <p className="mt-3 text-sm tracking-wide text-ink-400">
              {site.legalName.replace(" Co., Ltd.", "")}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex h-12 items-center gap-3 rounded-full bg-white px-6 text-sm font-medium text-ink-950 transition-colors hover:bg-azure-100"
              >
                {t.getInTouch}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </a>
              <a
                href="/linus-lin.vcf"
                download
                className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10"
              >
                vCard
              </a>
            </div>
          </div>

          <div className="hero-rise lg:col-span-5" style={{ "--delay": "0.12s" } as CSSProperties}>
            <div className="relative mx-auto max-w-[430px] lg:mx-0 lg:ms-auto">
              <div
                className="absolute -inset-5 rounded-[2rem] border border-white/10 bg-white/[0.025]"
                aria-hidden="true"
              />
              <div className="relative aspect-[1.586/1] overflow-hidden rounded-[1.4rem] border border-white/15 bg-gradient-to-br from-ink-800 to-ink-950 p-7 shadow-2xl shadow-black/40 sm:p-9">
                <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden="true" />
                <div className="pointer-events-none absolute -bottom-28 -right-20 h-64 w-64 rounded-full bg-azure-600/30 blur-[80px]" aria-hidden="true" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <Logo on="dark" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400">
                      01 / LN
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl font-medium tracking-[-0.035em] sm:text-3xl">Linus Lin</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-300 sm:text-sm">{t.hero.role}</p>
                  </div>
                  <div className="flex items-end justify-between gap-5 border-t border-white/10 pt-4 font-mono text-[9px] leading-relaxed tracking-[0.06em] text-ink-400 sm:text-[10px]">
                    <span>{EMAIL}</span>
                    <span className="text-end">JINHUA · CHINA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-7">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-500">
                {t.getInTouch}
              </p>
              <h2 className="mt-5 max-w-xl text-3xl font-medium tracking-[-0.035em] text-ink-950 md:text-5xl">
                {t.companyTagline}
              </h2>

              <div className="mt-10 divide-y divide-ink-950/10 border-y border-ink-950/10">
                {contactMethods.map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 py-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-azure-600/[0.08] text-azure-600">
                      {method.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-mist-500">
                        {method.label}
                      </span>
                      <span className="mt-1 block truncate text-[15px] font-medium text-ink-950 md:text-base">
                        {method.value}
                      </span>
                    </span>
                    <span className="text-mist-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-azure-600 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">
                      <ArrowIcon />
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[1.75rem] border border-ink-950/10 bg-mist-50 p-6 sm:p-7">
                  <div className="flex min-h-5 items-center justify-center gap-3">
                    <WhatsAppIcon className="h-5 w-5 text-azure-600" />
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-600">
                      WhatsApp
                    </p>
                  </div>
                  <div className="relative mx-auto mt-5 aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl bg-white shadow-sm shadow-ink-950/5">
                    <Image
                      src="/images/linus-whatsapp-qr-source.jpeg"
                      alt="Linus — WhatsApp Business QR code"
                      width={1179}
                      height={2556}
                      unoptimized
                      className="absolute left-1/2 top-1/2 h-auto w-[180%] max-w-none"
                      style={{ transform: "translate(-50%, -50.2%)" }}
                    />
                  </div>
                  <p className="mt-5 text-center text-sm leading-relaxed text-mist-500">
                    {WHATSAPP_LABEL}
                  </p>
                </div>

                <div className="rounded-[1.75rem] border border-ink-950/10 bg-mist-50 p-6 sm:p-7">
                  <div className="flex min-h-5 items-center justify-center gap-3">
                    <QrIcon className="h-5 w-5 text-azure-600" />
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-600">
                      {t.wecomHeading}
                    </p>
                  </div>
                  <div className="relative mx-auto mt-5 aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl bg-white shadow-sm shadow-ink-950/5">
                    <Image
                      src="/images/linus-wecom-qr-source.jpeg"
                      alt="Linus Lin — WeCom QR code"
                      width={1179}
                      height={2556}
                      unoptimized
                      className="absolute left-1/2 top-1/2 h-auto w-[168%] max-w-none"
                      style={{ transform: "translate(-50.2%, -58.1%)" }}
                    />
                  </div>
                  <p className="mt-5 text-center text-sm leading-relaxed text-mist-500">
                    {t.wecomScan}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-5 rounded-2xl border border-ink-950/10 bg-white p-5">
                <Image
                  src="/images/linus-profile-qr-web.svg"
                  alt="QR code for this business card page"
                  width={148}
                  height={148}
                  unoptimized
                  className="h-24 w-24 shrink-0"
                />
                <div>
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-mist-500">
                    {site.name} · QR
                  </p>
                  <p className="mt-2 text-sm font-medium text-ink-950">hailanworld.com/linus</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

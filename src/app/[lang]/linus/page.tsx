import type { Metadata } from "next";
import { ContactCard } from "@/components/contact/ContactCard";
import {
  LinkedInIcon,
  MailIcon,
  QrIcon,
  WhatsAppIcon,
} from "@/components/contact/icons";
import { PageHero } from "@/components/layout/PageHero";
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
  };
}

export default async function LinusContactPage({ params }: LinusPageProps) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const t = dict.linusPage;

  return (
    <>
      <PageHero eyebrow={site.name} title="Linus Lin" lede={t.hero.role} />

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            {/* Contact channels */}
            <Reveal className="lg:col-span-7">
              <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-500">
                {t.getInTouch}
              </h2>
              <div className="mt-6 space-y-3">
                <ContactCard
                  icon={<MailIcon className="h-5 w-5" />}
                  label={t.labels.email}
                  value={EMAIL}
                  href={`mailto:${EMAIL}`}
                />
                <ContactCard
                  icon={<WhatsAppIcon className="h-5 w-5" />}
                  label="WhatsApp"
                  value={WHATSAPP_LABEL}
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  external
                />
                <ContactCard
                  icon={<QrIcon className="h-5 w-5" />}
                  label="WeCom"
                  value={t.wecomValue}
                  note={t.wecomNote}
                  muted
                />
                <ContactCard
                  icon={<LinkedInIcon className="h-5 w-5" />}
                  label="LinkedIn"
                  value={t.linkedinValue}
                  muted
                />
              </div>

              {/* Company information */}
              <div className="mt-14 border-t border-ink-950/10 pt-10">
                <p className="text-[15px] font-medium tracking-[-0.01em] text-mist-600">
                  {site.legalName.replace(" Co., Ltd.", "")}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-mist-500">
                  {t.companyTagline}
                </p>
              </div>
            </Reveal>

            {/* QR code */}
            <Reveal delay={0.12} className="lg:col-span-5">
              <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-500">
                {t.wecomHeading}
              </h2>
              <div className="mt-6 rounded-2xl border border-ink-950/10 bg-mist-50 p-7 md:p-10">
                <div className="mx-auto aspect-square w-full max-w-64 overflow-hidden rounded-xl border border-ink-950/10 bg-white">
                  {/* To update: replace public/images/wecom-qr.png with a new export — no code change needed. */}
                  <img
                    src="/images/wecom-qr.png"
                    alt="Linus Lin — WeCom QR code"
                    className="h-full w-full object-contain p-4"
                  />
                </div>
                <p className="mt-6 text-center text-sm leading-relaxed text-mist-500">
                  {t.wecomScan}
                </p>
              </div>
            </Reveal>
          </div>

          <p className="mt-24 text-center text-[13px] text-mist-400">© {site.name}</p>
        </Container>
      </section>
    </>
  );
}

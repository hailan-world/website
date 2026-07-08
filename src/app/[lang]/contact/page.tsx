import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { getDictionary } from "../dictionaries";

interface ContactPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.contactPage.meta.title,
    description: dict.contactPage.meta.description,
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const t = dict.contactPage;

  const productNames = Object.values(dict.productLines).map((line) => line.name);

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lede={t.hero.lede}
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            {/* Contact details */}
            <Reveal className="lg:col-span-5">
              <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-500">
                {t.inquiries}
              </h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-5 block text-2xl font-medium tracking-[-0.01em] text-ink-950 transition-colors hover:text-azure-600 md:text-3xl"
              >
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="mt-2 block text-lg text-mist-600 transition-colors hover:text-ink-950"
              >
                {site.phone}
              </a>

              <h2 className="mt-12 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-500">
                {t.hq}
              </h2>
              <address className="mt-5 text-[15px] not-italic leading-relaxed text-mist-600">
                {site.legalName}
                {site.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <p className="mt-4 text-[13px] leading-relaxed text-mist-500">
                {t.hours}
                <br />
                {t.visits}
              </p>

              <div className="mt-12 border-t border-ink-950/10 pt-10">
                <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-500">
                  {t.nextTitle}
                </h2>
                <ol className="mt-6 space-y-6">
                  {t.expectations.map((item, i) => (
                    <li key={item.title} className="flex gap-5">
                      <span className="font-mono text-[11px] tracking-[0.2em] text-azure-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[15px] font-medium text-ink-950">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-mist-600">
                          {item.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.12} className="lg:col-span-7">
              <div className="rounded-2xl border border-ink-950/10 bg-mist-50 p-7 md:p-10">
                <h2 className="text-xl font-medium tracking-[-0.01em] text-ink-950">
                  {t.form.heading}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-mist-600">
                  {t.form.intro}
                </p>
                <div className="mt-8">
                  <ContactForm t={t.form} productNames={productNames} />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

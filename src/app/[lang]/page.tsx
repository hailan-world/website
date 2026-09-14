import { getDictionary } from "@/app/[lang]/dictionaries";
import { GlobalMarkets } from "@/components/home/GlobalMarkets";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ManufacturingBand } from "@/components/home/ManufacturingBand";
import { NewsPreview } from "@/components/home/NewsPreview";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";
import { WhyHailan } from "@/components/home/WhyHailan";
import { CtaBand } from "@/components/layout/CtaBand";
import { defaultLocale, isLocale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  return (
    <>
      <Hero dict={dict} locale={locale} />
      <Intro dict={dict} />
      <ProductsShowcase dict={dict} />
      <ManufacturingBand dict={dict} />
      <WhyHailan dict={dict} />
      <GlobalMarkets dict={dict} locale={locale} />
      <NewsPreview dict={dict} locale={locale} />
      <CtaBand dict={dict} />
    </>
  );
}

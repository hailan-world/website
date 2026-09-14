import type { Metadata } from "next";
import { Link } from "@/components/i18n/Link";
import { MaterialTexture } from "@/components/graphics/MaterialTexture";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { products } from "@/data/products";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { placeholderContent } from "@/lib/content/placeholders";
import { cn } from "@/lib/utils";
import { getDictionary } from "../dictionaries";

interface ProductsPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.productsPage.meta.title,
    description: dict.productsPage.meta.description,
  };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const t = placeholderContent(dict.productsPage, locale);
  const zhSpecs = {
    "lvt-flooring": [
      { label: "总厚度", value: "2.0–8.0 mm" },
      { label: "耐磨层", value: "0.3 / 0.5 / 0.7 mm" },
      { label: "板材尺寸", value: "152×914 · 178×1219 · 229×1524 mm" },
      { label: "片材尺寸", value: "305×610 · 457×914 mm" },
    ],
    "pet-wall-coverings": [
      { label: "材料", value: "100% 聚酯纤维（PET）" },
      { label: "再生成分", value: "最高 60% 消费后回收材料" },
      { label: "厚度", value: "9 / 12 / 24 mm" },
      { label: "板材尺寸", value: "1220×2440 mm · 可定制裁切" },
    ],
    "pet-carpet-coverings": [
      { label: "纱线", value: "原液着色 PET · 100% 聚酯" },
      { label: "结构", value: "簇绒圈绒 · 割绒 · 圈割绒" },
      { label: "绒重", value: "500–1000 g/m²" },
      { label: "片材尺寸", value: "500×500 mm" },
    ],
  } as const;

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lede={t.hero.lede}
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="space-y-24 md:space-y-32">
            {products.map((product, i) => {
              const line = placeholderContent(dict.productLines[product.slug], locale);
              const reversed = i % 2 === 1;
              return (
                <Reveal key={product.slug}>
                  <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <Link
                      href={`/products/${product.slug}`}
                      aria-label={line.name}
                      className={cn(
                        "group relative block aspect-[4/3] overflow-hidden rounded-2xl",
                        reversed && "lg:order-2",
                      )}
                    >
                      <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]">
                        <MaterialTexture kind={product.texture} />
                      </div>
                      <span className="absolute left-4 top-4 rounded-full bg-ink-950/55 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
                        {line.category}
                      </span>
                    </Link>

                    <div className={cn(reversed && "lg:order-1")}>
                      <Eyebrow>
                        {String(i + 1).padStart(2, "0")} — {line.category}
                      </Eyebrow>
                      <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] text-ink-950 md:text-4xl">
                        {line.name}
                      </h2>
                      <p className="mt-4 text-lg leading-relaxed text-mist-600">
                        {line.short}
                      </p>

                      <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-ink-950/10 pt-7">
                        {(locale === "zh" ? zhSpecs[product.slug] : product.specs.slice(0, 4)).map((spec) => (
                          <div key={spec.label}>
                            <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-mist-500">
                              {placeholderContent(spec.label, locale)}
                            </dt>
                            <dd className="mt-1.5 text-sm font-medium text-ink-950">
                              {placeholderContent(spec.value, locale)}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <div className="mt-7 flex flex-wrap gap-2">
                        {line.chips.map((chip) => (
                          <Chip key={chip}>{chip}</Chip>
                        ))}
                      </div>

                      <ArrowLink
                        href={`/products/${product.slug}`}
                        className="mt-9"
                      >
                        {t.explore} {line.name}
                      </ArrowLink>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Roadmap note */}
      <section className="bg-mist-50 py-20 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow>{t.roadmap.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-balance text-[1.75rem] font-medium leading-[1.15] tracking-[-0.02em] text-ink-950 md:text-[2.25rem]">
                {t.roadmap.title}
              </h2>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                {t.roadmap.text}
              </p>
              <ArrowLink href="/oem-odm" className="mt-8">
                {t.roadmap.link}
              </ArrowLink>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand title={t.cta.title} lede={t.cta.lede} cta={t.cta.button} />
    </>
  );
}

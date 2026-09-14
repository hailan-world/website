import type { Metadata } from "next";
import { Link } from "@/components/i18n/Link";
import { notFound } from "next/navigation";
import { MaterialTexture } from "@/components/graphics/MaterialTexture";
import { CtaBand } from "@/components/layout/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHead } from "@/components/ui/SectionHead";
import { getProduct, products } from "@/data/products";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { placeholderLabel } from "@/lib/content/placeholders";
import { getDictionary } from "../../dictionaries";

interface ProductPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.short,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const isZh = locale === "zh";
  const pending = placeholderLabel(locale);
  const sourceProduct = getProduct(slug);
  if (!sourceProduct) notFound();
  const localizedLine = dict.productLines[sourceProduct.slug];
  const product = {
    ...sourceProduct,
    name: localizedLine.name,
    category: localizedLine.category,
    short: localizedLine.short,
    headline: isZh ? localizedLine.short : sourceProduct.headline,
    formats: isZh ? localizedLine.chips : sourceProduct.formats,
  };

  const ui = isZh
    ? {
        products: "产品中心", overview: "产品概览", overviewTitle: "面向项目需求的产品方案。",
        applications: "典型应用", snapshot: "技术参数概览",
        snapshotNote: "以下为原稿结构，正式规格与检测资料须经确认后发布。",
        why: "产品表现", whyTitle: "产品结构与性能说明。", compliance: "合规与认证",
        related: "相关产品", relatedTitle: "浏览其他产品系列。", allProducts: "全部产品",
        ctaTitle: "就该产品系列发起询盘。", ctaLede: "请提供市场、数量和目标结构，具体规格、价格和打样安排以商务确认结果为准。", cta: "索取样品",
      }
    : {
        products: "Products", overview: "Overview", overviewTitle: "Engineered for programs, not one-off orders.",
        applications: "Typical applications", snapshot: "Technical snapshot",
        snapshotNote: "Indicative program range — constructions are configured to order. Full technical data sheets and test reports are available on request.",
        why: "Why it performs", whyTitle: "Construction details that survive the spec sheet.", compliance: "Compliance",
        related: "Complete the program", relatedTitle: "Pairs with the rest of the portfolio.", allProducts: "All products",
        ctaTitle: `Start a ${sourceProduct.name.toLowerCase()} program.`, ctaLede: "Tell us your market, volumes and target constructions — we respond with specifications, pricing and a sampling plan within one business day.", cta: "Request samples",
      };

  const related = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-40 -top-64 h-[34rem] w-[34rem] rounded-full bg-azure-600/15 blur-[64px] md:blur-[140px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" aria-hidden="true" />

        <Container className="relative pb-16 pt-36 md:pb-20 md:pt-48">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
                <li>
                  <Link href="/products" className="transition-colors hover:text-white">
                    {ui.products} {pending}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-azure-300" aria-current="page">
                  {product.category}
                </li>
              </ol>
            </nav>
            <h1 className="mt-6 max-w-3xl text-balance text-4xl font-medium leading-[1.08] tracking-[-0.03em] md:text-6xl">
              {product.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200">
              {product.headline}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {product.formats.map((format) => (
                <Chip key={format} on="dark">
                  {format}
                </Chip>
              ))}
            </div>
          </Reveal>
        </Container>

        {/* Full-width material banner */}
        <Reveal className="relative">
          <div className="relative aspect-[21/8] w-full overflow-hidden">
            <MaterialTexture kind={product.texture} />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink-950 to-transparent"
              aria-hidden="true"
            />
          </div>
        </Reveal>
      </section>

      {/* Overview + specs */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-6">
              <Eyebrow>{ui.overview} {pending}</Eyebrow>
              <h2 className="mt-5 text-balance text-[1.9rem] font-medium leading-[1.14] tracking-[-0.02em] text-ink-950 md:text-[2.4rem]">
                {ui.overviewTitle} {pending}
              </h2>
              {product.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="mt-6 text-lg leading-relaxed text-mist-600">
                  {paragraph}
                </p>
              ))}

              <div className="mt-10">
                <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-500">
                  {ui.applications} {pending}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.applications.map((application) => (
                    <li key={application}>
                      <Chip>{application}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-6">
              <div className="rounded-2xl border border-ink-950/10 bg-mist-50 p-8 md:p-10">
                <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-500">
                  {ui.snapshot} {pending}
                </h2>
                <dl className="mt-6 divide-y divide-ink-950/8">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="grid grid-cols-[minmax(7rem,0.8fr)_1.2fr] gap-6 py-3.5"
                    >
                      <dt className="text-sm text-mist-500">{spec.label}</dt>
                      <dd className="text-sm font-medium text-ink-950">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-[13px] leading-relaxed text-mist-500">
                  {ui.snapshotNote} {pending}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-32">
        <div
          className="pointer-events-none absolute -left-52 top-16 h-[30rem] w-[30rem] rounded-full bg-azure-600/10 blur-[64px] md:blur-[150px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />
        <Container className="relative">
          <SectionHead
            on="dark"
            eyebrow={`${ui.why} ${pending}`}
            title={`${ui.whyTitle} ${pending}`}
          />
          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {product.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.08}>
                <div className="border-t border-white/12 pt-7">
                  <span className="font-mono text-[11px] tracking-[0.22em] text-azure-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-medium tracking-[-0.01em]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-300">
                    {feature.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 border-t border-white/10 pt-8">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-400">
                {ui.compliance} {pending}
              </span>
              <ul className="flex flex-wrap gap-2">
                {product.compliance.map((c) => (
                  <li key={c}>
                    <Chip on="dark">{c}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Related products */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead
              eyebrow={`${ui.related} ${pending}`}
              title={`${ui.relatedTitle} ${pending}`}
            />
            <Reveal delay={0.15} className="hidden pb-2 md:block">
              <ArrowLink href="/products">{ui.allProducts} {pending}</ArrowLink>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1}>
                <Link href={`/products/${p.slug}`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]">
                      <MaterialTexture kind={p.texture} />
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <h3 className="text-xl font-medium tracking-[-0.01em] text-ink-950 transition-colors group-hover:text-azure-600">
                      {isZh ? dict.productLines[p.slug].name : p.name} {pending}
                    </h3>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-mist-500">
                      {isZh ? dict.productLines[p.slug].category : p.category} {pending}
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-mist-600">
                    {isZh ? dict.productLines[p.slug].short : p.short} {pending}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title={`${ui.ctaTitle} ${pending}`}
        lede={`${ui.ctaLede} ${pending}`}
        cta={`${ui.cta} ${pending}`}
      />
    </>
  );
}

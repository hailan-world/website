import type { Metadata } from "next";
import Link from "next/link";
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

interface ProductPageProps {
  params: Promise<{ slug: string }>;
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
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-40 -top-64 h-[34rem] w-[34rem] rounded-full bg-azure-600/15 blur-[140px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" aria-hidden="true" />

        <Container className="relative pb-16 pt-36 md:pb-20 md:pt-48">
          <Reveal>
            <nav aria-label="面包屑">
              <ol className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
                <li>
                  <Link href="/products" className="transition-colors hover:text-white">
                    产品
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
              <Eyebrow>概览</Eyebrow>
              <h2 className="mt-5 text-balance text-[1.9rem] font-medium leading-[1.14] tracking-[-0.02em] text-ink-950 md:text-[2.4rem]">
                为持续项目而工程化，而不是只为单次订单。
              </h2>
              {product.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="mt-6 text-lg leading-relaxed text-mist-600">
                  {paragraph}
                </p>
              ))}

              <div className="mt-10">
                <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-500">
                  典型应用
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
                  技术概览
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
                  以上为常用项目范围，具体结构按订单配置。完整技术数据表和测试报告可按需提供。
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-32">
        <div
          className="pointer-events-none absolute -left-52 top-16 h-[30rem] w-[30rem] rounded-full bg-azure-600/10 blur-[150px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />
        <Container className="relative">
          <SectionHead
            on="dark"
            eyebrow="性能来源"
            title="经得起规格书检验的结构细节。"
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
                合规
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
              eyebrow="完善项目组合"
              title="可与其他产品线组合使用。"
            />
            <Reveal delay={0.15} className="hidden pb-2 md:block">
              <ArrowLink href="/products">全部产品</ArrowLink>
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
                      {p.name}
                    </h3>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-mist-500">
                      {p.category}
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-mist-600">
                    {p.short}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title={`启动 ${product.name} 项目。`}
        lede="告诉我们你的市场、采购量和目标结构，我们将在一个工作日内回复规格、报价和打样计划。"
        cta="索取样品"
      />
    </>
  );
}

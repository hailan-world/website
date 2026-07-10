import type { Metadata } from "next";
import Link from "next/link";
import { MaterialTexture } from "@/components/graphics/MaterialTexture";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "产品",
  description:
    "LVT 地板、PET 声学墙面覆材和 PET 地毯覆材，三条产品线在同一质量体系下为全球进口商、经销商和品牌客户开发。",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="产品"
        title="地面、墙面、纺织表面，同一标准。"
        lede="三条产品线在同一工程与合规体系下开发，让合作伙伴通过一家工厂、一个联系人和一套出货计划构建完整室内材料项目。"
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="space-y-24 md:space-y-32">
            {products.map((product, i) => {
              const reversed = i % 2 === 1;
              return (
                <Reveal key={product.slug}>
                  <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <Link
                      href={`/products/${product.slug}`}
                      aria-label={`${product.name} — 查看详情`}
                      className={cn(
                        "group relative block aspect-[4/3] overflow-hidden rounded-2xl",
                        reversed && "lg:order-2",
                      )}
                    >
                      <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]">
                        <MaterialTexture kind={product.texture} />
                      </div>
                      <span className="absolute left-4 top-4 rounded-full bg-ink-950/55 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
                        {product.category}
                      </span>
                    </Link>

                    <div className={cn(reversed && "lg:order-1")}>
                      <Eyebrow>
                        {String(i + 1).padStart(2, "0")} — {product.category}
                      </Eyebrow>
                      <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] text-ink-950 md:text-4xl">
                        {product.name}
                      </h2>
                      <p className="mt-4 text-lg leading-relaxed text-mist-600">
                        {product.short}
                      </p>

                      <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-ink-950/10 pt-7">
                        {product.specs.slice(0, 4).map((spec) => (
                          <div key={spec.label}>
                            <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-mist-500">
                              {spec.label}
                            </dt>
                            <dd className="mt-1.5 text-sm font-medium text-ink-950">
                              {spec.value}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <div className="mt-7 flex flex-wrap gap-2">
                        {product.formats.map((format) => (
                          <Chip key={format}>{format}</Chip>
                        ))}
                      </div>

                      <ArrowLink
                        href={`/products/${product.slug}`}
                        className="mt-9"
                      >
                        了解 {product.name}
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
              <Eyebrow>未来方向</Eyebrow>
              <h2 className="mt-5 text-balance text-[1.75rem] font-medium leading-[1.15] tracking-[-0.02em] text-ink-950 md:text-[2.25rem]">
                一次做好一个品类。
              </h2>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                HAILAN 的路线图将从地材与声学表面延伸到更广阔的装饰建材领域。新类别加入产品组合的方式，会与当前三类产品相同：在自有产线上开发，按国际标准验证，并且只有在我们能够规模化保证之后才提供给合作伙伴。
              </p>
              <ArrowLink href="/oem-odm" className="mt-8">
                与我们共同开发产品
              </ArrowLink>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand
        title="需要规格、报价或样品？"
        lede="把项目或产品计划需求发给我们，技术资料和样品可在数天内安排。"
        cta="索取产品资料"
      />
    </>
  );
}

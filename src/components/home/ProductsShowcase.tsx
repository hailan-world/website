import Link from "next/link";
import { MaterialTexture } from "@/components/graphics/MaterialTexture";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { products } from "@/data/products";

const chips: Record<string, [string, string]> = {
  "lvt-flooring": ["干背 · 锁扣 · 免胶铺装", "耐磨层最高 0.7 mm"],
  "pet-wall-coverings": ["NRC 最高 0.85", "最高 60% 回收 PET"],
  "pet-carpet-coverings": ["原液着色纱线", "方块与长条"],
};

export function ProductsShowcase() {
  return (
    <section className="bg-mist-50 py-24 md:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="02 — 产品"
            title="三条产品线，一个质量体系。"
            lede="地面、墙面和纺织表面均按同一工程与合规标准开发，让合作伙伴可从一家工厂构建完整室内材料项目。"
          />
          <Reveal delay={0.15} className="hidden pb-2 md:block">
            <ArrowLink href="/products">全部产品</ArrowLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.1}>
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]">
                    <MaterialTexture kind={product.texture} />
                  </div>
                  <span className="absolute left-4 top-4 rounded-full bg-ink-950/55 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-medium tracking-[-0.01em] text-ink-950">
                    {product.name}
                  </h3>
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-950/15 text-ink-950 transition-all duration-300 group-hover:border-ink-950 group-hover:bg-ink-950 group-hover:text-white"
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M2 8h11M9.2 3.5 13.7 8l-4.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <p className="mt-2.5 text-[15px] leading-relaxed text-mist-600">
                  {product.short}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {chips[product.slug].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-ink-950/10 px-3 py-1 font-mono text-[10.5px] tracking-[0.04em] text-mist-600"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 md:hidden">
          <ArrowLink href="/products">全部产品</ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}

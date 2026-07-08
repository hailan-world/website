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
  title: "Products",
  description:
    "LVT flooring, PET acoustic wall coverings and PET carpet coverings — three product lines engineered under one quality system for importers, distributors and brands worldwide.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Floor. Wall. Textile. One standard."
        lede="Three product lines developed under a single engineering and compliance system — so partners can build complete interior programs from one factory, one contact and one shipping schedule."
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
                      aria-label={`${product.name} — view details`}
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
                        Explore {product.name}
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
              <Eyebrow>Looking ahead</Eyebrow>
              <h2 className="mt-5 text-balance text-[1.75rem] font-medium leading-[1.15] tracking-[-0.02em] text-ink-950 md:text-[2.25rem]">
                One category at a time, engineered properly.
              </h2>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                HAILAN&apos;s roadmap extends beyond flooring and acoustic
                surfaces into the broader world of decorative building
                materials. New categories join the portfolio the same way the
                current three did: developed on our own lines, validated
                against international standards, and offered to partners only
                when we can guarantee them at scale.
              </p>
              <ArrowLink href="/oem-odm" className="mt-8">
                Develop a product with us
              </ArrowLink>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Need specifications, pricing or samples?"
        lede="Send us your project or program requirements — technical data sheets and sample dispatch within days."
        cta="Request product information"
      />
    </>
  );
}

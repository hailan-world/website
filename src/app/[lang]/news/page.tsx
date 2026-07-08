import type { Metadata } from "next";
import { Link } from "@/components/i18n/Link";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { articles } from "@/data/news";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News",
  description:
    "Company updates from HAILAN: trade fairs, capacity expansions, sustainability reporting and product launches.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="What's moving at HAILAN."
        lede="Capacity, collections, certifications and the occasional trade-fair marathon — the updates that matter to partners, without the press-release padding."
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            {articles.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.05}>
                <article className="border-t border-ink-950/10 last:border-b">
                  <Link
                    href={`/news/${article.slug}`}
                    className="group grid gap-4 py-10 md:grid-cols-[11rem_1fr] md:gap-10"
                  >
                    <div>
                      <time
                        dateTime={article.date}
                        className="block font-mono text-[12px] tracking-[0.1em] text-mist-500"
                      >
                        {formatDate(article.date)}
                      </time>
                      <span className="mt-3 inline-block rounded-full border border-ink-950/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-mist-600">
                        {article.category}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-balance text-xl font-medium leading-snug tracking-[-0.01em] text-ink-950 transition-colors duration-300 group-hover:text-azure-600 md:text-2xl">
                        {article.title}
                      </h2>
                      <p className="mt-3 text-[15px] leading-relaxed text-mist-600">
                        {article.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink-950 transition-colors group-hover:text-azure-600">
                        Read article
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
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
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

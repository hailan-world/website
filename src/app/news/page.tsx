import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { articles } from "@/data/news";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "新闻",
  description:
    "HAILAN 公司动态：展会、产能扩展、可持续发展报告和产品发布。",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="新闻"
        title="HAILAN 的最新动态。"
        lede="产能、系列、认证，以及偶尔漫长的展会奔波。这里记录真正与合作伙伴相关的更新，不堆砌新闻稿套话。"
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
                        阅读文章
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

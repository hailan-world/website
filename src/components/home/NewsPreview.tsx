import { Link } from "@/components/i18n/Link";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { getArticles } from "@/lib/content/news";
import { getNewsCopy } from "@/lib/content/news-copy";
import type { Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

export function NewsPreview({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const articles = getArticles(locale);
  const copy = getNewsCopy(locale);

  return (
    <section className="pt-24 md:pt-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow={dict.newsHome.eyebrow}
            title={dict.newsHome.title}
          />
          <Reveal delay={0.15} className="hidden pb-2 md:block">
            <ArrowLink href="/news">{dict.common.allNews}</ArrowLink>
          </Reveal>
        </div>

        {articles.length > 0 ? (
          <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-3">
            {articles.slice(0, 3).map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.09}>
                <Link
                  href={`/news/${article.slug}`}
                  className="group block border-t border-ink-950/10 pt-6"
                >
                  <div className="flex items-center gap-3">
                    <time
                      dateTime={article.date}
                      className="font-mono text-[11px] tracking-[0.12em] text-mist-500"
                    >
                      {formatDate(article.date, locale)}
                    </time>
                    <span className="rounded-full border border-ink-950/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-mist-600">
                      {copy.categories[article.category]}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-medium leading-snug tracking-[-0.01em] text-ink-950 transition-colors duration-300 group-hover:text-azure-600">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-mist-600">
                    {article.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink-950 transition-colors group-hover:text-azure-600">
                    {copy.readArticle}
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
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
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-14">
            <div className="rounded-2xl border border-dashed border-ink-950/15 bg-mist-50 px-6 py-12 md:px-10">
              <h3 className="text-xl font-medium text-ink-950">
                {copy.emptyTitle}
              </h3>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-mist-600">
                {copy.emptyText}
              </p>
            </div>
          </Reveal>
        )}

        <Reveal className="mt-12 md:hidden">
          <ArrowLink href="/news">{dict.common.allNews}</ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}

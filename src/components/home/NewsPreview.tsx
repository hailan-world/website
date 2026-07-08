import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { articles } from "@/data/news";
import { formatDate } from "@/lib/utils";

export function NewsPreview() {
  return (
    <section className="pt-24 md:pt-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="06 — News"
            title="What’s moving at HAILAN."
          />
          <Reveal delay={0.15} className="hidden pb-2 md:block">
            <ArrowLink href="/news">All news</ArrowLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-3">
          {articles.slice(0, 3).map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.09}>
              <Link href={`/news/${article.slug}`} className="group block border-t border-ink-950/10 pt-6">
                <div className="flex items-center gap-3">
                  <time
                    dateTime={article.date}
                    className="font-mono text-[11px] tracking-[0.12em] text-mist-500"
                  >
                    {formatDate(article.date)}
                  </time>
                  <span className="rounded-full border border-ink-950/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-mist-600">
                    {article.category}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-medium leading-snug tracking-[-0.01em] text-ink-950 transition-colors duration-300 group-hover:text-azure-600">
                  {article.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mist-600 line-clamp-3">
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
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 md:hidden">
          <ArrowLink href="/news">All news</ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/layout/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { articles, getArticle } from "@/data/news";
import { formatDate } from "@/lib/utils";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-40 -top-64 h-[34rem] w-[34rem] rounded-full bg-azure-600/15 blur-[140px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" aria-hidden="true" />

        <Container className="relative pb-16 pt-36 md:pb-20 md:pt-48">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/news"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400 transition-colors hover:text-white"
              >
                ← All news
              </Link>
              <span
                className="h-1 w-1 rounded-full bg-white/25"
                aria-hidden="true"
              />
              <span className="rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-200">
                {article.category}
              </span>
              <time
                dateTime={article.date}
                className="font-mono text-[11px] tracking-[0.12em] text-ink-400"
              >
                {formatDate(article.date)}
              </time>
            </div>
            <h1 className="mt-7 max-w-3xl text-balance text-3xl font-medium leading-[1.12] tracking-[-0.025em] md:text-5xl">
              {article.title}
            </h1>
          </Reveal>
        </Container>
      </section>

      <article className="py-20 md:py-28">
        <Container>
          <Reveal className="mx-auto max-w-2xl">
            <p className="text-xl font-medium leading-relaxed tracking-[-0.01em] text-ink-950">
              {article.excerpt}
            </p>
            {article.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="mt-7 text-lg leading-[1.85] text-mist-700"
              >
                {paragraph}
              </p>
            ))}
            <div className="mt-12 border-t border-ink-950/10 pt-8">
              <ArrowLink href="/contact">
                Talk to us about this update
              </ArrowLink>
            </div>
          </Reveal>
        </Container>
      </article>

      {more.length > 0 && (
        <section className="bg-mist-50 py-20 md:py-24">
          <Container>
            <Reveal>
              <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-500">
                More from HAILAN
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {more.map((a, i) => (
                <Reveal key={a.slug} delay={i * 0.08}>
                  <Link
                    href={`/news/${a.slug}`}
                    className="group block border-t border-ink-950/10 pt-6"
                  >
                    <div className="flex items-center gap-3">
                      <time
                        dateTime={a.date}
                        className="font-mono text-[11px] tracking-[0.12em] text-mist-500"
                      >
                        {formatDate(a.date)}
                      </time>
                      <span className="rounded-full border border-ink-950/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-mist-600">
                        {a.category}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-medium leading-snug tracking-[-0.01em] text-ink-950 transition-colors duration-300 group-hover:text-azure-600">
                      {a.title}
                    </h3>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand />
    </>
  );
}

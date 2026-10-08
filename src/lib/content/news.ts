import "server-only";

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { getCmsPayload, getCmsViewer } from "@/lib/cms";
import type { Locale } from "@/lib/i18n";
import { defaultLocale, locales } from "@/lib/i18n";

export const articleCategories = [
  "Events",
  "Manufacturing",
  "Sustainability",
  "Company",
] as const;

export type ArticleCategory = (typeof articleCategories)[number];

export interface Article {
  slug: string;
  title: string;
  date: string;
  category: ArticleCategory;
  excerpt: string;
  body: string[];
  coverImage?: string;
  coverImageAlt?: string;
}

interface ApprovedArticle extends Article {
  locale: Locale;
}

interface ArticleFile {
  slug?: unknown;
  title?: unknown;
  date?: unknown;
  category?: unknown;
  excerpt?: unknown;
  body?: unknown;
  coverImage?: unknown;
  coverImageAlt?: unknown;
  status?: unknown;
  approvedBy?: unknown;
  approvalReference?: unknown;
  sourceNotes?: unknown;
}

const newsDirectory = path.join(process.cwd(), "content", "news");
const localePattern = locales.join("|");
const filenamePattern = new RegExp(`^(.+)\\.(${localePattern})\\.json$`);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function nonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isCategory(value: unknown): value is ArticleCategory {
  return articleCategories.includes(value as ArticleCategory);
}

function isParagraphList(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.length > 0 && value.every(nonEmptyString)
  );
}

function isIsoDate(value: unknown): value is string {
  if (!nonEmptyString(value) || !datePattern.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().startsWith(value);
}

function isNewsImage(value: unknown): value is string {
  return (
    nonEmptyString(value) &&
    value.startsWith("/uploads/news/") &&
    !value.includes("..")
  );
}

function readApprovedArticle(filename: string): ApprovedArticle | null {
  const match = filename.match(filenamePattern);
  if (!match) return null;

  const [, filenameSlug, localeValue] = match;
  const locale = localeValue as Locale;
  const filepath = path.join(newsDirectory, filename);

  let data: ArticleFile;
  try {
    data = JSON.parse(readFileSync(filepath, "utf8")) as ArticleFile;
  } catch {
    throw new Error(`Invalid JSON in approved-content folder: ${filename}`);
  }

  // Draft files may live on the publishing branch, but they never render.
  if (data.status !== "approved") return null;

  const imageIsValid =
    data.coverImage === undefined ||
    data.coverImage === "" ||
    isNewsImage(data.coverImage);

  if (
    !nonEmptyString(data.slug) ||
    !slugPattern.test(data.slug) ||
    data.slug !== filenameSlug ||
    !nonEmptyString(data.title) ||
    !isIsoDate(data.date) ||
    !isCategory(data.category) ||
    !nonEmptyString(data.excerpt) ||
    !isParagraphList(data.body) ||
    !nonEmptyString(data.approvedBy) ||
    !nonEmptyString(data.approvalReference) ||
    !nonEmptyString(data.sourceNotes) ||
    !imageIsValid ||
    (isNewsImage(data.coverImage) && !nonEmptyString(data.coverImageAlt))
  ) {
    throw new Error(
      `Approved article ${filename} is incomplete or failed validation. ` +
        "Check its slug, date, copy, approval reference and source notes.",
    );
  }

  return {
    slug: data.slug,
    title: data.title,
    date: data.date,
    category: data.category,
    excerpt: data.excerpt,
    body: data.body,
    coverImage: nonEmptyString(data.coverImage) ? data.coverImage : undefined,
    coverImageAlt: nonEmptyString(data.coverImageAlt)
      ? data.coverImageAlt
      : undefined,
    locale,
  };
}

function readAllApprovedArticles(): ApprovedArticle[] {
  if (!existsSync(newsDirectory)) return [];

  return readdirSync(newsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => readApprovedArticle(entry.name))
    .filter((article): article is ApprovedArticle => article !== null);
}

/**
 * Return approved news for one locale. Missing translations fall back to the
 * English source entry so every locale keeps a working route after publishing.
 */
function getStaticArticles(locale: Locale = defaultLocale): Article[] {
  const approved = readAllApprovedArticles();
  const slugs = new Set(approved.map((article) => article.slug));
  const articles: Article[] = [];

  for (const slug of slugs) {
    const localized = approved.find(
      (article) => article.slug === slug && article.locale === locale,
    );
    const fallback = approved.find(
      (article) => article.slug === slug && article.locale === defaultLocale,
    );
    const selected = localized ?? fallback;
    if (!selected) continue;

    const { locale: _locale, ...article } = selected;
    void _locale;
    articles.push(article);
  }

  return articles.sort((a, b) => b.date.localeCompare(a.date));
}

function mediaValue(value: unknown): { url?: string; alt?: string } {
  if (!value || typeof value !== "object") return {};
  const media = value as { url?: unknown; alt?: unknown };
  return {
    url: typeof media.url === "string" ? media.url : undefined,
    alt: typeof media.alt === "string" ? media.alt : undefined,
  };
}

function mapPayloadArticle(document: Record<string, unknown>): Article | null {
  if (
    typeof document.slug !== "string" ||
    typeof document.title !== "string" ||
    typeof document.excerpt !== "string" ||
    !isCategory(document.category)
  ) {
    return null;
  }

  const media = mediaValue(document.coverImage);
  return {
    slug: document.slug,
    title: document.title,
    date: typeof document.publishedAt === "string" ? document.publishedAt.slice(0, 10) : "",
    category: document.category,
    excerpt: document.excerpt,
    body: Array.isArray(document.body) ? document.body.map(String) : [],
    coverImage: media.url,
    coverImageAlt: media.alt,
  };
}

export const getArticles = cache(async (
  locale: Locale = defaultLocale,
): Promise<Article[]> => {
  const payload = await getCmsPayload();
  if (!payload) return getStaticArticles(locale);

  try {
    const viewer = await getCmsViewer(payload);
    const result = await payload.find({
      collection: "news",
      locale,
      fallbackLocale: "en",
      draft: viewer.draft,
      user: viewer.user ?? undefined,
      overrideAccess: false,
      depth: 1,
      limit: 100,
      sort: "-publishedAt",
    });
    return result.docs
      .map((document) => mapPayloadArticle(document as unknown as Record<string, unknown>))
      .filter((article): article is Article => article !== null);
  } catch (error) {
    console.error(`Unable to read Payload news for ${locale}.`, error);
    return getStaticArticles(locale);
  }
});

export async function getArticle(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<Article | undefined> {
  return (await getArticles(locale)).find((article) => article.slug === slug);
}

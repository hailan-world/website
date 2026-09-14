import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { getArticles } from "@/lib/content/news";
import { locales, localeHtmlLang } from "@/lib/i18n";
import { site } from "@/lib/site";

const sections = [
  "",
  "/products",
  "/oem-odm",
  "/manufacturing",
  "/about",
  "/quality",
  "/news",
  "/contact",
  "/linus",
] as const;

function localizedEntries(
  path: string,
  priority: number,
  changeFrequency: "weekly" | "monthly",
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {
    "x-default": `${site.url}/en${path}`,
  };
  for (const locale of locales) {
    languages[localeHtmlLang[locale]] = `${site.url}/${locale}${path}`;
  }

  return locales.map((locale) => ({
    url: `${site.url}/${locale}${path}`,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = sections.flatMap((path) =>
    localizedEntries(path, path === "" ? 1 : 0.8, "weekly"),
  );
  const productPages = products.flatMap((product) =>
    localizedEntries(`/products/${product.slug}`, 0.8, "monthly"),
  );
  const articleSlugs = new Set(
    locales.flatMap((locale) =>
      getArticles(locale).map((article) => article.slug),
    ),
  );
  const newsPages = [...articleSlugs].flatMap((slug) =>
    localizedEntries(`/news/${slug}`, 0.7, "monthly"),
  );

  return [...pages, ...productPages, ...newsPages];
}

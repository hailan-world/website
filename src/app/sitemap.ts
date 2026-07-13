import type { MetadataRoute } from "next";
import { articles } from "@/data/news";
import { products } from "@/data/products";
import { locales, localeHtmlLang } from "@/lib/i18n";
import { site } from "@/lib/site";

/** hreflang alternates for one path, e.g. "/products". */
function alternatesFor(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[localeHtmlLang[locale]] = `${site.url}/${locale}${path}`;
  }
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/products",
    "/manufacturing",
    "/quality",
    "/oem-odm",
    "/news",
    "/contact",
    "/linus",
  ];
  const productPaths = products.map((p) => `/products/${p.slug}`);
  const articleEntries = articles.map((a) => ({
    path: `/news/${a.slug}`,
    lastModified: new Date(`${a.date}T00:00:00Z`),
  }));

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${site.url}/${locale}${path}`,
        changeFrequency: path === "/news" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: alternatesFor(path),
      });
    }
    for (const path of productPaths) {
      entries.push({
        url: `${site.url}/${locale}${path}`,
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: alternatesFor(path),
      });
    }
    for (const { path, lastModified } of articleEntries) {
      entries.push({
        url: `${site.url}/${locale}${path}`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: alternatesFor(path),
      });
    }
  }

  return entries;
}

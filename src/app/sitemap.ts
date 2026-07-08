import type { MetadataRoute } from "next";
import { articles } from "@/data/news";
import { products } from "@/data/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/products",
    "/manufacturing",
    "/quality",
    "/oem-odm",
    "/news",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/news" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${site.url}/products/${product.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${site.url}/news/${article.slug}`,
    lastModified: new Date(`${article.date}T00:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}

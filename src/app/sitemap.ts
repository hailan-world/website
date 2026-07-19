import type { MetadataRoute } from "next";
import { verifiedSite } from "@/lib/verified-site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    "x-default": `${verifiedSite.url}/verified/en`,
    en: `${verifiedSite.url}/verified/en`,
    "zh-Hans": `${verifiedSite.url}/verified/zh`,
    ru: `${verifiedSite.url}/verified/ru`,
  };

  return (["en", "zh", "ru"] as const).map((locale) => ({
    url: `${verifiedSite.url}/verified/${locale}`,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages },
  }));
}

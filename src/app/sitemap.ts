import type { MetadataRoute } from "next";
import { verifiedSite } from "@/lib/verified-site";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "zh", "ru"] as const;
  const languageKey = { en: "en", zh: "zh-Hans", ru: "ru" } as const;

  return (["home", "linus"] as const).flatMap((section) => {
    const path = section === "home" ? "" : "/linus";
    const languages: Record<string, string> = {
      "x-default": `${verifiedSite.url}${path}/en`,
    };
    for (const locale of locales) {
      languages[languageKey[locale]] =
        `${verifiedSite.url}${path}/${locale}`;
    }

    return locales.map((locale) => ({
      url: `${verifiedSite.url}${path}/${locale}`,
      changeFrequency: "weekly" as const,
      priority: section === "home" ? 1 : 0.8,
      alternates: { languages },
    }));
  });
}

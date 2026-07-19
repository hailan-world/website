import type { MetadataRoute } from "next";
import { verifiedSite } from "@/lib/verified-site";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "zh", "ru"] as const;
  const languageKey = { en: "en", zh: "zh-Hans", ru: "ru" } as const;

  return (["verified", "linus"] as const).flatMap((section) => {
    const languages: Record<string, string> = {
      "x-default": `${verifiedSite.url}/${section}/en`,
    };
    for (const locale of locales) {
      languages[languageKey[locale]] =
        `${verifiedSite.url}/${section}/${locale}`;
    }

    return locales.map((locale) => ({
      url: `${verifiedSite.url}/${section}/${locale}`,
      changeFrequency: "weekly" as const,
      priority: section === "verified" ? 1 : 0.8,
      alternates: { languages },
    }));
  });
}

import "server-only";
import { cache } from "react";
import type { Locale } from "@/lib/i18n";
import { getCmsPayload, getCmsViewer } from "@/lib/cms";
import { siteContentAreas } from "@/cms/fields/site-content";
import en from "./dictionaries/en.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  zh: () => import("./dictionaries/zh.json").then((m) => m.default as Dictionary),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default as Dictionary),
  es: () => import("./dictionaries/es.json").then((m) => m.default as Dictionary),
  ru: () => import("./dictionaries/ru.json").then((m) => m.default as Dictionary),
  ar: () => import("./dictionaries/ar.json").then((m) => m.default as Dictionary),
  ja: () => import("./dictionaries/ja.json").then((m) => m.default as Dictionary),
  ms: () => import("./dictionaries/ms.json").then((m) => m.default as Dictionary),
  id: () => import("./dictionaries/id.json").then((m) => m.default as Dictionary),
};

const getStaticDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();

export const getDictionary = cache(async (locale: Locale): Promise<Dictionary> => {
  const fallback = await getStaticDictionary(locale);
  const payload = await getCmsPayload();
  if (!payload) return fallback;

  try {
    const viewer = await getCmsViewer(payload);
    const sections = await Promise.all(
      siteContentAreas.map((area) =>
        payload.findGlobal({
          slug: area.slug,
          locale,
          fallbackLocale: "en",
          draft: viewer.draft,
          user: viewer.user ?? undefined,
          overrideAccess: false,
        }),
      ),
    );
    const content = Object.assign({}, ...sections) as Partial<Dictionary>;

    if (!content.siteMeta || !content.nav || !content.common) return fallback;
    return content as Dictionary;
  } catch (error) {
    console.error(`Unable to read Payload site content for ${locale}.`, error);
    return fallback;
  }
});

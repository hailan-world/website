export const locales = ["en", "zh"] as const;

/** Previously configured locales retained only to redirect old public URLs. */
export const retiredLocales = ["fr", "es", "ru", "ar", "ja", "ms", "id"] as const;

/** Localized public pages are currently maintained only in these languages. */
export const publicLocales = locales;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Native-language names, shown in the language menu. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

/** Short label for the collapsed language switcher button. */
export const localeShortNames: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
};

/** BCP-47 tags for the html lang attribute and hreflang. */
export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  zh: "zh-Hans",
};

/** Text direction for each active locale. */
export const localeDir: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  zh: "ltr",
};

/** OpenGraph locale identifiers. */
export const localeOg: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_CN",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Prefix an internal path with the active locale. */
export function localizeHref(lang: Locale, path: string): string {
  if (!path.startsWith("/")) return path;
  if (path === "/") return `/${lang}`;
  return `/${lang}${path}`;
}

export const locales = ["en", "zh", "fr", "es", "ru", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Native-language names, shown in the language menu. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  fr: "Français",
  es: "Español",
  ru: "Русский",
  ar: "العربية",
};

/** Short label for the collapsed language switcher button. */
export const localeShortNames: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
  fr: "FR",
  es: "ES",
  ru: "RU",
  ar: "ع",
};

/** BCP-47 tags for the html lang attribute and hreflang. */
export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  zh: "zh-Hans",
  fr: "fr",
  es: "es",
  ru: "ru",
  ar: "ar",
};

/** Text direction — Arabic renders right-to-left. */
export const localeDir: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  zh: "ltr",
  fr: "ltr",
  es: "ltr",
  ru: "ltr",
  ar: "rtl",
};

/** OpenGraph locale identifiers. */
export const localeOg: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_CN",
  fr: "fr_FR",
  es: "es_ES",
  ru: "ru_RU",
  ar: "ar_AR",
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

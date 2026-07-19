export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(
  iso: string,
  locale: Locale = defaultLocale,
): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(
    localeHtmlLang[locale],
    {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
    },
  );
}
import type { Locale } from "@/lib/i18n";
import { defaultLocale, localeHtmlLang } from "@/lib/i18n";

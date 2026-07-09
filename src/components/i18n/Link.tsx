"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { defaultLocale, isLocale } from "@/lib/i18n";

type LinkProps = ComponentProps<typeof NextLink>;

/**
 * Drop-in replacement for `next/link` that prefixes internal, root-relative
 * hrefs (`/products`) with the locale currently in the URL (`/zh/products`).
 * External links, anchors, mailto/tel and already-prefixed paths pass through
 * untouched. Reading the locale from the pathname avoids threading `lang`
 * through every component.
 */
export function Link({ href, ...props }: LinkProps) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const current = segments[1];
  const lang = isLocale(current) ? current : defaultLocale;

  let localized = href;
  if (typeof href === "string" && href.startsWith("/")) {
    const first = href.split("/")[1];
    // Skip if it's already locale-prefixed.
    localized = isLocale(first) ? href : `/${lang}${href === "/" ? "" : href}`;
  }

  return <NextLink href={localized} {...props} />;
}

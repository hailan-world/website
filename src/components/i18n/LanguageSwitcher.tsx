"use client";

import { useEffect, useRef, useState } from "react";
import NextLink, { useLinkStatus } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  locales,
  localeNames,
  localeShortNames,
  isLocale,
  defaultLocale,
} from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Swap the leading /{locale} segment of the current path for `target`. */
function pathForLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  if (isLocale(segments[1])) {
    segments[1] = target;
  } else {
    segments.splice(1, 0, target);
  }
  return segments.join("/") || `/${target}`;
}

function persist(target: Locale) {
  document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="8" cy="8" rx="2.8" ry="6.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 8h12M2.8 5h10.4M2.8 11h10.4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="h-3.5 w-3.5 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path
        d="M12 3a9 9 0 0 1 9 9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Renders a spinner while its parent `<Link>` navigation is in flight.
 * `useLinkStatus` reads the pending state of the nearest ancestor Link, so this
 * gives per-option feedback the moment a locale is clicked — bridging the gap
 * until the new-locale page (a full route + layout re-render) is ready.
 */
function LinkSpinner() {
  const { pending } = useLinkStatus();
  return pending ? <Spinner /> : null;
}

export function LanguageSwitcher({
  current,
  label,
  variant = "inline",
}: {
  current: Locale;
  label: string;
  variant?: "inline" | "stacked";
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [openForPathname, setOpenForPathname] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const open = openForPathname === pathname;

  const active = isLocale(pathname.split("/")[1])
    ? (pathname.split("/")[1] as Locale)
    : (current ?? defaultLocale);

  // Warm the cache for every other locale before the menu even opens, so the
  // actual switch is instant. Viewport prefetch only kicks in once the dropdown
  // links mount (on open) — this gives them a head start on hover/focus.
  function prefetchAll() {
    for (const locale of locales) {
      if (locale !== active) router.prefetch(pathForLocale(pathname, locale));
    }
  }

  // Close the menu on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpenForPathname(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenForPathname(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (variant === "stacked") {
    return (
      <div role="group" aria-label={label}>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-400">
          {label}
        </p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {locales.map((locale) => {
            const isActive = locale === active;
            return (
              <NextLink
                key={locale}
                href={pathForLocale(pathname, locale)}
                hrefLang={locale}
                lang={locale}
                aria-current={isActive ? "true" : undefined}
                onClick={() => persist(locale)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors duration-300",
                  isActive
                    ? "border-azure-300 text-azure-300"
                    : "border-white/15 text-ink-200 hover:border-white/50 hover:text-white",
                )}
              >
                {localeNames[locale]}
                <LinkSpinner />
              </NextLink>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() =>
          setOpenForPathname((value) => (value === pathname ? null : pathname))
        }
        onPointerEnter={prefetchAll}
        onFocus={prefetchAll}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={label}
        className={cn(
          "flex h-10 items-center gap-2 rounded-full border px-3.5 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors duration-300",
          open
            ? "border-white/50 text-white"
            : "border-white/20 text-ink-200 hover:border-white/50 hover:text-white",
        )}
      >
        <GlobeIcon />
        {localeShortNames[active]}
      </button>

      {open && (
        <div className="absolute end-0 top-12 z-50 min-w-40 overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 py-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {locales.map((locale) => {
            const isActive = locale === active;
            return (
              <NextLink
                key={locale}
                href={pathForLocale(pathname, locale)}
                hrefLang={locale}
                lang={locale}
                aria-current={isActive ? "true" : undefined}
                onClick={() => persist(locale)}
                className={cn(
                  "flex items-center justify-between gap-6 px-5 py-2.5 text-sm transition-colors duration-200",
                  isActive
                    ? "text-azure-300"
                    : "text-ink-200 hover:bg-white/5 hover:text-white",
                )}
              >
                {localeNames[locale]}
                <span className="flex h-1.5 items-center">
                  <LinkSpinner />
                  {isActive && (
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-azure-300"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </NextLink>
            );
          })}
        </div>
      )}
    </div>
  );
}

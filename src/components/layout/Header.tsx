"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/components/i18n/Link";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { Logo } from "@/components/graphics/Logo";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/products", key: "products" },
  { href: "/oem-odm", key: "oemOdm" },
  { href: "/manufacturing", key: "manufacturing" },
  { href: "/about", key: "about" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" },
] as const;

/** Strip the leading /{locale} segment so links can be matched by path. */
function stripLocale(pathname: string): string {
  const rest = pathname.split("/").slice(2).join("/");
  return `/${rest}`;
}

export function Header({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const path = stripLocale(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const links = navItems.filter((item) => item.href !== "/contact");

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "border-b border-white/10 bg-ink-950/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between md:h-20">
            <Link
              href="/"
              aria-label="HAILAN — home"
              className="transition-opacity hover:opacity-80"
            >
              <Logo on="dark" />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
              {links.map((item) => {
                const active =
                  path === item.href || path.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-sm tracking-[-0.01em] transition-colors duration-300",
                      active ? "text-white" : "text-ink-200 hover:text-white",
                    )}
                  >
                    {dict.nav[item.key]}
                  </Link>
                );
              })}
              <LanguageSwitcher current={lang} label={dict.common.languageLabel} />
              <Link
                href="/contact"
                className="inline-flex h-10 items-center rounded-full bg-white px-5 text-sm font-medium text-ink-950 transition-colors duration-300 hover:bg-azure-100"
              >
                {dict.nav.contact}
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-6 bg-white transition-all duration-300",
                  open ? "rotate-45" : "-translate-y-[4.5px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-6 bg-white transition-all duration-300",
                  open ? "-rotate-45" : "translate-y-[4.5px]",
                )}
              />
            </button>
          </div>
        </Container>
      </header>

      {/* Always mounted; visibility driven by opacity so a missed transition
          can never leave an invisible overlay blocking the page. */}
      <div
        id="mobile-nav"
        inert={!open}
        className={cn(
          "fixed inset-0 z-40 overflow-y-auto bg-ink-950 transition-opacity duration-300 ease-swift lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
        <Container className="relative flex min-h-full flex-col pb-10 pt-28">
          <nav aria-label="Mobile" className="flex flex-col">
            {navItems.map((item, i) => {
              const active =
                path === item.href || path.startsWith(`${item.href}/`);
              return (
                <div
                  key={item.href}
                  className={cn(
                    "transition-all duration-500 ease-out-expo",
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-[18px] opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${60 + i * 50}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline gap-4 border-b border-white/10 py-5 text-3xl font-medium tracking-[-0.02em] transition-colors",
                      active ? "text-azure-300" : "text-white hover:text-azure-300",
                    )}
                  >
                    <span className="font-mono text-[11px] tracking-[0.2em] text-ink-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {dict.nav[item.key]}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div
            className={cn(
              "mt-auto pt-14 transition-opacity duration-500",
              open ? "opacity-100" : "opacity-0",
            )}
            style={{ transitionDelay: open ? "400ms" : "0ms" }}
          >
            <div className="mb-8">
              <LanguageSwitcher
                current={lang}
                label={dict.common.languageLabel}
                variant="stacked"
              />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-400">
              {dict.footer.globalInquiries}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 block text-lg text-white hover:text-azure-300"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="mt-1 block text-lg text-ink-200 hover:text-azure-300"
            >
              {site.phone}
            </a>
          </div>
        </Container>
      </div>
    </>
  );
}

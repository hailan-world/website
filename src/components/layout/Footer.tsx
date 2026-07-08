import Link from "next/link";
import { Logo } from "@/components/graphics/Logo";
import { Container } from "@/components/ui/Container";
import { products } from "@/data/products";
import { certifications, site } from "@/lib/site";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Quality", href: "/quality" },
  { label: "OEM / ODM", href: "/oem-odm" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.35]" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-14 py-20 md:grid-cols-2 md:py-24 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" aria-label="HAILAN — home" className="inline-block">
              <Logo on="dark" />
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink-300">
              {site.legalName} — a global manufacturer of decorative building
              materials, supplying partners in more than 60 countries from a
              120,000 m² production campus.
            </p>
            <ul className="mt-8 flex max-w-sm flex-wrap gap-2" aria-label="Certifications">
              {certifications.slice(0, 5).map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-white/12 px-3 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-300"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Products">
            <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ink-400">
              Products
            </h2>
            <ul className="mt-6 space-y-3.5">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-[15px] text-ink-200 transition-colors hover:text-white"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-[15px] text-ink-200 transition-colors hover:text-white"
                >
                  All products
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ink-400">
              Company
            </h2>
            <ul className="mt-6 space-y-3.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[15px] text-ink-200 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ink-400">
              Headquarters
            </h2>
            <address className="mt-6 text-[15px] not-italic leading-relaxed text-ink-200">
              {site.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 block text-[15px] text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-azure-300"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="mt-2 block text-[15px] text-ink-200 transition-colors hover:text-white"
            >
              {site.phone}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-8 text-[13px] text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName} All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em]">
            Engineered in Huzhou · Delivered worldwide
          </p>
        </div>
      </Container>
    </footer>
  );
}

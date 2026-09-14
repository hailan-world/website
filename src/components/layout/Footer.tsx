import { Link } from "@/components/i18n/Link";
import { Logo } from "@/components/graphics/Logo";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { verifiedSite } from "@/lib/verified-site";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.35]" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-14 py-20 md:grid-cols-2 md:py-24">
          <div>
            <Link href="/" aria-label="HAILAN — home" className="inline-block">
              <Logo on="dark" />
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink-300">
              {verifiedSite.legalNameZh}
            </p>
          </div>

          <div>
            <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ink-400">
              {dict.footer.headquarters}
            </h2>
            <address className="mt-6 text-[15px] not-italic leading-relaxed text-ink-200">
              {dict.footer.headquarters === "总部" ? "中国浙江金华" : verifiedSite.location}
            </address>
            <a
              href={`mailto:${verifiedSite.email}`}
              className="mt-5 block text-[15px] text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-azure-300"
            >
              {verifiedSite.email}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-8 text-[13px] text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {verifiedSite.legalNameZh} {dict.footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}

import { Link } from "@/components/i18n/Link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-ink-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 -top-64 h-[34rem] w-[34rem] rounded-full bg-azure-600/15 blur-[140px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" aria-hidden="true" />

      <Container className="relative py-32 text-center">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-azure-300">
          404 — Page not found
        </p>
        <h1 className="mx-auto mt-6 max-w-2xl text-balance text-4xl font-medium leading-[1.08] tracking-[-0.03em] md:text-6xl">
          This surface doesn&apos;t exist. Ours do.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-200">
          The page you&apos;re looking for has moved or was never manufactured.
          Head back to solid ground.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" variant="inverted" arrow>
            Back to home
          </Button>
          <Link
            href="/products"
            className="text-[15px] font-medium text-ink-200 transition-colors hover:text-white"
          >
            Browse products
          </Link>
        </div>
      </Container>
    </section>
  );
}

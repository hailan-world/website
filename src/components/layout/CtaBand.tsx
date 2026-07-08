import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import type { ReactNode } from "react";

interface CtaBandProps {
  title?: ReactNode;
  lede?: ReactNode;
  cta?: string;
}

/** Pre-footer call to action, framed as an inset dark panel. */
export function CtaBand({
  title = "Let’s build your next product together.",
  lede = "Tell us about your project, program or private-label ambition — our export team responds within one business day.",
  cta = "Start a conversation",
}: CtaBandProps) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink-950 px-6 py-20 text-center text-white md:px-16 md:py-28">
            <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -right-32 -top-48 h-[28rem] w-[28rem] rounded-full bg-azure-600/20 blur-[130px]"
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" aria-hidden="true" />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-3xl font-medium leading-[1.1] tracking-[-0.02em] md:text-5xl">
                {title}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-ink-200">
                {lede}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/contact" variant="inverted" arrow>
                  {cta}
                </Button>
                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-[13px] tracking-[0.06em] text-ink-200 transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

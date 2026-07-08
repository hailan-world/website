import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}

/** Dark opening band shared by all interior pages. */
export function PageHero({ eyebrow, title, lede, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 -top-64 h-[34rem] w-[34rem] rounded-full bg-azure-600/15 blur-[140px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950"
        aria-hidden="true"
      />

      <Container className="relative pb-16 pt-36 md:pb-24 md:pt-48">
        <Reveal>
          <Eyebrow on="dark">{eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-medium leading-[1.08] tracking-[-0.03em] md:text-6xl">
            {title}
          </h1>
          {lede && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200">
              {lede}
            </p>
          )}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}

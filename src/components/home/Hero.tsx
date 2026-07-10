import type { CSSProperties } from "react";
import { HeroArt } from "@/components/graphics/HeroArt";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export function Hero({ dict }: { dict: Dictionary }) {
  const lines = [
    <span key="l1">{dict.hero.headlineLine1}</span>,
    <span key="l2">
      {dict.hero.headlineLine2}
      <span className="text-azure-400">.</span>
    </span>,
  ];

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-ink-950 text-white">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-64 -top-72 h-[42rem] w-[42rem] rounded-full bg-azure-600/[0.13] blur-[64px] md:blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-80 right-[-10rem] h-[38rem] w-[38rem] rounded-full bg-azure-500/[0.09] blur-[64px] md:blur-[160px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-ink-950"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-16 pb-28 pt-36 md:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
          <div>
            <p
              className="hero-rise font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-azure-300"
              style={{ "--delay": "0.1s", "--rise": "14px" } as CSSProperties}
            >
              {dict.hero.kicker}
            </p>

            <h1 className="mt-7 text-[2.6rem] font-medium leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[4.4rem]">
              {lines.map((line, i) => (
                <span key={i} className="-mb-1 block overflow-hidden pb-1">
                  <span
                    className="hero-line block"
                    style={{ "--delay": `${0.18 + i * 0.13}s` } as CSSProperties}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="hero-rise mt-7 max-w-xl text-lg leading-relaxed text-ink-200"
              style={{ "--delay": "0.55s", "--rise": "18px" } as CSSProperties}
            >
              {dict.hero.lede}
            </p>

            <div
              className="hero-rise mt-10 flex flex-wrap items-center gap-4"
              style={{ "--delay": "0.7s", "--rise": "18px" } as CSSProperties}
            >
              <Button href="/contact" variant="inverted" arrow>
                {dict.common.requestSamples}
              </Button>
              <Button href="/products" variant="outlineDark">
                {dict.common.exploreProducts}
              </Button>
            </div>

            <p
              className="hero-rise mt-14 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400"
              style={{ "--delay": "1.05s", "--rise": "0px" } as CSSProperties}
            >
              {dict.hero.badge}
            </p>
          </div>

          <div
            className="hero-rise hidden lg:block"
            style={{ "--delay": "0.5s", "--rise": "40px" } as CSSProperties}
          >
            <HeroArt className="ml-auto w-full max-w-[34rem]" />
          </div>
        </div>
      </Container>

      <div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400">
          {dict.hero.scroll}
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/15">
          <span className="scroll-cue absolute left-0 top-0 h-4 w-px bg-azure-300" />
        </span>
      </div>
    </section>
  );
}

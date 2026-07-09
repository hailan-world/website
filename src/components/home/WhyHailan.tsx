import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export function WhyHailan({ dict }: { dict: Dictionary }) {
  const t = dict.why;

  return (
    <section className="py-24 md:py-36">
      <Container>
        <SectionHead eyebrow={t.eyebrow} title={t.title} lede={t.lede} />

        <div className="mt-16 grid gap-x-14 gap-y-14 md:grid-cols-2">
          {t.reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.08}>
              <div className="flex gap-7 border-t border-ink-950/10 pt-8">
                <span
                  className="select-none text-[2.6rem] font-medium leading-none tracking-[-0.03em] text-mist-300"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.01em] text-ink-950">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist-600">
                    {reason.text}
                  </p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-600">
                    {reason.proof}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

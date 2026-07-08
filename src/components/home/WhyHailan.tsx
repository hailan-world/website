import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

const reasons = [
  {
    title: "Reliable supply",
    text: "Capacity is planned around partner forecasts, with safety stock held on running programs. Across the last three years, 98.6% of containers shipped on or before the confirmed date.",
    proof: "98.6% on-time shipment",
  },
  {
    title: "Stable quality",
    text: "One quality system governs every line. Products are batch-coded, lab-verified and visually inspected — so the hundredth container matches the first sample you approved.",
    proof: "AQL 2.5 · Full batch traceability",
  },
  {
    title: "Global experience",
    text: "Certification, documentation, packaging and logistics are tuned to each destination — from EU REACH and CE marking to US FloorScore and Gulf conformity schemes.",
    proof: "60+ markets served",
  },
  {
    title: "Professional team",
    text: "English-speaking project managers and engineers answer in hours, not days — and stay with your program through reorders, redesigns and market shifts.",
    proof: "24-hour response commitment",
  },
];

export function WhyHailan() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <SectionHead
          eyebrow="04 — Why HAILAN"
          title="The capability behind labels and projects worldwide."
          lede="Partners rarely switch suppliers over price. They switch over surprises. Our job is to remove them."
        />

        <div className="mt-16 grid gap-x-14 gap-y-14 md:grid-cols-2">
          {reasons.map((reason, i) => (
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

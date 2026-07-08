import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to HAILAN's export team about distribution, OEM programs or project supply. We respond within one business day.",
};

const expectations = [
  {
    step: "01",
    title: "Response within 24 hours",
    text: "A named export manager — not an autoresponder — replies within one business day.",
  },
  {
    step: "02",
    title: "Specifications & pricing",
    text: "You receive technical data, indicative pricing and honest lead times for your market.",
  },
  {
    step: "03",
    title: "Samples on their way",
    text: "Standard samples dispatch within days; custom sampling runs 7–10 days from approved artwork.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your program."
        lede="Distribution, private label, project supply or a single technical question — the fastest way to evaluate HAILAN is to start a conversation."
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            {/* Contact details */}
            <Reveal className="lg:col-span-5">
              <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-500">
                Global inquiries
              </h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-5 block text-2xl font-medium tracking-[-0.01em] text-ink-950 transition-colors hover:text-azure-600 md:text-3xl"
              >
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="mt-2 block text-lg text-mist-600 transition-colors hover:text-ink-950"
              >
                {site.phone}
              </a>

              <h2 className="mt-12 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-500">
                Headquarters & factory
              </h2>
              <address className="mt-5 text-[15px] not-italic leading-relaxed text-mist-600">
                {site.legalName}
                {site.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <p className="mt-4 text-[13px] leading-relaxed text-mist-500">
                Office hours: Monday – Friday, 08:30 – 18:00 (GMT+8).
                <br />
                Factory visits and audits welcome by appointment.
              </p>

              <div className="mt-12 border-t border-ink-950/10 pt-10">
                <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-500">
                  What happens next
                </h2>
                <ol className="mt-6 space-y-6">
                  {expectations.map((item) => (
                    <li key={item.step} className="flex gap-5">
                      <span className="font-mono text-[11px] tracking-[0.2em] text-azure-600">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="text-[15px] font-medium text-ink-950">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-mist-600">
                          {item.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.12} className="lg:col-span-7">
              <div className="rounded-2xl border border-ink-950/10 bg-mist-50 p-7 md:p-10">
                <h2 className="text-xl font-medium tracking-[-0.01em] text-ink-950">
                  Send an inquiry
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-mist-600">
                  The more you tell us about your market and volumes, the more
                  precise our first reply can be.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

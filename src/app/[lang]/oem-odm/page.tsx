import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { getDictionary } from "../dictionaries";

const pageCopy = {
  zh: {
    hero: { eyebrow: "合作方式", title: "不止一种合作路径。", lede: "OEM、ODM 与 HAILAN 自有品牌属于不同的业务维度。以下框架用于共同确认海蓝当前能提供什么，以及未来希望发展什么。" },
    process: {
      eyebrow: "合作路径", title: "从需求开始，而不是从缩写开始。", lede: "实际流程、负责人和时间仍需销售、产品与生产部门共同确认。",
      steps: [
        { title: "了解需求", meta: "待确认", text: "确认客户市场、产品、数量、品牌与时间要求。〔待确认〕" },
        { title: "判断合作类型", meta: "待确认", text: "判断属于来样生产、共同开发、现有方案选型或自有品牌供货。〔待确认〕" },
        { title: "确认可行性", meta: "待确认", text: "由相关团队确认材料、结构、产能、价格与合规边界。〔待确认〕" },
        { title: "样品与文件", meta: "待确认", text: "确认是否打样、由谁批准，以及可提供哪些技术和合规文件。〔待确认〕" },
        { title: "订单与交付", meta: "待确认", text: "确认订单、生产、检验、包装和物流的实际流程。〔待确认〕" },
        { title: "持续合作", meta: "待确认", text: "确认返单、变更、售后与品牌支持的责任边界。〔待确认〕" },
      ],
    },
    services: {
      eyebrow: "业务模式", title: "三种模式，分别确认。",
      items: [
        { title: "OEM · 贴牌生产", text: "客户定义品牌与主要产品要求，海蓝承担制造。可接受的产品、数量与定制范围待确认。" },
        { title: "ODM · 产品开发", text: "海蓝提供现有产品方案或参与共同开发。设计、研发、打样与知识产权边界待确认。" },
        { title: "HAILAN · 自有品牌", text: "自有品牌不是代工服务。是否已有对外销售、覆盖哪些产品与市场，以及与客户品牌如何区分，均待确认。" },
      ],
    },
    assurances: {
      eyebrow: "待确认边界", title: "先把真实能力说清楚。", intro: "在公开合作承诺前，需要内部确认以下问题：",
      points: ["哪些产品可以做 OEM？", "哪些方案属于 ODM，知识产权如何约定？", "HAILAN 自有品牌目前处于什么阶段？", "打样、MOQ、交期、文件与售后分别由谁负责？"],
    },
    cta: { title: "告诉我们你希望怎样合作。", lede: "提供产品、市场、品牌方式和预计数量，商务团队将根据当前实际能力回复。", button: "联系商务团队" },
  },
  en: {
    hero: { eyebrow: "Partnership", title: "More than one way to work together.", lede: "OEM, ODM and the HAILAN brand describe different business dimensions. This framework separates current capabilities from future direction." },
    process: {
      eyebrow: "Working path", title: "Start with the requirement, not the acronym.", lede: "The actual process, owners and timing require confirmation by commercial, product and production teams.",
      steps: [
        { title: "Understand the requirement", meta: "To confirm", text: "Clarify market, product, volume, brand and timing requirements.〔REQUIRES VERIFICATION〕" },
        { title: "Identify the model", meta: "To confirm", text: "Determine whether the enquiry is build-to-spec, co-development, existing selection or own-brand supply.〔REQUIRES VERIFICATION〕" },
        { title: "Confirm feasibility", meta: "To confirm", text: "Confirm materials, construction, capacity, pricing and compliance boundaries.〔REQUIRES VERIFICATION〕" },
        { title: "Samples and documents", meta: "To confirm", text: "Agree sampling, approval and available technical documentation.〔REQUIRES VERIFICATION〕" },
        { title: "Order and delivery", meta: "To confirm", text: "Confirm the real order, production, inspection, packing and logistics process.〔REQUIRES VERIFICATION〕" },
        { title: "Ongoing cooperation", meta: "To confirm", text: "Define responsibilities for repeats, changes, after-sales and brand support.〔REQUIRES VERIFICATION〕" },
      ],
    },
    services: { eyebrow: "Business models", title: "Three models, confirmed separately.", items: [
      { title: "OEM · Private label", text: "The customer defines the brand and principal product requirements; HAILAN manufactures. Product and customization scope require confirmation." },
      { title: "ODM · Product development", text: "HAILAN may offer existing solutions or participate in co-development. Design, sampling and IP boundaries require confirmation." },
      { title: "HAILAN · Own brand", text: "An own brand is not a contract-manufacturing service. Current products, markets and separation from customer brands require confirmation." },
    ] },
    assurances: { eyebrow: "Boundaries to confirm", title: "Describe the real capability first.", intro: "Before making public commitments, the following questions require internal confirmation:", points: ["Which products support OEM?", "What qualifies as ODM and how is IP handled?", "What is the current stage of the HAILAN brand?", "Who owns sampling, MOQ, lead time, documents and after-sales responsibilities?"] },
    cta: { title: "Tell us how you want to work.", lede: "Share the product, market, brand model and expected volume; the commercial team will respond based on current capability.", button: "Contact the commercial team" },
  },
} as const;

interface OemOdmPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: OemOdmPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.oemOdmPage.meta.title,
    description: dict.oemOdmPage.meta.description,
  };
}

export default async function OemOdmPage({ params }: OemOdmPageProps) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const t = dict.oemOdmPage;
  void pageCopy;

  const steps = t.process.steps.map((s, i) => ({
    step: String(i + 1).padStart(2, "0"),
    title: s.title,
    text: s.text,
    meta: s.meta,
  }));

  const services = t.services.items;
  const assurances = t.assurances.points;

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lede={t.hero.lede} />

      {/* Process */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHead
            eyebrow={t.process.eyebrow}
            title={t.process.title}
            lede={t.process.lede}
          />
          <ol className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.07}>
                <li className="flex h-full flex-col border-t border-ink-950/10 pt-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-[11px] tracking-[0.22em] text-azure-600">
                      {s.step}
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-mist-400">
                      {s.meta}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-medium tracking-[-0.01em] text-ink-950">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist-600">
                    {s.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Services */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-32">
        <div
          className="pointer-events-none absolute -right-56 top-10 h-[32rem] w-[32rem] rounded-full bg-azure-600/10 blur-[64px] md:blur-[150px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />
        <Container className="relative">
          <SectionHead
            on="dark"
            eyebrow={t.services.eyebrow}
            title={t.services.title}
          />
          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.07}>
                <div className="border-t border-white/12 pt-7">
                  <h3 className="text-lg font-medium tracking-[-0.01em]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-300">
                    {service.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Assurances */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHead
                eyebrow={t.assurances.eyebrow}
                title={t.assurances.title}
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                {t.assurances.intro}
              </p>
              <ul className="mt-8 space-y-4">
                {assurances.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-[15px] leading-relaxed text-mist-600"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-azure-600"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand title={t.cta.title} lede={t.cta.lede} cta={t.cta.button} />
    </>
  );
}

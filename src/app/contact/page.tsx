import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "联系",
  description:
    "联系 HAILAN 出口团队，讨论经销、OEM 项目或工程供货。我们将在一个工作日内回复。",
};

const expectations = [
  {
    step: "01",
    title: "24 小时内响应",
    text: "由明确的出口经理在一个工作日内回复，而不是自动邮件。",
  },
  {
    step: "02",
    title: "规格与报价",
    text: "你会收到适合目标市场的技术资料、参考报价和真实交期。",
  },
  {
    step: "03",
    title: "样品安排",
    text: "标准样品数天内寄出；定制打样在稿件确认后 7–10 天完成。",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="联系"
        title="聊聊你的项目。"
        lede="无论是经销、自有品牌、工程供货，还是一个具体技术问题，评估 HAILAN 最快的方式就是先开始沟通。"
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            {/* Contact details */}
            <Reveal className="lg:col-span-5">
              <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-500">
                全球咨询
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
                总部与工厂
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
                办公时间：周一至周五，08:30 – 18:00（GMT+8）。
                <br />
                欢迎预约工厂参观与审核。
              </p>

              <div className="mt-12 border-t border-ink-950/10 pt-10">
                <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-mist-500">
                  接下来会发生什么
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
                  发送咨询
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-mist-600">
                  你提供的市场和采购量信息越完整，我们的首次回复就越精准。
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

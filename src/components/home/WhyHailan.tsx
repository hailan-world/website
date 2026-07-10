import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

const reasons = [
  {
    title: "可靠供应",
    text: "产能围绕合作伙伴预测安排，持续项目保留安全库存。过去三年，98.6% 的集装箱按确认日期或提前出运。",
    proof: "98.6% 准时出运",
  },
  {
    title: "稳定质量",
    text: "同一质量体系覆盖每条产线。产品经过批次编码、实验室验证和外观检验，确保第 100 个集装箱也匹配你批准的第一块样品。",
    proof: "AQL 2.5 · 完整批次追溯",
  },
  {
    title: "全球经验",
    text: "认证、文件、包装和物流均按目的地市场调校，从欧盟 REACH 与 CE 标识，到美国 FloorScore 和海湾合规体系。",
    proof: "服务 60+ 市场",
  },
  {
    title: "专业团队",
    text: "项目经理和工程师以小时为单位响应，而不是让你等待数天，并在复购、重设计和市场变化中持续跟进项目。",
    proof: "24 小时响应承诺",
  },
];

export function WhyHailan() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <SectionHead
          eyebrow="04 — 为什么选择 HAILAN"
          title="全球品牌标签与项目背后的制造能力。"
          lede="合作伙伴很少只因价格更换供应商，真正让人离开的往往是意外。我们的工作就是消除意外。"
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

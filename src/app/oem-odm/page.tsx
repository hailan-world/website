import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

export const metadata: Metadata = {
  title: "OEM / ODM",
  description:
    "面向地材与声学表面的自有品牌和定制开发项目：内部花色开发、7–10 天打样、零售级包装和完整合规文件包。",
};

const steps = [
  {
    step: "01",
    title: "需求与可行性",
    text: "分享你的市场、价格定位、目标结构和采购量。数天内你会收到可行性反馈：我们的建议、成本和交付速度。",
    meta: "2–5 天",
  },
  {
    step: "02",
    title: "花色与结构开发",
    text: "设计工作室按你的品牌方向开发花色、色系和表面纹理，或对现有系列进行工程优化以提升成本与性能。",
    meta: "1–2 周",
  },
  {
    step: "03",
    title: "打样",
    text: "专属打样工作室使用实验设备制作工厂级样品。你批准的结构，就是最终出货的结构。",
    meta: "7–10 天",
  },
  {
    step: "04",
    title: "试生产",
    text: "试产以产线速度验证结构。正式量产前，你会收到试产样品、完整实验室结果和最终包装确认稿。",
    meta: "2–3 周",
  },
  {
    step: "05",
    title: "量产",
    text: "生产按你的预测排期，通过 MES 跟踪，并在每道关口检验。标准交期为订单确认后 25–35 天。",
    meta: "25–35 天",
  },
  {
    step: "06",
    title: "物流与复购",
    text: "集装箱按计划装载，文件符合目的地要求，装柜过程拍照记录。持续项目保留安全库存和模具，便于快速复购。",
    meta: "持续",
  },
];

const services = [
  {
    title: "自有品牌制造",
    text: "你的品牌、你的包装、你的规格，在我们的质量体系下生产。从纸箱稿件到展示板，所有内容都按零售级交付。",
  },
  {
    title: "定制产品开发",
    text: "新结构、厚度、规格和声学目标均按你的市场价位工程化开发，并由我们的模具、膜库和纤维供应体系支撑。",
  },
  {
    title: "花色与色彩工作室",
    text: "内部设计师跟踪欧美室内趋势，并将其转化为专属于你项目的木纹、石纹、织物和抽象花色。",
  },
  {
    title: "展示物料与打样",
    text: "样板、样册、链卡和门店陈列物料与产品在同一工作室制作，匹配你的品牌稿件并随首批订单发运。",
  },
  {
    title: "合规负责",
    text: "我们维护你的市场所需证书，包括 CE、FloorScore®、REACH 和防火等级，并为每个项目提供完整合规文件包。",
  },
  {
    title: "项目管理",
    text: "一名项目经理从需求到复购全程负责你的项目，承诺 24 小时响应，并提供完整生产状态可见性。",
  },
];

const assurances = [
  "你的设计和花色归你所有，独家权益写入合同",
  "结构透明：完整材料规格清晰披露",
  "任何量产承诺前均先完成试产确认",
  "持续项目保留安全库存和专用模具",
];

export default function OemOdmPage() {
  return (
    <>
      <PageHero
        eyebrow="OEM / ODM"
        title="你的品牌，我们的工厂，一个负责到底的伙伴。"
        lede="HAILAN 生产的大部分产品都带着合作伙伴的名字。自有品牌和定制开发不是副业，而是我们的核心业务，并配有专门的工作室、团队和流程。"
      />

      {/* Process */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHead
            eyebrow="项目路径"
            title="从初始需求到装柜出货，六步完成。"
            lede="每一步都有明确负责人、交付物和时间线，让你始终知道项目进展到哪里。"
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
          className="pointer-events-none absolute -right-56 top-10 h-[32rem] w-[32rem] rounded-full bg-azure-600/10 blur-[150px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />
        <Container className="relative">
          <SectionHead
            on="dark"
            eyebrow="我们替你承担的工作"
            title="从你的想法到你的仓库之间的一切。"
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
                eyebrow="合作条款"
                title="建立在保护机制上，而不是口头承诺上。"
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                自有品牌合作只有在品牌方受到保护时才成立。以下承诺会写入我们签署的每一份 OEM 和 ODM 协议：
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

      <CtaBand
        title="把你的下一个系列交给我们讨论。"
        lede="一个结构目标、一块竞品样品，甚至只是一个价格点，都足以开始。数天内给出可行性反馈，两周内完成样品。"
        cta="开启 OEM 沟通"
      />
    </>
  );
}

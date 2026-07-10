import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "制造能力",
  description:
    "走进 HAILAN 120,000 m² 一体化园区：25 条生产线、MES 跟踪自动化和在线质量控制，将原料转化为带批次码的出口包装成品。",
};

const capabilities = [
  {
    value: stats.facility,
    suffix: " m²",
    label: "一体化生产园区",
  },
  { value: stats.lines, suffix: "", label: "挤出、压延与簇绒产线" },
  { value: stats.capacity, suffix: "M m²", label: "年产能" },
  { value: 24, suffix: "/7", label: "MES 监控运行" },
];

const processSteps = [
  {
    step: "01",
    title: "材料准备",
    text: "原生与认证回收聚合物、增塑剂、稳定剂和纤维按配方批量准备，每个来料批次在放行生产前均按规格测试。",
  },
  {
    step: "02",
    title: "挤出与压延",
    text: "双螺杆挤出机和四辊压延机将芯层与耐磨层控制在公差范围内，在线激光测厚实时反馈修正。",
  },
  {
    step: "03",
    title: "复合与压制",
    text: "装饰膜、耐磨层和芯层在热压下结合。同步压纹板让表面纹理与印刷花色匹配，呈现自然深度。",
  },
  {
    step: "04",
    title: "表面处理与 UV 固化",
    text: "聚氨酯涂层按每个项目要求达到指定光泽和耐刮性能，从哑光到柔光均每小时用光泽仪验证。",
  },
  {
    step: "05",
    title: "精密成型",
    text: "CNC 双端铣将锁扣、倒角和规格控制在 ±0.15 mm。PET 板材通过开槽单元加工格栅、穿孔和项目几何造型。",
  },
  {
    step: "06",
    title: "检验、包装与装柜",
    text: "每件产品在装入带批次码纸箱前完成外观与尺寸检验，随后托盘化、装柜规划并入柜，每个装载阶段均拍照记录。",
  },
];

const automation = [
  {
    title: "MES 生产跟踪",
    text: "每个订单从原料批次到集装箱号都通过制造执行系统追踪，相关数据也会进入合作伙伴看到的出货文件。",
  },
  {
    title: "在线测量",
    text: "激光测厚仪、色差仪和视觉系统在生产过程中持续测量，而不是事后只测样品。",
  },
  {
    title: "自动化搬运",
    text: "机器人码垛和 AGV 线间转运减少搬运损伤，并让表面质量在包装前保持一致。",
  },
  {
    title: "能源与水系统",
    text: "屋顶光伏供应 22% 的电力；压延线闭环水系统使工艺用水量同比降低 17%。",
  },
];

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="制造能力"
        title="从聚合物原料到装柜出运，一个园区完成。"
        lede="关键环节不外包。挤出、复合、簇绒、成型、检验和包装都在湖州同一个 MES 跟踪基地完成，这也是第 100 个集装箱仍能匹配第一块样品的原因。"
      />

      {/* Capability stats */}
      <section className="py-20 md:py-28">
        <Container>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {capabilities.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <dd className="text-4xl font-medium tracking-[-0.02em] text-ink-950 md:text-[2.75rem]">
                  <Counter value={item.value} />
                  <span className="text-azure-600">{item.suffix}</span>
                </dd>
                <dt className="mt-2.5 max-w-[16rem] text-sm text-mist-500">
                  {item.label}
                </dt>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-mist-50 py-24 md:py-32">
        <Container>
          <SectionHead
            eyebrow="生产线"
            title="六个阶段，零关键外部交接。"
            lede="每个阶段都把测量数据传递给下一阶段，让问题在源头修正，而不是到最终检验才被发现。"
          />
          <ol className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.07}>
                <li className="border-t border-ink-950/10 pt-7">
                  <span className="font-mono text-[11px] tracking-[0.22em] text-azure-600">
                    {step.step}
                  </span>
                  <h3 className="mt-4 text-lg font-medium tracking-[-0.01em] text-ink-950">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist-600">
                    {step.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Automation */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-32">
        <div
          className="pointer-events-none absolute -right-56 top-10 h-[32rem] w-[32rem] rounded-full bg-azure-600/10 blur-[150px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />
        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <SectionHead
                on="dark"
                eyebrow="自动化"
                title="机器测量，人员决策。"
                lede="HAILAN 的自动化不是为了减少人，而是为了减少波动。仪器监控每一米生产，让工程师基于数据行动，而不是凭猜测判断。"
              />
              <Reveal delay={0.2}>
                <ArrowLink href="/quality" on="dark" className="mt-10">
                  了解质量控制
                </ArrowLink>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
                {automation.map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.08}>
                    <div className="border-t border-white/12 pt-7">
                      <h3 className="text-lg font-medium tracking-[-0.01em]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-ink-300">
                        {item.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Export logistics */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHead
                eyebrow="出口物流"
                title="工程化管理直到货物上船。"
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                如果集装箱迟到或货损，制造 excellence 就失去意义。我们的物流团队按重量限制和混装项目为每票货物规划装柜，制作符合目的地要求的出口文件，并记录每个装载阶段。上海港和宁波港距离园区均在三小时车程内。
              </p>
              <ul className="mt-8 grid gap-3 text-[15px] text-mist-600 sm:grid-cols-2">
                {[
                  "跨产品线混柜",
                  "按道路限重优化装载计划",
                  "目的地专属文件",
                  "98.6% 准时出运记录",
                ].map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-azure-600" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand
        title="欢迎审核我们，真的。"
        lede="信任一家工厂最快的方式就是亲自走一遍。我们全年接待合作伙伴审核和工厂参观，也可以先从实时视频参观开始。"
        cta="预约工厂参观"
      />
    </>
  );
}

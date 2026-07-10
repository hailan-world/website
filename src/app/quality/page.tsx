import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { certifications } from "@/lib/site";

export const metadata: Metadata = {
  title: "质量体系",
  description:
    "同一质量体系管理 HAILAN 每条产线：来料测试、每小时在线检查、实验室验证，以及从原料批次到集装箱的完整追溯。",
};

const gates = [
  {
    step: "关口 01",
    title: "来料",
    text: "每批聚合物、薄膜、纱线和助剂在放行前均按采购规格抽样测试。不合格批次会被隔离并退回，不会进入产线。",
  },
  {
    step: "关口 02",
    title: "每小时在线检查",
    text: "每条运行产线每小时测量厚度、尺寸、色差、光泽和表面质量，并记录到批次码中。偏差会在设备端触发修正，而不是等到最终检验。",
  },
  {
    step: "关口 03",
    title: "实验室验证",
    text: "现场实验室对每个生产批次进行耐磨、尺寸稳定、翘曲、剥离强度、声学和色牢度测试，采用与第三方实验室相同的 ISO、EN 和 ASTM 方法。",
  },
  {
    step: "关口 04",
    title: "出货前检验",
    text: "成品在包装前按 AQL 2.5 检验，并在装柜时再次检查并拍照记录。合作伙伴会随出货文件收到检验数据。",
  },
];

const labTests = [
  { test: "耐磨与磨耗", standard: "EN 660 · ASTM F510" },
  { test: "尺寸稳定与翘曲", standard: "ISO 23999 · EN 434" },
  { test: "残余压痕", standard: "ISO 24343-1" },
  { test: "耐光色牢度", standard: "ISO 105-B02（氙弧）" },
  { test: "燃烧性能", standard: "EN 13501-1 · ASTM E648 / E84" },
  { test: "吸声性能（PET 板）", standard: "ISO 354 · ASTM C423" },
  { test: "撞击声降低", standard: "ISO 10140-3" },
  { test: "VOC 排放", standard: "FloorScore® · ISO 16000" },
  { test: "防滑性能", standard: "DIN 51130 · EN 13893" },
  { test: "剥离与粘结强度", standard: "EN 431 · ISO 24345" },
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="质量体系"
        title="第 100 个集装箱也必须匹配第一块样品。"
        lede="这句话就是我们的质量哲学。这里的关口、实验室和追溯体系，都是为了让它在每一次出货中成立。"
      />

      {/* Four gates */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHead
            eyebrow="体系"
            title="从原料到你的仓库之间有四道关口。"
            lede="质量不是最后检验的部门，而是产品必须经过的一系列关口，并且每一道关口都留下记录。"
          />
          <div className="mt-16 grid gap-x-14 gap-y-14 md:grid-cols-2">
            {gates.map((gate, i) => (
              <Reveal key={gate.step} delay={i * 0.08}>
                <div className="border-t border-ink-950/10 pt-8">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-azure-600">
                    {gate.step}
                  </span>
                  <h3 className="mt-4 text-xl font-medium tracking-[-0.01em] text-ink-950">
                    {gate.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist-600">
                    {gate.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Laboratory */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-32">
        <div
          className="pointer-events-none absolute -left-52 top-16 h-[30rem] w-[30rem] rounded-full bg-azure-600/10 blur-[150px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />
        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <SectionHead
                on="dark"
                eyebrow="现场实验室"
                title="按你的市场监管方法进行测试。"
                lede="我们的实验室执行与认证机构相同的 ISO、EN 和 ASTM 流程，因此第三方结果不会让我们，也不会让你意外。"
              />
            </div>
            <Reveal delay={0.15} className="lg:col-span-7">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  实验室测试及对应标准
                </caption>
                <thead>
                  <tr className="border-b border-white/15">
                    <th
                      scope="col"
                      className="pb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-400"
                    >
                      测试
                    </th>
                    <th
                      scope="col"
                      className="pb-4 text-right font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-400"
                    >
                      方法
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {labTests.map((row) => (
                    <tr key={row.test} className="border-b border-white/8">
                      <td className="py-3.5 pr-6 text-[15px]">{row.test}</td>
                      <td className="py-3.5 text-right font-mono text-[12px] tracking-[0.04em] text-ink-300">
                        {row.standard}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Traceability */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHead
                eyebrow="追溯"
                title="每一箱产品都能说明自己的来源。"
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                HAILAN 发出的每一箱产品都带有批次码，在 MES 中可追溯到背后的原料批次、生产线、班次、在线测量和实验室结果。如果合作伙伴提出索赔，我们会在 48 小时内用数据回应，而不是用意见回应。
              </p>
              <p className="mt-6 text-lg leading-relaxed text-mist-600">
                同一套记录也进入持续改进闭环：索赔率、一次合格率和颜色一致性由负责产线的工程师每周复盘。
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="bg-mist-50 py-24 md:py-32">
        <Container>
          <SectionHead
            eyebrow="认证"
            title="让清关和规格指定更顺畅的文件体系。"
            lede="证书持续维护，并作为每个项目的合规文件包随货提供，面向进口商、规格顾问和零售连锁即可使用。"
            align="center"
            className="mx-auto"
          />
          <Reveal className="mt-12">
            <ul
              className="flex flex-wrap justify-center gap-3"
              aria-label="认证与标准"
            >
              {certifications.map((c) => (
                <li key={c}>
                  <Chip className="px-5 py-2.5 text-[13px]">{c}</Chip>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title="索取我们的合规文件包。"
        lede="任一产品线的测试报告、证书和技术数据表均可按目的地市场整理，并在一个工作日内提供。"
        cta="索取文件"
      />
    </>
  );
}

import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

const pillars = [
  {
    n: "A",
    title: "自动化生产",
    text: "25 条挤出、压延和簇绒产线在 MES 系统跟踪下运行，激光厚度在线测量，而不是事后抽检。",
  },
  {
    n: "B",
    title: "在线质量控制",
    text: "尺寸、表面和颜色每小时检查一次，并记录到随每箱产品出货的批次码中。",
  },
  {
    n: "C",
    title: "研发与模具",
    text: "内部花色开发、压纹板和实验压机，可在数天内将合作伙伴想法转化为工厂级样品。",
  },
  {
    n: "D",
    title: "OEM 能力",
    text: "专属打样工作室和双语项目经理，将自有品牌项目从最初需求推进到装柜出货。",
  },
];

const processSteps = [
  "材料准备",
  "挤出与压延",
  "复合与压制",
  "UV 固化",
  "精密成型",
  "100% 检验",
];

export function ManufacturingBand() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-36">
      <div
        className="pointer-events-none absolute -left-52 top-16 h-[30rem] w-[30rem] rounded-full bg-azure-600/10 blur-[150px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            on="dark"
            eyebrow="03 — 卓越制造"
            title="工业规模下的精密控制。"
            lede="一个一体化园区将聚合物和纤维原料转化为完成包装、带批次码的成品，关键环节不外包。"
          />
          <Reveal delay={0.15} className="hidden pb-2 md:block">
            <ArrowLink href="/manufacturing" on="dark">
              走进制造体系
            </ArrowLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.09}>
              <div className="border-t border-white/12 pt-7">
                <span className="font-mono text-[11px] tracking-[0.22em] text-azure-300">
                  {pillar.n}
                </span>
                <h3 className="mt-4 text-lg font-medium tracking-[-0.01em]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-300">
                  {pillar.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 md:hidden">
          <ArrowLink href="/manufacturing" on="dark">
            走进制造体系
          </ArrowLink>
        </Reveal>
      </Container>

      {/* production-line ticker */}
      <div className="relative mt-20 border-y border-white/10 py-5" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap pl-10">
          {[...processSteps, ...processSteps].map((step, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.28em] text-ink-300"
            >
              {step}
              <span className="h-1.5 w-1.5 rotate-45 bg-azure-500/70" />
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">
        生产流程：{processSteps.join("，")}。
      </p>
    </section>
  );
}

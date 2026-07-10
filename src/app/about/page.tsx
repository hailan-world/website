import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { certifications, site, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于我们",
  description:
    "HAILAN 海澜新材料有限公司是一家全球装饰建材制造商，为 60 多个国家的合作伙伴供应 LVT 地板、PET 墙面覆材和 PET 地毯覆材。",
};

const values = [
  {
    title: "工程优先",
    text: "每一个产品决策都从生产线出发，而不是从宣传册出发。如果一种结构无法稳定规模化制造，我们就不会销售。",
  },
  {
    title: "极致可靠",
    text: "合作伙伴围绕我们的确认安排季节计划、门店开业和项目进度。我们把确认日期视为承诺，98.6% 的集装箱准时出运。",
  },
  {
    title: "设计理解力",
    text: "我们阅读与客户相同的趋势报告，参加相同展会，关注相同建筑媒体，因此花色开发能真正回应他们的市场语言。",
  },
  {
    title: "长期合作",
    text: "我们最早的出口项目已持续超过十年。我们的报价、计划和投资面向多年关系，而不是单张订单。",
  },
];

const milestones = [
  {
    year: "2008",
    title: "创立于湖州",
    text: "海澜新材料在浙江地材产业集群成立，为国内项目生产弹性地材。",
  },
  {
    year: "2012",
    title: "首批出口项目",
    text: "首批专用出口产线向欧洲进口商供应 LVT，并建立国际销售与文件团队。",
  },
  {
    year: "2016",
    title: "SPC 与锁扣系统",
    text: "投资挤出和成型产线，将刚性芯 SPC 与锁扣结构加入地板产品组合。",
  },
  {
    year: "2019",
    title: "PET 声学产线",
    text: "针刺与热成型产线投产 PET 声学墙板，打开建筑规格市场。",
  },
  {
    year: "2021",
    title: "园区扩建",
    text: "南浔园区扩展至 120,000 m²，将地板、墙面和仓储运营整合到同一基地。",
  },
  {
    year: "2023",
    title: "地毯覆材上线",
    text: "原液着色 PET 地毯方块与长条簇绒线投产，完善地面与墙面室内材料方案。",
  },
  {
    year: "2025",
    title: "OEM 打样工作室",
    text: "专属 1,800 m² 工作室将自有品牌伙伴的花色开发和打样周期缩短至 7–10 天。",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="关于 HAILAN"
        title="一家像品牌一样思考的工厂。"
        lede={`${site.legalName} 在中国湖州的一体化园区研发、制造并出口装饰建材，为将自己品牌印在包装上的合作伙伴服务。`}
      />

      {/* Story */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHead
                eyebrow="我们的故事"
                title="成长于全球最密集的地材产业集群。"
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                HAILAN 于 {site.founded} 年创立于浙江湖州。这里生产了全球相当比例的弹性地材。在这个产业集群中成长塑造了我们：供应商、模具商和检测实验室近在咫尺，而周边出口全球的同行也持续抬高制造能力的标准。
              </p>
              <p className="mt-6 text-lg leading-relaxed text-mist-600">
                从一开始，我们选择了一条更窄也更深的道路：更少的品类、扎实的工程开发、自有产线制造，并按最严格目的地市场的标准建立文件。先是 LVT 地板，再到 PET 声学墙面覆材，随后是 PET 地毯覆材，三类表面材料共用一个质量体系。
              </p>
              <p className="mt-6 text-lg leading-relaxed text-mist-600">
                如今，我们的产品安装在 {stats.countries} 多个国家的办公室、酒店、学校和住宅中，通常以合作伙伴的品牌出现。这正是我们的选择。HAILAN 的目标，是成为全球装饰建材品牌背后最可靠的制造商，并逐渐成为值得被点名选择的品牌。
              </p>
            </Reveal>
          </div>

          <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-ink-950/10 pt-12 lg:grid-cols-4">
            {[
              { value: site.founded, label: "创立年份", raw: true },
              { value: stats.facility, suffix: " m²", label: "生产园区" },
              { value: stats.lines, suffix: "", label: "生产线" },
              { value: stats.team, suffix: "+", label: "专业人员与工程师" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <dd className="text-4xl font-medium tracking-[-0.02em] text-ink-950 md:text-[2.75rem]">
                  {"raw" in item && item.raw ? (
                    String(item.value)
                  ) : (
                    <>
                      <Counter value={item.value} />
                      <span className="text-azure-600">{item.suffix}</span>
                    </>
                  )}
                </dd>
                <dt className="mt-2.5 text-sm text-mist-500">{item.label}</dt>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-mist-50 py-24 md:py-32">
        <Container>
          <SectionHead
            eyebrow="工作方式"
            title="四项原则管理每一个项目。"
            lede="它们不是墙上的口号，而是合作伙伴在每次报价、每块样品和每个集装箱中都能感受到的运营规则。"
          />
          <div className="mt-16 grid gap-x-14 gap-y-14 md:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <div className="flex gap-7 border-t border-ink-950/10 pt-8">
                  <span
                    className="select-none text-[2.6rem] font-medium leading-none tracking-[-0.03em] text-mist-300"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.01em] text-ink-950">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-mist-600">
                      {value.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-32">
        <div
          className="pointer-events-none absolute -left-52 top-24 h-[30rem] w-[30rem] rounded-full bg-azure-600/10 blur-[150px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />
        <Container className="relative">
          <SectionHead
            on="dark"
            eyebrow="里程碑"
            title="十八年的稳健成长。"
          />
          <ol className="mt-16">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.05}>
                <li className="grid gap-3 border-t border-white/10 py-8 md:grid-cols-[8rem_16rem_1fr] md:gap-8">
                  <span className="font-mono text-sm tracking-[0.18em] text-azure-300">
                    {m.year}
                  </span>
                  <h3 className="text-lg font-medium tracking-[-0.01em]">
                    {m.title}
                  </h3>
                  <p className="max-w-xl text-[15px] leading-relaxed text-ink-300">
                    {m.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Certifications strip */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHead
                eyebrow="合规"
                title="为最严格的目的地市场完成认证。"
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-mist-600">
                每条产品线都按照欧盟、北美和海湾地区的法规要求开发，并建立完整文件，帮助合作伙伴顺利完成规格指定、进口和安装。
              </p>
              <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="认证">
                {certifications.map((c) => (
                  <li key={c}>
                    <Chip>{c}</Chip>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand
        title="认识标签背后的团队。"
        lede="欢迎来湖州园区参观，在下一场展会见面，或先从一次关于你项目的沟通开始。"
      />
    </>
  );
}

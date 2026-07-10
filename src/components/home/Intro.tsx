import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { stats } from "@/lib/site";

const statItems = [
  { value: stats.countries, suffix: "+", label: "出口国家" },
  { value: stats.facility, suffix: " m²", label: "生产园区" },
  { value: stats.capacity, suffix: "M m²", label: "年产能" },
  { value: stats.team, suffix: "+", label: "专业人员与工程师" },
];

export function Intro() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>01 — 我们是谁</Eyebrow>
            <h2 className="mt-5 text-balance text-[2rem] font-medium leading-[1.12] tracking-[-0.02em] text-ink-950 md:text-[2.75rem] md:leading-[1.08]">
              为全球品牌而建的制造合作伙伴。
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-mist-600">
              HAILAN 是一家总部位于中国湖州的全球装饰建材制造商。湖州拥有全球密度最高的地材产业集群之一。依托单一一体化园区，我们研发、生产并出口 LVT 地板、PET 声学墙面覆材和 PET 地毯覆材。
            </p>
            <p className="mt-6 text-lg leading-relaxed text-mist-600">
              很多时候，我们的产品承载的是合作伙伴自己的品牌。对于遍布各大洲的进口商、零售连锁和家居建材品牌，HAILAN 是标签背后的稳定能力：一致质量、真实交期，以及像对待自有项目一样投入的团队。
            </p>
            <ArrowLink href="/about" className="mt-9">
              了解 HAILAN
            </ArrowLink>
          </Reveal>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-ink-950/10 pt-12 lg:grid-cols-4">
          {statItems.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <dd className="text-4xl font-medium tracking-[-0.02em] text-ink-950 md:text-[2.75rem]">
                <Counter value={item.value} />
                <span className="text-azure-600">{item.suffix}</span>
              </dd>
              <dt className="mt-2.5 text-sm text-mist-500">{item.label}</dt>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}

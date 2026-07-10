import { WorldMap } from "@/components/graphics/WorldMap";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

const regions = [
  { name: "欧洲", markets: "荷兰 · 德国 · 英国 · 波兰 · 西班牙" },
  { name: "北美", markets: "美国 · 加拿大 · 墨西哥" },
  { name: "中东", markets: "阿联酋 · 沙特阿拉伯 · 卡塔尔" },
  { name: "亚太", markets: "澳大利亚 · 日本 · 韩国 · 新加坡" },
  { name: "拉丁美洲", markets: "巴西 · 智利 · 哥伦比亚" },
  { name: "非洲", markets: "尼日利亚 · 埃及 · 南非" },
];

const figures = [
  { value: 60, suffix: "+", label: "供货国家" },
  { value: 6, suffix: "", label: "覆盖大洲" },
  { value: 2400, suffix: "+", label: "年出运集装箱" },
];

export function GlobalMarkets() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-36">
      <div
        className="pointer-events-none absolute -right-64 top-0 h-[36rem] w-[36rem] rounded-full bg-azure-600/10 blur-[150px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" aria-hidden="true" />

      <Container className="relative">
        <SectionHead
          on="dark"
          eyebrow="05 — 全球市场"
          title="从一个园区发货，安装于六大洲。"
          lede="出口不是 HAILAN 的一个部门，而是我们的业务本身。文件、装柜计划和港口物流都像产品一样被认真工程化。"
        />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1.55fr_1fr]">
          <Reveal>
            <WorldMap className="h-auto w-full" />
          </Reveal>

          <div>
            {regions.map((region, i) => (
              <Reveal key={region.name} delay={i * 0.06}>
                <div className="flex items-baseline justify-between gap-6 border-b border-white/10 py-4.5">
                  <h3 className="text-[15px] font-medium">{region.name}</h3>
                  <p className="text-right font-mono text-[10.5px] tracking-[0.06em] text-ink-300">
                    {region.markets}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-10 border-t border-white/10 pt-12 sm:grid-cols-3">
          {figures.map((figure, i) => (
            <Reveal key={figure.label} delay={i * 0.08}>
              <dd className="text-4xl font-medium tracking-[-0.02em]">
                <Counter value={figure.value} />
                <span className="text-azure-300">{figure.suffix}</span>
              </dd>
              <dt className="mt-2 text-sm text-ink-300">{figure.label}</dt>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}

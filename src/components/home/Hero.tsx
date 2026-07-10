"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { HeroArt } from "@/components/graphics/HeroArt";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const lines = [
    <span key="l1">面向建筑空间的</span>,
    <span key="l2">
      工程化表面材料<span className="text-azure-400">。</span>
    </span>,
  ];

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden bg-ink-950 text-white"
    >
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-64 -top-72 h-[42rem] w-[42rem] rounded-full bg-azure-600/[0.13] blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-80 right-[-10rem] h-[38rem] w-[38rem] rounded-full bg-azure-500/[0.09] blur-[160px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-ink-950"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-16 pb-28 pt-36 md:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
          <div>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-azure-300"
            >
              海澜新材料有限公司
            </motion.p>

            <h1 className="mt-7 text-[2.6rem] font-medium leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[4.4rem]">
              {lines.map((line, i) => (
                <span key={i} className="-mb-1 block overflow-hidden pb-1">
                  <motion.span
                    className="block"
                    initial={reduce ? false : { y: "115%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.18 + i * 0.13, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-ink-200"
            >
              HAILAN 为 60 多个国家的进口商、经销商和品牌客户研发并制造
              LVT 地板、PET 墙面覆材和 PET 地毯覆材，以精密制造承载设计优先的产品思维。
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button href="/products" variant="inverted" arrow>
                浏览产品
              </Button>
              <Button href="/manufacturing" variant="outlineDark">
                制造能力
              </Button>
            </motion.div>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.05 }}
              className="mt-14 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400"
            >
              ISO 9001 · FloorScore® · CE — 出口 60+ 国家
            </motion.p>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
            style={reduce ? undefined : { y: artY }}
            className="hidden lg:block"
          >
            <HeroArt className="ml-auto w-full max-w-[34rem]" />
          </motion.div>
        </div>
      </Container>

      <motion.div
        style={reduce ? undefined : { opacity: cueOpacity }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400">
          滚动
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-azure-300"
            animate={reduce ? undefined : { y: [-16, 44] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

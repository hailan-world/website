import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-ink-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 -top-64 h-[34rem] w-[34rem] rounded-full bg-azure-600/15 blur-[140px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" aria-hidden="true" />

      <Container className="relative py-32 text-center">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-azure-300">
          404 — 页面未找到
        </p>
        <h1 className="mx-auto mt-6 max-w-2xl text-balance text-4xl font-medium leading-[1.08] tracking-[-0.03em] md:text-6xl">
          这个页面不存在，但我们的材料真实可靠。
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-200">
          你访问的页面可能已移动，或从未创建。回到首页，继续浏览我们的产品与能力。
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" variant="inverted" arrow>
            返回首页
          </Button>
          <Link
            href="/products"
            className="text-[15px] font-medium text-ink-200 transition-colors hover:text-white"
          >
            浏览产品
          </Link>
        </div>
      </Container>
    </section>
  );
}

import { connection } from "next/server";
import "../../../globals.css";
import { Analytics } from "@vercel/analytics/next";

export default async function LinusPublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  await connection();

  const { lang } = await params;
  const htmlLang = lang === "zh" ? "zh-CN" : lang === "ru" ? "ru" : "en";
  const skipLabel =
    lang === "zh"
      ? "跳到主要内容"
      : lang === "ru"
        ? "Перейти к основному содержанию"
        : "Skip to content";

  return (
    <html lang={htmlLang}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:text-ink-950"
        >
          {skipLabel}
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

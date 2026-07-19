import { connection } from "next/server";
import "../../../globals.css";

export default async function VerifiedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  // The request-specific CSP nonce is attached to Next's bootstrap scripts.
  await connection();

  const { lang } = await params;
  const isChinese = lang === "zh";
  const htmlLang = isChinese ? "zh-CN" : lang === "ru" ? "ru" : "en";
  const skipLabel = isChinese
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
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/lib/site";
import "./globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — 全球装饰建材制造商`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "LVT 地板制造商",
    "PET 墙面覆材",
    "PET 地毯方块",
    "声学板",
    "OEM 地板",
    "装饰建材",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — 全球装饰建材制造商`,
    description: site.description,
    url: "/",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — 全球装饰建材制造商`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#070c17",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${instrument.variable} ${plexMono.variable}`}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-950 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          跳到主要内容
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

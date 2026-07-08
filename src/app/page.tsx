import { GlobalMarkets } from "@/components/home/GlobalMarkets";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ManufacturingBand } from "@/components/home/ManufacturingBand";
import { NewsPreview } from "@/components/home/NewsPreview";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";
import { WhyHailan } from "@/components/home/WhyHailan";
import { CtaBand } from "@/components/layout/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ProductsShowcase />
      <ManufacturingBand />
      <WhyHailan />
      <GlobalMarkets />
      <NewsPreview />
      <CtaBand />
    </>
  );
}

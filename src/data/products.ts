import lvtFlooring from "../../content/products/lvt-flooring.json";
import petWallCoverings from "../../content/products/pet-wall-coverings.json";
import petCarpetCoverings from "../../content/products/pet-carpet-coverings.json";

export type TextureKind = "lvt" | "wall" | "carpet";

export type ProductSlug =
  | "lvt-flooring"
  | "pet-wall-coverings"
  | "pet-carpet-coverings";

export interface Product {
  slug: ProductSlug;
  name: string;
  category: string;
  headline: string;
  short: string;
  description: string[];
  specs: { label: string; value: string }[];
  features: { title: string; text: string }[];
  applications: string[];
  formats: string[];
  compliance: string[];
  texture: TextureKind;
}

export const products: Product[] = [
  lvtFlooring,
  petWallCoverings,
  petCarpetCoverings,
] as Product[];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

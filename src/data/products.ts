import lvtFlooring from "../../content/products/lvt-flooring.json";
import petWallCoverings from "../../content/products/pet-wall-coverings.json";
import petCarpetCoverings from "../../content/products/pet-carpet-coverings.json";
import { cache } from "react";
import { getCmsPayload, getCmsViewer } from "@/lib/cms";
import type { Locale } from "@/lib/i18n";

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

const fallbackProducts: Product[] = [
  lvtFlooring,
  petWallCoverings,
  petCarpetCoverings,
] as Product[];

export const productSlugs = fallbackProducts.map((product) => product.slug);

function mapProduct(document: Record<string, unknown>): Product | null {
  if (typeof document.slug !== "string" || typeof document.name !== "string") return null;
  const mapRows = <T>(value: unknown, mapper: (row: Record<string, unknown>) => T): T[] =>
    Array.isArray(value)
      ? value.filter((row): row is Record<string, unknown> => Boolean(row) && typeof row === "object").map(mapper)
      : [];

  return {
    slug: document.slug as ProductSlug,
    name: document.name,
    category: String(document.category ?? ""),
    headline: String(document.headline ?? ""),
    short: String(document.short ?? ""),
    description: Array.isArray(document.description) ? document.description.map(String) : [],
    specs: mapRows(document.specs, (row) => ({
      label: String(row.label ?? ""),
      value: String(row.value ?? ""),
    })),
    features: mapRows(document.features, (row) => ({
      title: String(row.title ?? ""),
      text: String(row.text ?? ""),
    })),
    applications: Array.isArray(document.applications) ? document.applications.map(String) : [],
    formats: Array.isArray(document.formats) ? document.formats.map(String) : [],
    compliance: Array.isArray(document.compliance) ? document.compliance.map(String) : [],
    texture: document.texture as TextureKind,
  };
}

export const getProducts = cache(async (locale: Locale): Promise<Product[]> => {
  const payload = await getCmsPayload();
  if (!payload) return fallbackProducts;

  try {
    const viewer = await getCmsViewer(payload);
    const result = await payload.find({
      collection: "products",
      locale,
      fallbackLocale: "en",
      draft: viewer.draft,
      user: viewer.user ?? undefined,
      overrideAccess: false,
      limit: 100,
      sort: "createdAt",
    });
    const products = result.docs
      .map((document) => mapProduct(document as unknown as Record<string, unknown>))
      .filter((product): product is Product => product !== null);
    return products.length ? products : fallbackProducts;
  } catch (error) {
    console.error(`Unable to read Payload products for ${locale}.`, error);
    return fallbackProducts;
  }
});

export async function getProduct(slug: string, locale: Locale): Promise<Product | undefined> {
  return (await getProducts(locale)).find((product) => product.slug === slug);
}

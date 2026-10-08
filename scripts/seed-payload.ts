import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import config from "@payload-config";
import { getPayload } from "payload";
import { siteContentAreas } from "../src/cms/fields/site-content";
import { locales, type Locale } from "../src/lib/i18n";

const root = process.cwd();

async function readJson<T>(filepath: string): Promise<T> {
  return JSON.parse(await readFile(filepath, "utf8")) as T;
}

async function seedSiteContent(payload: Awaited<ReturnType<typeof getPayload>>) {
  for (const locale of locales) {
    const data = await readJson<Record<string, unknown>>(
      path.join(root, "src", "app", "[lang]", "dictionaries", `${locale}.json`),
    );
    await Promise.all(
      siteContentAreas.map((area) => {
        const section = Object.fromEntries(area.keys.map((key) => [key, data[key]]));
        return payload.updateGlobal({
          slug: area.slug,
          locale,
          data: { ...section, _status: "published" },
          context: { seed: true },
          overrideAccess: true,
        });
      }),
    );
    payload.logger.info(`Imported site copy: ${locale}`);
  }
}

type LegacyProduct = {
  slug: "lvt-flooring" | "pet-wall-coverings" | "pet-carpet-coverings";
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
  texture: "lvt" | "wall" | "carpet";
};

async function seedProducts(payload: Awaited<ReturnType<typeof getPayload>>) {
  for (const filename of [
    "lvt-flooring.json",
    "pet-wall-coverings.json",
    "pet-carpet-coverings.json",
  ]) {
    const data = await readJson<LegacyProduct>(
      path.join(root, "content", "products", filename),
    );
    const slug = String(data.slug);
    const existing = await payload.find({
      collection: "products",
      where: { slug: { equals: slug } },
      limit: 1,
      overrideAccess: true,
    });
    const operation = existing.docs[0]
      ? payload.update({
          collection: "products",
          id: existing.docs[0].id,
          locale: "en",
          data: { ...data, _status: "published" },
          context: { seed: true },
          overrideAccess: true,
        })
      : payload.create({
          collection: "products",
          locale: "en",
          data: { ...data, _status: "published" },
          context: { seed: true },
          overrideAccess: true,
        });
    await operation;
    payload.logger.info(`Imported product: ${slug}`);
  }
}

type LegacyNews = {
  slug: string;
  title: string;
  date: string;
  category: "Events" | "Manufacturing" | "Sustainability" | "Company";
  excerpt: string;
  body: string[];
  status: "draft" | "approved";
  approvedBy?: string;
  approvalReference?: string;
  sourceNotes?: string;
};

async function seedNews(payload: Awaited<ReturnType<typeof getPayload>>) {
  const directory = path.join(root, "content", "news");
  const filenames = (await readdir(directory)).filter((name) => name.endsWith(".json"));

  for (const filename of filenames) {
    const match = filename.match(/^(.+)\.(en|zh)\.json$/);
    if (!match) continue;
    const [, filenameSlug, localeValue] = match;
    const locale = localeValue as Locale;
    const source = await readJson<LegacyNews>(path.join(directory, filename));
    if (source.slug !== filenameSlug) throw new Error(`News slug mismatch: ${filename}`);

    const existing = await payload.find({
      collection: "news",
      where: { slug: { equals: source.slug } },
      limit: 1,
      overrideAccess: true,
    });
    const data = {
      slug: source.slug,
      title: source.title,
      publishedAt: `${source.date}T00:00:00.000Z`,
      category: source.category,
      excerpt: source.excerpt,
      body: source.body,
      approvedBy: source.approvedBy,
      approvalReference: source.approvalReference,
      sourceNotes: source.sourceNotes,
      _status: source.status === "approved" ? ("published" as const) : ("draft" as const),
    };

    if (existing.docs[0]) {
      await payload.update({
        collection: "news",
        id: existing.docs[0].id,
        locale,
        data,
        context: { seed: true },
        overrideAccess: true,
      });
    } else {
      await payload.create({
        collection: "news",
        locale,
        data,
        context: { seed: true },
        overrideAccess: true,
      });
    }
    payload.logger.info(`Imported news: ${source.slug} (${locale})`);
  }
}

const payload = await getPayload({ config });
await seedSiteContent(payload);
await seedProducts(payload);
await seedNews(payload);
payload.logger.info("Payload seed complete.");
process.exit(0);

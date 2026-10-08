import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { en } from "@payloadcms/translations/languages/en";
import { zh } from "@payloadcms/translations/languages/zh";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "./src/cms/collections/Media";
import { News } from "./src/cms/collections/News";
import { Products } from "./src/cms/collections/Products";
import { Users } from "./src/cms/collections/Users";
import { siteContentAreas } from "./src/cms/fields/site-content";
import { SiteContentGlobals } from "./src/cms/globals/SiteContent";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const rawDatabaseUri =
  process.env.DATABASE_URI ??
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL;
const databaseUri = rawDatabaseUri
  ? (() => {
      const url = new URL(rawDatabaseUri);
      const sslMode = url.searchParams.get("sslmode");
      if (sslMode === "prefer" || sslMode === "require" || sslMode === "verify-ca") {
        url.searchParams.set("sslmode", "verify-full");
      }
      return url.toString();
    })()
  : undefined;
const payloadSecret =
  process.env.PAYLOAD_SECRET ?? "development-only-change-before-deployment";
const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

if (process.env.VERCEL && (!databaseUri || !process.env.PAYLOAD_SECRET)) {
  throw new Error("Payload production requires DATABASE_URI and PAYLOAD_SECRET.");
}

export default buildConfig({
  admin: {
    user: Users.slug,
    autoRefresh: true,
    meta: {
      titleSuffix: " — HAILAN 内容管理",
      icons: [{ rel: "icon", type: "image/svg+xml", url: "/icon.svg" }],
    },
    importMap: { baseDir: path.resolve(dirname, "src") },
    livePreview: {
      collections: [Products.slug, News.slug],
      globals: SiteContentGlobals.map((global) => global.slug),
      url: ({ collectionConfig, data, globalConfig, locale }) => {
        const language = locale?.code ?? "en";
        if (globalConfig) {
          const area = siteContentAreas.find((item) => item.slug === globalConfig.slug);
          return `/${language}${area?.previewPath ?? ""}`;
        }
        if (collectionConfig?.slug === Products.slug) {
          return `/${language}/products/${data.slug ?? ""}`;
        }
        if (collectionConfig?.slug === News.slug) {
          return `/${language}/news/${data.slug ?? ""}`;
        }
        return `/${language}`;
      },
      breakpoints: [
        { name: "mobile", label: "手机", width: 390, height: 844 },
        { name: "tablet", label: "平板", width: 820, height: 1180 },
        { name: "desktop", label: "桌面", width: 1440, height: 1000 },
      ],
    },
  },
  collections: [Users, Media, Products, News],
  globals: SiteContentGlobals,
  db: databaseUri
    ? postgresAdapter({ pool: { connectionString: databaseUri } })
    : sqliteAdapter({
        client: { url: `file:${path.resolve(dirname, ".payload", "local.db")}` },
        wal: true,
      }),
  editor: lexicalEditor(),
  i18n: {
    fallbackLanguage: "zh",
    supportedLanguages: { zh, en },
  },
  localization: {
    defaultLocale: "en",
    fallback: true,
    locales: [
      { code: "en", label: "English" },
      { code: "zh", label: "简体中文" },
      { code: "fr", label: "Français" },
      { code: "es", label: "Español" },
      { code: "ru", label: "Русский" },
      { code: "ar", label: "العربية", rtl: true },
      { code: "ja", label: "日本語" },
      { code: "ms", label: "Bahasa Melayu" },
      { code: "id", label: "Bahasa Indonesia" },
    ],
  },
  secret: payloadSecret,
  serverURL,
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(blobToken),
      collections: { media: { prefix: "website" } },
      clientUploads: true,
      token: blobToken ?? "",
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, "src", "payload-types.ts"),
  },
});

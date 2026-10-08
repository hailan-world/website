import type { GlobalConfig } from "payload";
import { editableGlobalAccess, requirePublisherForPublish } from "../access";
import { dictionaryFields, siteContentAreas } from "../fields/site-content";

export const SiteContentGlobals: GlobalConfig[] = siteContentAreas.map((area) => ({
  slug: area.slug,
  dbName: area.dbName,
  label: area.label,
  admin: {
    group: "网站文案",
    description: `${area.description} 先选择右上角语言；草稿不会影响正式网站。`,
    livePreview: {
      url: ({ locale }) => `/${locale?.code ?? "en"}${area.previewPath}`,
    },
  },
  access: editableGlobalAccess,
  hooks: {
    beforeChange: [requirePublisherForPublish],
  },
  versions: {
    drafts: { autosave: { interval: 800 } },
    max: 50,
  },
  fields: dictionaryFields([...area.keys]),
}));

import type { CollectionConfig } from "payload";
import {
  canPublish,
  isAuthenticated,
  publicOrAuthenticated,
  requirePublisherForPublish,
} from "../access";

export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "新闻文章", plural: "新闻动态" },
  admin: {
    group: "内容",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
    livePreview: {
      url: ({ data, locale }) => `/${locale?.code ?? "en"}/news/${data.slug ?? ""}`,
    },
    description: "事实依据只写公开安全的核实说明，不要粘贴内部资料或敏感信息。",
  },
  access: {
    create: isAuthenticated,
    delete: isAuthenticated,
    read: publicOrAuthenticated,
    update: isAuthenticated,
  },
  hooks: {
    beforeChange: [
      requirePublisherForPublish,
      ({ data, req }) => {
        if (req.context?.seed === true) return data;
        if (data?._status === "published") {
          if (!canPublish(req.user)) throw new Error("只有发布者或管理员可以发布新闻。");
          for (const [field, label] of [
            ["approvedBy", "核实人"],
            ["approvalReference", "批准记录编号"],
            ["sourceNotes", "事实依据"],
          ] as const) {
            if (typeof data[field] !== "string" || !data[field].trim()) {
              throw new Error(`发布新闻前必须填写${label}。`);
            }
          }
        }
        return data;
      },
    ],
  },
  versions: {
    drafts: { autosave: { interval: 800 } },
    maxPerDoc: 50,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "文章",
          fields: [
            {
              name: "slug",
              label: "网址标识",
              type: "text",
              required: true,
              unique: true,
              index: true,
              admin: { description: "例如 new-showroom-opening。发布后不要随意修改。" },
              validate: (value: unknown) =>
                typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
                  ? true
                  : "仅可使用小写英文字母、数字和连字符。",
            },
            { name: "title", label: "标题", type: "text", localized: true, required: true },
            {
              name: "publishedAt",
              label: "发布日期",
              type: "date",
              required: true,
              admin: { date: { pickerAppearance: "dayOnly", displayFormat: "yyyy-MM-dd" } },
            },
            {
              name: "category",
              label: "分类",
              type: "select",
              required: true,
              options: ["Events", "Manufacturing", "Sustainability", "Company"],
            },
            { name: "excerpt", label: "摘要", type: "textarea", localized: true, required: true },
            {
              name: "body",
              label: "正文段落",
              type: "text",
              hasMany: true,
              localized: true,
              required: true,
            },
          ],
        },
        {
          label: "封面图片",
          fields: [
            { name: "coverImage", label: "封面图片", type: "upload", relationTo: "media" },
          ],
        },
        {
          label: "核实与批准",
          description: "这些字段不会显示在网站上，用于保证公开内容可追溯。",
          fields: [
            { name: "approvedBy", label: "核实人", type: "text" },
            { name: "approvalReference", label: "批准记录编号", type: "text" },
            { name: "sourceNotes", label: "事实依据", type: "textarea" },
          ],
        },
      ],
    },
  ],
};

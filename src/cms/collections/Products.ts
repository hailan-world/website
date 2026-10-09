import type { CollectionConfig } from "payload";
import {
  isAuthenticated,
  isAdmin,
  publicOrAuthenticated,
  requirePublisherForPublish,
} from "../access";

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "产品", plural: "产品资料" },
  admin: {
    group: "内容",
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "_status", "updatedAt"],
    livePreview: {
      url: ({ data, locale }) => `/${locale?.code ?? "en"}/products/${data.slug ?? ""}`,
    },
    description: "每个产品只维护一条记录；使用右上角语言选择器编辑中文或英文。",
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: publicOrAuthenticated,
    update: isAuthenticated,
  },
  hooks: {
    beforeChange: [requirePublisherForPublish],
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
          label: "基本信息",
          fields: [
            {
              name: "slug",
              label: "网址标识",
              type: "select",
              required: true,
              unique: true,
              index: true,
              admin: { description: "网站当前支持的三个固定产品页面。" },
              options: [
                { label: "LVT Flooring", value: "lvt-flooring" },
                { label: "PET Wall Coverings", value: "pet-wall-coverings" },
                { label: "PET Carpet Coverings", value: "pet-carpet-coverings" },
              ],
            },
            { name: "name", label: "产品名称", type: "text", localized: true, required: true },
            { name: "category", label: "产品分类", type: "text", localized: true, required: true },
            { name: "headline", label: "主标题", type: "text", localized: true, required: true },
            { name: "short", label: "列表摘要", type: "textarea", localized: true, required: true },
            {
              name: "texture",
              label: "网站视觉纹理",
              type: "select",
              required: true,
              options: [
                { label: "LVT", value: "lvt" },
                { label: "墙面材料", value: "wall" },
                { label: "地毯", value: "carpet" },
              ],
            },
          ],
        },
        {
          label: "产品介绍",
          fields: [
            {
              name: "description",
              label: "介绍段落",
              type: "text",
              hasMany: true,
              localized: true,
              required: true,
            },
            {
              name: "features",
              label: "产品特点",
              type: "array",
              localized: true,
              fields: [
                { name: "title", label: "标题", type: "text", required: true },
                { name: "text", label: "正文", type: "textarea", required: true },
              ],
            },
            { name: "applications", label: "应用场景", type: "text", hasMany: true, localized: true },
            { name: "formats", label: "产品形式", type: "text", hasMany: true, localized: true },
          ],
        },
        {
          label: "参数与认证",
          fields: [
            {
              name: "specs",
              label: "技术参数",
              type: "array",
              localized: true,
              fields: [
                { name: "label", label: "参数名", type: "text", required: true },
                { name: "value", label: "参数值", type: "text", required: true },
              ],
            },
            { name: "compliance", label: "认证与标准", type: "text", hasMany: true, localized: true },
          ],
        },
      ],
    },
  ],
};

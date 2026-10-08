import path from "node:path";
import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "图片", plural: "媒体库" },
  admin: {
    group: "内容",
    useAsTitle: "filename",
  },
  access: {
    create: isAuthenticated,
    delete: isAuthenticated,
    read: () => true,
    update: isAuthenticated,
  },
  upload: {
    staticDir: path.resolve(process.cwd(), "public", "media"),
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "card", width: 960, height: 640, position: "centre" },
      { name: "hero", width: 1920, height: 1080, position: "centre" },
    ],
    focalPoint: true,
  },
  fields: [
    {
      name: "alt",
      label: "图片替代文字",
      type: "text",
      localized: true,
      required: true,
      admin: {
        description: "描述图片内容，供无障碍阅读器和图片无法加载时使用。",
      },
    },
  ],
};

import type { CollectionConfig } from "payload";
import { isAdmin, isAdminField, isAdminOrFirstUserField } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "用户", plural: "用户与权限" },
  admin: {
    group: "系统",
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
  },
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: ({ req }) => {
      if ((req.user as { role?: string } | null)?.role === "admin") return true;
      return req.user ? { id: { equals: req.user.id } } : false;
    },
    update: ({ req }) => {
      if ((req.user as { role?: string } | null)?.role === "admin") return true;
      return req.user ? { id: { equals: req.user.id } } : false;
    },
  },
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        if (operation === "create" && !req.user) return { ...data, role: "admin" };
        return data;
      },
    ],
  },
  fields: [
    {
      name: "name",
      label: "姓名",
      type: "text",
      required: true,
    },
    {
      name: "role",
      label: "权限角色",
      type: "select",
      required: true,
      defaultValue: ({ user }) => (user ? "editor" : "admin"),
      saveToJWT: true,
      access: {
        create: isAdminOrFirstUserField,
        update: isAdminField,
      },
      options: [
        { label: "编辑：可保存草稿", value: "editor" },
        { label: "发布者：可审核与发布", value: "publisher" },
        { label: "管理员：可管理用户和全部内容", value: "admin" },
      ],
    },
  ],
};

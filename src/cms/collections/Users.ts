import type { CollectionConfig } from "payload";
import {
  isAdmin,
  isAdminField,
  isAdminOrFirstUserField,
  hasActiveCmsAccess,
} from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "用户", plural: "用户与权限" },
  admin: {
    group: "系统",
    useAsTitle: "name",
    defaultColumns: ["name", "role", "authSource", "lastDingTalkSyncAt"],
  },
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
  },
  access: {
    admin: ({ req }) => hasActiveCmsAccess(req.user),
    create: isAdmin,
    delete: isAdmin,
    read: async ({ req }) => {
      if (!(await hasActiveCmsAccess(req.user))) return false;
      if ((req.user as { role?: string } | null)?.role === "admin") return true;
      return req.user ? { id: { equals: req.user.id } } : false;
    },
    update: async ({ req }) => {
      if (!(await hasActiveCmsAccess(req.user))) return false;
      if ((req.user as { role?: string } | null)?.role === "admin") return true;
      return req.user ? { id: { equals: req.user.id } } : false;
    },
  },
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        if (
          operation === "create" &&
          !req.user &&
          req.context?.dingtalkProvisioning !== true
        ) {
          return { ...data, role: "admin", authSource: "local" };
        }
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
    {
      name: "authSource",
      label: "登录来源",
      type: "select",
      required: true,
      defaultValue: "local",
      saveToJWT: true,
      admin: { readOnly: true },
      access: {
        create: isAdminOrFirstUserField,
        update: isAdminField,
      },
      options: [
        { label: "本地应急账号", value: "local" },
        { label: "钉钉组织账号", value: "dingtalk" },
      ],
    },
    {
      name: "dingtalkUserId",
      label: "钉钉组织用户 ID",
      type: "text",
      unique: true,
      index: true,
      saveToJWT: true,
      admin: { readOnly: true },
      access: {
        create: isAdminField,
        update: isAdminField,
      },
    },
    {
      name: "dingtalkRole",
      label: "钉钉授权角色",
      type: "text",
      admin: { readOnly: true },
      access: {
        create: isAdminField,
        update: isAdminField,
      },
    },
    {
      name: "contactEmail",
      label: "钉钉联系邮箱",
      type: "email",
      admin: { readOnly: true },
      access: {
        create: isAdminField,
        update: isAdminField,
      },
    },
    {
      name: "lastDingTalkSyncAt",
      label: "最近一次钉钉核验",
      type: "date",
      admin: { readOnly: true },
      access: {
        create: isAdminField,
        update: isAdminField,
      },
    },
  ],
};

import type { Access, FieldAccess, GlobalConfig } from "payload";
import { isAuthorizedDingTalkPublisher } from "@/lib/dingtalk-cms";

export type CmsRole = "admin" | "editor" | "publisher";

type CmsUser = {
  authSource?: "dingtalk" | "local" | null;
  dingtalkUserId?: string | null;
  role?: CmsRole | null;
};

export async function hasActiveCmsAccess(user: unknown): Promise<boolean> {
  const cmsUser = user as CmsUser | null;
  if (!cmsUser) return false;
  if (cmsUser.authSource !== "dingtalk") return true;
  return Boolean(
    cmsUser.dingtalkUserId &&
      (await isAuthorizedDingTalkPublisher(cmsUser.dingtalkUserId)),
  );
}

export const isAuthenticated: Access = ({ req }) => hasActiveCmsAccess(req.user);

export const canPublish = async (user: unknown): Promise<boolean> => {
  const role = (user as CmsUser | null)?.role;
  return (role === "admin" || role === "publisher") && (await hasActiveCmsAccess(user));
};

export const isAdmin: Access = ({ req }) =>
  (req.user as CmsUser | null)?.role === "admin";

export const isAdminField: FieldAccess = ({ req }) =>
  (req.user as CmsUser | null)?.role === "admin";

// Payload's protected first-register endpoint has no authenticated user. The
// collection-level create rule still blocks every other anonymous create.
export const isAdminOrFirstUserField: FieldAccess = ({ req }) =>
  !req.user || (req.user as CmsUser).role === "admin";

export const publicOrAuthenticated: Access = async ({ req }) => {
  if (await hasActiveCmsAccess(req.user)) return true;
  return { _status: { equals: "published" } };
};

export const editableGlobalAccess: GlobalConfig["access"] = {
  read: () => true,
  update: isAuthenticated,
};

export async function requirePublisherForPublish({
  data,
  req,
}: {
  data?: Record<string, unknown>;
  req: { context?: Record<string, unknown>; user?: unknown };
}): Promise<Record<string, unknown> | undefined> {
  if (req.context?.seed === true) return data;
  if (data?._status === "published" && !(await canPublish(req.user))) {
    throw new Error("只有发布者或管理员可以发布内容。你仍可以保存草稿并提交审核。");
  }
  return data;
}

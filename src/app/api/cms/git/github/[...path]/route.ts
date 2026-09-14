import { NextResponse, type NextRequest } from "next/server";
import { cmsSessionFromAuthorization, type CmsSessionClaims } from "@/lib/cms-auth";
import { cmsPermissions } from "@/lib/cms-access";
import { companyUserId } from "@/lib/cms-dingtalk";

const repository = "hailan-world/website";
const repositoryEndpoints = [
  "branches",
  "commits",
  "compare",
  "contents",
  "git",
  "issues",
  "merges",
  "pulls",
  "statuses",
];

function unauthorized(message: string, status = 401): NextResponse {
  return NextResponse.json({ message }, { status });
}

function upstreamUrl(path: string[], search: string): URL | null {
  if (path.some(part => part.split("/").some(piece => !piece || piece === "." || piece === "..") || /[%\\?#]/.test(part))) return null;
  const joined = path.map(encodeURIComponent).join("/");
  if (joined === "search/issues") {
    return null;
  }
  if (!repositoryEndpoints.includes(path[0] ?? "")) {
    return null;
  }
  return new URL(`https://api.github.com/repos/${repository}/${joined}${search}`);
}

async function editorMayWrite(
  request: NextRequest,
  path: string[],
  session: CmsSessionClaims,
): Promise<boolean> {
  if (["GET", "HEAD"].includes(request.method)) {
    return true;
  }

  const joined = path.join("/");
  const permissions = cmsPermissions(session.sub);
  if (!permissions) return false;

  let body: Record<string, unknown> = {};
  if (!["DELETE"].includes(request.method)) {
    try {
      body = (await request.clone().json()) as Record<string, unknown>;
    } catch {
      body = {};
    }
  }

  if (/^pulls\/\d+\/merge$/.test(joined) && request.method === "PUT") {
    if (!permissions.publish) return false;
    const pr = await githubRead(`pulls/${path[1]}`);
    if (!isCmsPull(pr) || body.sha !== pr.head.sha || body.merge_method !== "squash") return false;
    return await contentCommit(pr.head.sha);
  }
  if (/^issues\/\d+\/labels$/.test(joined) && ["POST", "PUT"].includes(request.method)) {
    return isCmsPull(await githubRead(`pulls/${path[1]}`)) && Array.isArray(body.labels) && body.labels.length > 0 && body.labels.every(label =>
      ["decap-cms/draft", "decap-cms/pending_review", ...(permissions.publish ? ["decap-cms/pending_publish"] : [])].includes(String(label)));
  }
  // Publishing includes removal of the already-merged draft branch, not editing it.
  if (!permissions.edit && permissions.publish && request.method === "DELETE" && joined.startsWith("git/refs/heads/cms/")) {
    const branch = joined.slice("git/refs/heads/".length);
    const prs = await githubRead(`pulls?state=closed&base=main&head=${encodeURIComponent(`${repository.split("/")[0]}:${branch}`)}&per_page=100`);
    return Array.isArray(prs) && prs.some(pr => isCmsPull(pr) && pr.head.ref === branch && pr.merged_at);
  }
  if (!permissions.edit) return false;
  if (joined === "git/blobs" && request.method === "POST") return true;
  if (joined === "git/trees" && request.method === "POST") {
    return Array.isArray(body.tree) && body.tree.length > 0 && body.tree.every((entry: { path?: string; mode?: string; type?: string }) =>
      typeof entry.path === "string" && (contentPath(entry.path) || metadataPath(entry.path)) && entry.mode === "100644" && entry.type === "blob");
  }
  if (joined === "git/commits" && request.method === "POST") return true;

  if (joined === "git/refs" && request.method === "POST") {
    if (body.ref === "refs/meta/_decap_cms" && typeof body.sha === "string") return metadataCommit(body.sha);
    return typeof body.ref === "string" && body.ref.startsWith("refs/heads/cms/") && typeof body.sha === "string" && await contentCommit(body.sha);
  }
  if (joined === "git/refs/meta/_decap_cms" && request.method === "PATCH") {
    return body.force !== true && typeof body.sha === "string" && await metadataCommit(body.sha);
  }
  if (/^git\/refs\/heads\//.test(joined) && ["PATCH", "DELETE"].includes(request.method)) {
    if (!joined.startsWith("git/refs/heads/cms/")) return false;
    return request.method === "DELETE" || (typeof body.sha === "string" && await contentCommit(body.sha));
  }
  if (joined.startsWith("contents/") && ["PUT", "DELETE"].includes(request.method)) {
    return false;
  }
  if (joined === "pulls" && request.method === "POST") {
    return (
      body.base === "main" &&
      typeof body.head === "string" &&
      body.head.replace(`${repository.split("/")[0]}:`, "").startsWith("cms/")
    );
  }
  if (/^pulls\/\d+$/.test(joined) && request.method === "PATCH") {
    return (body.base === undefined || body.base === "main") && isCmsPull(await githubRead(joined));
  }
  return false;
}

function contentPath(path: string): boolean {
  return /^src\/app\/\[lang\]\/dictionaries\/(en|zh|es|fr|ar|id|ms|ja|ru)\.json$/.test(path) ||
    /^content\/(products|news)\/[a-zA-Z0-9_-]+\.(json|md)$/.test(path) ||
    /^public\/uploads\/news\/[a-zA-Z0-9_./-]+\.(png|jpe?g|webp|gif|avif)$/i.test(path) && !path.split("/").includes("..");
}

function metadataPath(path: string): boolean {
  return path === "README.md" || /^(site_copy|products|news)\/[a-zA-Z0-9_-]+\.json$/.test(path);
}

async function metadataCommit(sha: string): Promise<boolean> {
  if (!/^[a-f0-9]{40}$/.test(sha)) return false;
  const tree = await githubRead(`git/trees/${sha}?recursive=1`);
  return tree.truncated === false && Array.isArray(tree.tree) && tree.tree.every((entry: { path: string; type: string; mode: string }) =>
    entry.type === "tree" ? ["site_copy", "products", "news"].includes(entry.path) : metadataPath(entry.path) && entry.mode === "100644");
}

async function githubRead(path: string) {
  const token = process.env.CMS_GITHUB_TOKEN;
  if (!token) throw new Error("Gateway not configured");
  const response = await fetch(`https://api.github.com/repos/${repository}/${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
    cache: "no-store", redirect: "error", signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error("GitHub validation failed");
  return response.json();
}

// The repository API returns these fields; validate before allowing a mutation.
function isCmsPull(pr: { base?: { ref?: string }; head?: { ref?: string; repo?: { full_name?: string } } }): boolean {
  return pr.base?.ref === "main" && pr.head?.repo?.full_name === repository && pr.head?.ref?.startsWith("cms/") === true;
}

async function contentCommit(sha: string): Promise<boolean> {
  if (!/^[a-f0-9]{40}$/.test(sha)) return false;
  const comparison = await githubRead(`compare/main...${sha}`);
  if (!["ahead", "identical"].includes(comparison.status) || !Array.isArray(comparison.files) || comparison.files.length >= 300) return false;
  if (!comparison.files.every((file: { filename: string; previous_filename?: string }) => contentPath(file.filename) && (!file.previous_filename || contentPath(file.previous_filename)))) return false;
  const tree = await githubRead(`git/trees/${sha}?recursive=1`);
  if (tree.truncated || !Array.isArray(tree.tree)) return false;
  return tree.tree.every((entry: { path: string; mode: string; type: string }) => !contentPath(entry.path) || (entry.mode === "100644" && entry.type === "blob"));
}

function forwardedHeaders(response: Response): Headers {
  const headers = new Headers();
  for (const name of [
    "content-type",
    "etag",
    "link",
    "x-github-request-id",
    "x-ratelimit-limit",
    "x-ratelimit-remaining",
    "x-ratelimit-reset",
  ]) {
    const value = response.headers.get(name);
    if (value) headers.set(name, value);
  }
  headers.set("Cache-Control", "no-store");
  return headers;
}

async function proxy(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
): Promise<Response> {
  let session: CmsSessionClaims;
  try {
    session = cmsSessionFromAuthorization(request.headers.get("authorization"));
    if (!session.unionId || await companyUserId(session.unionId) !== session.sub) {
      return unauthorized("公司成员身份已失效。");
    }
  } catch {
    return unauthorized("CMS 登录已失效，请重新登录。");
  }

  const { path } = await context.params;
  const url = upstreamUrl(path, request.nextUrl.search);
  if (!url) {
    return unauthorized("GitHub API path is not allowed.", 403);
  }
  try {
    if (!(await editorMayWrite(request, path, session))) {
      return unauthorized("当前操作不在此账号的 CMS 权限范围内。", 403);
    }
  } catch {
    return unauthorized("无法验证内容修改权限，请稍后重试。", 503);
  }

  const githubToken = process.env.CMS_GITHUB_TOKEN;
  if (!githubToken) {
    return unauthorized("CMS GitHub Gateway is not configured.", 503);
  }

  const headers = new Headers({
    Accept: request.headers.get("accept") ?? "application/vnd.github+json",
    Authorization: `Bearer ${githubToken}`,
    "Content-Type": request.headers.get("content-type") ?? "application/json",
    "User-Agent": "hailan-cms-gateway",
    "X-GitHub-Api-Version": "2022-11-28",
  });
  const ifNoneMatch = request.headers.get("if-none-match");
  if (ifNoneMatch) headers.set("If-None-Match", ifNoneMatch);

  const body = ["GET", "HEAD"].includes(request.method)
    ? undefined
    : await request.arrayBuffer();
  try {
    const response = await fetch(url, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(20_000),
    });
    return new Response(response.body, {
      status: response.status,
      headers: forwardedHeaders(response),
    });
  } catch {
    return unauthorized("GitHub 暂时无法访问，请稍后重试。", 502);
  }
}

export const GET = proxy;
export const HEAD = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;

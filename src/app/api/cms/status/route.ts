import { NextResponse } from "next/server";

const probeTtlMs = 60_000;
type Probe = { token: string; expiresAt: number; result: Promise<boolean> };
let probe: Probe | undefined;

function githubReachable(token: string): Promise<boolean> {
  if (probe?.token === token && Date.now() < probe.expiresAt) return probe.result;

  // Coalesce concurrent callers, and cache failures as well as successes. Keep
  // the entry alive while the bounded probe runs, then start its TTL. This is
  // per warm server instance, not a distributed rate limiter across cold starts.
  const current: Probe = { token, expiresAt: Infinity, result: Promise.resolve(false) };
  probe = current;
  current.result = (async () => {
    try {
      const response = await fetch("https://api.github.com/repos/hailan-world/website/branches/main", {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
        cache: "no-store", redirect: "error", signal: AbortSignal.timeout(8000),
      });
      return response.ok;
    } catch {
      // Fail closed without exposing provider errors or credentials.
      return false;
    } finally {
      current.expiresAt = Date.now() + probeTtlMs;
    }
  })();
  return current.result;
}

export async function GET() {
  const configured = ["CMS_AUTH_SECRET", "CMS_DINGTALK_APP_KEY", "CMS_DINGTALK_APP_SECRET", "CMS_DINGTALK_CORP_ID", "CMS_GITHUB_TOKEN"].every(key => Boolean(process.env[key]));
  if (!configured) probe = undefined;
  const reachable = configured && await githubReachable(process.env.CMS_GITHUB_TOKEN!);
  return NextResponse.json(
    {
      components: [
        {
          name: "Git Gateway",
          status: reachable ? "operational" : "major_outage",
        },
      ],
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

import { NextResponse } from "next/server";

export async function GET() {
  const configured = ["CMS_AUTH_SECRET", "CMS_DINGTALK_APP_KEY", "CMS_DINGTALK_APP_SECRET", "CMS_DINGTALK_CORP_ID", "CMS_GITHUB_TOKEN"].every(key => Boolean(process.env[key]));
  let reachable = false;
  if (configured) {
    try {
      const response = await fetch("https://api.github.com/repos/hailan-world/website/branches/main", {
        headers: { Authorization: `Bearer ${process.env.CMS_GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
        cache: "no-store", redirect: "error", signal: AbortSignal.timeout(8000),
      });
      reachable = response.ok;
    } catch { /* Fail closed without exposing provider errors or credentials. */ }
  }
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

# HAILAN content management

The complete nine-language website is public. Decap CMS manages:

- all website interface and page copy in every locale;
- the three product records, including specifications and compliance copy;
- multilingual news drafts and approved articles.

The CMS writes to GitHub through an editorial workflow. Business users create
and edit drafts; publishing merges the approved change to `main`, after which
Vercel deploys the website.

## Local editing

Run the website and Decap local proxy in separate terminals:

```bash
npm run dev
npx decap-server
```

Open `http://localhost:3000/admin/`. Run `npm run cms:config` after changing the
dictionary structure so the CMS field schema stays in sync.

## Production login

Production editors authenticate with their company DingTalk account. The CMS
uses a same-origin Git gateway, so the GitHub credential never reaches the
editor's browser. Configure the DingTalk internal application callback URL as:

```text
https://hailanworld.com/api/cms/dingtalk/callback
```

Add these server-only values to Vercel Production,
then redeploy. Generate `CMS_AUTH_SECRET` from at least 32 random characters.

```text
CMS_AUTH_SECRET
CMS_DINGTALK_APP_KEY
CMS_DINGTALK_APP_SECRET
CMS_DINGTALK_CORP_ID
CMS_GITHUB_TOKEN
```

The GitHub token should belong to a dedicated service account and needs access only to
`hailan-world/website`. It stays on the server. Never commit or send any secret
in chat.

Access is defined by verified organization userIds in `src/lib/cms-access.ts`.
OAuth unionId is resolved through the application's company directory on login
and every gateway request; names are never used for authorization. Remove users
from this allowlist to revoke access; rotating CMS_AUTH_SECRET revokes all sessions.
Sessions expire after 30 minutes. Login uses browser-bound state and S256 PKCE,
and exchanges the provider's one-use authorization code only at the token endpoint.

The DingTalk application needs `Contact.User.Read` and `qyapi_get_member` and a
published version. The GitHub fine-grained token needs Contents, Pull requests,
and Issues read/write for this repository only. Application visibility does not
replace the server-side allowlist. See `docs/CMS-ACCESS.md` for assigned roles.

Run `node scripts/test-cms-security.cjs`, `npm run lint`, and `npm run build`
before rollout. Mocked tests do not verify real DingTalk login or GitHub token
permissions; finish acceptance testing with an authorized user's login and draft.

## Publishing rules

- Website copy and product edits use the editorial workflow and should be
  reviewed in Preview before publishing.
- News stays invisible while `status` is `draft`.
- News marked `approved` must include a reviewer, approval reference and public-
  safe source note or the build will reject it.
- The old synthetic `/[lang]/cms-preview/lvt` pilot remains excluded from search
  and unavailable in production; it is not part of the business CMS.

## Gateway regression checks and operational limits

Run `node scripts/test-cms-status.cjs` alongside the security tests above.
Both suites use mocked provider responses; they do not publish content.

A publisher can squash a content-only draft after unrelated source changes
advance `main`. Ref writes still require the original ancestry check. Diverged
publishing fails closed if main's side of the comparison touches any CMS content
area, renames or deletes a file, or exceeds the comparison limit. Refresh/rebase
and review such drafts before publishing. The gateway checks content paths,
rename origins, complete trees and regular-file modes, and rechecks the captured
main SHA before forwarding the merge.

GitHub atomically enforces the supplied head SHA and rejects merge conflicts.
Its merge endpoint has no base-SHA precondition: main can still advance between
the final validation read and the merge. Repository protections and trusted main
writers remain required; the gateway is not an atomic guard against concurrent
privileged main rewrites. Do not force-push main during CMS publication.

The anonymous status endpoint coalesces concurrent GitHub probes and caches both
successes and failures for 60 seconds after each probe finishes. Missing server
configuration fails closed immediately, and a changed GitHub token triggers a
fresh probe. Only the coarse operational/outage result is returned, never
provider errors or credentials; browser responses remain `no-store`.

This cache is per warm server instance (up to about 60 probes per hour per
instance), not a global quota or denial-of-service control. Cold starts and
multiple instances each probe independently. Status can lag upstream changes by
up to a minute; gateway authorization itself is never cached by this status
endpoint. Use platform rate limiting if a deployment needs a global abuse bound.

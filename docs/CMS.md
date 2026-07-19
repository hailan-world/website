# HAILAN CMS pilot

This is intentionally a small, reversible content-management pilot. It covers:

- a reviewed-news content model for the existing nine website locales;
- one synthetic LVT entry in English and Simplified Chinese;
- local editing and Vercel Preview verification.

It does not connect the rest of the website to the CMS, read Feishu, or publish
product facts automatically.

The public site is temporarily routed to a separate verified-information page:

```text
/verified/en
/verified/zh
/verified/ru
```

The verified business-contact page remains public in the same three languages:

```text
/linus/en
/linus/zh
/linus/ru
```

Existing product, manufacturing, quality, company and contact pages remain in
source control for review, but are not publicly reachable while their claims
lack traceable evidence and publication approval.

## Safety boundary

The LVT seed content is synthetic and contains no company or product claims.
Its route is available only when:

- the site runs in local development; or
- Vercel sets `VERCEL_ENV=preview` for a Preview deployment.

Production deployments return 404 for both pilot URLs:

```text
/en/cms-preview/lvt
/zh/cms-preview/lvt
```

The routes are also marked `noindex` and excluded in `robots.txt`.

News remains separately gated: an entry is not eligible for future public
display unless it is marked `approved` and includes a reviewer, approval
reference and public-safe source note. The temporary public verification gate
currently keeps the news routes offline as well.

## Phase A: local workflow test

Run the website and Decap local proxy in separate terminals:

```bash
npm run dev
npx decap-server
```

Open `http://localhost:3000/admin/` and choose **LVT 中英文试点**. Edit English
and Chinese, save, and inspect:

```text
http://localhost:3000/en/cms-preview/lvt
http://localhost:3000/zh/cms-preview/lvt
```

News drafts may be used to test the editor and pull-request diff, but the public
news route remains behind the verification gate during this pilot.

## Phase B: Vercel Preview test

1. Commit the pilot to a temporary branch and push it to GitHub.
2. Open a pull request without merging it.
3. Wait for Vercel to create the Preview deployment.
4. Open the English and Chinese pilot paths on that Preview domain.
5. Verify layout, translation switching, draft status and rollback.
6. Close the pull request if the test should be discarded.

The production product-page source remains unchanged, but its public URL is
temporarily redirected to the verified-information page.

## Success criteria

The pilot is successful when marketing can:

- edit both languages without touching code;
- save and review the content diff;
- see the result on a Vercel Preview URL;
- confirm that the same pilot path is 404 in production;
- confirm that unreviewed public routes redirect to the verified page;
- revert the test without leaving public content behind.

Only after these checks should the team decide whether to add real approved LVT
facts, GitHub OAuth login, Feishu read-only synchronization, or another page.

## Optional production CMS login

Do not configure this until the local and Preview tests are accepted. When the
team is ready, create the GitHub OAuth app with:

```text
Homepage URL: https://hailanworld.com
Callback URL: https://hailanworld.com/api/cms/callback
```

Then add these values to the Vercel **Production** environment and redeploy:

```text
CMS_GITHUB_CLIENT_ID
CMS_GITHUB_CLIENT_SECRET
```

Never commit or send the client secret in chat.

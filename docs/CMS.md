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

Create a GitHub OAuth app with:

```text
Homepage URL: https://hailanworld.com
Callback URL: https://hailanworld.com/api/cms/callback
```

Add these values to the Vercel Production, Preview and Development environments,
then redeploy:

```text
CMS_GITHUB_CLIENT_ID
CMS_GITHUB_CLIENT_SECRET
```

The GitHub account used by each business user must have write access to
`hailan-world/website`. Never commit or send the client secret in chat.

## Publishing rules

- Website copy and product edits use the editorial workflow and should be
  reviewed in Preview before publishing.
- News stays invisible while `status` is `draft`.
- News marked `approved` must include a reviewer, approval reference and public-
  safe source note or the build will reject it.
- The old synthetic `/[lang]/cms-preview/lvt` pilot remains excluded from search
  and unavailable in production; it is not part of the business CMS.

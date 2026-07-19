# HAILAN Website

This public repository is the source of truth for HAILAN's external website at [hailanworld.com](https://hailanworld.com).

## Repository boundary

This repository contains deployable public-facing material:

- website routes, layouts, components, styles, and localization;
- the retained verified public page and quarantined marketing copy awaiting
  claim-by-claim source review;
- public SEO metadata and downloadable contact assets;
- production website and namecard QR assets that point to public pages;
- build, validation, and deployment configuration.

It must not contain internal strategy, capability maps, organization design, processes, SOPs, KPIs, financial information, HR information, system architecture, internal AI prompts, or confidential operating documents. Those belong in the private [`hailan-world/company-os`](https://github.com/hailan-world/company-os) repository or an approved internal knowledge platform.

## Current scope

- Next.js App Router website with TypeScript and Tailwind CSS
- temporary public company-information and business-contact pages in English,
  Simplified Chinese and Russian containing only retained, source-backed facts
- existing nine-locale marketing routes retained in source control but
  redirected away from public access until their claims are verified
- locale-aware metadata, sitemap and robots rules for the retained public page
- reviewed-news workflow managed through the Git-backed headless CMS, with its
  public route temporarily withheld
- a bilingual LVT workflow pilot that is visible only in local development and
  Vercel Preview deployments

## Directory map

| Path | Responsibility |
|---|---|
| `src/app` | Routes, layouts, metadata, sitemap, robots rules, and locale dictionaries |
| `src/app/(verified)` | Temporary English/Chinese/Russian public page containing retained verified information |
| `src/components` | Reusable interface and page-section components |
| `src/data` | Withdrawn product copy retained for evidence review; not publicly routed |
| `content/news` | CMS-managed, locale-aware news entries with approval metadata |
| `content/pilot` | Synthetic English/Chinese LVT workflow test content |
| `public/admin` | Headless CMS editor and content model |
| `src/lib` | Site configuration, localization, and shared utilities |
| `public` | Assets served directly by the website |
| `design-assets/namecard` | Print-ready QR source assets for the public contact profile |

## Local development

Use the Node.js version supported by the pinned Next.js release, then install exactly from the lockfile:

```bash
npm ci
npm run dev
```

The local site is available at [http://localhost:3000](http://localhost:3000).

## Required checks

Run both checks before opening or merging a pull request:

```bash
npm run lint
npm run build
```

Dependencies are intentionally pinned through `package-lock.json`. Do not commit `.next`, `node_modules`, environment files, or deployment credentials.

## Content management

The first CMS pilot covers reviewed news and one synthetic English/Chinese LVT
entry. The LVT pilot cannot render on the production deployment. All other
public routes currently redirect to `/verified/en`, `/verified/zh` or
`/verified/ru` while
their factual claims are reviewed. Production OAuth, Vercel Preview testing,
and the pilot runbook are in
[`docs/CMS.md`](docs/CMS.md).

The verified Linus business-contact page remains public at `/linus/en`,
`/linus/zh` and `/linus/ru`. It uses `sales@hailanworld.com`, provides no public
telephone number, and retains WhatsApp and WeCom as QR-only contact channels.

## Publishing rule

Only approved public information may be published here. If content originates in Company OS, it must first be reviewed, declassified for its external audience, and then copied into this repository as a public derivative. The website never reads directly from the private Company OS repository.

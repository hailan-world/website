# HAILAN Website

This public repository is the source of truth for HAILAN's external website at [hailanworld.com](https://hailanworld.com).

## Repository boundary

This repository contains deployable public-facing material:

- website routes, layouts, components, styles, and localization;
- approved product, manufacturing, quality, OEM / ODM, news, and contact content;
- public SEO metadata and downloadable contact assets;
- production website and namecard QR assets that point to public pages;
- build, validation, and deployment configuration.

It must not contain internal strategy, capability maps, organization design, processes, SOPs, KPIs, financial information, HR information, system architecture, internal AI prompts, or confidential operating documents. Those belong in the private [`hailan-world/company-os`](https://github.com/hailan-world/company-os) repository or an approved internal knowledge platform.

## Current scope

- Next.js App Router website with TypeScript and Tailwind CSS
- nine locales: English, Simplified Chinese, French, Spanish, Russian, Arabic, Japanese, Malay, and Indonesian
- public pages for the company, products, manufacturing, quality, OEM / ODM, news, contact, and the Linus contact profile
- locale-aware metadata, sitemap, robots rules, and right-to-left rendering for Arabic
- static product and news content under `src/data`

## Directory map

| Path | Responsibility |
|---|---|
| `src/app` | Routes, layouts, metadata, sitemap, robots rules, and locale dictionaries |
| `src/components` | Reusable interface and page-section components |
| `src/data` | Approved public product and news content |
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

## Publishing rule

Only approved public information may be published here. If content originates in Company OS, it must first be reviewed, declassified for its external audience, and then copied into this repository as a public derivative. The website never reads directly from the private Company OS repository.

# HAILAN content management

HAILAN uses Payload CMS at `/admin`. The CMS manages:

- all interface and page copy in nine locales;
- the three fixed product records, with localized specifications and copy;
- multilingual news drafts and approved articles;
- website images in a shared media library.

Editors work in Chinese, select the content locale from the language control,
and edit content by page instead of by code structure. The sidebar separates
common navigation/footer copy, the homepage, and each secondary page, so an
editor never has to search through one all-site form. Payload provides
autosaved drafts, version history and same-origin Live Preview. Website visitors
only receive published content. Logged-in editors see
saved drafts in the preview.

The checked-in JSON files remain a read-only migration and outage fallback.
They are not the editing source of truth after Payload has been seeded.

## Required services and environment variables

Payload runs inside the existing Next.js application. Local development uses an
ignored SQLite database in `.payload/local.db`. Production requires a Postgres
database and Vercel Blob storage. Configure these server-side values:

```text
DATABASE_URI (or the DATABASE_URL / POSTGRES_URL injected by Vercel)
PAYLOAD_SECRET
BLOB_READ_WRITE_TOKEN
NEXT_PUBLIC_SERVER_URL=https://hailanworld.com
```

`PAYLOAD_SECRET` must be a random value of at least 32 characters. Do not commit
or send any production value in chat. Vercel normally creates
`BLOB_READ_WRITE_TOKEN` when a Blob store is connected to the project.

## Initial setup

For local development, no database setup is needed. Initialize the ignored
SQLite database and start the site:

```bash
npm run cms:types
npm run cms:seed
npm run dev
```

Before the first production deployment, connect the Postgres database, set the
production environment variables, then generate and commit the Postgres schema
migration from an environment using that `DATABASE_URI`:

```bash
npx payload migrate:create initial_payload_schema
npm run cms:migrate
npm run cms:seed
```

Open `http://localhost:3000/admin`. Payload shows its protected first-user
screen when no user exists. The first account must be given the `admin` role.
Additional users are created by an administrator.

The seed command is idempotent: it updates site copy and the three products by
their stable identifiers, and imports any legacy news JSON files. Run it once
per environment during migration, not on every deployment.

## Ownership and future handoff

During the transition, Payload and its managed services remain attached to the
existing Vercel project. The website is still portable: application code lives
in GitHub, structured content lives in Postgres, and uploaded files live in
Blob storage. None of the content depends on an editor's personal computer.

A future operator should receive control of these four assets together:

1. the GitHub repository and its deployment integration;
2. the Vercel project, production domain and environment variables;
3. the Postgres database and its backups;
4. the Blob store containing uploaded media.

Do not hand over a personal password. Invite the new operator to the relevant
organizations, create an individual Payload administrator for them, verify a
database backup and successful deployment, then remove the departing operator.
Moving the project between organizations or reconnecting equivalent Postgres
and object-storage services does not require rebuilding the website.

## Publishing roles

- **Editor** can change content and save drafts.
- **Publisher** can review and publish drafts.
- **Administrator** can publish and manage users and product records.

News cannot be published until the reviewer, approval reference and public-safe
source note are present. These governance fields are not rendered publicly.

## Development and validation

```bash
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

Local media is written to `public/media` and ignored by Git. Production media
uses Vercel Blob. The public frontend falls back to the checked-in JSON when
Payload has not been configured, so a missing development database does not
blank the website.

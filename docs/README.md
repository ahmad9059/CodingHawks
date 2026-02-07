# Coding Hawks Web + Admin

Marketing-grade site and CMS for the Coding Hawks society. The public experience spotlights fields, achievements, announcements, and team members with animated storytelling; the admin console lets trusted staff curate everything through Supabase-backed storage and PostgreSQL.

## Highlights
- Animated hero with background slider powered by database-backed images (Supabase Storage) with local fallbacks.
- Dynamic sections: fields/teams, achievements timeline, announcements feed, cabinet (team roster), and "Join Us" CTA wired to a configurable Google Form URL.
- Full admin dashboard (JWT + HTTP-only cookies) for slider, announcements, achievements, fields, cabinet, and site settings, including image upload and drag/drop ordering.
- Next.js 15 App Router, Tailwind + shadcn UI, Framer Motion for motion design, Prisma for data access, Supabase for Postgres and object storage.
- Turbopack dev server on port 9002 with type-safe tooling and linting ready to run.

## Quick Start
1) Install dependencies
```bash
npm install
```

2) Configure environment (see `.env.example` template below) and ensure your Supabase project exists.

3) Generate database client and apply schema to your Supabase Postgres
```bash
npm run db:generate
npm run db:push
```

4) Seed starter content (optional but recommended for a rich UI)
```bash
tsx src/scripts/seed-data.ts
```

5) Create the initial admin account defined in your env
```bash
npm run admin:init
```

6) Start the app
```bash
npm run dev   # http://localhost:9002
```

## Environment
Create a `.env` file with the keys below. Values shown are placeholders—use your own secrets.
```env
# Database (Supabase Postgres)
DATABASE_URL="postgresql://<user>:<password>@<host>:5432/postgres"
DIRECT_URL="postgresql://<user>:<password>@<host>:5432/postgres"

# Supabase (required for uploads and public URLs)
NEXT_PUBLIC_SUPABASE_URL="https://<project>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-key>"

# NextAuth / JWT
NEXTAUTH_SECRET="<random-long-secret>"
NEXTAUTH_URL="http://localhost:9002"

# Admin bootstrap
ADMIN_EMAIL="admin@codinghawks.com"
ADMIN_PASSWORD="change-me"
```

## Admin Console
- Login: `/admin/login` with the credentials above.
- Features: dashboard metrics, slider manager (with reordering), announcements, achievements, fields, cabinet/team members, and site settings (key/value with type-aware inputs).
- Security: JWT stored in an HTTP-only cookie; server routes verify tokens before any CRUD.

## Storage and Media
- Bucket: `codinghawks` (Supabase Storage). Make it public or add a read policy so image URLs resolve.
- Upload pipeline: the admin UI streams uploads directly to Supabase Storage and writes the resulting URL into Prisma models.
- Helper scripts:
  - `npm run upload:slider` uploads `public/ch/*.webp` to the bucket and writes DB rows.
  - `npm run create:slider` rewrites slider entries to Supabase URLs once the bucket is public.
  - `npm run create:slider-local` switches entries back to bundled local images.
  - `npm run test:urls` verifies stored image URLs.

## Data Model
Prisma models live in `prisma/schema.prisma` and cover users, slider images, announcements, achievements, fields, team members, and site settings. All public pages query these tables server-side (App Router, `dynamic = "force-dynamic"`) to ensure fresh content.

## Public Experience
- Landing page sections: hero slider, about, partner/logo carousel, animated fields grid, achievements spotlight, and a Join Us CTA.
- Announcements and achievements have dedicated pages with motion-enhanced cards and detail views.
- Cabinet page highlights supervisors and members with social links and responsive layouts.

## Commands
- `npm run dev` — start the dev server with Turbopack on port 9002.
- `npm run build` — generate production build (runs `prisma generate` first).
- `npm run start` — run the compiled app.
- `npm run lint` / `npm run typecheck` — quality gates.
- `npm run db:generate` / `npm run db:push` / `npm run db:migrate` / `npm run db:studio` — Prisma workflows.
- `npm run admin:init` — seed the admin user from env.
- `npm run seed-data` (manual: `tsx src/scripts/seed-data.ts`) — populate baseline content.
- Content utilities: `upload:slider`, `create:slider`, `create:slider-local`, `clear:slider`, `create:team`, `list:buckets`, `check:storage`.

## Project Layout
- `src/app` — App Router pages (public site, admin area, API routes, auth endpoints).
- `src/components` — UI library (shadcn-derived components, sections, admin managers, motion primitives).
- `src/lib` — Prisma client, Supabase client, auth helpers, placeholder data, utilities.
- `src/scripts` — operational scripts for seeding, uploads, and storage checks.
- `prisma/schema.prisma` — database schema.

## Working With Content
- Use the admin console for day-to-day edits; database queries power the public site immediately after saves.
- Site settings are key/value pairs; the frontend consumes them through `/api/settings` and the `useSiteSettings` hook.
- Join Us URL is configurable via the `join_us` setting; defaults to a Google Form fallback.

## Deployment Notes
- Ensure the Supabase bucket is public or has a policy allowing anonymous reads; otherwise the hero slider will fall back to bundled local images.
- Set `NEXTAUTH_URL` to the deployed host and rotate `NEXTAUTH_SECRET` per environment.
- Run `npm run build` after `prisma generate` with production env vars in place; Prisma uses `DATABASE_URL` at build time.

## Contribution Guide
- Keep components server-friendly where possible; export `dynamic = "force-dynamic"` only when live data is required.
- Prefer existing UI primitives in `src/components/ui` for consistency.
- Run `npm run lint` and `npm run typecheck` before opening a PR; add migrations when schema changes and document new env vars.

# AGENTS.md

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack), React 19, TypeScript 6, Tailwind CSS v4
- **CMS**: Payload 3 (embedded di app Next.js yang sama) — koleksi + admin panel `/admin`
- **Database**: PostgreSQL via `@payloadcms/db-postgres` (Drizzle internal, schema PG `payload`)
- **Auth**: Payload auth built-in (HTTP-only cookie, first user dibuat di `/admin`)
- **Media**: Cloudinary via custom storage adapter (`payload/adapters/cloudinary.ts` + `@payloadcms/plugin-cloud-storage`)
- **UI**: shadcn/ui (New York style), Motion, lucide-react, react-icons
- **Theming**: next-themes (light / dark / system)
- **Notifications**: sonner (Toaster)
- **DevOps**: Husky (pre-commit → lint-staged, commit-msg → commitlint, pre-push → build), Commitizen, standard-version, CI (push/PR ke develop/production)

## Commands

| Command                      | Description                            |
| ---------------------------- | -------------------------------------- |
| `npm run dev`                | Dev server at localhost:3000           |
| `npm run build`              | Production build (pre-push hook)       |
| `npm run start`              | Start production server                |
| `npm run lint`               | ESLint                                 |
| `npm run generate:types`     | Payload types → `payload-types.ts`     |
| `npm run generate:importmap` | Payload admin import map (prebuild CI) |
| `npm run commit`             | Commitizen interactive commit          |
| `npm run release`            | standard-version (changelog + git tag) |

## Project Structure

```
├── payload.config.ts                 # buildConfig: postgres adapter (schema: payload), lexical, cloudinary plugin
├── payload-types.ts                  # Generated types (jangan edit manual)
├── payload/
│   ├── adapters/cloudinary.ts        # Custom storage adapter (upload/delete Cloudinary)
│   ├── revalidate.ts                 # revalidateTag helper untuk collection hooks
│   ├── collections/                  # Categories, Media, Projects, Certificates, Experiences, Users
│   └── globals/PortfolioProfile.ts   # Global profile (bukan collection)
├── app/
│   ├── (payload)/                    # Admin panel + REST API bawaan Payload (jangan diubah)
│   │   ├── layout.tsx                # RootLayout @payloadcms/next + server functions
│   │   ├── admin/[[...segments]]/    # Admin catch-all views
│   │   ├── admin/importMap.js        # Generated
│   │   └── api/[...slug]/route.ts    # REST catch-all (dipakai admin UI)
│   ├── (frontend)/                   # Route group root layout publik
│   │   ├── layout.tsx                # ThemeProvider + Toaster (TANPA QueryProvider)
│   │   ├── not-found.tsx
│   │   ├── (main)/page.tsx           # Homepage (server component, fetch via server/queries)
│   │   ├── (portfolio)/projects/     # List + [slug] detail page (rich text)
│   │   ├── (portfolio)/certificate/  # List paginated
│   │   └── (portfolio)/experience/   # List paginated
│   ├── components/                   # Section components homepage (server + client split)
│   ├── globals.css                   # Tailwind v4 + @tailwindcss/typography
│   └── providers/theme-provider.tsx  # next-themes
├── server/
│   └── queries.ts                    # SATU-SATUNYA data layer: Local API + unstable_cache + tags
├── components/ui/                    # shadcn/ui components
├── lib/                              # date.ts (formatDate), utils.ts (cn)
└── .github/workflows/production.yaml # CI: npm ci → payload generate → lint → build
```

## Architecture Patterns

### Data Flow (Payload Local API)

```
Server Components → server/queries.ts (unstable_cache, tags: projects/certificates/experiences/categories/profile)
                  → payload.find/findGlobal (Local API, depth 1)
                  → Drizzle (internal @payloadcms/db-postgres) → PostgreSQL schema "payload"

Mutasi: hanya lewat /admin (Payload) → afterChange/afterDelete hooks → revalidateTag(tag, 'max')
```

### Aturan Penting

- **Tidak ada REST client/axios/TanStack Query** untuk halaman publik — semua server components + Local API
- **ID relasi Payload = number** (postgres adapter). Jangan stringify
- **Media**: upload koleksi `media` (relationTo) — field `image` berbentuk object `{ url, alt, publicId }` setelah depth populate; akses via `typeof x.image === 'object' && x.image.url`
- **Cloudinary URL** tersimpan di field `url` dokumen media; `publicId` dipakai adapter untuk destroy
- **Project.slug**: auto-generate dari title via field hook (boleh diisi manual, harus unik)
- **Detail page projek**: `app/(frontend)/(portfolio)/projects/[slug]/page.tsx` — render richText via `RichText` dari `@payloadcms/richtext-lexical/react`
- **Caching**: `unstable_cache` (revalidate 120s + tag). Invalidate otomatis via collection hooks
- **Turbopack**: `next dev`/`next build` default; font google OK di dev & build versi Next 16.3.x ini
- **`"type": "module"`** di package.json wajib (payload config loader ESM; Lexical pakai top-level await)

### Konvensi

- File: `kebab-case` untuk action/query, `PascalCase` komponen; path alias `@/*`
- Code style: no semicolons (legacy file ada yang semicolon — biarkan), single quotes, 2-space, trailing commas
- Types data dari `@/payload-types` (generated) — buat type manual hanya untuk bentuk view
- `unstable_cache` key: `['{resource}', ...]` + args otomatis masuk cache key

## Environment Variables

```
DATABASE_URL=              # Postgres (sslmode=require → adapter pakai uselibpqcompat=true otomatis)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
PAYLOAD_SECRET=            # npx auth secret / openssl rand -hex 24
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## Deployment / CI

- Workflow `.github/workflows/production.yaml`: push/PR ke `develop`/`production`
- Steps: `npm ci` → `payload generate:types` + `generate:importmap` → lint → build (Node 22)
- **Build butuh DATABASE_URL + PAYLOAD_SECRET valid** (koleksi di-query saat prerender via unstable_cache)
- Production: set `push: false` di payload.config (ganti ke `payload migrate`) jika schema sudah stabil

## Auth Flow

- Login admin: `/admin` (login screen Payload, first-run menampilkan Create First User)
- Tidak ada login/register custom, tidak ada middleware proxy — Payload melindungi `/admin` & REST-nya sendiri
- Koleksi non-media default access: hanya authenticated (Local API server-side pakai overrideAccess)

## Known Notes

- Tabel lama Prisma sudah di-drop dari schema public (migrasi Payload selesai, data di schema `payload`)
- `app/(payload)/*` adalah file generated — jangan dimodifikasi manual
- Tidak ada test framework; verifikasi via lint + build + smoke test endpoint

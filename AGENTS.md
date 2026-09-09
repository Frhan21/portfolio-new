# AGENTS.md

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack), React 19, TypeScript 6, Tailwind CSS v4
- **Database/ORM**: PostgreSQL + Prisma (`prisma/schema.prisma`, `db push` di dev)
- **Auth**: NextAuth v5 beta (Credentials + JWT access + refresh token di DB, cookie HTTP-only)
- **CRUD Admin**: Dashboard custom `/dashboard` (NextAuth-protected, api/v1 + server actions)
- **Media**: Cloudinary via `server/services/upload.server.ts` (image URL + publicId tersimpan di tabel)
- **Rich text**: Lexical (`lexical` + `@lexical/react`) di form dashboard, JSON disimpan di kolom `projects.content`
- **UI**: shadcn/ui (New York style), Motion, lucide-react, react-icons, TanStack Query (client fetching)
- **Theming**: next-themes (light / dark / system)
- **Notifications**: sonner (Toaster) + sweetalert2 (dialog dashboard)
- **DevOps**: Husky (pre-commit → lint-staged, commit-msg → commitlint, pre-push → build), Commitizen, standard-version, CI (push/PR ke develop/production)

## Commands

| Command               | Description                            |
| --------------------- | -------------------------------------- |
| `npm run dev`         | Dev server at localhost:3000           |
| `npm run build`       | Production build (pre-push hook)       |
| `npm run start`       | Start production server                |
| `npm run lint`        | ESLint                                 |
| `npx prisma generate` | Regenerate Prisma Client               |
| `npx prisma db push`  | Apply schema ke DB (dev)               |
| `npm run commit`      | Commitizen interactive commit          |
| `npm run release`     | standard-version (changelog + git tag) |

## Project Structure

```
├── prisma/schema.prisma            # Category, User, PortfolioProfile, RefreshToken, Project, Certificate, Experience
├── app/
│   ├── layout.tsx                  # Root layout (ThemeProvider + QueryProvider + AuthProvider + Toaster)
│   ├── not-found.tsx
│   ├── (auth)/                     # Login + register (NextAuth)
│   ├── (dashboard)/                # Dashboard custom (CRUD via api/v1 + axios)
│   │   └── dashboard/projects/components/form/  # form projek + RichTextEditor (Lexical)
│   ├── (main)/                     # Homepage (server component, fetch via server/services)
│   ├── (portfolio)/                # projects (+ [slug] detail), certificate, experience
│   ├── api/auth/[...nextauth]/     # NextAuth route handler
│   ├── api/v1/                     # REST CRUD (auth-protected)
│   ├── components/                 # Section components homepage + card + hooks TanStack
│   └── providers/                  # theme, query, auth providers
├── server/
│   ├── actions/                    # Server actions: validasi zod + upload Cloudinary + service
│   ├── services/                   # Business logic (project.server punya getProjectBySlug + slug gen)
│   └── repositories/               # Prisma queries
├── components/
│   ├── ui/                         # shadcn/ui components
│   └── lexical/                    # rich-text-editor.tsx (form) + renderer.tsx (publik)
├── lib/                            # auth, prisma, axios, jwt, validation, date, utils
└── .github/workflows/production.yaml # CI: npm ci → prisma generate → lint → build (Node 22)
```

## Architecture Patterns

```
Dashboard (client) → TanStack/axios → /api/v1 (NextAuth cookie) → server/actions (zod + upload Cloudinary)
                   → server/services → server/repositories → Prisma → PostgreSQL (schema public)

Halaman publik → server components → server/services (Prisma langsung)
Detail projek → /projects/[slug] → getProjectBySlug → LexicalRenderer (projects.content JSON)
```

### Aturan Penting

- **Lexical**: editor di `components/lexical/rich-text-editor.tsx` ('use client', toolbar + react-hook-form `Controller`); value = `editorState.toJSON()` → kolom `content` (Json). Render publik via `components/lexical/renderer.tsx` (pure JSON → React, aman server component). Jangan pakai format HTML
- **Project.slug**: di-generate otomatis dari title di `createProject` (service), unique — update form tidak mengubah slug
- **Image**: field `image` = URL string Cloudinary + `publicId` untuk delete; upload via `uploadImage()` (formidable → Cloudinary)
- **Tags/badges** lama tersimpan berantakan (JSON-in-array) — bersihkan saat render dengan `.replace(/[\[\]"]/g, '').trim()`
- **Auth**: NextAuth session JWT + refresh token DB; proxy.ts melindungi /dashboard, /login & /register redirect
- **ID**: semua ID Prisma = string (uuid)
- **"type": "module"** di package.json — commitlint config harus `.cjs`
- **DB push drift**: `prisma db push` bisa error "constraint already exists" (drift lama) — kalau menambah kolom terblokir, ALTER manual via script SQL

### Konvensi

- File: `kebab-case` untuk action/query, `PascalCase` komponen; path alias `@/*`
- Code style: no semicolons (legacy file ada yang semicolon — biarkan), single quotes, 2-space, trailing commas
- Types data dari `model/*` (hand-written mirror Prisma models)

## Environment Variables

```
DATABASE_URL=              # Postgres (Aiven; sslmode=require — tambah uselibpqcompat=true untuk raw pg)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=                # NextAuth token signing
JWT_EXPIRED=1h
AUTH_SECRET=               # NextAuth v5
AUTH_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## Deployment / CI

- Workflow `.github/workflows/production.yaml`: push/PR ke `develop`/`production`
- Steps: `npm ci` → `prisma generate` → lint → build (Node 22)
- Build butuh DATABASE_URL + secrets valid
- `prisma db push` atau `prisma migrate deploy` untuk schema di production

## Auth Flow

- Login/register: `/login`, `/register` → NextAuth Credentials → JWT access (1h) + refresh token (DB, 7d)
- Dashboard protected oleh proxy.ts middleware + server-side session check

## Known Notes

- Riwayat eksperimen Payload CMS ada di history git (commit sebelum `revert:`) — tidak dipakai; schema PG `payload` masih ada di DB (bisa di-drop manual kalau mau)
- Detail page projek: konten kosong → fallback "coming soon"
- Tidak ada test framework; verifikasi via lint + build + smoke test endpoint

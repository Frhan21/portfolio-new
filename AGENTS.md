# AGENTS.md

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- Prisma (PostgreSQL), Cloudinary (images), JWT + bcryptjs (auth)
- shadcn/ui (New York), TanStack React Query + Axios, Motion, next-themes

## Commands

- `npm run dev` — dev server at localhost:3000
- `npm run build` — production build (pre-push hook enforces this)
- `npm run lint` — ESLint
- `npx prisma generate` — required before build (CI step 4)
- `npx prisma db push` / `npx prisma studio` — schema sync / DB browser
- `npm run commit` — commitizen interactive commit (conventional)
- `npm run release` — standard-version (changelog + git tag)
- `npm run release:minor` / `npm run release:major`

## Commit Flow

- Husky: pre-commit → `lint-staged` (eslint --fix + prettier --write), commit-msg → commitlint, pre-push → `npm run build`
- Use `npm run commit` or write conventional commits manually

## Structure

- `app/(main)/` — public portfolio homepage
- `app/(portfolio)/` — sub-pages (projects, certificate)
- `app/(auth)/` — login / register
- `app/dashboard/` — admin (protected by middleware)
- `app/api/v1/` — REST route handlers
- `server/actions/` — Next.js Server Actions
- `server/services/` — business logic
- `lib/` — shared: prisma singleton, jwt, cloudinary, axios, zod validation, api-response helpers
- `components/ui/` — shadcn/ui
- `commons/` — shared types & constants

## Conventions

- Path alias `@/*` → repo root
- Prisma client singleton in `lib/prisma.ts` (logs queries in non-prod)
- API responses via `successResponse` / `errorResponse` / `validationErrorResponse` in `lib/api-response.ts`
- Server Actions for mutations; axios instance (`lib/axios.ts`, baseURL `/api/v1`) for client GETs
- Auth: JWT in `token` cookie, middleware (`proxy.ts`) protects `/dashboard`, redirects auth users from `/login`
- Image uploads via Cloudinary
- Zod schemas in `lib/validation.ts`
- ESLint ignores `app/generated/**`
- CI (push/PR to develop/production): `npm ci` → `npx prisma generate` → `npm run lint` → `npm run build`
- Node 20 required (CI enforces)

## .env

```
DATABASE_URL=postgresql://...
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=
JWT_EXPIRED=
```

## Testing

No test framework configured.

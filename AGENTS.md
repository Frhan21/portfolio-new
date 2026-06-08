# AGENTS.md

## Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Database**: Prisma + PostgreSQL (5 models: Category, User, Project, Certificate, RefreshToken)
- **Auth**: NextAuth v5 (Credentials provider) + JWT strategy + Refresh Token (DB-based), middleware (`proxy.ts`)
- **Data Fetching**: Server Actions (`'use server'`) for auth mutations; TanStack React Query + Axios for client GETs; REST API routes (`app/api/v1/`) for CRUD
- **Caching**: `unstable_cache` from `next/cache` with tag-based revalidation (tags: `projects`, `certificates`)
- **Image Storage**: Cloudinary (upload via `server/services/upload-image.ts`)
- **UI**: shadcn/ui (New York style), Tailwind CSS v4, Motion (framer-motion fork), lucide-react icons
- **Forms**: react-hook-form + `@hookform/resolvers` + Zod schemas
- **Theming**: next-themes (light / dark / system)
- **Notifications**: sonner (Toaster), sweetalert2
- **DevOps**: Husky (pre-commit → lint-staged, commit-msg → commitlint, pre-push → build), Commitizen, standard-version, CI (push/PR ke develop/production)

## Commands

| Command                 | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `npm run dev`           | Dev server at localhost:3000                   |
| `npm run build`         | Production build (pre-push hook enforces this) |
| `npm run start`         | Start production server                        |
| `npm run lint`          | ESLint                                         |
| `npx prisma generate`   | Required before build (CI step)                |
| `npx prisma db push`    | Push schema to DB                              |
| `npx prisma db pull`    | Pull schema from DB                            |
| `npx prisma studio`     | DB browser                                     |
| `npm run commit`        | Commitizen interactive commit (conventional)   |
| `npm run release`       | standard-version (changelog + git tag)         |
| `npm run release:minor` | Minor version bump                             |
| `npm run release:major` | Major version bump                             |

## Project Structure

```
├── app/
│   ├── globals.css                   # Tailwind v4 CSS-first config + custom properties
│   ├── layout.tsx                    # Root layout: ThemeProvider, QueryProvider, Toaster
│   ├── not-found.tsx                 # Custom 404 page
│   ├── (auth)/                       # Route group: Login / Register
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── component/
│   │   │   ├── form/page.tsx         # AuthForm (react-hook-form + zod, handles both login/register)
│   │   │   └── form/schema/          # LoginSchema (login-scheme.tsx), RegisterSchema (register-scheme.ts)
│   │   └── hooks/                    # use-login.tsx, use-register.tsx (TanStack Query mutations)
│   ├── (dashboard)/                  # Route group: Admin dashboard
│   │   ├── dashboard/layout.tsx      # SidebarProvider + DashboardSidebar + DashboardHeader
│   │   ├── dashboard/page.tsx        # Stat cards overview
│   │   ├── dashboard/projects/
│   │   ├── dashboard/certificates/
│   │   ├── dashboard/categories/
│   │   └── dashboard/settings/
│   ├── (main)/                       # Route group: Public homepage
│   │   ├── layout.tsx                # Navbar + Footer
│   │   └── page.tsx                  # Hero, About, Tools, Project, Certificate, FAQ, Contact
│   ├── (portfolio)/                  # Route group: Sub-pages
│   │   ├── projects/page.tsx
│   │   ├── certificate/page.tsx
│   │   └── experience/page.tsx
│   ├── api/auth/                      # NextAuth route handler
│   │   └── [...nextauth]/route.ts
│   ├── api/v1/                       # REST API route handlers
│   │   ├── category/route.ts         # GET (list), POST (create)
│   │   ├── category/[id]/route.ts    # PUT (update), DELETE
│   │   ├── certificate/route.ts      # GET (list), POST (create with image)
│   │   ├── certificate/[id]/route.ts # GET, PUT (update with image), DELETE
│   │   ├── project/route.ts          # GET (list), POST (create with image)
│   │   ├── project/[id]/route.ts     # GET, PUT (update with image), DELETE
│   │   └── user/route.ts             # GET (list)
│   ├── components/                   # Homepage section components
│   │   ├── home/ (hero), about/, project/, certificate/, contact/, faq/
│   │   ├── navbar.tsx, footer.tsx, skills-bar.tsx, motions.ts
│   │   └── card/index.tsx            # Project card (used in homepage & portfolio)
│   ├── hooks/                        # App-level hooks
│   │   ├── category-hooks/use-query-category.ts
│   │   └── use-typing.ts             # Typewriter effect
│   └── providers/
│       ├── auth-provider.tsx          # NextAuth SessionProvider
│       ├── query-provider.tsx         # TanStack QueryClientProvider
│       └── theme-provider.tsx         # next-themes ThemeProvider
├── server/
│   ├── repositories/                  # Data access layer (Prisma queries only)
│   │   ├── category.repository.ts
│   │   ├── certificate.repository.ts
│   │   ├── project.repository.ts
│   │   ├── refresh-token.repository.ts
│   │   └── user.repository.ts
│   ├── services/                      # Business logic layer (uses repositories)
│   │   ├── auth.server.ts             # Auth: registerUser, revokeUserSessions, getUser
│   │   ├── category.server.ts         # Category CRUD (thin, delegates to repository)
│   │   ├── certificate.server.ts      # Certificate CRUD + paginated & cached queries
│   │   ├── project.server.ts          # Project CRUD + paginated & cached queries
│   │   └── upload.server.ts           # Cloudinary image upload
│   └── actions/                       # Client-side axios wrappers + Server Actions
│       ├── auth.actions.ts            # Server Action ('use server' + cookies)
│       ├── category.actions.ts        # Client CRUD via axios
│       ├── certificate.actions.ts     # Client CRUD via axios
│       └── project.actions.ts         # Client CRUD via axios
├── lib/                               # Shared utilities
│   ├── api-response.ts                # successResponse, errorResponse, validationErrorResponse
│   ├── auth.ts                        # NextAuth v5 config (Credentials + JWT + refresh token)
│   ├── axios.ts                       # Axios instance (baseURL /api/v1)
│   ├── cloudinary.ts                  # Cloudinary v2 config
│   ├── date.ts                        # formatDate() (locale id-ID)
│   ├── jwt.ts                         # generateToken, verifyToken, decodetoken
│   ├── prisma.ts                      # PrismaClient singleton
│   ├── utils.ts                       # cn() (clsx + tailwind-merge)
│   └── validation.ts                  # Zod schemas: category, project, user, certificate
├── components/
│   └── ui/                            # 15 shadcn/ui components (New York style)
│       ├── button.tsx, card.tsx, input.tsx, label.tsx, tabs.tsx
│       ├── data-table.tsx             # TanStack React Table wrapper
│       ├── sidebar.tsx                # shadcn Sidebar (collapsible)
│       ├── table.tsx, field.tsx, sheet.tsx
│       ├── dropdown-menu.tsx, tooltip.tsx, separator.tsx
│       ├── skeleton.tsx, sonner.tsx
├── model/                             # TypeScript type definitions
│   ├── category.ts, user.ts, project.ts, certificate.ts
├── commons/                           # Shared constants & types
│   ├── constant/dashboard-menu.ts
│   └── types/response.ts              # TResponseItem, TResponsePaginate, TResponseError
├── types/
│   ├── auth.ts                       # NextAuth module augmentation (Session, JWT)
│   └── jwt-payload.ts                # JwtPayload type
├── hooks/use-mobile.ts                # useIsMobile() hook (768px breakpoint)
├── proxy.ts                           # Next.js middleware (auth guard)
├── prisma/schema.prisma               # 5 models (Category, User, Project, Certificate, RefreshToken)
└── .github/workflows/production.yaml  # CI: npm ci → prisma generate → lint → build
```

## Architecture Patterns

### Data Flow (Clean Architecture)

```
Server Actions (auth — 'use server'):
  Component → auth.actions.ts → auth.server.ts → user.repository.ts / refresh-token.repository.ts → Prisma → Response

Client Login (NextAuth):
  Component → signIn('credentials', ...) → NextAuth authorize → auth.server.ts → user.repository.ts → Prisma → Response

Client GETs (TanStack Query):
  Component → useQuery hook → actions file (axios) → API route → service (*.server.ts) → repository (*.repository.ts) → Prisma → Response

API Routes (CRUD):
  Request → app/api/v1/{resource}/route.ts → service (*.server.ts) → repository (*.repository.ts) → Prisma → Response
```

### Layer Responsibilities

| Layer               | Path                                  | Responsibility                                                                    |
| ------------------- | ------------------------------------- | --------------------------------------------------------------------------------- |
| **Repository**      | `server/repositories/*.repository.ts` | Pure Prisma queries, no business logic, no caching                                |
| **Service**         | `server/services/*.server.ts`         | Business logic, validation, caching (`unstable_cache`), delegates to repositories |
| **Action (server)** | `server/actions/auth.actions.ts`      | Server Action entry point (`'use server'`), cookie handling, validation           |
| **Action (client)** | `server/actions/*.actions.ts`         | Client-side axios wrappers consumed by TanStack Query hooks                       |
| **API Route**       | `app/api/v1/{resource}/route.ts`      | HTTP controller, request parsing, response formatting                             |

### API Response Shape (from `lib/api-response.ts`)

```ts
// Standard
{ success: boolean, message: string, data?: T, error?: string }

// Parsed by client wrappers → { status_code: number, message: string, data: T }
// Paginated → { status_code: number, message: string, data: { items: T[], meta: { total, page, totalPages } } }
```

### Routing Patterns

- Route groups: `(main)`, `(portfolio)`, `(auth)`, `(dashboard)` — no URL prefix
- API routes: `/api/v1/{resource}` — RESTful (GET, POST, PUT, DELETE)
- Middleware (`proxy.ts`): protects `/dashboard/*`, redirects authenticated users from `/login` and `/register`
- Matcher excludes: `/api`, `/_next/static`, `/_next/image`, `/favicon.ico`

## Conventions

### File Naming

- **Action files**: `kebab-case.actions.ts`
- **Service files**: `kebab-case.server.ts`
- **Repository files**: `kebab-case.repository.ts`
- **Hooks**: `use-{name}.tsx` → function `use{Name}`
- **Components**: `PascalCase.tsx` or `kebab-case.tsx`
- **Types/Interfaces**: `PascalCase`
- **Functions**: `camelCase`
- **Path alias**: `@/*` → repo root

### Code Style

- No semicolons, single quotes, 2-space indent, trailing commas (enforced by Prettier)
- Prefer `interface` over `type` for object shapes
- ESLint + Prettier run on pre-commit via lint-staged

### Prisma

- Singleton in `lib/prisma.ts` (stored on `globalThis` to avoid hot-reload duplicates)
- Query logging in non-production
- UUID primary keys (`@default(uuid())`)
- Timestamps via `@default(now())` / `@updatedAt`
- 5 models: Category, User, Project, Certificate, RefreshToken

### Auth & Middleware

- **NextAuth v5** with Credentials provider + JWT strategy
- JWT session: encrypted cookie (`next-auth.session-token`), auto-managed by NextAuth
- Access token expires: 15 minutes (custom JWT claim)
- Refresh token: stored in DB (`RefreshToken` model), expires 7 days, auto-rotated
- **Login flow**: Client calls `signIn('credentials', { email, password })` → NextAuth authorize → validates via `auth.server` → creates refresh token → returns JWT
- **Register flow**: Server Action creates user → client calls `signIn` for auto-login
- **Logout flow**: `logoutAction` revokes refresh tokens in DB → `signOut({ callbackUrl: '/login' })`
- Axios interceptor: no longer reads legacy `token` cookie (NextAuth handles auth)
- `proxy.ts` uses NextAuth `auth()` middleware to check session
- Middleware protects `/dashboard/*`, redirects auth users from `/login` and `/register`
- Prisma models: `User` + `RefreshToken` (one-to-many)

### Environment Variables

```
AUTH_SECRET=    # Required by NextAuth (generate via: npx auth secret)
AUTH_URL=       # http://localhost:3000 (dev)
```

### Caching

- `unstable_cache` with keys `['{resource}', 'page', '{page}', 'limit', '{limit}']`
- Revalidation: `revalidate: 120` (seconds) + tag-based: `revalidateTag('{resource}')` after mutations
- Cache tags used: `projects`, `certificates`

### TanStack Query Defaults (in `app/providers/query-provider.tsx`)

- `staleTime: 60000` (1 minute)
- `gcTime: 300000` (5 minutes)
- `refetchOnWindowFocus: false`

### Zod Validation

- Shared schemas for categories, projects, and certificates in `lib/validation.ts`
- Auth form schemas in `app/(auth)/component/form/schema/`
  - `login-scheme.tsx`: `{ email, password }`
  - `register-scheme.ts`: `{ name, email, password, confirmPassword }` (with `.refine` for password match)

## Deployment / CI

- GitHub Actions workflow in `.github/workflows/production.yaml`
- Triggers: push/PR to `develop` or `production` branches
- Steps: `npm ci` → `npx prisma generate` → `npm run lint` → `npm run build`
- Node 20 required (enforced by CI)
- Branch protection expected on `production` and `develop`

## .env Template

```
DATABASE_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=
JWT_EXPIRED=
AUTH_SECRET=
AUTH_URL=http://localhost:3000
```

## Known Issues / Inconsistencies (TODO)

- **Typo in validation.ts**: `certficateSchema` (missing 'i') on line 52 — use as-is or fix
- **Mixed API response patterns**: some routes use `successResponse`/`errorResponse` helpers from `lib/api-response.ts`, others use raw `NextResponse.json()`
- **Mixed type vs interface**: `Project` model uses `type`, all others use `interface`
- **Naming inconsistency**: `decodetoken` → should be `decodeToken` (in `lib/jwt.ts`)

## Testing

No test framework configured.

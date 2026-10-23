# 01: Update vulnerable dependencies

**What to build:** Dependency installation uses compatible patched packages and removes avoidable critical/high vulnerabilities.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Next.js critical vulnerability removed
- [x] Prisma packages aligned on major 6
- [x] Install and lint pass; build reaches existing unrelated AI route type error
- [x] Remaining audit findings documented

## Comments

Updated Next.js/ESLint to 16.4.2, Prisma packages to 6.19.3, lint-staged to 17.6.0, and safe transitive fixes. Removed unused mismatched `@prisma/adapter-pg` 7.

Verification: `npm ci --ignore-scripts`, `npx prisma generate`, and `npm run lint` pass (five existing warnings). Build compiles, then fails because untracked `app/api/v1/ingest/route.ts` is empty/not a module; unrelated to dependency changes.

Audit improved from 29 (1 critical, 21 high) to 11 (0 critical, 9 high). Prisma migrated to 7.10.1 with PostgreSQL adapter and verified using a read-only `SELECT 1`; schema and data were not changed. Remaining findings require unsafe downgrades or upstream fixes; no `--force` used.

# Fix dependency vulnerabilities

Reduce install/audit failures without risky framework downgrades or forced major upgrades.

## Decisions

- Upgrade compatible direct dependencies and lockfile transitive dependencies.
- Keep Prisma 6; do not force Prisma 8 migration for audit-only tooling finding.
- Remove unused, mismatched `@prisma/adapter-pg` 7.
- Verification seam: clean dependency resolution, audit, lint, build; no test runner.

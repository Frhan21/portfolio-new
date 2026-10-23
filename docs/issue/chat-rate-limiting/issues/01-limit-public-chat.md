# 01: Limit public chat usage

**What to build:** Public chat requests are atomically limited per visitor and globally before any AI resources are used, with useful UI feedback.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Client identity is hashed and raw IP is not persisted.
- [x] Per-client limit is 10 requests per rolling 10 minutes.
- [x] Global limit is 200 requests per WIB calendar day.
- [x] Concurrent requests cannot bypass either limit.
- [x] Counter failure returns 503 and limit exhaustion returns 429 with Retry-After before AI calls.
- [x] Chat UI shows stable friendly errors.
- [x] Vitest, lint, build, and SQL verification pass.

## Comments

Implemented PostgreSQL-backed limiter using transaction advisory lock, hashed Vercel client identity, rolling client/global WIB limits, cleanup, API/UI errors, and route tests. Database table/indexes applied via targeted SQL. Concurrent SQL verification admitted exactly 10 of 11 requests. Tests pass (16); lint has five unrelated warnings; build passes with two existing filesystem warnings.

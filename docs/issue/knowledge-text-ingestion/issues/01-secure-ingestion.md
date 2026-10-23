# 01: Secure text and PDF ingestion

**What to build:** Admin can securely ingest titled text or one PDF, with exact duplicate prevention and truthful completion status.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Unauthenticated requests are rejected.
- [x] Text and PDF share chunking, embedding, metadata, and exact-hash dedupe flow.
- [x] Empty/invalid input is rejected and raw PDF is not persisted.
- [x] Duplicate concurrent or repeated input is not embedded twice.
- [x] Failed ingestion can be retried.
- [x] Vitest covers core ingestion behaviour.

## Comments

Implemented authenticated text/PDF ingestion, exact normalized-content dedupe, retry cleanup, and Vitest coverage. Fixed Prisma column mapping for `created_at`/`updated_at`. `npm test` passes (4 tests); Prisma schema validates.

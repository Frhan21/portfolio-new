# 01: Stabilize public chat API

**What to build:** Public callers receive a predictable string answer or useful validation error for a bounded question.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Questions are trimmed and constrained to 1–500 characters.
- [x] Invalid input returns HTTP 400 without calling retrieval or LLM.
- [x] Successful answers always use a string JSON contract.
- [x] Provider failures return a generic error without leaking internals.
- [x] Vitest covers the public validation and answer-normalization seam.

## Comments

Added bounded question validation and string answer normalization. Contract suite passes (7 tests).

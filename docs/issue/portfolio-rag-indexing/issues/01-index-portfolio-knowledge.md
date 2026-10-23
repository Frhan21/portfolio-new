# 01: Index portfolio knowledge

**What to build:** Provide one explicit manual indexing flow that loads local PDFs and public portfolio records into pgvector, while question answering only retrieves existing indexed knowledge.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Local text-based PDFs load through LangChain `PDFLoader` with source/page metadata.
- [x] Profile, projects, experiences, and certificates become LangChain documents with safe source metadata.
- [x] Project Lexical JSON contributes readable plain text without browser or React dependencies.
- [x] Indexing runs only when explicitly called, never when the RAG module is imported.
- [x] `ask()` retrieves existing chunks and keeps the configured OpenCode-compatible LLM endpoint.
- [x] Loader behavior is verified with lint and production build; automated test-runner setup remains deferred.

## Comments

Implemented PDF and public portfolio document loaders, server-safe Lexical text extraction, explicit manual indexing, and retrieval-only `ask()`. Missing PDF directory is treated as an empty source. `npx eslint lib/ai/file-loader.ts lib/ai/rag.ts` and `npm run build` pass. Provider/database smoke test was not run to avoid paid API calls and database writes.

Current behavior: application startup does not index data. `indexPortfolioKnowledge()` must be called explicitly; `store.addDocuments()` then requests document embeddings and writes chunks to pgvector. `ask()` embeds only each incoming question. Re-running indexing may duplicate chunks, so recurring execution is deferred until source hashing/replacement exists.

Future direction: dashboard uploads will process PDFs temporarily, persist only extracted chunks, embeddings, and safe metadata in PostgreSQL, then discard raw files. Cloudinary storage for source PDFs is not planned.

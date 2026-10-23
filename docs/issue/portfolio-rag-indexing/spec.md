# Portfolio RAG Indexing

## Goal

Index local PDF files and public portfolio records into the existing Aiven pgvector store, then answer questions without re-indexing during module import.

## Decisions

- Use LangChain `PDFLoader` for local text-based PDFs.
- Keep OpenCode-compatible `ChatOpenAI` endpoint configuration unchanged.
- Build one LangChain `Document` per portfolio entity: profile, project, experience, and certificate.
- Convert project Lexical JSON to plain text with a server-safe recursive extractor.
- Run indexing only through an explicit manual function; dashboard upload, automatic sync, retries, and deletion are deferred.
- Preserve safe source metadata for later citations.

## Interfaces

- `loadPdfDocuments(directory)` loads PDF files and preserves page metadata.
- `loadPortfolioDocuments()` loads public portfolio records into LangChain documents.
- `indexPortfolioKnowledge()` explicitly loads, chunks, and stores all documents.
- `ask(question)` only retrieves indexed chunks and invokes the configured LLM.

## Current flow

1. `loadPdfDocuments()` reads text-based PDFs from local `data/pdf` files.
2. `loadPortfolioDocuments()` reads profile, projects, experiences, and certificates from PostgreSQL.
3. `indexPortfolioKnowledge()` chunks both sources; `store.addDocuments()` requests Google embeddings and stores text, metadata, and vectors in Aiven PostgreSQL.
4. Indexing only runs when `indexPortfolioKnowledge()` is explicitly called. Starting the app or importing `rag.ts` does not index data.
5. `ask(question)` embeds only the question, retrieves existing chunks, and sends them to the OpenCode-compatible LLM.

Repeated manual indexing currently processes every source again and may create duplicate chunks. Do not schedule or repeatedly invoke it until replacement/deduplication is implemented.

## Verification seam

Loader behavior is checked through its public interface. ESLint and production build pass. Provider/database smoke testing remains manual because it writes data and consumes embedding quota.

## Future plan

- Add a manual indexing command after replacement/deduplication is designed.
- Detect changed sources using stable source IDs and content hashes; unchanged sources skip embedding.
- Replace all old chunks for a changed or re-uploaded document; deleting a document deletes its chunks.
- Add dashboard ingestion after the local flow is understood.
- Uploaded PDFs are temporary input only. Do not persist raw PDFs to Cloudinary; retain extracted chunk text, embedding, and safe metadata in PostgreSQL.
- Add automatic portfolio synchronization, retry/queue handling, rate limiting, citations, chat history, and chatbot UI only when needed.

## Out of scope for current implementation

Dashboard ingestion, raw-file storage, automatic re-indexing, change detection, deduplication, deletion, queue/retry, rate limiting, chat history, API endpoint, manual indexing CLI, and chatbot UI.

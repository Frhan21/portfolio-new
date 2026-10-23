# 01: Extract PDF and Markdown text

**What to build:** Load an uploaded PDF or Markdown file and return normalized CV text ready for downstream AI processing.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] PDF files return extracted text from every page.
- [x] Markdown files return their text content.
- [x] MIME type and filename extension both identify supported files.
- [x] Unsupported formats throw a clear error.
- [x] Output is normalized and limited to 20,000 characters.
- [x] ESLint and smoke extraction pass.

## Comments

Implemented `extractTextFromFile` with PDF and Markdown dispatch. Verified ESLint plus real PDF (4,025 extracted characters) and in-memory Markdown smoke extraction.

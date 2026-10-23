# CV file loader

## Goal

Extract normalized CV text from uploaded PDF or Markdown files through one server-side API.

## Decisions

- Public entry point: `extractTextFromFile(file: File): Promise<string>`.
- PDF input is converted from `File.arrayBuffer()` to `Uint8Array`, then extracted with `unpdf`.
- Markdown input uses `File.text()` without rendering or stripping Markdown syntax.
- Supported formats are PDF and Markdown, detected from MIME type or filename extension.
- Unsupported formats throw a clear error.
- Normalization and the 20,000-character limit apply once to the complete extracted text.

## Verification seam

No test runner is added. Verify with ESLint plus smoke extraction from a real repository PDF and an in-memory Markdown file.

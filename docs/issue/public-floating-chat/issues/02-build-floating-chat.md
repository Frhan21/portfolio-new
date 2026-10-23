# 02: Build responsive public floating chat

**What to build:** Visitors can use an accessible floating chatbot on every non-dashboard page and read safely formatted responses.

**Blocked by:** 01: Stabilize public chat API

**Status:** resolved

- [x] Launcher appears bottom-right on public/auth pages and never on dashboard routes.
- [x] Desktop compact panel and mobile near-full-screen panel provide correct keyboard/safe-area behaviour.
- [x] Greeting, three suggestions, message history, loading, answer, validation, and retryable error states work.
- [x] Markdown is rendered safely without raw HTML.
- [x] Escape, focus management, labels, and reduced motion are supported.
- [x] Vitest, lint, build, and browser QA at desktop/mobile pass.

## Comments

Implemented root-mounted responsive chat with safe Markdown, suggestions, status handling, and accessible controls. Browser QA covered desktop/mobile open state, suggestion/answer with mocked Markdown response, Escape focus restoration, auth visibility, and dashboard route redirect context. Tests pass (11), lint has five unrelated warnings, build passes with two existing filesystem warnings.

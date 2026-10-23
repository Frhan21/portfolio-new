# Issue tracker: Local Markdown

Issues and specs for this repo live as markdown files under `docs/issue/`. The repo has a GitHub remote, but **issues are NOT tracked on GitHub** for this workflow — everything is a file in this repo.

> **Never write to GitHub from an agent.** Do not create, comment on, close, label, or merge GitHub issues/PRs via `gh` CLI or the GitHub MCP. Do not `git commit` or `git push` without the user's explicit say-so in that conversation. Read-only GitHub access (`gh issue view`, `gh pr view`, `git log`) is fine. See the `## Git & GitHub (WAJIB)` section in `AGENTS.md`.

## Conventions

- One feature per directory: `docs/issue/<feature-slug>/` — `<feature-slug>` is kebab-case, derived from the task/feature name
- The spec is `docs/issue/<feature-slug>/spec.md`
- Implementation issues are one file per ticket at `docs/issue/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01` in dependency order (blockers first), never a single combined tickets file
- **File naming**: `<NN>-<nama-file>.md` — two-digit ticket number, then a kebab-case slug of the ticket title (`01-tambah-filter-kategori.md`)
- Triage state is recorded as a `Status:` line near the top of each issue file (see `triage-labels.md` for the role strings)
- Blocking edges are recorded as a `Blocked by:` line near the top of each issue file
- Comments and conversation history append to the bottom of the file under a `## Comments` heading

## When a skill says "publish to the issue tracker"

Create a new file under `docs/issue/<feature-slug>/` (creating the directories if needed). The spec goes to `spec.md`; tickets go to `issues/<NN>-<slug>.md`.

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. The user will normally pass the path or the ticket number directly (e.g. `01`, or `docs/issue/<feature-slug>/issues/01-<slug>.md`).

## When a skill says "apply a triage label"

Set the `Status:` line near the top of the file to the matching role string from `triage-labels.md` (e.g. `Status: ready-for-agent`).

## Ticket file template

```markdown
# <NN>: <Ticket title>

**What to build:** the end-to-end behaviour this ticket makes work, from the user's perspective, not a layer-by-layer implementation list.

**Blocked by:** the numbers/titles of the tickets that gate this one, or "None (can start immediately)".

**Status:** ready-for-agent

- [ ] Acceptance criterion 1
- [ ] Acceptance criterion 2
```

## Wayfinding operations

Used by `/wayfinder`. The **map** is a file with one **child** file per ticket.

- **Map**: `docs/issue/<effort>/map.md` (the Notes / Decisions-so-far / Fog body).
- **Child ticket**: `docs/issue/<effort>/issues/NN-<slug>.md`, numbered from `01`, with the question in the body. A `Type:` line records the ticket type (`research`/`prototype`/`grilling`/`task`); a `Status:` line records `claimed`/`resolved`.
- **Blocking**: a `Blocked by: NN, NN` line near the top. A ticket is unblocked when every file it lists is `resolved`.
- **Frontier**: scan `docs/issue/<effort>/issues/` for files that are open, unblocked, and unclaimed; first by number wins.
- **Claim**: set `Status: claimed` and save before any work.
- **Resolve**: append the answer under an `## Answer` heading, set `Status: resolved`, then append a context pointer (gist + link) to the map's Decisions-so-far in `map.md`.

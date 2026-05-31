# TEMPLATE.md — Carry-Over Context

Use this template when creating carry-over files in this directory. Carry-over files help agents and humans resume work across sessions.

## File naming convention

```
YYYY-MM-DD-<short-slug>.md
```

Example: `2026-05-31-google-auth-better-auth.md`

---

## Markdown template

```markdown
# {Title}

**Date**: YYYY-MM-DD
**Issue/PR**: #{number} or URL (if applicable)
**Branch**: branch-name (if applicable)

---

## What Was Done

Bullet list of completed work:
- dependency changes (packages installed, removed, upgraded)
- files created or modified (table with File | What columns)
- architecture decisions made
- verification: type-check, lint, test results

## How It Works

Brief explanation of the feature/flow for context (2-4 paragraphs).

---

## Actionable Next Steps

### For human

| Priority | Task |
|---|---|
| 🔴 High | ... |
| 🟡 Medium | ... |
| 🟢 Low | ... |

### For AI

| Priority | Task |
|---|---|
| 🔴 High | ... |
| 🟡 Medium | ... |
| 🟢 Low | ... |

---

## Key File Paths

```
path/to/
├── relevant-file.ts
└── another-dir/
    └── file.ts
```
```

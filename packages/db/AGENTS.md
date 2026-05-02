# Ously DB: Storage Layer (Cloudflare D1)

## Scope
Drizzle schemas and migrations for SQLite.

## Rules
- Tables MUST align with Domain interfaces using the `matchTable<T>()` helper.
- Use standard SQLite types (UUIDs as TEXT, Dates as INTEGER timestamps).

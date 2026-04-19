# Ously API: Context

## Purpose
Shared Hono backend for all Ously webapps.

## Tech Stack
- Hono
- Cloudflare Workers
- Better Auth
- D1 Database

## Coding Rules
- Use `@ously/types` for all request/response schemas.
- All auth logic should use `@ously/auth`.
- Database access through Drizzle with `@ously/db` schema.

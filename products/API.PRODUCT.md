# API: Ously Central API Product Description (api)

The Central API is the backbone of the Ously ecosystem, providing a unified, secure, and high-performance data layer for all Ously products.

## 🎯 Purpose

To serve as the single source of truth for the Ously database (D1), managing authentication, core domain entities, and shared business logic.

## 🏗 Architecture

- **Runtime**: Hono running on Cloudflare Workers.
- **Database**: Cloudflare D1 (SQLite) via Drizzle ORM (`@ously/db`).
- **Validation**: Strict schema enforcement using `@ously/validation` (Zod).
- **Security**: Authentication managed via Better Auth.

## 🚀 Key Features

- **Centralized Data Access**: Direct access to the master database.
- **Branching Engine**: Core logic for version-controlled data entries.
- **BFF Support**: Optimized endpoints designed to be consumed by product-specific BFFs or directly by webapps.

## 🛠 Internal Tools

- **Wrangler**: Cloudflare's CLI for deployment and management.
- **Drizzle Kit**: Migration and schema management.

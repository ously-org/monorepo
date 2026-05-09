# Products

This document lists all active products within the Ously ecosystem and links to their respective descriptions and specifications.

## 📱 Applications

### [OUSLY-MAIN](./OUSLY.PRODUCT.md)

The primary customer-facing web application for Ously.

- [Specification](./OUSLY.SPEC.md)

### [PROSPER](./PROSPER.PRODUCT.md)

The specialized financial management and prosperity dashboard.

- [Specification](./PROSPER.SPEC.md)

## ⚙️ Services & APIs

### [API](./API.PRODUCT.md)

The core Hono-based backend serving all Ously applications.

- [Specification](./API.SPEC.md)

## 🏢 Cross-Cutting

### [ORGANIZATION](./ORGANIZATION.PRODUCT.md)

The organizational infrastructure, CI/CD, and AI agent orchestration.

---

## 🛠 Shared Packages (The Core)

These are the foundational blocks used across all products.

- `@ously/domain`: The central source of truth for all types and interfaces.
- `@ously/ui`: The shared design system.
- `@ously/db`: The unified database layer (Cloudflare D1).

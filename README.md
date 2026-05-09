# Ously Monorepo

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/ously-org/monorepo?utm_source=oss&utm_medium=github&utm_campaign=ously-org%2Fmonorepo&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

The mono repo for all services in the Ously project.

## Product & Roadmap

For information about the project vision, products, and roadmap, please refer to:

- [products/](./products/PRODUCTS.md)
- [ROADMAP.md](./products/ROADMAP.md)

## Development

### Initializing Types

The `next-env.d.ts` files are excluded from Git to prevent noise from automatic path changes between development and build modes.

To initialize or regenerate these types, run:

```bash
pnpm build
```

The CI/CD pipeline is configured to run this before performing type checks.

### Scripts

- `pnpm dev`: Start all apps in development mode.
- `pnpm build`: Build all apps and packages.
- `pnpm type-check`: Run TypeScript type checks across the monorepo.
- `pnpm lint`: Run ESLint checks.

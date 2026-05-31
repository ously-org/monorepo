# PROJECT: PROJECT_SCOPE.md

This file maps each Ously Project ID to its corresponding directories (scope) within the monorepo.

## 🗺 Project Scope Mapping

| Project ID       | Name          | Monorepo Scope                                                                                          | Description                                 |
| :--------------- | :------------ | :------------------------------------------------------------------------------------------------------ | :------------------------------------------ |
| **PROSPER**      | Prosperously  | `apps/web-prosper`                                                                                      | Financial dashboard frontend.               |
| **OUSLY-MAIN**   | Ously Main    | `apps/web-main`                                                                                         | Marketing and central hub.                  |
| **API**          | Central API   | `apps/api`, `packages/db`, `packages/validation`, `packages/domain`, `packages/auth`                    | Core backend and shared logic.              |
| **STORY**        | Design System | `apps/storybook`, `packages/ui`                                                                         | UI components and documentation.            |
| **ORGANIZATION** | Org & Infra   | `.github/`, `.gemini/`, `.agents/`, `products/`, `asset/`, `.husky/`, `.opencode/`, `packages/tsconfig` | CI/CD, AI Agents, Assets, and Product Docs. |

---

## 🔍 Unmapped Scopes

All significant monorepo directories are currently mapped to a Project ID.

## 📈 Organization Roadmap

The **ORGANIZATION** project handles cross-cutting infrastructure and developer experience.

### Feature: Foundation (#67)

- **Scope**: Core monorepo setup and shared package orchestration.
- **Status**: Completed.

### Feature: Developer Experience (#54)

- **Scope**: AI agent workflows (Antigravity CLI), pre-commit hooks, and automation.
- **Status**: In Progress.

### Feature: Deployment (#53)

- **Scope**: GitHub Actions, Cloudflare/Vercel CI/CD pipelines.
- **Status**: In Progress.

### Feature: Document (#56)

- **Scope**: Root documentation, `products/` folder, and architectural guides.
- **Status**: In Progress.

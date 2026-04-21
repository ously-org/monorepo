# Ously Monorepo: Master AI Context

## Scope & Purpose
**Status:** Monorepo Setup Complete.
The scope of the initial Gemini CLI task was strictly to **setup the monorepo foundation**. This includes the Turborepo orchestration, shared configurations, and the basic scaffolding of apps and packages. 

**Note to future agents:** Do not expand the infrastructure unless explicitly instructed. Focus on feature development within the established boundaries. If planning use gemini pro.

## 🧠 The Vibe Coding Framework
We operate under a 3-Pillar Framework to prevent technical debt and strategic fatigue:
1. **Rules:** Enforce strict architectural boundaries (Domain-First). Always read the `GEMINI.md` in every folder that you visit.
2. **Human:** Externalize decision-making to this document and Agent Prompts.
3. **AI:** Mandatory orchestration (TSC, Lint, Format) in every feedback loop. **Milestone-Level Pushing:** To conserve CI/CD and CodeRabbit review limits, AI agents MUST commit locally after each task but ONLY push to the remote repository once the entire implementation plan is complete and verified.

## 🏗️ AI-Native Architecture
1. **Domain (@ously/domain):** Pure TS Interfaces. Zero dependencies. The "Skeleton."
2. **Validation (@ously/validation):** Zod schemas mapped to Domain via `match<T>`.
3. **DB (@ously/db):** D1/SQLite schemas mapped to Domain via `matchTable<T>`.
4. **API (apps/api):** Hono Gateway. The ONLY entry point to DB. Exports RPC `AppType`.

## 🤖 Jules & Local Delegation (Pillar 3: AI)
To maximize context efficiency and project speed, we delegate tasks between the **Local Agent (Superpowers)** and **Remote Agent (Jules)** based on the **Volume vs. Complexity** ratio.

### Delegation Heuristic
| Aspect | **Local (Superpowers)** | **Remote (Jules)** |
| :--- | :--- | :--- |
| **Focus** | **Surgical & Architectural** | **Horizontal & Mechanical** |
| **Task Size** | 1–5 related files. | 10+ files or project-wide. |
| **Complexity** | High (Deep reasoning, new patterns). | Low-Medium (Pattern-matching, batching). |
| **Examples** | New API feature, bug fix, UI component. | Unit tests for all files, linting, upgrades. |
| **Benefit** | Instant feedback, precise control. | Preserves local context, offloads heavy work. |

### Jules Integration Workflow
1. **Triage:** During brainstorming, if a task meets the "Remote (Jules)" criteria, the AI MUST suggest: *"This looks like a great fit for /jules! Would you like to use the /jules extension for this?"*
2. **Hybrid Planning:** Use `writing-plans` to create a plan that includes a `start_new_jules_task` step for the remote portion.
3. **Local Review:** After Jules completes its remote task, the local agent MUST verify the changes using Pillar 3 orchestration (TSC, Lint, Format) to ensure architectural integrity.

## 🤖 Custom Agents & UI Production Line
We use specialized sub-agents to maintain the "AI-Native" production line for UI development.

### UI Production Line Workflow
1. **Design (@designer-coordinator)**: Brainstorms and generates 3+ design variants via Stitch.
2. **Review**: User verifies the design and provides a variant ID.
3. **Audit (@component-implementor)**: Audits the existing ODS components to see if any are missing.
4. **Build (@ods-agent)**: If components are missing, this agent uses the shadcn CLI to add them to `internal/` and creates wrappers.
5. **Assemble (@component-implementor)**: Finalizes the implementation in the target app using ODS primitives.

### Agent Mandatory Reading Lists
All custom agents MUST read the following files before taking action:

| Agent | Mandatory GEMINI.md Reading List |
| :--- | :--- |
| **@designer-coordinator** | Root, `packages/ods` |
| **@ods-agent** | Root, `packages/ods` |
| **@component-implementor** | Root, `packages/ods`, `packages/validation`, `packages/domain` |
| **@arch-auditor** | Root, `apps/api`, `packages/domain` |
| **@schema-matcher** | Root, `packages/domain`, `packages/validation`, `packages/db` |

## Project Goals
- Multi-app frontend (Ously Main + Prosper)
- Shared Hono Backend on Cloudflare Workers
- AI-Native structure for context-aware agents

## Monorepo Layout
- `apps/`: Deployable units
    - `api`: Hono Gateway. Exports RPC `AppType`. The ONLY entry point to DB.
    - `web-main`: Next.js frontend (Ously)
    - `web-prosper`: Next.js frontend (Prosper)
- `packages/`: Shared libraries
    - `tsconfig`: Shared TypeScript rules
    - `config-tailwind`: Shared design tokens & themes
    - `ods`: Shared UI components (Internal shadcn components wrapped for public use)
    - `db`: D1/SQLite schemas mapped to Domain via `matchTable<T>`.
    - `domain`: Pure TS Interfaces. Zero dependencies. The "Skeleton."
    - `validation`: Zod schemas mapped to Domain via `match<T>`.

## Critical Constraints
- Apps MUST use `packages/validation` for data shapes.
- UI components MUST be abstract and theme-injected.
- `packages/ods` only exposes wrapped components; raw shadcn components are kept internal.
- NO cross-package relative imports allowed; apps and packages MUST use absolute imports for workspace dependencies (e.g., `@ously/ods`, `@ously/validation`).
- Internal package imports SHOULD use relative paths to ensure compatibility with standard build and resolution tools.

## Platform-Specific Constraints
- **Cloudflare Pages:** NEVER use `route` or `custom_domain` keys in `wrangler.toml` for Pages projects. These are Workers-only features.
- **Cloudflare Compatibility:** ALL projects (`wrangler.toml`) MUST include `compatibility_flags = ["nodejs_compat"]` and a `compatibility_date` of `2024-09-23` or newer.
- **Next.js on Cloudflare:** ALWAYS use `@cloudflare/next-on-pages` for deployment. Build directory MUST be `.vercel/output/static`.
- **Research First:** Before configuring infrastructure for specific platforms (Cloudflare, Polar, etc.), ALWAYS use `web_search` to verify the latest official configuration schema.

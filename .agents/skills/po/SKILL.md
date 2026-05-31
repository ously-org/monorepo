---
name: po
description: Product Owner skill for managing the end-to-end Ously project management workflow. Use for spec-to-Epic creation, architecture analysis, and Scrum management by delegating to specialized subagents.
---

# Product Owner (po)

This skill provides a high-level interface for the Ously project management workflow. It orchestrates specialized subagents to handle Roadmap, Analysis, and Scrum activities.

## 🚀 Workflows

### 1. From Spec to Epic

When you have a new feature idea or specification, use this skill to:

1.  **Draft Epic**: Invoke `ous_pm` to define the feature and create an `[EPIC]` issue.
2.  **Analyze & Breakdown**: Invoke `ous_analyst` to perform architecture analysis and break the Epic into atomic tasks.

### 2. Synchronization & Truth

To ensure the repository and GitHub stay aligned:

1. **Sync Roadmap**: Invoke `sync_spec` to synchronize `products/ROADMAP.md` with GitHub Epics and progress.

### 3. Scrum Management

To manage the current sprint or backlog:

1.  **Check Health**: Invoke `ous_scrum` to audit the current sprint health and capacity.
2.  **Groom Backlog**: Invoke `ous_scrum` to estimate new tasks and move them to "Ready".

## 🛠 Delegation Guide

- **Roadmap / Features / Epics**: `invoke_subagent` (spawn subagent with `TypeName: "ous_pm"`)
- **Product Sync / SoT Alignment**: `invoke_subagent` (spawn subagent with `TypeName: "sync_spec"`)
- **Architecture / Tasks / Domain**: `invoke_subagent` (spawn subagent with `TypeName: "ous_analyst"`)
- **Sprints / Estimates / Status**: `invoke_subagent` (spawn subagent with `TypeName: "ous_scrum"`)

## 📜 Mandates

- **Unified Entry Point**: Always use this skill first when the user asks for PM tasks.
- **Strategic Delegation**: Provide comprehensive context to subagents so they can work autonomously.
- **Permission Mandate**: **NEVER** create an `[EPIC]` issue unless the user provides an explicit directive. Analysis and planning requests must only produce proposals.
- **Epic Lifecycle Mandate**: When an `[EPIC]` is created, you **MUST** perform the following synchronization:
  - **Roadmap**: Update `products/ROADMAP.md` with the new Epic entry.
  - **Product Catalog**: Update `products/PRODUCTS.md` and the corresponding `{PRODUCT_NAME}.PRODUCT.md` and/or `{PRODUCT_NAME}.SPEC.md` if the Epic affects specific product definitions (Product names must be CAPITALIZED).
  - **Scope Mapping**: Check and update `products/PROJECT_SCOPE.md` to ensure the Project ID and monorepo scope are aligned.
  - **GitHub Project**: Add the Epic to the appropriate GitHub Project with the correct status, iteration, and priority.

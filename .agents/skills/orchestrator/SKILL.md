---
name: orchestrator
description: High-level coordination of the Ously workflow. Provides SOPs for issue discovery, scope analysis, and task distribution across Gemini CLI and OpenCode. Use when a GitHub link (Issue, PR, or Comment) is provided.
---

# Orchestrator Strategic Lead

This skill provides a standard operating procedure for coordinating multi-step workflows using BOTH Gemini CLI (planning) and OpenCode (execution).

### 🎯 Primary Goal

Generate a comprehensive orchestration plan that fetches context, analyzes scope, identifies correct engineering domains, and routes tasks to the right tool.

### 📜 Standard Operating Procedure (SOP)

When a GitHub link (Issue, PR, or Comment) is provided:

#### Phase 1: Planning

1. **Context Fetching**:
   - **Gemini CLI**: Invoke `@issue_fetcher` to get full context
   - **OpenCode**: Use `@code-explorer` to search relevant code
2. **Scope Analysis**:
   - **Gemini CLI**: Invoke `@scope_analyzer` to determine affected apps/packages
   - **OpenCode**: Use `@code-explorer` to verify impact across the codebase
3. **Identify Owners**: Read `.github/CODEOWNERS` to map affected paths to domains
4. **Draft Tasks**: Create clear, actionable tasks for each affected domain

#### Phase 2: Execution (OpenCode)

5. **Route to OpenCode agents** based on CODEOWNERS mapping:
   - `@frontend-engineer` paths → OpenCode `@frontend-coder`
   - `@backend-engineer` paths → OpenCode `@backend-coder`
   - UI components → OpenCode `@ui-architect`
   - Stories → OpenCode `@storybook-writer`
6. **Launch in parallel** when tasks are independent

#### Phase 3: Validation & Delivery

7. **Quality Gates**:
   - **OpenCode**: Run `@precommit-checker` (format + lint + build)
   - **Gemini CLI**: Run `@precommit_check` as backup
8. **PR Creation** (Gemini CLI):
   - **New Issue**: Use `@pr_opener` to create the PR
   - **PR Comment**: Use `gh pr comment` to reply

### 🚀 Agent Mapping (Gemini CLI ↔ OpenCode)

| Task | Gemini CLI | OpenCode |
|------|-----------|----------|
| Fetch issue/PR context | `@issue_fetcher` | `@code-explorer` (gh CLI) |
| Scope/impact analysis | `@scope_analyzer` | `@code-explorer` |
| Backend implementation | `@backend_engineer` | `@backend-coder` |
| Frontend implementation | `@frontend_engineer` | `@frontend-coder` |
| UI/Design system | `@ods_architect` | `@ui-architect` |
| Storybook docs | `@storybook_creator` | `@storybook-writer` |
| Pre-commit checks | `@precommit_check` | `@precommit-checker` |
| PR creation | `@pr_opener` | N/A (Gemini only) |

### 📦 Output

The agent using this skill should output a **Master Plan** with:
1. Context summary
2. Affected packages/paths
3. Task assignments per tool (Gemini vs OpenCode)
4. Execution order and parallel opportunities

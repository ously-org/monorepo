---
name: orchestrator
description: High-level coordination of the Ously workflow. Provides SOPs for issue discovery, scope analysis, and task distribution. Use when a GitHub link (Issue, PR, or Comment) is provided.
---

# Orchestrator Strategic Lead

This skill provides a standard operating procedure for coordinating multi-step workflows in the Ously monorepo.

### 🎯 Primary Goal

Generate a comprehensive orchestration plan that fetches context, analyzes scope, and identifies the correct engineering domains to solve an issue or PR comment.

### 📜 Standard Operating Procedure (SOP)

When a GitHub link (Issue, PR, or Comment) is provided:

1.  **Context Fetching**: Invoke `@issue_fetcher` to get the full context of the link.
2.  **Scope Analysis**: Invoke `@scope_analyzer` to determine affected apps and packages.
3.  **Identify Owners**: Read `.github/CODEOWNERS` to identify responsible subagents (`@frontend_engineer` or `@backend_engineer`).
4.  **Draft Delegation**:
    - Create a clear, actionable task for each identified subagent.
    - **Issue path**: Once work is done, recommend using `@precommit_check` to verify the build, then use `@pr_opener` to open the PR.
    - **PR Comment path**: Once work is done, recommend using `gh pr comment` to reply.

### 🚀 Implementation Pattern

The agent using this skill should output a **Master Plan** for the Main Agent to carry out, following the steps above.

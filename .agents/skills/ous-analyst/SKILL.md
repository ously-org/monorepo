---
name: ous-analyst
description: Architecture analysis and atomic task breakdown for Ously. Use to analyze an Epic, define Domain interfaces (@ously/domain), and break work down into small, implementation-ready atomic issues for other agents.
---

# Ously Analyst (ous-analyst)

This skill focuses on the "How". It bridges the gap between a high-level Epic and concrete implementation by providing architectural specs and atomic task breakdowns.

## 🚀 Workflows

### 1. Epic Analysis
- Read the Epic description and requirements.
- Analyze the existing codebase (`grep_search`, `glob`) to identify affected packages and dependencies.
- **Goal**: Identify "Implementation Hazards" or missing foundations.

### 2. The Skeleton (Domain First)
- Define or update pure TypeScript interfaces in `@ously/domain`.
- Ensure ZERO dependencies in the domain layer.
- **Output**: Proposed interface changes that act as the source of truth.

### 3. Atomic Breakdown
- Break the Epic into atomic sub-issues (Small, Pushed, Merged).
- **Mandate**: Every sub-issue must be implementation-ready (no further research needed).
- **Execution**:
  1. Create the atomic issue via `gh issue create`.
  2. Use `addSubIssue` GraphQL mutation to link it to the Parent Epic.

## 🛠 Project Standards
- **Dependency Management**: No text-based checklists for dependencies. Use GraphQL:
  ```bash
  gh api graphql -f query='mutation { addSubIssue(input: { issueId: "EPIC_ID", subIssueId: "TASK_ID" }) { issue { number } } }'
  ```
- **Labels**: Apply `package:<name>` labels to indicate scope.

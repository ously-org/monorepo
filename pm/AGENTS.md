# GEMINI.md - Ously Project Manager

This repository serves as the central orchestration hub for the Ously organization.

## 🎯 Purpose

- **Primary Repository**: `ously-org/monorepo`
- Manage cross-repository project tracking.
- Store organizational workflows and standards.
- Automate project management tasks using Gemini CLI.

## 📜 Core Mandates

- **Strict PM Compliance**: All project updates MUST adhere to the workflows defined here.
- **Dependency Management**: Never use text-based dependencies in issue bodies. Use `gh api graphql` with `addSubIssue` or `addBlockedBy` mutation exclusively.
- **Estimation System**: Use **Units** (1 Unit = 2 Hours). No raw hours in project fields.

---

## 🚀 EPIC-Driven Workflow

We use a structured approach to transition from high-level ideas to merged code:

1. **Create an EPIC**: Define a high-level feature or goal as an Issue. Title it with `[Epic] <Title>`.
2. **Analysis & Breakdown**: Use the **Gemini CLI** in the monorepo to analyze the codebase, identify dependencies, and break the Epic into smaller, atomic sub-issues.
3. **Atomic Execution**: Execute one sub-issue at a time. Each sub-issue should be small, pushed, and merged quickly to maintain velocity.

## 🛠 Issue Management Rules

- **Markdown Constraints**: Standard markdown checklists (`- [ ]`) are encouraged for implementation steps within a sub-issue.
- **Dependencies via GraphQL**:
  1. **Resolve Node IDs**: `gh issue view <NUMBER> --json id`
  2. **Execute Mutation**: `gh api graphql -f query='mutation { addBlockedBy(input: { issueId: "<TARGET_ID>", blockingIssueId: "<PREREQ_ID>" }) { issue { number } } }'`
- **Sub-issues**: Link atomic tasks back to their parent EPIC using `addSubIssue` mutation.

## 📏 Velocity & Capacity Management

- **Estimation Unit**: **1 Unit = 2 Hours** of focused development.
- **Work Blocks**: Capacity is determined by calendar events labeled `[Ously]`.
  - `[Ously] Work Block` = **1 Unit** (2 hours).
  - `[Ously] 2 Work Block` = **2 Units** (4 hours).
- **Current Target (Iteration 2)**: Confirmed capacity of **14 Units / 28 Hours**.

## 🏷 Types & Labels Convention

- **Native Issue Types**: Use GitHub's native Issue Types (`Epic`, `Feature`, `Bug`, `Analysis`, `Task`, `Documentation`) instead of generic labels.
- **Workflow Labels**: Use labels strictly for status or routing (e.g., `status:not-ready`).
  _Note: Operations on Issue Types via `gh api graphql` require the `-H "GraphQL-Features: issue_types"` header._

## 🤖 Automation Commands

- **Check Capacity**: `gws calendar +agenda --week`
- **Add Dependency/Sub-Issue**:
  ```bash
  # Sub-issue link
  gh api graphql -f query='mutation { addSubIssue(input: { issueId: "PARENT_ID", subIssueId: "CHILD_ID" }) { issue { number } } }'
  ```

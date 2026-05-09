---
name: po
description: Product Owner skill for managing the end-to-end Ously project management workflow. Use for spec-to-Epic creation, architecture analysis, and Scrum management by delegating to specialized subagents.
---

# Product Owner (po)

This skill provides a high-level interface for the Ously project management workflow. It orchestrates specialized subagents to handle Roadmap, Analysis, and Scrum activities.

## 🚀 Workflows

### 1. From Spec to Epic

When you have a new feature idea or specification, use this skill to:

1.  **Draft Epic**: Invoke `ous_pm` to define the feature and create an `[Epic]` issue.
2.  **Analyze & Breakdown**: Invoke `ous_analyst` to perform architecture analysis and break the Epic into atomic tasks.

### 2. Scrum Management

To manage the current sprint or backlog:

1.  **Check Health**: Invoke `ous_scrum` to audit the current sprint health and capacity.
2.  **Groom Backlog**: Invoke `ous_scrum` to estimate new tasks and move them to "Ready".

## 🛠 Delegation Guide

- **Roadmap / Features / Epics**: `invoke_agent(agent_name="ous_pm", ...)`
- **Architecture / Tasks / Domain**: `invoke_agent(agent_name="ous_analyst", ...)`
- **Sprints / Estimates / Status**: `invoke_agent(agent_name="ous_scrum", ...)`

## 📜 Mandates

- **Unified Entry Point**: Always use this skill first when the user asks for PM tasks.
- **Strategic Delegation**: Provide comprehensive context to subagents so they can work autonomously.

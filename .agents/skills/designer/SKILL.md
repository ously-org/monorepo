---
name: designer
description: This skill bridges the Ously monorepo with Google Stitch to automate design workflows, context gathering, and component matching.
---

# Designer Skill

This skill bridges the Ously monorepo with Google Stitch to automate design workflows, context gathering, and component matching.

## 🚀 Workflows

### 1. Gather & Sync Context
Use `@design_gatherer` to scan the codebase and update Stitch with the current ODS and app state.

### 2. Generate Design
Use `@snitch_connector` to transform an issue/requirement into a high-fidelity prompt for Stitch and retrieve the design specification.

### 3. Match & Gap Analysis
Use `@component_matcher` to analyze the Stitch output against the ODS inventory and identify missing components ("Gaps").

## 🛠 Agent

### `@designer`
The primary agent for all design tasks. It utilizes the following specialized roles/tools:

- **Gatherer**: Scans `apps/` and `packages/ui` to build a `DesignContext`.
- **Connector**: Interfaces with the `stitch` MCP server.
- **Matcher**: Compares `DesignSpec` against `DesignContext`.

## 📜 Standard Operating Procedure (SOP)

1. **Context**: Run gatherer to get current state.
2. **Prompt**: Combine gatherer output with the user request into a structured prompt.
3. **Stitch**: Call `stitch__create_design` with the prompt.
4. **Analysis**: Run matcher on the result.
5. **Issues**: For each identified "Gap", create a new GitHub issue with `type:design`.

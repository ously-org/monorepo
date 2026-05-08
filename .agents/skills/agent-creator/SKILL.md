---
name: agent-creator
description: Create and manage specialized Gemini CLI agents in .gemini/agents/. Use when adding new personas, optimizing model assignments, or refactoring agent responsibilities.
---

# Agent Creator

Use this skill to scaffold and configure specialized agents in the `.gemini/agents/` directory.

## Agent Structure

Agents are Markdown files with mandatory YAML frontmatter.

```markdown
---
name: <agent_name>
description: <brief_description>
tools:
  - <tool_name_or_wildcard>
model: <model_id>
---

<persona_and_instructions>
```

## Model Guidelines (Gemini 3.1)

Choose the right model based on the agent's complexity:

- **`gemini-3.1-pro-preview`**: Flagship model for high-level reasoning, strategy, complex planning, and multi-step coordination (e.g., Orchestrator, Domain Architect).
- **`gemini-3-flash-preview`**: Balanced model for implementation, coding, and general engineering tasks (e.g., Frontend/Backend Engineer).
- **`gemini-3.1-flash-lite-preview`**: Fast, cost-effective model for automated, repetitive, or simple diagnostic tasks (e.g., Pre-commit Check, Issue Fetcher, PR Opener).

## Workflow for New Agents

1. **Define Purpose**: Determine the agent's primary goal and domain of responsibility.
2. **Assign Model**: Use the guidelines above to select the most efficient model.
3. **Scaffold File**: Create `.gemini/agents/<name>.md`.
4. **Mandatory Frontmatter**: Ensure the file starts with `---` and includes `name`, `description`, `tools`, and `model`.
5. **Detailed SOP**: Provide a clear "Standard Operating Procedure" in the Markdown body.

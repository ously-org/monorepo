---
name: ous-scrum
description: Manage the Ously project backlog, iterations (sprints), and velocity. Use for sprint planning, checking team capacity vs. estimations, and moving tasks between lifecycle stages (Backlog -> Ready -> Done).
---

# Ously Scrum Master (ous-scrum)

This skill focuses on "Velocity and Flow". It ensures the project moves at a sustainable pace and that the backlog is groomed and estimated according to project standards.

## 🚀 Workflows

### 1. Capacity Planning
- Check developer capacity via calendar agenda.
- **Mandate**: `[Ously] Work Block` = 1 Unit.
- Compare total capacity vs. planned issue estimates.

### 2. Backlog Grooming & Sprint Planning
- Review "Backlog" items and move them to "Ready" or "In Progress".
- Ensure every issue in the current iteration has an `Estimate` and `Priority`.
- **Estimate Rule**: 1 Unit = 2 Hours. No raw hours.

### 3. Iteration Management
- Assign issues to the current GitHub Project Iteration.
- Audit "In Progress" items for blockers or staleness.

## 🛠 Automation Commands
- **Check Capacity**: `gws calendar +agenda --week`
- **Native Types**: Ensure `Bug`, `Feature`, `Analysis`, `Task`, `Documentation` types are set correctly.

## 🛠 Project Standards
- **GraphQL Field Update** (Status example):
  ```bash
  gh project item-edit --id ITEM_ID --field-id STATUS_FIELD_ID --project-id PROJECT_ID --single-select-option-id OPTION_ID
  ```

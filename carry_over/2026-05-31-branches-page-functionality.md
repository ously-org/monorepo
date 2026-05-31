# Scenario Manager & Branches Page Functionality

**Date**: 2026-05-31
**Issue/PR**: #63
**Branch**: main

---

## What Was Done

Bullet list of completed work:
- Analyzed the codebase and product specifications to document the planned functionality of the branches page.
- Verified that the `/branches` route is currently not implemented, though defined in navigation configurations.
- Documented feature mapping and product specifications for the Scenario Manager.

| File | What |
|---|---|
| [PROSPER.PRODUCT.md](file:///home/prame/Projects/monorepo/products/PROSPER.PRODUCT.md) | Defines core focus and key elements for Scenario Manager (`/branches`). |
| [web-prosper-nav.ts](file:///home/prame/Projects/monorepo/packages/ui/src/const/web-prosper-nav.ts) | Contains sidebar configuration routing the Sandbox link to `/branches`. |

## How It Works

The **Scenario Manager** (located at `/branches`) is designed to manage the "What-if" financial simulation engine of Prosperously. It allows users to create sandbox branches of their ledger data to model various long-term financial plans (such as buying a house or investing) without altering their primary data.

The page itself will consist of a status layout (showing active branch details), a list/tree representation of existing simulation paths, and action flows (switching, creating, or branching from a specific time-point).

---

## Actionable Next Steps

### For human

| Priority | Task |
|---|---|
| 🔴 High | Review the design tokens and UI layouts for `/branches` page. |

### For AI

| Priority | Task |
|---|---|
| 🔴 High | Implement page component at `apps/web-prosper/app/branches/page.tsx` matching [PROSPER.PRODUCT.md](file:///home/prame/Projects/monorepo/products/PROSPER.PRODUCT.md). |
| 🟡 Medium | Build Active Scenario Details widget, Scenario Tree / List component, and forms for branching. |

---

## Key File Paths

```
products/
├── PROSPER.PRODUCT.md
└── PROSPER.SPEC.md
packages/
└── ui/
    └── src/
        └── const/
            └── web-prosper-nav.ts
apps/
└── web-prosper/
    └── app/
```

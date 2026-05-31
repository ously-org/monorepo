# Settings Page — Planning & Component Discovery

**Date**: 2026-05-31
**Branch**: N/A (not yet started)

---

## What Was Done

- Explored the full monorepo codebase to audit existing components, domain types, API routes, DB schema, and auth infrastructure relevant to a settings page
- Analyzed the requirements for a `/settings` single-page section layout (Profile & Avatar, Plan & Subscription, Preferences & Localization, Account Session)
- Identified existing shadcn/radix primitives and missing ones
- Decided on architecture approach with the user via clarifying questions

### Files examined

| Path | What |
|---|---|
| `packages/domain/src/user.ts` | `User`, `UserGender`, `UserCurrency`, `UserSubscriptionStatus` types |
| `packages/validation/src/index.ts` | `UserSchema`, `ProfileUpdateSchema` |
| `packages/db/src/schema.ts` | `users` table with `gender`, `currency`, `subscriptionStatus` columns |
| `packages/ui/src/internal/` | 17 existing shadcn primitives (avatar, card, input, button, dropdown-menu, separator, skeleton, tooltip, etc.) |
| `packages/ui/src/components/` | 8 public wrappers (Button, Box, Typography, Link, Icon, OuslyImage, RatioDonut, RatioDonutCompare) — CVA + Radix Slot pattern |
| `packages/ui/src/pages/shared/LoginPage.tsx` | OAuth redirect auth pattern (window.location.href to signInUrl) |
| `packages/ui/src/hooks/` | Only `use-mobile.ts` exists. No auth hooks/providers. |
| `packages/ui/src/themes.css` | Full dark mode via `.dark` / `[data-mode="dark"]` selectors, `.theme-ously` + `.theme-prosper` themes |
| `packages/ui/tailwind-preset.ts` | Shared preset mapping CSS vars to Tailwind colors |
| `apps/web-main/app/layout.tsx` | Minimal — no AppLayout, no AuthProvider. TODO(ISSUE-125) for Global Auth Provider |
| `apps/web-main/app/page.tsx` | Home page with TODO comments for ISSUE-84/86/87/88/89 |
| `apps/api/src/auth.ts` | Better Auth setup with Google OAuth, session/cookie-based |
| `apps/api/src/routes/auth.ts` | `POST /auth/signout`, `GET /auth/session`, etc. |
| `apps/api/src/routes/profile.ts` | `GET /me`, `PATCH /me` (validated via ProfileUpdateSchema) |
| `apps/web-main/next.config.mjs` | Not checked — API proxying unknown |
| `apps/web-main/components.json` | shadcn config, uses `@ously/ui/internal` alias |

---

## Architecture Decisions Made

1. **Theme toggle**: Use `ToggleGroup` (Radix) for a 3-button segmented control — selected = primary color, others = neutral/gray. NOT a RadioGroup or simple toggle.
2. **Auth infrastructure**: Create a full `AuthProvider` context + `useAuth()` hook in `@ously/ui/src/hooks/use-auth.tsx`. Resolves TODO(ISSUE-125).
3. **Avatar upload**: Skip on this pass. Add placeholder "Change Photo" button with `// TODO: Image upload` comment. No upload endpoint exists yet.
4. **API base URL**: Undecided — needs clarification. `AuthProvider` may need `apiBaseUrl` prop, or Next.js rewrites may proxy the API.

---

## How It Works (Planned)

The settings page is a `"use client"` Next.js App Router page at `apps/web-main/app/settings/page.tsx`. It uses a shared `AuthProvider` context to fetch the current user (via `GET /me`), display profile data, and provide `updateProfile()` (calls `PATCH /me`) and `logout()` (calls `POST /auth/signout`, redirects to `/login`).

Form fields update the user profile. The theme selector sets `data-mode` attribute on `<html>` to switch between light/dark/system. The subscription card displays plan info with progress bars for feature quotas.

Public wrapper components in `@ously/ui` wrap internal shadcn/radix primitives following the existing pattern (CVA + `React.forwardRef` + optional `asChild` via Radix Slot).

---

## Actionable Next Steps

### For human

| Priority | Task |
|---|---|
| 🟡 Medium | Clarify how the API base URL is resolved: `AuthProvider` prop (`apiBaseUrl`) or Next.js rewrites? |
| 🟢 Low | Review and approve the implementation plan |

### For AI

| Priority | Task |
|---|---|
| 🔴 High | **Add 5 missing shadcn internal primitives**: `label.tsx`, `select.tsx`, `progress.tsx`, `toggle.tsx`, `toggle-group.tsx` to `packages/ui/src/internal/` |
| 🔴 High | **Create 7 public wrapper components** in `packages/ui/src/components/`: `Avatar`, `Input`, `Card`, `Select`, `Label`, `Progress`, `ToggleGroup` |
| 🔴 High | **Create auth infrastructure**: `packages/ui/src/hooks/use-auth.tsx` (AuthProvider + useAuth + useUser) |
| 🔴 High | **Create settings page**: `apps/web-main/app/settings/page.tsx` with 4 sections |
| 🟡 Medium | Update `apps/web-main/app/layout.tsx` to wrap children with `<AuthProvider>` |
| 🟡 Medium | Update `packages/ui/src/components/index.ts` and `packages/ui/src/hooks/index.ts` for exports |
| 🟢 Low | Update `packages/ui/src/index.ts` if needed for new exports |
| 🟢 Low | Run `pnpm lint` and `pnpm typecheck` after all changes |

---

## Key File Paths

```
packages/
├── domain/src/user.ts              # UserGender, UserCurrency, UserSubscriptionStatus
├── validation/src/index.ts         # ProfileUpdateSchema (name, image, gender, currency)
├── db/src/schema.ts                # users table
└── ui/src/
    ├── internal/                   # Existing: avatar, card, input, button, etc.
    │   ├── label.tsx               # [NEEDED]
    │   ├── select.tsx              # [NEEDED]
    │   ├── progress.tsx            # [NEEDED]
    │   ├── toggle.tsx              # [NEEDED]
    │   └── toggle-group.tsx        # [NEEDED]
    ├── components/
    │   ├── Avatar.tsx              # [NEEDED]
    │   ├── Input.tsx               # [NEEDED]
    │   ├── Card.tsx                # [NEEDED]
    │   ├── Select.tsx              # [NEEDED]
    │   ├── Label.tsx               # [NEEDED]
    │   ├── Progress.tsx            # [NEEDED]
    │   ├── ToggleGroup.tsx         # [NEEDED]
    │   └── index.ts                # [UPDATE]
    └── hooks/
        ├── use-auth.tsx            # [NEEDED]
        └── index.ts                # [UPDATE]

apps/
├── api/src/
│   ├── auth.ts                     # Better Auth setup
│   └── routes/
│       ├── auth.ts                 # signout, session endpoints
│       └── profile.ts             # GET /me, PATCH /me
└── web-main/
    ├── app/
    │   ├── layout.tsx              # [UPDATE] Add AuthProvider
    │   └── settings/
    │       └── page.tsx            # [NEEDED] Settings page
    └── next.config.mjs             # [CHECK] API proxy/rewrite config
```

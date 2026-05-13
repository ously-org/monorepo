---
name: code-to-design
description: Convert TypeScript/React component code into Penpot design components with token sets, variant groups, and theme support. Use when asked to "create in penpot", "sync component to design", "code to design", or "replicate component in penpot".
---

# Code-to-Design Workflow

Bridges code components (React/TypeScript/Tailwind) into Penpot design system components. Created from the Button component implementation at `packages/ui/src/components/Button.tsx`.

## Workflow

### Phase 1: Extract Design Tokens

1. **Read the source code** to identify:
   - Component props (variant, size, disabled, etc.)
   - Visual variants and their CSS
   - Size/spacing values

2. **Find the theme CSS** — look for `themes.css` in `@ously/ui` or the app's CSS. Extract:
   - All CSS custom properties (color, border-radius, spacing)
   - Light/dark mode values
   - Brand-specific themes (e.g., ously vs prosper)

3. **Convert colors** — translate oklch/hsl/hex values from CSS into Penpot hex tokens (#RRGGBB caps only).

### Phase 2: Create Penpot Token Sets

4. **Create design token sets** in the Penpot library via `penpot.library.local.tokens.addSet()`:
   - One set per brand-mode combination (e.g., `ously-light`, `ously-dark`, `prosper-light`, `prosper-dark`)
   - Each set contains all CSS custom properties as tokens
   - Token types: `color`, `borderRadius` (and others as needed)
   - Only activate the desired default set (toggle others off)

5. **Known limitation**: `shape.applyToken()` and `token.applyToShapes()` are broken in Penpot 2.15 (see [issue #9290](https://github.com/penpot/penpot/issues/9290)). Colors must be hardcoded from token resolved values as a workaround.

### Phase 3: Build Variant Component

6. **Create boards** — one per variant combination:
   - Loop through all variant × size × disabled combinations
   - Set `borderRadius: 0`, `fills`, `strokes`, `opacity` based on variant
   - Add text child with proper font size, color, alignment
   - Add flex layout for centering
   - Store variant metadata via `setPluginData()`

7. **Create variant group**:
   - Create library components: `penpot.library.local.createComponent([board])`
   - Collect main instances via `component.mainInstance()`
   - Combine: `penpot.createVariantFromComponents(instances)`
   - Rename/add properties: `v.renameProperty()`, `v.addProperty()`
   - Set property values from plugin data

8. **Property order for grid layout**:
   - Property 0 = size (columns)
   - Property 1 = variant (rows)
   - Property 2 = disabled (adjacent per cell)

### Phase 4: Replace on Set Switch

9. When switching token sets, the Button must be **recreated** (due to the `applyToken` bug):
   - Activate the desired set
   - Remove old Button
   - Re-run Phase 3 with token values from the new set

## Code Reference

The Button component source: `packages/ui/src/components/Button.tsx`

### Variants mapping:
| Variant | Fill | Text | Stroke |
|---|---|---|---|
| default | `primary` | `primary-foreground` | none |
| outline | `background` | `foreground` | `border` |
| ghost | none | `foreground` | none |
| destructive | `destructive` | `foreground` | none |
| link | none | `primary` + underline | none |

### Sizes:
| Size | Width | Height | Font | Label |
|---|---|---|---|---|
| default | 80 | 32 | 12 | "Button" |
| sm | 70 | 28 | 11 | "Button" |
| lg | 90 | 36 | 12 | "Button" |
| icon | 32 | 32 | 14 | "A" |

## Known Penpot API Bugs

- **`applyToken` bug** — [Issue #9290](https://github.com/penpot/penpot/issues/9290): `applyToken` fails with "Field message is invalid" on all token types. Workaround: hardcode hex values.
- **`token.applyToShapes` bug** — "Doesn't support name: 0". Same root cause as above.
- **Theme `addSet` bug** — API rejects adding sets to themes with "Field message is invalid".
- **Connection instability** — Plugin disconnects periodically; state may be lost. Reconnect and check page/library state before operations.

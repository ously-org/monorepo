---

# =============================================================================

# Prosper — Design System

# =============================================================================

# This file captures the visual identity, design intent, and structured design

# tokens for the Prosper web application. All values are self-contained and

# reference no external files or codebase paths.

# =============================================================================

meta:
name: Prosper Design System
description: >
A sharp-edged, teal-accented analytics dashboard design system built on
shadcn/ui primitives with Tailwind CSS v4. Designed for campaign management
and performance analytics.
version: 0.1.0

theme:
semantic: prosper
support: - light - dark
default: light
selector: .theme-prosper

colors:
light:
background:
value: "oklch(1 0 0)"
description: Main page background — pure white
foreground:
value: "oklch(0.145 0 0)"
description: Default text color — near-black
card:
value: "oklch(1 0 0)"
description: Card surface background
card-foreground:
value: "oklch(0.145 0 0)"
description: Text on card surfaces
popover:
value: "oklch(1 0 0)"
description: Popover/dropdown surface
popover-foreground:
value: "oklch(0.145 0 0)"
description: Text on popover surfaces
primary:
value: "oklch(0.511 0.096 186.391)"
description: Teal-cyan hue ~186°; brand primary action color
primary-foreground:
value: "oklch(0.984 0.014 180.72)"
description: Text/icon on primary backgrounds
secondary:
value: "oklch(0.967 0.001 286.375)"
description: Secondary surface — very light purple-gray
secondary-foreground:
value: "oklch(0.21 0.006 285.885)"
description: Text on secondary surfaces
muted:
value: "oklch(0.97 0 0)"
description: Muted surface — very light neutral gray
muted-foreground:
value: "oklch(0.556 0 0)"
description: Secondary text, placeholders — medium gray
accent:
value: "oklch(0.97 0 0)"
description: Accent/hover surface
accent-foreground:
value: "oklch(0.205 0 0)"
description: Text on accent surfaces
destructive:
value: "oklch(0.577 0.245 27.325)"
description: Destructive/error — red hue ~27°
destructive-foreground:
value: "oklch(0.985 0 0)" # inherited from base
description: Text on destructive surfaces
border:
value: "oklch(0.922 0 0)"
description: Subtle border — light gray
input:
value: "oklch(0.922 0 0)"
description: Input field border
ring:
value: "oklch(0.708 0 0)"
description: Focus ring — medium gray
chart-1:
value: "oklch(0.837 0.128 66.29)"
description: Chart series color 1 — amber
chart-2:
value: "oklch(0.705 0.213 47.604)"
description: Chart series color 2 — orange
chart-3:
value: "oklch(0.646 0.222 41.116)"
description: Chart series color 3 — red-orange
chart-4:
value: "oklch(0.553 0.195 38.402)"
description: Chart series color 4 — deep red
chart-5:
value: "oklch(0.47 0.157 37.304)"
description: Chart series color 5 — dark red

dark:
background:
value: "oklch(0.145 0 0)"
description: Dark mode page background — near-black
foreground:
value: "oklch(0.985 0 0)"
description: Dark mode text — near-white
card:
value: "oklch(0.205 0 0)"
description: Dark mode card surface
card-foreground:
value: "oklch(0.985 0 0)"
description: Text on dark cards
popover:
value: "oklch(0.205 0 0)"
description: Dark mode popover surface
popover-foreground:
value: "oklch(0.985 0 0)"
description: Text on dark popovers
primary:
value: "oklch(0.437 0.078 188.216)"
description: Dark mode primary — deeper teal/cyan
primary-foreground:
value: "oklch(0.984 0.014 180.72)"
description: Text on dark primary surfaces
secondary:
value: "oklch(0.274 0.006 286.033)"
description: Dark mode secondary surface
secondary-foreground:
value: "oklch(0.985 0 0)"
description: Text on dark secondary surfaces
muted:
value: "oklch(0.269 0 0)"
description: Dark mode muted surface
muted-foreground:
value: "oklch(0.708 0 0)"
description: Dark muted text — light gray
accent:
value: "oklch(0.269 0 0)"
description: Dark mode accent/hover surface
accent-foreground:
value: "oklch(0.985 0 0)"
description: Text on dark accent surfaces
destructive:
value: "oklch(0.704 0.191 22.216)"
description: Dark destructive — brighter red
destructive-foreground:
value: "oklch(0.985 0 0)"
description: Text on dark destructive surfaces
border:
value: "oklch(1 0 0 / 10%)"
description: Dark border — white at 10 % opacity
input:
value: "oklch(1 0 0 / 15%)"
description: Dark input border
ring:
value: "oklch(0.556 0 0)"
description: Dark focus ring — medium gray

sidebar:
light:
background:
value: "oklch(0.985 0 0)"
description: Sidebar surface — off-white
foreground:
value: "oklch(0.145 0 0)"
description: Sidebar text
primary:
value: "var(--primary)"
description: Sidebar primary (inherited teal)
primary-foreground:
value: "var(--primary-foreground)"
description: Text on sidebar primary
accent:
value: "oklch(0.97 0 0)"
description: Sidebar hover/accent surface
accent-foreground:
value: "var(--accent-foreground)"
description: Text on sidebar accent
border:
value: "oklch(0.922 0 0)"
description: Sidebar border
ring:
value: "var(--ring)"
description: Sidebar focus ring
dark:
background:
value: "oklch(0.205 0 0)"
description: Dark sidebar surface
foreground:
value: "oklch(0.985 0 0)"
description: Dark sidebar text
primary:
value: "var(--primary)"
description: Dark sidebar primary
primary-foreground:
value: "var(--primary-foreground)"
description: Text on dark sidebar primary
accent:
value: "oklch(0.269 0 0)"
description: Dark sidebar hover surface
accent-foreground:
value: "oklch(0.985 0 0)"
description: Text on dark sidebar accent
border:
value: "oklch(1 0 0 / 10%)"
description: Dark sidebar border
ring:
value: "var(--ring)"
description: Dark sidebar focus ring

typography:
fonts:
body:
family: Inter
source: Google Fonts
weight: - 400 - 500 - 600 - 700 - 800
description: Primary sans-serif body typeface
mono:
family: JetBrains Mono
source: Google Fonts
weight: - 400 - 700
variable: --font-mono
description: Monospace typeface; also used for heading font-family via CSS custom property
scale:
xs:
size: 0.75rem # 12px
line-height: 1rem # 16px
sm:
size: 0.875rem # 14px
line-height: 1.25rem # 20px
base:
size: 1rem # 16px
lg:
size: 1.125rem # 18px
xl:
size: 1.25rem # 20px
2xl:
size: 1.5rem # 24px
3xl:
size: 1.875rem # 30px
4xl:
size: 2.25rem # 36px
5xl:
size: 3rem # 48px
heading:
h1:
size: 2.25rem # 36px; 3rem (48px) at lg viewport
weight: 800
tracking: tight
color: primary
h2:
size: 1.875rem # 30px
weight: 600
tracking: tight
border-bottom: true
h3:
size: 1.5rem # 24px
weight: 600
tracking: tight
h4:
size: 1.25rem # 20px
weight: 600
tracking: tight
h5:
size: 1.125rem # 18px
weight: 600
tracking: tight
h6:
size: 1rem # 16px
weight: 600
tracking: tight
body:
paragraph:
size: 1rem # 16px
line-height: 1.75 # 28px
margin-top: 1.5rem # 24px (not first-child)
lead:
size: 1.25rem # 20px
color: muted-foreground
large:
size: 1.125rem # 18px
weight: 600
small:
size: 0.875rem # 14px
weight: 500
line-height: 1 # 14px
muted:
size: 0.875rem # 14px
color: muted-foreground
interactive:
link:
size: 0.875rem # 14px
default-color: foreground
hover-color: primary
button:
size: 0.75rem # 12px
weight: 500
sidebar-label:
size: 0.75rem # 12px
sidebar-group-label:
size: 0.75rem # 12px
color: sidebar-foreground
opacity: 0.7

spacing:
scale:
none: 0
xs: 0.25rem # 4px
sm: 0.5rem # 8px
md: 0.75rem # 12px
lg: 1rem # 16px
xl: 1.25rem # 20px
layout:
sidebar-width: 16rem # 256px
sidebar-width-icon: 3rem # 48px
sidebar-width-mobile: 18rem # 288px
header-height: 4rem # 64px
header-height-collapsed: 3rem # 48px
card-padding: 1.5rem # 24px
card-gap: 1rem # 16px
sidebar-section-gap: 0.5rem # 8px
content-padding: 1rem # 16px

elevation:
shadow-sm:
value: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
description: Subtle card shadow
shadow-md:
value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
description: Floating sidebar / elevated panel shadow
card-ring:
value: "0 0 0 1px oklch(0 0 0 / 10%)"
description: Card outline ring (replaces border)

radii:
global:
value: 0
description: >
All components use zero border-radius — sharp, technical corners
throughout the interface. This is a deliberate design choice for a
data-dense, professional analytics tool.
tokens:
lg: 0
md: 0
sm: 0
button: 0
card: 0
input: 0
sidebar: 0

motion:
duration:
fast: 150ms
normal: 200ms
slow: 300ms
easing:
linear: "linear"
default: "cubic-bezier(0.4, 0, 0.2, 1)"
transitions:
sidebar-width:
properties: - width - left - right
duration: 200ms
easing: linear
sidebar-margin:
properties: - margin - opacity
duration: 200ms
easing: linear
button-interaction:
properties: - all
duration: 150ms
easing: ease
interactive:
properties: - colors - opacity - transform
duration: 150ms
easing: ease
focus-ring:
properties: - border-color - box-shadow
duration: 150ms
easing: ease
button-press:
transform: translateY(1px)
description: Subtle downward press on active (non-aria-haspopup) buttons
skeleton:
animation: pulse
description: Pulsing opacity animation for loading placeholders

breakpoints:
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px

icons:
library: - lucide-react (primary; used in sidebar navigation) - @phosphor-icons/react (secondary; configured as shadcn icon library)

# =============================================================================

# Look & Feel — Design Intent

# =============================================================================

visual_identity:

philosophy: >
Prosper is a no-nonsense analytics and campaign management dashboard. Its
visual language communicates precision, clarity, and technical
sophistication. Every design decision serves the goal of reducing cognitive
load while maximizing data density and readability.

key_characteristics:

    - name: Sharp Precision
      description: >
        Zero border-radius is the defining formal characteristic. Every
        interface element — buttons, cards, inputs, modals, sidebars — meets
        at hard right angles. This is not a design for casual consumers; it is
        a tool for operators who need clean, unambiguous boundaries between
        information zones.

    - name: Teal Authority
      description: >
        The primary color is a cool teal-cyan (OKLCH hue ~186°). It appears
        across interactive elements: primary buttons, active navigation items,
        headings, and links. In dark mode, the teal deepens slightly
        (hue ~188°) for comfortable contrast. This color was chosen for its
        professional, trustworthy associations — financial and analytics tools
        traditionally use blue, but the teal shift adds distinctiveness without
        sacrificing seriousness.

    - name: High-Contrast Clarity
      description: >
        The light mode pairs pure white backgrounds with near-black
        (OKLCH 0.145 0 0) text for maximum readability. The dark mode avoids
        pure black, instead using a deep near-black (OKLCH 0.145 0 0)
        background with warm off-white text. Borders are deliberately subtle
        (light gray in light mode, white at 10% opacity in dark mode) to
        create structure without visual noise.

    - name: Technical Typography
      description: >
        The interface uses a deliberate dual-typeface hierarchy: Inter for
        body text (a highly legible sans-serif optimized for screens) and
        JetBrains Mono for both code and heading contexts. The entire HTML
        document is set in font-mono, giving the UI a subtle developer/
        operations tool aesthetic. Headings additionally receive tight
        letter-spacing and the h1 level is emphasized with extra-bold weight
        and primary color.

    - name: Restrained Motion
      description: >
        Animations serve utility, not delight. The sidebar width transition
        uses a linear easing curve to avoid perceived delay during collapse/
        expand. Button press feedback is a single-pixel translateY. Focus
        rings appear with a 150ms ease transition. Loading skeletons pulse
        subtly. There are no decorative animations, parallax effects, or
        splash transitions.

    - name: Data-Background Composition
      description: >
        The layout follows a classic app-shell pattern: persistent sidebar
        (collapsible to icon-only) with a header containing breadcrumb
        navigation, and a scrollable content area. Cards use a ring outline
        (1px at 10% foreground opacity) instead of a border or box-shadow,
        keeping the visual footprint minimal while maintaining separation.
        The responsive card grid adapts from single-column on mobile to
        three-column on large viewports.

    - name: Button Architecture
      description: >
        Buttons are intentionally dense (12px font, 32px height default) with
        compact padding that suits dashboards with many adjacent controls.
        Five variants provide a spectrum of emphasis: default (filled primary),
        outline (bordered), ghost (borderless hover), destructive (red-tinted),
        and link (underlined text). All maintain zero border-radius.

    - name: Sidebar Navigation
      description: >
        Navigation is grouped into labelled sections. The sidebar supports two
        layout variants: "inset" (content area appears within a framed,
        shadowed container) and "all-the-way" (content extends edge-to-edge).
        Groups are separated by labelled headers in reduced opacity
        (70% of sidebar foreground). Active items use the sidebar accent
        color with medium font weight.

    - name: Brand Mark
      description: >
        The Prosper brand mark is a square icon used within the sidebar header
        alongside the wordmark "PROSPER" set in h4/bold/primary typography.
        The icon collapses away when the sidebar is in icon-only mode,
        leaving only the square mark.

    - name: Dark Mode Integrity
      description: >
        Dark mode is not an afterthought. Every color token has a consciously
        mapped dark equivalent. Primary actions remain teal but shift darker.
        Borders become translucent white instead of gray. Surface hierarchy
        uses three clearly distinct levels: deepest (background = OKLCH 0.145),
        elevated (card/popover = OKLCH 0.205), and accent (OKLCH 0.269).

design_principles: - Every element must earn its place; avoid decorative frills. - Data readability is the highest priority. - Consistency in radii, spacing, and color application creates trust. - Dark mode and light mode are equals, not default + afterthought. - Interactions should feel immediate; animation must never delay the user.

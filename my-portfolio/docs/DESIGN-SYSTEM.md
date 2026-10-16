# Design System

This document describes values implemented in `src/styles/index.css`, `src/styles/Portfolio.css`, and `src/pages/KitchenSinkPage.css`. Where the implementation differs from the original brief, the implemented value is listed here.

## Color palette

| Token / role | Value | Usage |
| --- | --- | --- |
| Page background (`--color-bg-page`) | `#050505` | Main canvas and sticky header background. |
| Surface (`--color-bg-surface`) | `#0f0f0f` | Terminal body, menus, and secondary surfaces. |
| Card (`--color-bg-card`) | `#111111` | Card-like empty states and pressed sample surfaces. |
| Raised (`--color-bg-raised`) | `#1a1a1a` | Hovered navigation/control and chip surfaces. |
| Primary text (`--color-text-primary`) | `#ffffff` | Headings, main copy, and primary links. |
| Secondary text (`--color-text-secondary`) | `#9ca3af` | Supporting copy, labels, metadata, and terminal chrome. |
| Muted text (`--color-text-muted`) | `#8a8a8a` | Disabled/sample muted content. |
| Primary action | `#ffffff` | Primary showcase button background. |
| Text on primary action | `#050505` | Text on the white action surface. |
| Primary-action hover | `#e5e5e5` | Hovered primary showcase button. |
| Subtle border (`--color-border-subtle`) | `rgba(255, 255, 255, 0.06)` | Section separators and quiet framing. |
| Strong border (`--color-border-strong`) | `rgba(255, 255, 255, 0.12)` | Terminal frame and emphasized outlines. |
| Control border (`--color-border-control`) | `rgba(255, 255, 255, 0.5)` | Form-like controls and secondary button borders. |
| Focus outline | `#ffffff` | Keyboard focus indicators. |

The palette is dark and greyscale; there is no colored accent token. The earlier `prompt.md` describes muted text as `#6b7280`; the active stylesheet uses `#8a8a8a`. The unused `src/assets/LS_logo.svg` contains its own color and does not currently contribute to the rendered palette.

## Typography

| Role | Font / weight | Size | Line height and tracking | Current use |
| --- | --- | --- | --- | --- |
| Display | JetBrains Mono, 700 | `clamp(3rem, 7vw, 4rem)` (48–64px) | `1.1`, `-0.02em` | Main heading and large display samples. |
| Heading | JetBrains Mono, 500 | `clamp(1.5rem, 3vw, 2rem)` (24–32px) | `1.25` | Section headings and title samples. |
| Subheading | Inter, 500 | `1.25rem` (20px) | `1.25` | Smaller section and card headings. |
| Body | Inter, 400 | `1rem` (16px) | `1.6` | Biography, descriptions, and ordinary copy. |
| Label | JetBrains Mono, 500 | `.8125rem` (13px) | Label tracking `0.02em` | Eyebrows, compact UI labels, and buttons in the showcase. |
| Meta | JetBrains Mono, 400 or 500 | `.75rem` (12px) | Label tracking `0.02em` | Small metadata and terminal labels. |
| Editorial emphasis | Newsreader, 400 italic | Inherits the surrounding size | Normal tracking | Italic editorial sample/emphasis. |

Font weights available through the imported Fontsource styles are Inter 400/500/600, JetBrains Mono 400/500/700, and Newsreader 400 italic. The fonts are local dependencies, not Google Fonts requests. Body text uses Inter; mono text is reserved mainly for labels and terminal-style details.
The root body letter spacing is `0.005em`; display and label tracking use the dedicated tokens in the table.

## Spacing, containers, and responsive layout

The base spacing increment is `0.25rem` (4px). Tokens used by the application are:

| Token | Value |
| --- | ---: |
| `--space-0` | 0 |
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-24` | 96px |
| `--space-32` | 128px |

- Main content width: `68.75rem` (1100px).
- Reading measure: `68ch`.
- Default page gutter: 24px; it becomes 16px below 48rem.
- Section vertical space: 96px normally and 64px for compact/mobile sections.
- The centered frame gains visible side rails at 80rem (1280px).
- The desktop home hero switches to two columns at Tailwind's `lg` breakpoint (1024px).
- The header switches between desktop navigation and mobile disclosure below 48rem (768px).
- A separate hero height/layout adjustment applies below 64rem (1024px).
- The kitchen-sink state grid becomes one column below 48rem.

The plan in `prompt.md` includes 640px and 768px breakpoint labels; the actual app's most visible breakpoint is 48rem for mobile navigation, with Tailwind's 1024px `lg` layout and an 80rem editorial frame.

## Borders, radii, and shadows

- Borders are generally 1px and use the subtle, strong, or control border token above.
- Chip radius: 4px.
- Control and card radius: 6px.
- Terminal radius: 8px.
- Shadow token: `--shadow-none: none`; the interface does not use drop shadows for elevation.
- Surface brightness changes (`#050505` → `#0f0f0f` → `#111111` → `#1a1a1a`) provide the implemented depth.

## Components and interaction states

| Element | Implemented treatment and states |
| --- | --- |
| `ActionLink` | React Router link styled as a primary or secondary action. Its default variant is secondary. Background and border colors transition in 150ms with ease-out; focus-visible receives a white outline. |
| Primary sample button | White fill and dark text; hover changes the fill to `#e5e5e5`; active moves down 1px; disabled uses a dashed border and muted text. |
| Secondary sample button | Transparent, control-border outline, white text; hover uses the raised surface; active moves down 1px. |
| Text links | White underlined text with 0.25em underline offset. The sample arrow moves right by 4px on hover. |
| Navigation links | Secondary text; hover/active becomes primary text and underlined. The active route has a visual underline/current-page indication. These state changes are immediate; the portfolio navigation selectors define no transition. |
| Mobile navigation control | At least 44px tall, outlined and rounded; hover/open uses the raised surface, active uses the card surface. Escape closes it and returns focus to the trigger. |
| Chips | Non-interactive showcase samples, 32px minimum height, raised surface, subtle border, 4px radius, mono metadata type. |
| Empty-state card | Text-led card surface with a subtle border and 6px radius. It is not a clickable project card. |
| Terminal window | Surface background, 1px stronger frame, 8px radius, titlebar separated by a subtle border. |
| Focus-visible | White outline with a 2px outline width and 3px offset on the app's shared focus treatment. It is distinct from hover styling. |

Not all examples on the kitchen-sink page are used as live portfolio components: its chip and primary/disabled button samples document styles, while the real work page remains an empty state.

## Theme behavior

The application is forced dark: the page background and `color-scheme` are dark, and there is no theme toggle or light-theme palette. `prefers-color-scheme: light` does not switch the site to light mode. There is no project-specific `forced-colors` override; behavior in a user's forced-colors environment is therefore not specially customized in this codebase.

# Design System Audit

Date: 2026-10-19
Scope: `src/styles/index.css`, `src/styles/Portfolio.css`, `src/pages/*`, `src/components/**`
Method: source review, headless Chrome rendering at 320/390/768/1024/1440 px, computed-style inspection, and a mocked `/api/contributions` response.

## Result

Estimated overall score: **85/100** (from 72/100 before the fixes). The foundation was already strong; the audit findings were mostly integration and drift problems rather than visual ones.

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Color and contrast | 9/10 | Core pairs pass WCAG AA (`#9ca3af` on `#050505` = 8.03:1; action text 20.38:1). Contribution card now uses the site's card token. |
| Typography | 8/10 | Display, heading, subheading, body, label, and meta roles are complete CSS classes with explicit weight, leading, and tracking. |
| Spacing and layout | 8/10 | Section and page padding consume `--section-space`; empty states stack below 64rem; no overflow at 320px. |
| Component consistency | 9/10 | The kitchen sink renders the real type classes, `portfolio-action`, `portfolio-empty-state`, and `TerminalWindow` instead of a parallel style set. |
| Accessibility | 8/10 | Legend targets are 24×24; disabled, focus-visible, forced-colors, and reduced-motion states exist. No automated axe run. |
| Motion | 8/10 | Existing restrained motion is preserved; `prefers-reduced-motion` is respected; the contribution resize observer no longer emits loop warnings. |
| Token architecture | 9/10 | CSS custom properties are the single source; the `DesignTokens.ts` mirror is gone. |
| Responsive behavior | 9/10 | Verified 320, 390, 768, 1024, and 1440 px; footer social links stay on one row at 768px. |
| Documentation | 8/10 | `DESIGN-SYSTEM.md` matches the implementation; this audit records the change set. |
| Enforcement | 9/10 | `npm run check:design` guards tokens, legacy names, arbitrary font sizes, shadows, and kitchen-sink duplication. |

## Fixes applied

### 1. Global reset and heading defaults

- Added `@import "tailwindcss/preflight.css" layer(base);` to `src/styles/index.css`.
- UA heading margins and weights no longer leak into the layout. Computed `<h1>` margin-bottom is `0`; `<h2>`/`<h3>` weights come from the type roles.
- Added explicit `:focus-visible` fallback for `forced-colors` mode.

### 2. Type roles are complete

`src/styles/Portfolio.css` now owns the full role definitions:

| Class | Family, weight | Size | Leading / tracking |
| --- | --- | --- | --- |
| `.portfolio-page-title` | JetBrains Mono 700 | `clamp(3rem, 7vw, 4rem)` | `1.1` / `-0.02em` |
| `.portfolio-section-title` | JetBrains Mono 500 | `clamp(1.5rem, 3vw, 2rem)` | `1.25` / `-0.02em` |
| `.portfolio-subheading` | Inter 500 | `1.25rem` | `1.25` |
| `.portfolio-eyebrow` | JetBrains Mono 500 | `.75rem` | `1.5` / `0.02em` |
| `.portfolio-body` | Inter 400 | `1rem` | `1.6` |
| `.portfolio-role`, `.portfolio-intro` | Inter 500 | `1.25rem` | `1.25` |
| `.portfolio-editorial` | Newsreader 400 italic | `1.25rem` | `1.25` |

Tailwind text tokens also carry the leading, tracking, and role weight so a bare `text-heading` or `text-subheading` cannot drift.

### 3. Actions, empty states, and links

- `.portfolio-action` is now the single action surface: JetBrains Mono 13px/500 uppercase, 12×24 padding, 44px minimum height, 6px radius, transparent base, pointer cursor, 1px active translation, and a dashed muted disabled state.
- The kitchen sink's `button*` styles were deleted; showcase actions use `portfolio-action`.
- `.portfolio-empty-state` owns its card surface, subtle border, 6px radius, and 24px padding. It stacks below 64rem.
- `.portfolio-text-link` is a production class in `Portfolio.css`; it no longer depends on the lazily loaded kitchen-sink CSS chunk. It is `nowrap` and `flex: 0 0 auto` so it cannot wrap mid-label.

### 4. Contribution panel

`src/contribution.tsx` (renamed from `contibution.tsx`):

- Consumes `bg-card`, `border-line`, `text-primary`, and the other site tokens; the undefined `--color-background` / `--color-foreground` fallbacks are gone.
- Forces the dark activity palette instead of reacting to the operating-system scheme.
- Tooltip uses surface colors and a border; `shadow-lg` is gone.
- Legend buttons are 24×24 hit targets around 11×11 visual swatches, satisfying the WCAG 2.2 target-size minimum.
- Resize notification is deferred with `requestAnimationFrame`, removing the `ResizeObserver loop completed with undelivered notifications` warning.

### 5. Kitchen sink as a consumer

- Type specimens use the production classes.
- Action samples, the empty state, and the terminal render the real components/classes.
- Color and spacing swatches read `var(--token)` directly; `src/DesignTokens.ts` was deleted.
- Showcase-only CSS remains for `.showcase*`, chips, swatches, state samples, and the loading indicator.

## Verification

Commands:

```bash
npm run build
npm run lint          # includes node scripts/check-design-system.mjs
npm run check:design
```

Observed checks:

| Check | Result |
| --- | --- |
| 320px horizontal overflow | `0` at 320px |
| `<h1>` computed weight / leading | `700` / `70.4px` at 1440px |
| `<h2>` computed weight | `500` |
| Action computed type | JetBrains Mono, 13px, 500, uppercase |
| Action computed box | 12×24 padding, 46px high |
| Disabled action | dashed `rgba(255,255,255,0.12)` border, muted text, surface background |
| Contribution card | `rgb(17, 17, 17)` background, subtle border, 6px radius, no shadow |
| Contribution legend | 24×24 button around an 11×11 swatch |
| Empty state at 768px | stacked column |
| Footer social links at 768px | one row of four 44px targets |
| Contribution footer at 390px | stacked column; hint is one line |
| Console after resize | No ResizeObserver loop warning |

## Remaining risks

- Canvas chart accessibility relies on the `role="img"` label, the keyboard grid, and the live-region announcements; there is no DOM table fallback.
- No automated axe or visual-regression run is part of the repository yet. `npm run check:design` guards tokens and duplication, not contrast or layout.
- The kitchen sink is a `noindex` development route and is not part of the public navigation.

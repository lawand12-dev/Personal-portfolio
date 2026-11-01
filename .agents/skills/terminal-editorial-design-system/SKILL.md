---
name: terminal-editorial-design-system
description: >-
  Rules and design patterns for the Terminal Editorial portfolio design system.
  Use whenever modifying UI, layouts, typography, animations, canvas visualizers, or CSS styling.
---

# Terminal Editorial Design System Skill

Guidelines, design tokens, and constraints for maintaining the visual identity and 100/100 Lighthouse benchmarks of the portfolio.

## Core Philosophy

- **Developer Authenticity ("Terminal")**: `JetBrains Mono`, monospaced eyebrows (`~/intro`, `~/writing`, `~/skills`, `~/contact`), subtle window chrome, 3D GitHub activity canvas, binary portrait rasterizer.
- **Editorial Clarity ("Editorial")**: `Newsreader` italic for nuance/lead sentences, `Inter` for comfortable body reading, strict `68ch` reading width (`max-w-reading`), zero clutter.

## Forbidden Patterns (Strict Linter Rules)

Enforced automatically by `scripts/check-design-system.mjs`:
1. **Never use legacy GitHub-style color tokens**: `--color-background`, `--color-foreground`, `--color-muted-foreground`. Use semantic tokens: `--color-bg-page`, `--color-bg-card`, `--color-bg-surface`, `--color-text-primary`, `--color-text-secondary`.
2. **Never use generic `--color-border`**: Use `--color-border-subtle`, `--color-border-strong`, or `--color-border-control`.
3. **No box shadows**: Box shadows (`shadow-sm`, `shadow-md`, `shadow-lg`, etc.) are forbidden. Use surface brightness (`--color-bg-card`, `--color-bg-raised`) instead.
4. **No arbitrary font-size utilities**: Do not use `text-[13px]` or similar. Use design tokens: `text-display`, `text-heading`, `text-subheading`, `text-body`, `text-label`, `text-meta`.

## Performance & Accessibility Constraints

- **0 Cumulative Layout Shift (CLS)**: Critical pages must maintain 0 CLS. Avoid layout-shifting spinners; use reserved container dimensions.
- **Reduced Motion**: All animations must respect `prefers-reduced-motion: reduce` (or `useReducedMotion()`).
- **Semantic HTML**: One `<h1>` per page, logical heading hierarchy (`<h1>` -> `<h2>` -> `<h3>`), proper ARIA landmarks and roles.

## Verification

Always verify before committing:
```bash
npm run lint
npm run build
```


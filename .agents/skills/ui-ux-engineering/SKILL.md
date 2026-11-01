---
name: ui-ux-engineering
description: >-
  UI/UX design engineering, micro-interactions, responsive design, and WCAG accessibility standards.
  Use when building or refining layouts, animations, mobile menus, keyboard navigation, or focus management.
---

# UI/UX Engineering Skill

Standards for implementing accessible, high-performance user interfaces within the "Terminal Editorial" design aesthetic.

## 1. Responsive Layout & Breakpoints

The site is designed mobile-first and tested from **320px to 1440px+**:
- **Mobile (< 768px / 47.999rem)**:
  - Collapsible `@base-ui/react` mobile drawer opens below the sticky header.
  - Two-column grids stack into single-column vertical flows (`grid-cols-1`).
  - Terminal windows and portraits scale down smoothly with `width: 100%`.
- **Desktop (>= 768px)**:
  - Desktop nav links appear horizontally.
  - Editorial two-column splits (`lg:grid-cols-[1.1fr_0.9fr]`).

## 2. Accessible UI Patterns

1. **Collapsible Disclosure (`@base-ui/react`)**:
   - Must use `aria-controls` pointing to the drawer panel ID.
   - Escape key listener must close the drawer and return focus to the trigger button (`menuButtonRef.current?.focus()`).
2. **Keyboard Focus Rings**:
   - Custom focus states must use `--color-focus-ring` (or `focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus`).
   - Interactive elements must maintain an intuitive Tab order.
3. **Screen Reader Live Regions**:
   - Loading states use `role="status"` with `.sr-only` descriptions.
   - Async error boundaries use `role="alert"`.
   - Contribution canvas and terminal animations must provide hidden `.sr-only` text transcripts for non-visual users.

## 3. Motion & Animation Standards

1. **LazyMotion Architecture**:
   - `App.tsx` wraps the router in `<LazyMotion features={domAnimation}>` to keep the initial JavaScript bundle lean.
2. **Reduced Motion Compliance**:
   - All animations must respect `useReducedMotion()`.
   - If reduced motion is active:
     - Terminal typing skips directly to the full transcript without setTimeout delays.
     - Canvas morph transitions and scanline sweeps render immediately at the final state.
     - Blinking cursors and hover transform shifts are disabled.
3. **Easing Curves**:
   - Use cubic easing (`easeOutCubic`: `[0.25, 1, 0.5, 1]`) for subtle momentum. Avoid bouncy spring physics.


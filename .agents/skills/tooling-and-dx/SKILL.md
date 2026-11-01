---
name: tooling-and-dx
description: >-
  Vite 8, Tailwind CSS v4, TypeScript strict compilation, ESLint 10, and developer experience tooling.
  Use when configuring build plugins, updating TypeScript configs, modifying ESLint rules, or running verification scripts.
---

# Tooling & Developer Experience (DX) Skill

Guide to the build system, compilers, linter checks, and developer scripts in this repository.

## 1. Vite & Tailwind CSS v4 Pipeline

- **Vite Config (`vite.config.ts`)**:
  ```ts
  import react from "@vitejs/plugin-react";
  import tailwindcss from "@tailwindcss/vite";
  import { defineConfig } from "vite";

  export default defineConfig({
    plugins: [react(), tailwindcss()],
  });
  ```
- **CSS-First Theme System (`src/styles/index.css`)**:
  - Tailwind v4 does not use a `tailwind.config.js`.
  - Theme tokens are configured via `@theme inline` in CSS.
  - Custom utilities are declared using `@utility` (e.g. `@utility rounded-card { border-radius: var(--radius-card); }`).

## 2. Strict TypeScript Verification

- Configured using TypeScript Project References:
  - `tsconfig.json`: Solution root referencing app and node configurations.
  - `tsconfig.app.json`: Strict settings for browser bundle (`src/**/*`).
  - `tsconfig.node.json`: Compiler settings for Vite and Node scripts.
- To check types without building:
  ```bash
  npx tsc -b
  ```

## 3. ESLint & Custom Design System Linter

- **ESLint**: ESLint 10 flat configuration (`eslint.config.js`) enforcing TypeScript, React Hooks, and Fast Refresh rules.
- **Design System Linter (`scripts/check-design-system.mjs`)**:
  - Verifies that all 48 required design tokens exist in `src/styles/index.css`.
  - Scans `src/` to ensure no forbidden legacy tokens (`--color-background`, `--color-border`), drop shadows (`shadow-md`), or arbitrary font-size utilities (`text-[13px]`) are used.
- Run complete lint suite:
  ```bash
  npm run lint
  ```

## 4. Local Development Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Starts Vite local development server on `http://localhost:5173`. |
| `npm run build` | Runs strict typecheck (`tsc -b`) followed by production Vite build (`vite build`). |
| `npm run lint` | Runs ESLint and the custom design system token verification script. |
| `npm run check:design` | Runs only the design system token and forbidden pattern check. |
| `npm run preview` | Serves the production build locally from `dist/`. |


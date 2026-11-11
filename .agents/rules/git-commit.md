---
description: "Git commit message standards, pre-commit verification gates, and commit generation workflow"
globs: "*"
alwaysApply: true
---

# Git Commit Rules & System

This rule governs all Git commit messages, verification workflows, and commit generation for Lawand Soran's portfolio repository.

---

## 1. Commit Message Specification

Every commit must follow the [Conventional Commits](https://www.conventionalcommits.org/) standard with repository-specific scopes:

```
<type>(<scope>): <imperative subject in lowercase without trailing period>

<body: bulleted description of why and what changed>
- <key architectural / technical change>
- <visual, behavioral, or content impact>
```

### Types
- `feat`: A new feature, page, interactive canvas, or component
- `fix`: A bug fix, broken link, layout overflow, or rendering defect
- `docs`: Documentation, guides, planning docs, or README updates
- `style`: Design tokens, colors, typography, or styling adjustments
- `refactor`: Code reorganization, component composition, prop cleanups (no behavior change)
- `perf`: Performance optimization (Core Web Vitals, LCP, frame rate, bundle size)
- `test`: Unit tests, component tests, test fixtures, or test harness updates
- `chore`: Tooling, build scripts, skill installations, dependencies, or git hooks

### Scopes
- `(skills)`: Skills in `.agents/skills/`, `skills-lock.json`
- `(ui)`: Shared UI components, layout shell, navigation, drawer
- `(canvas)`: 3D isometric skyline, binary rasterizer, canvas math
- `(design)`: Design system tokens, `scripts/check-design-system.mjs`, CSS themes
- `(content)`: Articles, projects data, biography, resume material
- `(router)`: React Router configuration, lazy route splitting, SPA rewrites
- `(seo)`: Meta tags, sitemap, OpenGraph headers, Vercel analytics
- `(tests)`: Vitest suites, jsdom environment, test setup
- `(dx)`: Vite, Tailwind, ESLint, TypeScript config, pre-commit hooks

### Subject Line Rules
1. **Imperative mood**: Use "add", "fix", "update", "refactor" (never "added", "fixes", "updating").
2. **All lowercase**: The subject must start with a lowercase letter.
3. **No trailing period**: Never end the subject line with `.`.
4. **Length limit**: Maximum 72 characters for the header line.

### Body Rules
1. Separate subject from body with a blank line.
2. Use concise, high-signal bullet points.
3. Explain **why** the change was made and **what** was modified.

---

## 2. Pre-Commit Verification Gate

Before any commit is created or recommended, the repository's verification pipeline MUST pass:

```bash
npm run precommit
# or
node scripts/pre-commit-check.mjs
```

The pipeline executes 5 sequential checks:
1. **Vitest Unit Tests** (`npx vitest run`)
2. **Design System Validation** (`node scripts/check-design-system.mjs`)
3. **ESLint Code Quality** (`npx eslint .`)
4. **TypeScript Strict Typecheck** (`npx tsc -b`)
5. **Vite Production Build** (`npx vite build`)

The automated Git hook in `.git/hooks/pre-commit` enforces this automatically on `git commit`.

---

## 3. Mandatory Output After Any File Change

Whenever files are created, edited, or removed during a conversation turn, the assistant MUST provide a ready-to-run Git commit command block at the end of the response:

```bash
git add <staged files>
git commit -m "<type>(<scope>): <subject>" -m "<detailed description line 1>" -m "<detailed description line 2>"
```

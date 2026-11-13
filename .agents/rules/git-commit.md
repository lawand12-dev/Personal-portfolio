---
trigger: always_on
description: "Git commit message standards, pre-commit verification gates, and mandatory commit command output after file changes"
---

# Git Commit Rules & System

This rule governs all Git commit writing, verification gates, and mandatory end-of-response commit commands for Lawand Soran's portfolio repository.

---

## 1. Commit-Writing System (4-Step Workflow)

Follow this process whenever preparing a commit message:

1. **Inspect & Scope (`git status --short`)**:
   - Identify the exact files created, modified, or deleted in the current task.
   - Keep commits atomic: if unrelated changes exist in the working tree, stage only the files belonging to the current task (or suggest splitting them into separate commits).
2. **Select `<type>(<scope>)`**:
   - Pick the single type and scope that best match the primary change.
3. **Write Header & Body**:
   - Header: `<type>(<scope>): <imperative lowercase subject>` (max 72 chars, no trailing period).
   - Body: Add concise bullet lines with separate `-m` flags whenever multiple files, architectural choices, or non-obvious rationale are involved. Explain **why** and **what** changed.
4. **Verify Before Recommending**:
   - After editing code, styles, or content, ensure `npm run precommit` (or `npm run lint && npm test && npm run build`) passes before recommending the commit command.

---

## 2. Commit Message Specification

Follow [Conventional Commits](https://www.conventionalcommits.org/) with repository-specific scopes:

```text
<type>(<scope>): <imperative subject in lowercase without trailing period>

- <key architectural, technical, or content change>
- <behavioral, visual, or verification impact>
```

### Types
- `feat`: New user-facing feature, page, section, canvas visualization, or component
- `fix`: Bug fix, broken link, layout overflow, or rendering/accessibility defect
- `docs`: Documentation, guides, planning docs, or README updates
- `style`: Design tokens, colors, typography, or styling adjustments (no behavior change)
- `refactor`: Code reorganization, data extraction, or component composition (no behavior change)
- `perf`: Performance optimization (Core Web Vitals, image/bundle size, frame rate)
- `test`: Unit tests, component tests, test fixtures, or test harness updates
- `chore`: Tooling, build scripts, rules, skill installations, dependencies, or git hooks

### Scopes
- `(ui)`: Pages, shared UI components, layout shell, navigation, command palette
- `(content)`: Articles, projects data, certificates data, biography, resume assets
- `(canvas)`: 3D isometric skyline, binary portrait rasterizer, canvas math
- `(design)`: Design system tokens, `scripts/check-design-system.mjs`, CSS themes
- `(router)`: React Router configuration, lazy route splitting, SPA rewrites
- `(seo)`: Sitemaps, meta tags, OpenGraph headers, RSS feed, Vercel analytics
- `(tests)`: Vitest suites, jsdom environment, test setup
- `(dx)`: Vite, Tailwind, ESLint, TypeScript config, pre-commit hooks, agent rules
- `(skills)`: Skills in `.agents/skills/` and `skills-lock.json`

### Subject Line Rules
1. **Imperative mood**: Use "add", "fix", "update", "extract", "surface" (never "added", "fixes", "updating").
2. **All lowercase**: Start the subject after `: ` with a lowercase letter (proper nouns like `Scrimba`, `AI`, or `Vitest` may stay capitalized).
3. **No trailing period**: Never end the subject line with `.`.
4. **Length limit**: Maximum 72 characters for the header line.

---

## 3. Pre-Commit Verification Gate

Before recommending a commit for code, style, or data changes, run the repository's verification pipeline:

```bash
npm run precommit
# or
node scripts/pre-commit-check.mjs
```

The pipeline executes 5 sequential checks (and `.git/hooks/pre-commit` enforces them on `git commit`):
1. **Vitest Unit Tests** (`npx vitest run`)
2. **Design System Validation** (`node scripts/check-design-system.mjs`)
3. **ESLint Code Quality** (`npx eslint .`)
4. **TypeScript Strict Typecheck** (`npx tsc -b`)
5. **Vite Production Build** (`npx vite build`)

---

## 4. Mandatory Output After Any File Change

Whenever any workspace file is created, edited, or deleted during a turn, ALWAYS end the response with a **Ready-to-Run Git Commit** section containing:
- Explicit file paths in `git add` (verified with `git status --short`; never use `git add .` when unrelated files could exist).
- A compliant `git commit` command using `-m` for the subject and additional `-m` flags for bullet points when helpful.
- Never run `git commit` automatically unless the user explicitly asks you to commit.

Example template:

```bash
git add path/to/file1 path/to/file2
git commit -m "<type>(<scope>): <imperative lowercase subject>" -m "- <key change 1>" -m "- <key change 2>"
```

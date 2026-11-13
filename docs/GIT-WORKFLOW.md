# Git Workflow & Commit Standards

This document establishes the Git commit standards, verification pipeline, and workflow rules for Lawand Soran's portfolio repository.

---

## 1. Commit Message Format

We adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification with strict repository scopes:

```
<type>(<scope>): <subject>

<optional body: bulleted summary of why and what>
```

### Types

| Type | When to use |
| :--- | :--- |
| `feat` | New user-facing feature, page, canvas visualization, or component |
| `fix` | Bug fix, rendering defect, broken link, or layout issue |
| `docs` | Documentation, guides, articles, or README updates |
| `style` | Visual adjustments, design tokens, fonts, spacing (no logic change) |
| `refactor` | Code restructuring, component composition without behavior changes |
| `perf` | Core Web Vitals optimization, bundle-size reduction, frame rate gains |
| `test` | Adding or updating Vitest suites, component tests, test fixtures |
| `chore` | Skill installations, tooling, build scripts, npm dependencies, hooks |

### Scopes

- `skills`: Skills management in `.agents/skills/` and `skills-lock.json`
- `ui`: Shared UI components, navigation, footer, drawer
- `canvas`: 3D isometric skyline canvas, portrait rasterizer, canvas utilities
- `design`: Design system tokens, `scripts/check-design-system.mjs`, CSS themes
- `content`: Articles, project case studies, biography data
- `router`: React Router routing, lazy loading, SPA rewrites
- `seo`: Sitemaps, meta tags, OpenGraph, analytics
- `tests`: Vitest test suites, test environment, test harness
- `dx`: Vite, Tailwind, ESLint, TypeScript configuration, pre-commit hooks

### Good Examples

```bash
feat(canvas): add interactive camera rotation to 3D contribution skyline
fix(ui): eliminate horizontal overflow in mobile drawer at 320px
test(tests): add vitest suites for contribution math and ActionLink
chore(skills): install and organize skills from skills.sh
```

### Commit-Writing System

1. **Inspect & scope**: Run `git status --short` and stage only the exact files belonging to the current task (`git add <file1> <file2>` rather than `git add .`).
2. **Choose `<type>(<scope>)`**: Pick the primary type and repository scope (also see `.agents/rules/git-commit.md`, which auto-loads via `trigger: always_on` and `GEMINI.md`).
3. **Subject & body**: Keep the header imperative, lowercase, <= 72 characters, and without a trailing period. Use extra `-m "- ..."` flags for concise bullet points when multiple files or non-obvious decisions are included.
4. **Verify**: Run `npm run precommit` (or `npm run lint && npm test && npm run build`) before committing.

---

## 2. Pre-Commit Verification Pipeline

A verification pipeline runs automatically before every commit via the Git hook in `.git/hooks/pre-commit`.

You can also run it manually at any time:

```bash
npm run precommit
# or
npm run verify
```

### Verification Steps

1. **Vitest Unit Tests**: Runs all unit & component tests in `src/**/*.test.{ts,tsx}`.
2. **Design System Validation**: Runs `node scripts/check-design-system.mjs` to ensure 0 forbidden tokens, no box-shadows, and 100% token adherence.
3. **ESLint**: Lints all source files for syntax and React hooks rules.
4. **TypeScript Strict Typecheck**: Compiles types with `tsc -b` to guarantee zero type errors.
5. **Vite Production Build**: Builds the client bundle with `vite build` to guarantee production compatibility.

If any step fails, the commit is aborted.

---

## 3. Useful Commands

```bash
# Run unit tests in watch mode
npm run test:watch

# Run all verification checks
npm run check

# List installed AI skills
npm run skills:list

# Update skills
npm run skills:update
```

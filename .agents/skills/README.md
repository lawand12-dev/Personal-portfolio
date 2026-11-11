# Agent Skills Directory

This directory (`.agents/skills/`) contains modular skills that give AI agents (Antigravity, Gemini CLI, OpenCode, Claude Code, Cursor, and other agent platforms adhering to the [Agent Skills specification](https://skills.sh/)) domain context, procedural runbooks, and engineering best practices for Lawand Soran's portfolio.

Skills are organized into two layers:
1. **Local Domain Runbooks**: Hand-crafted procedures specific to this portfolio codebase, its design tokens, and content models.
2. **Community Best Practices (from `skills.sh`)**: Curated, version-locked packages maintained by framework authors and design engineers (Vercel, Anthony Fu, Emil Kowalski, Addy Osmani, Paul Bakaus, Lombiq, Andrej Karpathy / Multica, NextLevelBuilder).

All external skills are locked in [`skills-lock.json`](../../skills-lock.json).

---

## Skills Taxonomy & Organization

```
.agents/skills/
├── [Domain Runbooks (Local)]
│   ├── deployment-and-seo/               # Vercel SPA rewrites, env vars, sitemaps
│   ├── frontend-architecture/            # React 19 SPA shell, canvas 3D skyline, binary rasterizer
│   ├── portfolio-management/             # Content runbooks: articles, case studies, resume
│   ├── terminal-editorial-design-system/ # Visual tokens, forbidden styles, check-design-system.mjs
│   ├── testing-and-qa/                   # Vitest & React Testing Library harness
│   ├── tooling-and-dx/                   # Vite 8, Tailwind v4, ESLint 10, TypeScript
│   └── ui-ux-engineering/                # Accessible disclosures, keyboard navigation, drawer
│
├── [Agent Engineering & Code Craft]
│   └── karpathy-guidelines/              # Andrej Karpathy's guidelines to prevent LLM coding mistakes
│
├── [React 19 & Architecture]
│   ├── vercel-react-best-practices/      # 70 Vercel Engineering rules for rendering & bundle size
│   └── vercel-composition-patterns/      # Compound components, slot patterns, eliminating prop drilling
│
├── [UI/UX Intelligence & Design Systems]
│   ├── ui-ux-pro-max/                    # 80 styles, 192 palettes, 74 font pairings, 120 UX rules
│   ├── ui-styling/                       # Accessible UI styling, Radix UI / Shadcn, utility-first patterns
│   ├── design-system/                    # Token architecture (primitive -> semantic -> component)
│   ├── design/                           # Comprehensive design program: CIP, brand identity, vector assets
│   ├── tailwind-4-docs/                  # Official Tailwind CSS v4 directives, @theme, gotchas
│   ├── impeccable/                       # High-craft frontend polish, typography, and visual systems
│   └── web-design-guidelines/            # Web interface guidelines and accessibility checks
│
├── [Motion, Interaction & Mobile Experience]
│   ├── animate/                          # Step-by-step motion construction (Motion / WAAPI / CSS)
│   ├── animation-performance/            # Frame budgeting, composite properties, jank avoidance
│   ├── review-animations/                # Motion critique and craft bar enforcement
│   └── mobile-native/                    # Mobile viewport, 100vh handling, touch ergonomics
│
├── [Brand, Content & Presentations]
│   ├── banner-design/                    # Social media, ad, and website hero banner design
│   ├── brand/                            # Brand voice, visual identity, messaging frameworks
│   └── slides/                           # Strategic HTML presentation design with Chart.js
│
├── [Web Quality, Accessibility & Core Web Vitals]
│   ├── accessibility/                    # WCAG 2.2 AA audit & remediation guidelines
│   ├── core-web-vitals/                  # LCP, INP, CLS lab and field optimization
│   └── web-quality-audit/                # Evidence-led quality, security, and performance audit
│
└── [Tooling, Build & Testing DX]
    ├── vite/                             # Vite 8 configuration, plugin API, Rollup / Rolldown
    └── vitest/                           # Official Vitest patterns, fixtures, mocking, coverage
```

---

## Detailed Catalog

### 1. Local Domain Runbooks (Project-Specific)

| Skill | Source | Scope & Trigger |
| :--- | :--- | :--- |
| **`deployment-and-seo`** | Local | Vercel deployment, SPA routing rewrites, serverless functions (`/api/contributions`), and SEO verification. Use when diagnosing 404 errors, configuring Vercel environment variables, updating sitemaps, or auditing production builds. |
| **`frontend-architecture`** | Local | Application architecture, client-side routing, canvas engines (3D isometric skyline & binary portrait rasterizer), and serverless edge functions. |
| **`portfolio-management`** | Local | Authoring and updating articles in `src/data/articles.ts`, project case studies in `src/data/projects.ts`, resume assets, skills lists, and biography. |
| **`terminal-editorial-design-system`** | Local | "Terminal Editorial" aesthetic tokens (`JetBrains Mono` + `Newsreader` + `Inter`), strict forbidden style checks (`scripts/check-design-system.mjs`), and 100/100 Lighthouse benchmark preservation. |
| **`testing-and-qa`** | Local | Vitest, React Testing Library, jsdom harness, and automated QA for portfolio utilities, canvas transforms, and components. |
| **`tooling-and-dx`** | Local | Vite 8, Tailwind CSS v4, TypeScript strict compilation, ESLint 10, and developer experience tooling. |
| **`ui-ux-engineering`** | Local | UI/UX design engineering, micro-interactions, responsive mobile menu drawer (`@base-ui/react`), keyboard navigation, and focus management. |

### 2. Agent Engineering & Code Craft

| Skill | Source | Scope & Trigger |
| :--- | :--- | :--- |
| **`karpathy-guidelines`** | `multica-ai/andrej-karpathy-skills` | Behavioral guidelines to prevent common LLM coding mistakes: make surgical changes, surface hidden assumptions, avoid overcomplication, and verify every step against concrete success criteria. |

### 3. React 19 & Architecture

| Skill | Source | Scope & Trigger |
| :--- | :--- | :--- |
| **`vercel-react-best-practices`** | `vercel-labs/agent-skills` | React and Next.js performance optimization guidelines from Vercel Engineering (70 rules across 8 categories). Triggers when writing, reviewing, or refactoring React components, data fetching, bundle optimization, or performance improvements. |
| **`vercel-composition-patterns`** | `vercel-labs/agent-skills` | React composition patterns that scale. Use when refactoring components with boolean prop proliferation, building flexible component libraries, or designing reusable APIs with React 19. |

### 4. UI/UX Intelligence & Design Systems

| Skill | Source | Scope & Trigger |
| :--- | :--- | :--- |
| **`ui-ux-pro-max`** | `nextlevelbuilder/ui-ux-pro-max-skill` | UI/UX design intelligence for web, mobile, and desktop: 80 searchable styles (51 active), 192 product palettes, 74 font pairings, 120 UX guidelines, 105 icons, 17 GSAP presets, 25 chart types, and 22 stacks. |
| **`ui-styling`** | `nextlevelbuilder/ui-ux-pro-max-skill` | Accessible user interfaces with Tailwind CSS utility-first styling, Radix / Shadcn components, dark mode theming, and canvas-based visual designs. |
| **`design-system`** | `nextlevelbuilder/ui-ux-pro-max-skill` | Three-layer token architecture (`primitive` → `semantic` → `component`), CSS variables, spacing/typography scales, and component specifications. |
| **`design`** | `nextlevelbuilder/ui-ux-pro-max-skill` | Comprehensive design program: brand identity, CIP deliverables, icon design (SVG), social photo generation, and visual mockups. |
| **`tailwind-4-docs`** | `lombiq/tailwind-agent-skills` | Comprehensive Tailwind CSS v4 documentation snapshot and workflow guidance. Use when selecting utilities/variants, configuring `@theme`, or resolving v4 CSS-first theme behaviors. |
| **`impeccable`** | `pbakaus/impeccable` | Crafting, critiquing, auditing, and polishing frontend interfaces. Handles UX hierarchy, spatial balance, typography, color discipline, and edge cases. |
| **`web-design-guidelines`** | `vercel-labs/agent-skills` | Review UI code for Web Interface Guidelines compliance. Use when asked to review UI, check accessibility, or audit UX against industry standards. |

### 5. Motion, Interaction & Mobile Experience

| Skill | Source | Scope & Trigger |
| :--- | :--- | :--- |
| **`animate`** | `emilkowalski/skills` | Build animations from scratch in the order that determines whether they feel right (purpose, tool, properties, curves, interruptibility, and exit). |
| **`animation-performance`** | `emilkowalski/skills` | Keep web animations inside the 60fps frame budget: composite-only properties, keeping work off the main thread, and eliminating animation jank. |
| **`review-animations`** | `emilkowalski/skills` | Rigorous review of animation and motion code against a high craft bar derived from Emil Kowalski's design engineering philosophy. |
| **`mobile-native`** | `emilkowalski/skills` | Make a web app feel native on a phone: tap highlight flashes, 100vh bugs, input zooming, touch ergonomics, and pull-to-refresh handling. |

### 6. Brand, Content & Presentations

| Skill | Source | Scope & Trigger |
| :--- | :--- | :--- |
| **`banner-design`** | `nextlevelbuilder/ui-ux-pro-max-skill` | Banner design for social media, ads, website heroes, and creative assets across 22 visual styles. |
| **`brand`** | `nextlevelbuilder/ui-ux-pro-max-skill` | Brand voice, visual identity, messaging frameworks, asset management, and style guide consistency. |
| **`slides`** | `nextlevelbuilder/ui-ux-pro-max-skill` | Strategic HTML presentation design with Chart.js, responsive layouts, and contextual slide strategies. |

### 7. Web Quality, Accessibility & Core Web Vitals

| Skill | Source | Scope & Trigger |
| :--- | :--- | :--- |
| **`accessibility`** | `addyosmani/web-quality-skills` | Audit and improve web accessibility following WCAG 2.2 guidelines (screen reader support, focus traps, semantic elements, contrast). |
| **`core-web-vitals`** | `addyosmani/web-quality-skills` | Optimize Core Web Vitals (LCP, INP, CLS) using field and lab measurements. |
| **`web-quality-audit`** | `addyosmani/web-quality-skills` | Comprehensive, evidence-led web quality audit covering performance, accessibility, SEO, and modern security headers. |

### 8. Tooling, Build & Testing DX

| Skill | Source | Scope & Trigger |
| :--- | :--- | :--- |
| **`vite`** | `antfu/skills` | Vite build tool configuration, plugin API, SSR, and Vite 8 ecosystem guidelines by Anthony Fu. |
| **`vitest`** | `antfu/skills` | Vitest testing patterns, mocking strategies, fixtures, coverage configuration, and test suites by Anthony Fu. |

---

## Management & Workflow Commands

Skills can be managed via the `skills` CLI (or `npx skills`):

```bash
# List all active project skills
npm run skills:list
# or
npx skills list

# Update all skills to their latest versions
npm run skills:update
# or
npx skills update -p -y

# Search for additional skills on skills.sh
npx skills find <keyword>

# Add a specific skill to the project
npx skills add <owner/repo> --skill <skill-name> -y

# Restore skills deterministically from skills-lock.json
npx skills experimental_install
```

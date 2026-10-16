# Architecture

## Overview

This repository contains Lawand Soran's personal frontend portfolio, built to present his background, skills, work, writing, and contact links to hiring teams. The implemented site is a client-rendered, mostly static React application with a shared page shell; project and article content systems remain future work.

## Tech stack

Versions below are the dependency ranges declared in `package.json`; `package-lock.json` records the resolved versions.

| Dependency | Role and use in this project |
| --- | --- |
| `react`, `react-dom` | React UI and browser rendering. |
| `react-router` | Browser routing, route links, active navigation, and lazy route elements. |
| `typescript` | Type checking for the application and tooling configuration. |
| `vite` | Development server, bundler, and static production build. |
| `@vitejs/plugin-react` | React support in the Vite build. |
| `tailwindcss`, `@tailwindcss/vite` | Tailwind v4 utilities and Vite integration; theme values are declared in CSS, not a Tailwind config file. |
| `motion` | React motion components and reduced-motion support for reveals, terminal typing, and route transitions. |
| `@fontsource/inter` | Self-hosted Inter font files for body copy. |
| `@fontsource/jetbrains-mono` | Self-hosted JetBrains Mono font files for labels and terminal-style content. |
| `@fontsource/newsreader` | Self-hosted Newsreader font files for italic editorial emphasis. |
| `@mdx-js/react`, `@mdx-js/rollup` | Installed MDX packages; no MDX Vite plugin configuration, MDX files, or runtime use currently exists. |
| `lucide-react` | Installed icon package; no current source usage was found. |
| `eslint`, `@eslint/js`, `typescript-eslint` | ESLint and TypeScript lint configuration. |
| `eslint-plugin-react-hooks` | React Hooks lint rules. |
| `eslint-plugin-react-refresh` | React Fast Refresh lint rules. |
| `globals` | Global identifiers for ESLint environments. |
| `@types/node`, `@types/react`, `@types/react-dom` | Type declarations for Node tooling and React. |

No test framework or test files are currently present. The package scripts are `dev` (Vite), `build` (`tsc -b && vite build`), `lint` (`eslint .`), and `preview` (Vite preview).

## Directory and file map

| Path | Purpose |
| --- | --- |
| `index.html` | Vite HTML entry, document language, initial metadata, Person JSON-LD, and favicon link. |
| `package.json`, `package-lock.json` | Declared dependencies/scripts and locked dependency tree. |
| `vite.config.ts` | React and Tailwind Vite plugins. |
| `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` | TypeScript project references and app/tooling compiler settings. |
| `eslint.config.js` | ESLint configuration. |
| `public/robots.txt` | Public robots file; currently allows all crawlers and does not reference a sitemap. |
| `src/main.tsx` | Creates the React root, imports global styles, and mounts `App`. |
| `src/App.tsx` | Declares the router, route components, and standalone kitchen-sink route. |
| `src/components/layout/` | Shared page shell, site navigation, and footer. |
| `src/components/ui/` | Reusable action link, scroll reveal, and terminal window. |
| `src/hooks/usePageMetadata.ts` | Updates title and selected metadata tags after client-side navigation. |
| `src/pages/` | Home, work, writing, about, not-found, and developer showcase pages, with page-specific styles. |
| `src/styles/index.css` | CSS imports, fonts, CSS theme tokens, global reset, and shared base styles. |
| `src/styles/Portfolio.css` | Main portfolio layout, component styling, and responsive rules. |
| `src/DesignTokens.ts` | Typed names for CSS variables, consumed by the kitchen-sink page. |
| `src/assets/LS_logo.svg` | Logo asset; it is not currently imported by the application. |
| `src/index.css`, `src/App.css` | Present but empty; they are not the active style entry points. |
| `README.md` | Repository overview and local setup instructions. |
| `docs/` | Implementation documentation, indexed in `docs/README.md`. |
| `docs/planning/` | Brand, content plan, visual direction, wireframes, and original project brief. |
| `docs/` | This codebase documentation set. |

There is no `src/content/`, project-data module, blog directory, or resume asset in the current tree.

## Routing and page composition

`src/main.tsx` renders `App` into `#root`. `src/App.tsx` uses `BrowserRouter` and explicit React Router routes:

| Route | Rendered page | Shell |
| --- | --- | --- |
| `/` | `HomePage` | `PageShell` |
| `/work` | `WorkIndexPage` | `PageShell` |
| `/writing` | `WritingIndexPage` | `PageShell` |
| `/about` | `AboutPage` | `PageShell` |
| `*` | `NotFoundPage` | `PageShell` |
| `/dev/kitchen-sink` | `KitchenSinkPage` | Standalone showcase, outside `PageShell` |

Some page modules are loaded with `React.lazy` and rendered through `Suspense`. The shared `PageShell` composes the sticky `NavBar`, skip link, focusable `<main>`, route transition, and `Footer`; page components supply the content inside that frame. The not-found page also uses the shared shell. The kitchen-sink route deliberately has its own header/navigation and styles.

Navigation uses ordinary router links rather than terminal commands. The mobile menu is a non-modal disclosure. It can be toggled by its button, closes when a navigation link is selected, and supports Escape returning focus to the trigger.

## Content flow

There is no content loading, parsing, CMS, or API layer. Page copy is authored directly in page components:

- Home sections, skill groups, and social links are in `src/pages/HomePage.tsx`.
- Work and writing currently render empty states in `src/pages/WorkIndexPage.tsx` and `src/pages/WritingIndexPage.tsx`.
- Biography text is in `src/pages/AboutPage.tsx`.
- Terminal transcript lines are in `src/components/ui/TerminalWindow.tsx`.

`@mdx-js/react` and `@mdx-js/rollup` are installed but are not configured or used. No frontmatter schema or project/article data type exists. The planning document in `docs/planning/CONTENT-PLAN.md` is not a runtime content source; [docs/CONTENT.md](./CONTENT.md) documents the implementation's current content state.

## Design tokens and styles

`src/styles/index.css` is the active global stylesheet imported by `src/main.tsx`. It declares the CSS-first theme, font faces via Fontsource imports, global styles, and shared tokens. `src/styles/Portfolio.css`, imported from `src/App.tsx`, consumes the tokens in component and layout selectors. Tailwind utilities are also used in JSX; Tailwind v4 is integrated with the Vite plugin and there is no standalone Tailwind config.

`src/DesignTokens.ts` provides typed token identifiers for the kitchen-sink showcase; the CSS custom properties remain the actual token values. The detailed values and their present usage are in [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md).

## Animation organization

Motion behavior is shared where useful and co-located where specific:

- `src/components/ui/Reveal.tsx` provides the reusable scroll-reveal wrapper.
- `src/components/layout/PageShell.tsx` handles route transitions and changed-route focus.
- `src/components/ui/TerminalWindow.tsx` owns its typing state; its cursor blink is CSS in `src/styles/Portfolio.css`.
- CSS hover, focus, and active feedback is beside the relevant selectors in `Portfolio.css` or `KitchenSinkPage.css`.
- `prefers-reduced-motion` is handled by Motion's reduced-motion hook and CSS media queries.

There is no `components/motion/` directory or centralized motion-configuration module.

## Architecture decisions

| Decision in the current code | Alternative considered in project materials | Rationale / evidence |
| --- | --- | --- |
| Vite + React + TypeScript client-rendered app | Next.js or a server-rendered framework | The brief chooses a static portfolio and does not require a server, SSR, or a backend. |
| Explicit React Router route table | File-based routing | The project brief calls for a small, explicit set of routes and route-level loading. |
| CSS-first Tailwind v4 with a CSS token layer | Separate Tailwind config or a component library | Current tokens live in CSS, while page-specific selectors retain the editorial styling. No component library is installed. |
| Keep projects undecided and show empty states | Invent project cards or project details | The user explicitly deferred choosing projects; the empty pages avoid presenting fictional work. |
| Do not publish a resume route/link without supplied resume material | Add a resume page immediately | The source tree contains no resume content or PDF; the wireframes say to hide the link until ready. |
| Keep all public routes inside one `PageShell` | Repeat header/footer in every page | The shell provides consistent navigation, accessibility landmarks, and footer composition. |
| Use a standalone `/dev/kitchen-sink` page | Put token specimens into the public shell | The showcase is a development surface with its own sample navigation and page styles. |
| Keep the app local until implementation phases finish | Deploy during initial setup | This is an explicit updated decision in [`docs/planning/PROJECT-PLAN.md`](./planning/PROJECT-PLAN.md); URL-dependent SEO is deferred until a domain is chosen. |
| Keep metadata updates client-side | Build-time or server-rendered per-route metadata | This matches the current Vite SPA; it means route-specific metadata is applied after JavaScript runs. |

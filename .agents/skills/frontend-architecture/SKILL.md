---
name: frontend-architecture
description: >-
  Application architecture, client-side routing, canvas engines, and serverless edge functions.
  Use when modifying routing structure, adding code-split pages, creating canvas visualizers, or working on API handlers.
---

# Frontend Architecture Skill

Architectural blueprints, data-flow models, and system boundaries for Lawand Soran's personal developer portfolio.

## 1. Client-Side SPA Architecture

- **Framework**: React 19 + React Router 8 (`BrowserRouter`, `Routes`, `Route`).
- **Shared Shell**: `PageShell.tsx` contains the sticky `<NavBar />`, `<main>`, and `<Footer />`.
- **Route Splitting**:
  - Secondary pages (`AboutPage`, `WorkIndexPage`, `ArticleDetailPage`, `NotFoundPage`, `KitchenSinkPage`) are loaded via `React.lazy()` inside `<PageLoading>` with zero CLS fallbacks.
  - Core entry pages (`HomePage`, `WritingIndexPage`) are imported directly to maintain instant first paint.

## 2. Canvas Graphics Engines

The portfolio includes two custom HTML5 Canvas visualization engines:

### A. 3D Isometric Contribution Skyline (`src/contribution.tsx`)
1. **Mathematical Projection**: 3D coordinates $(x, y, z)$ project onto 2D canvas coordinates using trigonometric yaw/elevation transformation matrices (`src/contribution-utils.ts`).
2. **Camera Controls**: Yaw clamped between $8^\circ$ and $82^\circ$; elevation clamped between $18^\circ$ and $62^\circ$. Double-click smoothly resets to default isometric view.
3. **Wave Morphing**: Diagonal sweep animation toggles between 2D flat heatmap and 3D extruded skyscraper view.

### B. Terminal Binary Portrait (`src/components/ui/TerminalPortrait.tsx`)
1. **Downsampling**: Renders portrait down to a 64×64 cell grid.
2. **Tone Mapping**: Evaluates pixel luminance to map onto binary `'0'` and `'1'` characters in `JetBrains Mono`.
3. **Scanline Sweeper**: Cascades rows from top to bottom over ~1.3s with a horizontal sweep beam.

## 3. Serverless Edge Architecture (`api/contributions.ts`)

- **Edge Handler**: Vercel Serverless Function interfacing with GitHub GraphQL API (`contributionsCollection`).
- **Security Boundary**: `GITHUB_TOKEN` is strictly consumed on the server and never bundled into the client build.
- **Caching**: Sets `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` to prevent GitHub rate limiting.


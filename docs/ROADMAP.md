# Roadmap

## Status snapshot

| Area | Status | Evidence and remaining boundary |
| --- | --- | --- |
| Branding, visual direction, content planning, and wireframes | Complete as planning artifacts | [`docs/planning/`](./planning/README.md) contains the brand, visual direction, content plan, and wireframes. Project ideas were intentionally left undecided. |
| Design tokens and component showcase | Complete | CSS tokens and `/dev/kitchen-sink` exist. Some planned showcase/component ideas are not live portfolio features. |
| App setup and core public pages | Complete, with intentional omissions | Vite/React/TypeScript app and home/work/writing/about/404 routes exist. `WritingIndexPage` is loaded eagerly to maintain 0 CLS. Work and writing are empty states; resume and case-study/article routes are absent. |
| GitHub contributions & 3D Skyline | Complete | Live GitHub data via Vercel serverless function (`api/contributions.ts`), interactive 2D/3D canvas skyline with wave morphing and orbit (`src/contibution.tsx`, `src/contribution-utils.ts`), and error/loading states (`GitHubContributions.tsx`). |
| Social & contact integration | Complete | Dedicated SVG icons (`Gmail.svg`, `GitHub.svg`, `Linkedin.svg`, `X.svg`) and accessible `SocialLinks.tsx` component in home contact and footer. |
| Motion and responsive layout | Implemented and checked | Typing, reveals, transitions, `@base-ui/react` mobile collapsible disclosure, 3D wave morph and interactive orbit, and reduced-motion handling exist. Viewports checked across 320–1440px. |
| Accessibility, SEO, and performance | High production audit; lab polish remaining | Production Lighthouse: 96 mobile / 100 desktop performance, 0 CLS, Accessibility 100, Best Practices 100, SEO 100. Keyboard flows and browser accessibility tree verified; manual VoiceOver/NVDA testing remains. |
| Project/article content model | Not started | No project records, MDX files, frontmatter parser, article routes, or content loaders exist. |
| Resume page or download | Not started | No resume content/PDF was supplied; no route or navigation item exists. |
| Testing and deployment (Phase 11) | In progress | Testing tools installed (`vitest`, `jsdom`, `@testing-library/*`); npm `test` script and test suites remain to be added. Vercel serverless function is written and awaiting production deployment with `GITHUB_TOKEN` secret. |
| Final polish (Phase 12) | Not started | Verify all external links, provide `public/favicon.svg`, generate social share preview image, and verify production deployment. |

## Prioritized next steps

Effort estimates are planning estimates, not measured implementation times.

| Priority / task | Why it matters for a junior frontend role | Likely code/docs touched | Effort | Blocks |
| --- | --- | --- | --- | --- |
| 1. Choose and build at least two real, presentable projects; record genuine problem, implementation, and outcome details. | Recruiters need evidence of working frontend skills. The portfolio brief identifies absent projects as its largest effectiveness risk. | New project content; `src/pages/WorkIndexPage.tsx`; `src/pages/HomePage.tsx`; potentially new project-detail route/components and project assets. | High; multiple focused sessions | Blocks a credible populated work page and project case studies. |
| 2. Finalize and verify professional content: role statement, skills, biography, links, and resume material. | Accurate, specific claims and a reachable resume help recruiters evaluate the candidate. Existing copy and skill claims should match demonstrable experience. | `docs/planning/BRAND.md`, `docs/planning/CONTENT-PLAN.md`, `src/pages/HomePage.tsx`, `src/pages/AboutPage.tsx`, future resume route or PDF in `public/`. | Medium | Resume navigation/page should wait for actual resume content; public content should be reviewed before launch. |
| 3. Set up Vitest test script and write unit tests for utils and key components. | Proves test discipline and protects against regression in math-heavy utilities (`src/contribution-utils.ts`), API response validators, and UI disclosures. | `package.json`, `src/contribution-utils.test.ts`, component tests under `src/components/`. | Low–medium | Elevates frontend engineering credibility. |
| 4. Choose the production domain/host, deploy to Vercel, and configure secrets. | A shareable live portfolio is necessary for applications; real URLs enable complete social previews and live GitHub contributions data. | Vercel dashboard (`GITHUB_TOKEN` env var), `index.html`, `src/hooks/usePageMetadata.ts`, `public/robots.txt`, sitemap/OG assets. | Medium | Live contribution data requires the secret; canonical URLs require a domain. |
| 5. Complete final polish checklist: favicon, social preview image, and device checks. | Prevents missing favicon errors and unstyled link previews when sharing on LinkedIn/X. | `public/favicon.svg`, `public/og-image.png`, `index.html`. | Low | Final launch gate. |

## Suggested sequence for the next 2–4 weeks

1. **Week 1 — Choose project scope and finish real material.** Select projects outside this repository, publish at least one working demo/repository, and confirm all portfolio claims and contact links. Do not invent project content to fill the empty state.
2. **Week 2 — Present the work.** Replace the work empty state with real records and links. Add a case-study route only if there is enough real implementation evidence to explain. Add writing support only when there is an actual post and an agreed content approach.
3. **Week 3 — Verify accessibility/performance and fill launch prerequisites.** Run keyboard and reduced-motion checks again, perform manual screen-reader testing, and investigate the 2.19s lab LCP using the real content/assets.
4. **Week 4 — Deploy and complete domain-based SEO.** Choose hosting/domain, deploy, add canonical and Open Graph URL/image metadata, generate/reference a sitemap, and test real social previews. Finish the link and favicon checklist.

## Known gaps and placeholders

- `/work` and `/writing` are intentionally empty; no projects or articles are supplied.
- Home skills, role statement, and social/contact details are hard-coded and should be checked for accuracy before launch.
- No resume content, PDF, or route exists.
- No case-study or article detail routes exist.
- `@mdx-js/react` and `@mdx-js/rollup` are installed but unused; MDX should not be described as an active content feature.
- `lucide-react` is installed but unused.
- Favicons and web manifest are fully configured in `public/` (`favicon.svg`, `favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`, `site.webmanifest`).
- No OG image asset or sitemap is present. `robots.txt` allows crawling but does not reference a sitemap.
- Page-specific metadata is updated client-side; there is no static/server-rendered metadata per route.
- Local mobile Lighthouse LCP was above the project's stated 1.5s target; repeat measurement on the deployed build.
- Manual VoiceOver/NVDA validation and physical-device touch testing remain unconfirmed.

# Roadmap

## Status snapshot

| Area | Status | Evidence and remaining boundary |
| --- | --- | --- |
| Branding, visual direction, content planning, and wireframes | Complete as planning artifacts | `BRAND.md`, `MOOD.md`, `CONTENT.md`, and `WIREFRAMES.md` exist. Project ideas were intentionally left undecided. |
| Design tokens and component showcase | Complete | CSS tokens and `/dev/kitchen-sink` exist. Some planned showcase/component ideas are not live portfolio features. |
| App setup and core public pages | Complete, with intentional omissions | Vite/React/TypeScript app and home/work/writing/about/404 routes exist. Work and writing are empty states; resume and case-study/article routes are absent. |
| Motion and responsive layout | Implemented and checked | Typing, reveals, transitions, mobile navigation, and reduced-motion handling exist. Earlier viewport checks covered 320, 375, 768, 1024, and 1440 CSS pixels. Physical touch-device behavior was not independently confirmed. |
| Accessibility, SEO, and performance | Partially complete | Recorded local mobile Lighthouse scores: Performance 96, Accessibility 100, Best Practices 100, SEO 100. Lab LCP was 2.19s versus the 1.5s target. Keyboard flows and browser accessibility tree were checked; manual VoiceOver/NVDA testing remains. |
| Project/article content model | Not started | No project records, MDX files, frontmatter parser, article routes, or content loaders exist. |
| Resume page or download | Not started | No resume content/PDF was supplied; no route or navigation item exists. |
| Testing and deployment (Phase 11) | Not started | No automated test setup, production deployment, custom domain, or analytics is present. The user deferred deployment until implementation phases are complete. |
| Final polish (Phase 12) | Not started | No `POLISH.md` exists; verify all links, favicon, page metadata, and production previews before launch. |

## Prioritized next steps

Effort estimates are planning estimates, not measured implementation times.

| Priority / task | Why it matters for a junior frontend role | Likely code/docs touched | Effort | Blocks |
| --- | --- | --- | --- | --- |
| 1. Choose and build at least two real, presentable projects; record genuine problem, implementation, and outcome details. | Recruiters need evidence of working frontend skills. The portfolio brief identifies absent projects as its largest effectiveness risk. | New project content; `src/pages/WorkIndexPage.tsx`; `src/pages/HomePage.tsx`; potentially new project-detail route/components and project assets. | High; multiple focused sessions | Blocks a credible populated work page and project case studies. |
| 2. Finalize and verify professional content: role statement, skills, biography, links, and resume material. | Accurate, specific claims and a reachable resume help recruiters evaluate the candidate. Existing copy and skill claims should match demonstrable experience. | `BRAND.md`, `CONTENT.md`, `src/pages/HomePage.tsx`, `src/pages/AboutPage.tsx`, future resume route or PDF. | Medium | Resume navigation/page should wait for actual resume content; public content should be reviewed before launch. |
| 3. Recheck accessibility and performance on real devices, then address LCP and complete a VoiceOver/NVDA pass. | Demonstrates practical accessibility and performance judgment beyond a high Lighthouse snapshot. | `src/components/ui/TerminalWindow.tsx`, font-loading styles in `src/styles/index.css`, image/content work, route shell as needed. | Medium | Recommended before deployment; actual project imagery may change performance. |
| 4. Choose the production domain/host and complete Phase 11 deployment and URL-dependent SEO. | A shareable live portfolio is necessary for applications; real URLs enable complete social previews and indexing. | `index.html`, `src/hooks/usePageMetadata.ts`, `public/robots.txt`, sitemap/OG assets, deployment configuration. | Medium | Requires domain/host decision; canonical URLs, `og:url`, absolute OG image URL, and sitemap are deliberately deferred until then. |
| 5. Complete a final link/content/device checklist and publish. | Prevents broken navigation and placeholder material from undermining the candidate's first impression. | All public routes/assets; suggested checklist is described in `prompt.md` Phase 12. | Low–medium | Final launch gate. |

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
- `index.html` refers to `/favicon.svg`, but no matching file is present in `public/`. `src/assets/LS_logo.svg` exists but is not wired as the favicon.
- No OG image asset or sitemap is present. `robots.txt` allows crawling but does not reference a sitemap.
- Page-specific metadata is updated client-side; there is no static/server-rendered metadata per route.
- Local mobile Lighthouse LCP was above the project's stated 1.5s target; repeat measurement on the deployed build.
- Manual VoiceOver/NVDA validation and physical-device touch testing remain unconfirmed.


# Portfolio documentation

This documentation set describes the portfolio's implemented architecture, visual system, components, motion, content status, and next steps. It distinguishes code that exists from design-plan items that have not been built. Original design and content planning material is grouped in [`planning/`](./planning/README.md).

| Document | Covers |
| --- | --- |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Stack, project structure, routing, content and style flow, and documented architectural decisions. |
| [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) | Implemented colors, typography, layout tokens, responsive behavior, component styling, and theme behavior. |
| [COMPONENTS.md](./COMPONENTS.md) | Shared components, route-level pages, props, usage, and placement patterns. |
| [ANIMATIONS.md](./ANIMATIONS.md) | Implemented motion/interaction effects, triggers, timings, reduced-motion behavior, and performance notes. |
| [CONTENT.md](./CONTENT.md) | Existing content sources, current data shapes, empty content systems, and the steps/gaps for adding future projects or posts. |
| [ROADMAP.md](./ROADMAP.md) | Status snapshot, prioritized work, estimates, launch dependencies, known gaps, and a suggested 2–4 week sequence. |

Update the relevant document whenever its source of truth changes. In particular, keep stack and routes aligned with `package.json` and `src/App.tsx`, token and interaction details aligned with the CSS, and the roadmap aligned with actual content and verified launch status. Mark proposed schemas and planned features as such until they exist in code.

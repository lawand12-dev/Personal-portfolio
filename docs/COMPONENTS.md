# Components

This inventory covers components under `src/components/`. Page-level components and the standalone showcase are listed separately. Base UI provides the mobile navigation disclosure primitive; other components follow the project's local patterns.

## Layout

| Component | Purpose and notable behavior | Props | Used by |
| --- | --- | --- | --- |
| `PageShell` — `src/components/layout/PageShell.tsx` | Shared site frame. Renders skip link, `NavBar`, a focusable `<main>`, route transition, and `Footer`. Tracks route changes and directs focus to the main landmark when navigation changes. | `children: ReactNode` | Home, work, writing, about, and not-found routes. |
| `NavBar` — `src/components/layout/NavBar.tsx` | Logo/name home link and route navigation. Uses Base UI `Collapsible` for the mobile disclosure below the responsive breakpoint; closes on link selection or Escape, and restores focus to the trigger on Escape. | No public props | `PageShell`. |
| `Footer` — `src/components/layout/Footer.tsx` | Shared closing area with identity and icon-based contact/social links. Links are ordinary anchors. | No public props | `PageShell`. |
| `SocialLinks` — `src/components/layout/SocialLinks.tsx` | Reusable, accessible Gmail, GitHub, LinkedIn, and X links using Lucide and the supplied SVG assets. | No public props | Home contact section and `Footer`. |

The mobile navigation is a non-modal disclosure, not a dialog or focus-trapping drawer. The older plan calls it a drawer in places, but the current implementation does not trap focus.

## UI

| Component | Purpose and notable behavior | Props | Used by |
| --- | --- | --- | --- |
| `ActionLink` — `src/components/ui/ActionLink.tsx` | Router link styled as an action. Supports `primary` and `secondary` variants; secondary is the default. It remains a navigation link rather than a `<button>`. | `to: string`, `children: ReactNode`, optional `variant: "primary" \| "secondary"` | Home page calls to action and other in-app action links. |
| `Reveal` — `src/components/ui/Reveal.tsx` | Motion wrapper that reveals content as it enters the viewport. Accepts an optional class and delay; uses a one-time viewport trigger. | `children: ReactNode`, optional `className?: string`, optional `delay?: number` (seconds as passed to Motion) | Home page sections/blocks. |
| `TerminalWindow` — `src/components/ui/TerminalWindow.tsx` | Displays the terminal-style introduction transcript in a window with decorative red/yellow/green controls, a title, read-only status, and differentiated command/output text. Types characters on an interval unless reduced motion is requested. The complete transcript is available as static accessible text; a CSS cursor blinks alongside the animated text. | No public props | Home hero. |

## Pages and page-local UI

These are route-level components in `src/pages/`, not shared components in `src/components/`.

| Component | Purpose and notable behavior |
| --- | --- |
| `HomePage` — `src/pages/HomePage.tsx` | Introduction, calls to action, work/about/skills/writing/contact sections. Copy and skills are local constants; there is no content model. It uses a local section-heading helper and the shared `SocialLinks` component. |
| `WorkIndexPage` — `src/pages/WorkIndexPage.tsx` | Honest empty state for projects. No cards, project records, detail routes, or project navigation are implemented. |
| `WritingIndexPage` — `src/pages/WritingIndexPage.tsx` | Honest empty state for writing. No post list, MDX rendering, or article route is implemented. |
| `AboutPage` — `src/pages/AboutPage.tsx` | Biography and related static copy. |
| `NotFoundPage` — `src/pages/NotFoundPage.tsx` | Catch-all route content, rendered within `PageShell`. |
| `KitchenSinkPage` — `src/pages/KitchenSinkPage.tsx` | Standalone development showcase of tokens, typography, links/buttons, navigation examples, empty states, and terminal treatment. Not wrapped in `PageShell`. |

`src/pages/KitchenSinkPage.css` defines sample-specific styles. Its loading spinner is only a showcase state, not a loading indicator used by the site's static routes.

## Reuse and placement

- **Shared primitives/layout:** `src/components/layout/` for site-wide frame elements; `src/components/ui/` for small reusable visual/behavioral elements.
- **Route composition and copy:** `src/pages/`.
- **Global tokens and shared styling:** `src/styles/index.css` and `src/styles/Portfolio.css`.
- **Page-only styles:** beside the page as a CSS file, as with `KitchenSinkPage.css`.

Follow the current direct-import pattern; there are no barrel exports. Keep a component page-specific if it has no second use. If a future project or article model is introduced, its records and content-loading logic should live outside presentation components; no such module exists today.

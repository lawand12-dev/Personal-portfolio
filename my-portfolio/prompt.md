# Complete Portfolio Plan — Dark Terminal Editorial

---

## **"Terminal Editorial"** — a forced-dark, strictly greyscale design language that fuses a code editor's discipline with print-magazine typography. No neon. No gradients. No glassmorphism. The aesthetic reads as "engineer who also understands design" rather than "developer who discovered CSS filters."

### Core visual rules

A single narrow centered column (max ~1100–1150px) on a void-black background, framed by hairline vertical borders down both edges. The page should feel like a bound editorial spread or a terminal pane — not a full-bleed SaaS landing page.

Deep matte black everywhere. Panels and cards are barely-lifted near-black surfaces separated by 1px translucent-white hairlines — never drop shadows with color. Depth comes from brightness steps, not blur or shadow.

Monospace section labels formatted like terminal breadcrumbs: `~/about`, `cd projects/`, `cat contact.md`. This is the single most powerful identity signal. It tells recruiters "this person thinks in systems" before they read a word of copy.

Sparse italic serif for emphasis words inside otherwise mono/sans paragraphs. Gives an editorial pull-quote feel without being decorative.

A very low-opacity film-grain or scanline overlay across the whole page. Barely perceptible. Evokes CRT without being loud.

### Why this direction works for a junior frontend candidate

Recruiters and hiring managers see dozens of portfolios with purple gradients and rounded glass cards. A disciplined greyscale terminal aesthetic signals _taste_ and _restraint_ — two things junior developers are rarely trusted with. It also aligns perfectly with the content: your projects are React apps and code. The site itself becomes the first case study. The visual language is the argument.

The risk is that terminal aesthetics can feel cold or gimmicky if overdone. The fix is the editorial layer: real typography hierarchy, generous whitespace, and human copy. You want "confident engineer," not "hacker movie."

---

## B. Recommended Tech Stack

You said capability isn't a constraint. Good. That means we optimize purely for fit, performance, and maintainability — not for "what's easy to learn."

| Layer         | Choice                                                                                                                            | Why this, not alternatives                                                                                                                                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework** | **React 19 + TypeScript + Vite**                                                                                                  | Vite is the right default for SPAs and static sites. Zero server overhead, instant HMR, full control over routing. Next.js earns its complexity only when you need SSR, React Server Components, or ISR out of the box — a portfolio with an MDX blog doesn't.         |
| **Routing**   | **React Router v7 (declarative mode)**                                                                                            | File-based routing is overkill for 5–7 pages. React Router gives you explicit route definitions, lazy loading, and clean code-splitting without a framework's conventions.                                                                                             |
| **Styling**   | **Tailwind CSS v4**                                                                                                               | CSS-first theming in `src/index.css`, no config file needed. Utility classes enforce the spacing/color system at the point of use, which prevents drift. For a design this disciplined, Tailwind's constraint is a feature, not a limitation.                          |
| **Animation** | **Motion for React (formerly Framer Motion)** + **CSS**                                                                           | Motion's hybrid engine runs on the Web Animations API and ScrollTimeline for 120fps performance, falling back to JS only when needed (springs, gestures, interruptible keyframes). Use CSS for simple hover/focus transitions — Motion is overkill for a color change. |
| **Icons**     | **Lucide React**                                                                                                                  | Tree-shakeable, consistent stroke weight, and a terminal-appropriate geometric style. No icon fonts. No SVGs copied from random sites.                                                                                                                                 |
| **Fonts**     | **JetBrains Mono** (display/labels) + **Inter** (body) + **a serif for italic emphasis** (e.g., _Newsreader_ or _Source Serif 4_) | JetBrains Mono for everything code-adjacent: labels, metadata, nav, breadcrumbs. Inter for readable prose. The serif appears only for emphasis words. Three fonts max, self-hosted, subset to Latin.                                                                   |
| **Blog**      | **MDX with `@mdx-js/rollup`**                                                                                                     | Local-first content. No CMS, no database, no admin panel. You write `.mdx` files in `content/blog/`, and Vite compiles them at build time. You can embed React components inside posts. This is the correct amount of infrastructure for a personal blog.              |
| **Forms**     | **None in v1.** Use `mailto:` links + visible email                                                                               | A contact form on a static portfolio adds complexity (spam, validation, delivery) for negligible benefit. Recruiters click email links. Add a form later only if analytics show people are trying to contact you and bouncing.                                         |

### What I'm deliberately _not_ including

- **No CMS** (Contentful, Sanity, etc.). You have one author and a handful of posts. MDX files in a Git repo are faster, cheaper, and more maintainable.
- **No backend or database.** Everything is static. If you later need a contact form or newsletter, add a serverless function at that point.
- **No GSAP.** Motion covers everything you need. GSAP's timeline choreography is powerful but introduces a second animation paradigm and a larger bundle. The one thing GSAP does better — complex SVG morphing — you won't need.
- **No component library** (shadcn, Radix, etc.). For a portfolio this small, you'll build 8–10 components. A library adds dependency surface and styling opinions that fight your design system.

### Motion performance note

Motion's full `motion` component ships ~34KB gzipped. With `LazyMotion` and the `m` component, you reduce the initial bundle to **4.6KB**, loading features as needed. Use this. For a portfolio, the difference between a 34KB and 4.6KB animation layer is meaningful on mobile Core Web Vitals. You'll use `domAnimation` (~4.6KB) for most work; only load `domMax` on pages that need layout animations.

---

## C. Sitemap and Section Breakdown

Your portfolio has one job: make a hiring manager think "I want to talk to this person" within 90 seconds. Every section either contributes to that or gets cut.

### Pages

| Route            | Page       | Purpose                                                                        |
| ---------------- | ---------- | ------------------------------------------------------------------------------ |
| `/`              | Home       | Hero + featured work + about + skills + contact CTA. The 60-second impression. |
| `/work`          | Work index | All projects (future-ready). Filterable by type.                               |
| `/work/:slug`    | Case study | Deep dive on one project.                                                      |
| `/writing`       | Blog index | MDX post list.                                                                 |
| `/writing/:slug` | Blog post  | Individual MDX content.                                                        |
| `/about`         | About      | Longer bio, timeline, philosophy, links.                                       |
| `/resume`        | Resume     | Embedded PDF or a dedicated page.                                              |

### Homepage sections (in order)

**1. Hero — Terminal Introduction**

Purpose: Establish identity, role, and credibility in under 5 seconds.

Layout: Full-viewport height (but not more). A terminal window mockup as the visual anchor — dark surface, hairline border, blinking cursor. Inside, a typed sequence:

```
$ whoami
Frontend developer — React · TypeScript · Motion

$ cat goals.md
Seeking junior frontend role. Building in public.
Learning by shipping.
```

Below the terminal, two actions: **View Work** (primary, white fill) and **Read Writing** (secondary, hairline border). Your name in large display type above or beside the terminal.

Why a terminal mockup instead of a photo: A headshot is generic. A terminal that types your identity is a live demonstration of your medium. It's the design equivalent of "show, don't tell." The DevTerminalProfile pattern from 21st.dev does exactly this — it introduces the developer line by line with a typing animation, creating an engaging, tech-savvy impression.

**2. Featured Work**

Purpose: Prove you can build real things. Even before you have public projects, this section exists with a clear empty-state message.

Layout: A vertical stack of project cards. Each card is a wide horizontal block on desktop (image left, text right) that collapses to a vertical card on mobile. Project name in large mono, role/stack in a metadata row, 2–3 sentence description, live/repo links.

Empty state (for now): A card that reads: _"First public project shipping soon. Currently building [project name]. Follow along on GitHub →"_ This is honest, shows momentum, and gives you a deadline. Do not hide the section. A visible "coming soon" with a real project name is more credible than an empty page.

**3. About — Short Version**

### About Lawand

I'm a self-directed learner interested in technology, business, and the process of turning ideas into reality.

I started exploring software development because I wanted to understand how digital products work and, more importantly, how to build my own. What began as learning to code has grown into a broader interest in AI, software engineering, and the intersection of technology and business.

I'm currently developing my skills in Frontend to fullstack , exploring AI-powered tools, and building projects that turn ideas into working products. I believe the best way to learn is to build, experiment, solve problems, and understand the systems behind what you create.

Beyond technology, I'm interested in economics, business strategy, startups , and how technology changes the way people work and live. My long-term goal is to combine these interests to build useful products . That's the direction I'm working toward, one project at a time.

**4. Skills — Terminal-Style Capability List**

Purpose: Let recruiters keyword-match without drowning in a logo grid.

Layout: A terminal-style command interface. Instead of a `skills` command, present it as a structured readout:

```
~/skills $ ls -la
drwxr-xr-x  languages/      TypeScript · JavaScript · HTML · CSS
drwxr-xr-x  frameworks/     React · Vite · React Router
drwxr-xr-x  styling/        Tailwind CSS · Shadcn.ui . Base UI
drwxr-xr-x  animation/      Framer Motion for React · CSS Transitions
drwxr-xr-x  tools/          Git · GitHub Actions · Figma · Vite
drwxr-xr-x  learning/       Next.js · Testing Library · Playwright
```

This is scannable, honest (includes "learning"), and on-brand. It also demonstrates that you understand filesystem semantics — a small signal of technical fluency.

**5. Writing Preview**

Purpose: Show you can communicate. Writing is a force multiplier for junior developers.

Layout: 2–3 most recent post cards. If no posts yet, show a "Writing coming soon" card with a single sentence about what you plan to write about. Link to `/writing`.

**6. Contact CTA**

Purpose: Make the next step frictionless.

Layout: A single wide block, centered, with a large mono headline: `./contact --email`. Below it, your email as a `mailto:` link, plus GitHub and LinkedIn. No form. No "Let's work together!" fluff. Direct and confident.

### Navigation

A fixed top bar with your wordmark/monogram on the left and routes on the right. On mobile, a slide-in drawer. The nav should include: Work, Writing, About, Resume. Resume as a direct link (opens PDF or navigates to `/resume`).

The nav is not an afterthought. It's the primary way a recruiter who lands on a deep link (e.g., a blog post shared on Twitter) discovers your work. Keep it visible, keep it fast.

---

## D. Design System and Typography

### Color Palette (Strict Greyscale)

| Token              | Value                    | Usage                              |
| ------------------ | ------------------------ | ---------------------------------- |
| `--void`           | `#050505`                | Page background                    |
| `--surface`        | `#0F0F0F`                | Panels, terminal window body       |
| `--card`           | `#111111`                | Project cards, post cards          |
| `--raised`         | `#1A1A1A`                | Accent chips, hover states         |
| `--hairline-dim`   | `rgba(255,255,255,0.06)` | Subtle separators                  |
| `--hairline-light` | `rgba(255,255,255,0.12)` | Active borders, terminal frame     |
| `--text-primary`   | `#FFFFFF`                | Headlines, body on dark            |
| `--text-secondary` | `#9CA3AF`                | Metadata, captions                 |
| `--text-muted`     | `#6B7280`                | Disabled, placeholder              |
| `--accent`         | `#FFFFFF`                | Primary button fill, active states |

**No color.** White is the only accent. This is a deliberate constraint that forces hierarchy through type and space rather than hue. It also guarantees contrast compliance — white on #050505 is 21:1, far exceeding WCAG AAA.

If you later want a single accent for links or active nav, use a muted cyan (`#67E8F9`) at low saturation. But start without it. Earn the accent.

### Typography

| Role           | Font                | Weight     | Size (desktop) | Tracking          |
| -------------- | ------------------- | ---------- | -------------- | ----------------- |
| Display / H1   | JetBrains Mono      | 700        | 48–64px        | -0.02em           |
| Section labels | JetBrains Mono      | 500        | 12–13px        | 0.02em, uppercase |
| Body           | Inter               | 400        | 16–18px        | -0.01em           |
| Emphasis       | _Newsreader Italic_ | 400 italic | inherits body  | normal            |
| Metadata       | JetBrains Mono      | 400        | 12–13px        | 0.01em            |
| Code blocks    | JetBrains Mono      | 400        | 14px           | normal            |

**Pairing logic:** JetBrains Mono is the workhorse — it carries the terminal identity. Inter handles long-form readability. Newsreader italic appears only for emphasis words inside paragraphs, creating the editorial pull-quote feel. Three fonts, three jobs, zero overlap.

**Self-host both fonts** via `@fontsource` packages. No Google Fonts CDN — it's a privacy issue and a performance dependency. Subset to Latin + Latin Extended.

### Spacing Scale

Use a 4px base unit. Tailwind's default scale is fine, but define semantic tokens:

- `-space-1: 4px` · `-space-2: 8px` · `-space-3: 12px` · `-space-4: 16px` · `-space-6: 24px` · `-space-8: 32px` · `-space-12: 48px` · `-space-16: 64px` · `-space-24: 96px` · `-space-32: 128px`

Section vertical padding: `space-24` (96px) on desktop, `space-16` (64px) on mobile. Generous but not wasteful.

### Layout and Grid

Max content width: **1100px**. Centered. On screens wider than 1200px, the content column is framed by hairline vertical borders that extend to the viewport edges — the "editorial spread" effect.

Use CSS Grid for page-level layout (12-column mental model, but implemented with `grid-template-columns` as needed). Flexbox for component internals.

**Breakpoints:**

| Name | Min-width | Key changes                                  |
| ---- | --------- | -------------------------------------------- |
| `sm` | 640px     | Single column → two-column cards             |
| `md` | 768px     | Sidebar layouts activate                     |
| `lg` | 1024px    | Full desktop nav, terminal hero side-by-side |
| `xl` | 1280px+   | Hairline frame borders appear                |

### Borders, Radii, Shadows

- **Borders:** 1px solid `-hairline-dim` for all card/panel borders. 1px solid `-hairline-light` for interactive/focused elements.
- **Radii:** 6px for cards and buttons. 4px for chips and small elements. 8px for the terminal window. Nothing fully rounded. Nothing sharp-edged. Consistent.
- **Shadows:** None. Depth comes from surface brightness steps (`void` → `surface` → `card` → `raised`). This is a deliberate terminal-editorial rule.

### Buttons and Links

**Primary button:** White fill, black text, 6px radius, 12px 24px padding, mono font 13px uppercase tracking. Hover: background `#E5E5E5`, no scale transform. Focus: 2px white outline offset 2px.

**Secondary button:** Transparent fill, 1px `--hairline-light` border, white text. Hover: `--raised` background.

**Links:** White text, underline on hover with `text-underline-offset: 4px`. No color change. Focus: 2px white outline.

### Cards and Project Previews

Project cards use a horizontal split on desktop: 60% content, 40% visual. The visual is not a screenshot — it's a stylized terminal pane or code snippet preview. This reinforces the aesthetic and avoids the "screenshot gallery" look.

Card hover: border shifts from `--hairline-dim` to `--hairline-light`. A subtle 2px upward translate (`translateY(-2px)`) with 150ms ease-out. No shadow. No glow.

### Light/Dark Theme

**Forced dark.** Do not build a theme toggle. The terminal-editorial identity depends on the void-black canvas. A light mode would require an entirely different design language, and you'd split your design effort for a feature no recruiter will use. The only exception: respect `prefers-color-scheme: light` by keeping the dark theme, not by lightening. The site is dark. Own it.

---

## E. Animation and Interaction Plan

Animations should make the site feel _alive_ and _responsive_, not _decorated_. Every motion must have a functional justification. If you can't explain what it communicates, cut it.

### Essential interactions (build these)

**1. Terminal boot sequence (hero)**

- **What you see:** On page load, the terminal window types out the `whoami` and `cat goals.md` lines character by character, with a blinking block cursor.
- **Why it improves experience:** It introduces you through your medium. It's memorable. It buys 2–3 seconds of attention while the rest of the page loads.
- **Technology:** A `useEffect` interval that increments a character index. CSS `@keyframes` for the blinking cursor. No library needed.
- **Performance/A11y:** The typed text should be present in the DOM immediately as a hidden fallback (or aria-hidden on the animated version and a visually-hidden static version for screen readers). `prefers-reduced-motion`: render the full text instantly, no typing.

**2. Scroll-triggered content reveals**

- **What you see:** As you scroll, sections and cards fade in and slide up 12–16px. Staggered by 50–80ms for grouped items.
- **Why it improves experience:** It paces the content. Prevents the "wall of text" feeling. Gives the page a sense of depth.
- **Technology:** Motion's `whileInView` prop with `viewport={{ once: true }}`. Use `m` + `LazyMotion` with `domAnimation` to keep the bundle at 4.6KB.
- **Performance/A11y:** Use `transform` and `opacity` only — both are compositor-only properties. Never animate `height`, `top`, or `margin`. `prefers-reduced-motion`: disable transforms, keep opacity at 1.

**3. Navigation transitions**

- **What you see:** Route changes fade out the current page (150ms) and fade in the new page (200ms) with a subtle 8px upward slide. The nav bar stays fixed.
- **Why it improves experience:** Prevents the jarring "flash" of a hard navigation. Makes the site feel like an app.
- **Technology:** Motion's `AnimatePresence` wrapping the route outlet in React Router. `mode="wait"` so the exit completes before the enter begins.
- **Performance/A11y:** Keep durations under 250ms. Respect reduced motion by making transitions instant.

**4. Project card interactions**

- **What you see:** On hover, the card border brightens and the card lifts 2px. A small arrow icon (→) slides right by 4px. On focus (keyboard), the same border brightens.
- **Why it improves experience:** Clear affordance. The user knows it's clickable. The motion is small enough to feel precise, not bouncy.
- **Technology:** Pure CSS transitions (150ms ease-out). No JS. This is a case where CSS is genuinely better — simpler, zero bundle cost, GPU-composited.
- **Performance/A11y:** `transition: border-color 150ms, transform 150ms`. Reduced motion: no transform, border change only.

**5. Focus indicators**

- **What you see:** A 2px white outline with 2px offset on every interactive element when focused via keyboard.
- **Why it improves experience:** Keyboard navigation is a baseline accessibility requirement. A visible focus ring is not optional.
- **Technology:** CSS `:focus-visible`. Never use `outline: none` without a replacement.
- **Performance/A11y:** No animation. Instant. This is non-negotiable.

### interactions

**Terminal cursor blink in hero:** A CSS `@keyframes` blinking block cursor. It's the single most recognizable terminal signal. Keep it. But disable under `prefers-reduced-motion`.

**Hairline frame draw-in on load:** The vertical border frames could animate their height from 0 to 100% on initial load (400ms, ease-out). This is a "nice to have." It reinforces the editorial frame concept. But it's purely decorative. Cut it if it complicates the initial render.

**Custom cursor:** Don't. Custom cursors are almost always a usability regression. They break on touch devices, they interfere with text selection, and they feel gimmicky on a site that's supposed to signal engineering discipline.

### What NOT to animate

- Do not animate the nav bar on scroll (no hide/show, no background blur transition).
- Do not animate text color on hover.
- Do not add parallax scrolling.
- Do not animate page background.
- Do not add loading spinners or skeleton screens. Your content is static and builds instantly.

---

## F. Architecture and Folder Structure

A portfolio of this size does not need enterprise architecture. It needs clear separation of content, presentation, and configuration. Here's the structure:

```
src/
├── app/
│   ├── routes.tsx              # Route definitions (React Router)
│   └── App.tsx                 # Root: LazyMotion + BrowserRouter + layout
├── pages/
│   ├── HomePage.tsx
│   ├── WorkIndexPage.tsx
│   ├── CaseStudyPage.tsx
│   ├── WritingIndexPage.tsx
│   ├── BlogPostPage.tsx
│   ├── AboutPage.tsx
│   └── ResumePage.tsx
├── components/
│   ├── layout/
│   │   ├── PageShell.tsx       # Hairline frame, max-width container, footer
│   │   ├── NavBar.tsx
│   │   ├── MobileDrawer.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Link.tsx
│   │   ├── Card.tsx
│   │   ├── Chip.tsx
│   │   └── TerminalWindow.tsx  # Reusable terminal frame
│   ├── sections/
│   │   ├── HeroTerminal.tsx
│   │   ├── FeaturedWork.tsx
│   │   ├── AboutShort.tsx
│   │   ├── SkillsReadout.tsx
│   │   ├── WritingPreview.tsx
│   │   └── ContactCTA.tsx
│   └── motion/
│       ├── Reveal.tsx          # whileInView wrapper
│       ├── PageTransition.tsx  # AnimatePresence wrapper
│       └── StaggerGroup.tsx    # Staggered children container
├── content/
│   ├── blog/                   # .mdx files
│   │   └── hello-world.mdx
│   └── projects/               # Project metadata (.ts files, not MDX)
│       └── projects.ts         # Typed project catalog
├── lib/
│   ├── mdx.ts                  # MDX loading, frontmatter parsing, sorting
│   └── seo.ts                  # Metadata helpers (title, og:image, etc.)
├── hooks/
│   ├── useReducedMotion.ts     # Motion's useReducedMotion re-export (or custom)
│   └── useDocumentTitle.ts
├── styles/
│   ├── index.css               # Tailwind imports + @theme tokens
│   ├── fonts.css               # @font-face declarations
│   └── grain.css               # Scanline/grain overlay (pseudo-element)
├── assets/
│   ├── fonts/                  # Self-hosted .woff2 files
│   └── images/                 # Optimized images, screenshots
└── main.tsx                    # Vite entry
```

### Key architectural decisions

**Project data lives in `content/projects/projects.ts`, not MDX.** Project metadata (title, slug, stack, links, status) is structured data — typed, queryable, used to generate cards and route params. The long-form case study _narrative_ can be MDX if you want, but the metadata belongs in TypeScript. This gives you autocomplete, type safety, and a single source of truth.

**Animations are wrapped in `components/motion/`, not scattered.** A `Reveal` component that wraps any child in `whileInView` is reusable across the entire site. You configure it once (distance, duration, delay) and never think about Motion props again. This prevents animation drift and makes `prefers-reduced-motion` a single-point configuration.

**No component library. No barrel files. No index.ts re-exports.** Import directly from the file. Barrel files add indirection and can hurt tree-shaking.

**`PageShell` owns the frame.** Every page renders inside `PageShell`, which provides the max-width container, hairline vertical borders, nav, and footer. This guarantees consistent layout without repeating structure in every page component.

---

## G. Performance, Accessibility, and SEO

These are not "nice to have" for a portfolio. They _are_ the portfolio. A junior candidate who ships a 100 Lighthouse score and a fully keyboard-navigable site is demonstrating exactly the skills hiring managers want.

### Performance

**Target Core Web Vitals:** LCP < 1.5s, INP < 100ms, CLS < 0.05.

**Font loading:** Self-host `woff2` files. Use `font-display: swap`. Preload only the mono font (used above the fold); let the others load normally. Subset to the characters you actually use.

**Motion bundle:** Use `LazyMotion` with the `m` component and `domAnimation` features (~4.6KB). Only load `domMax` on pages that need layout animations. Import from `"motion/react"`.

**Images:** Use `@unoptimized` sources if you're not using a framework with image optimization. Convert to WebP or AVIF. Set explicit `width` and `height` on every `<img>` to prevent CLS. Lazy-load images below the fold with `loading="lazy"`.

**Code splitting:** React Router's `lazy()` for route-level splitting. The homepage bundle should not include the blog rendering code.

**No render-blocking resources.** Vite's default build handles this, but verify: no synchronous scripts, no CSS imports from CDNs.

### Accessibility

**Semantic HTML.** `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`. Headings in logical order (H1 → H2 → H3, no skipping). One H1 per page.

**Keyboard navigation.** Every interactive element reachable via Tab. Visible focus indicators via `:focus-visible`. The mobile drawer traps focus when open and returns focus to the trigger when closed.

**Screen reader support for the terminal hero.** The typed animation is `aria-hidden="true"`. A visually-hidden static paragraph contains the same content for screen readers. This is the correct pattern for decorative animation.

**Contrast.** White on `#050505` is 21:1. `--text-secondary` (#9CA3AF) on `#050505` is 7.5:1. Both exceed WCAG AAA. The hairline borders are decorative, not informational — they don't need contrast compliance, but they should be visible (they are at 0.12 alpha).

**`prefers-reduced-motion`.** Wrap all Motion animations in a check. When reduced motion is preferred: disable transforms, keep opacity transitions (fades are generally safe), disable the terminal typing animation (render full text), disable page transitions. The site should be fully usable and feel intentional without any motion.

**Language and metadata.** `<html lang="en">`. `<meta name="description">` on every page. `<title>` format: `Page Name — Your Name — Frontend Developer`.

### SEO

**Structured data.** Add JSON-LD for `Person` (your name, role, sameAs links to GitHub/LinkedIn) and `BlogPosting` for blog posts. This is 20 lines of code and makes you eligible for rich results.

**Open Graph and Twitter cards.** Every page needs `og:title`, `og:description`, `og:image`, `og:url`. Generate a single OG image (1200×630) with your terminal aesthetic — name, role, and a terminal prompt. Use the same image site-wide initially; per-post images later if you want.

**Sitemap and robots.txt.** Generate a `sitemap.xml` from your route list at build time. A simple `robots.txt` pointing to it.

**Canonical URLs.** Every page. Especially important if you ever add query params or trailing-slash variants.

**Clean URLs.** `/work/project-slug`, not `/work?id=123`. React Router handles this naturally.

---

## H. Implementation Phases

### Phase 1 — Requirements and Personal Branding

**Deliverable:** A single `BRAND.md` file with: your name, role statement (one sentence), three projects you plan to build (even if not started), your GitHub/LinkedIn/email, and your target job title.

**Decisions to make:** What's your one-sentence positioning? "Frontend developer focused on performance and motion" vs. "React developer building accessible interfaces" — pick one lane. You can broaden later.

### Phase 2 — Inspiration and Visual Direction

**Deliverable:** A moodboard (Figma or a simple `MOOD.md` with image links) containing 5–8 references. Include nateherk.com and at least two non-developer sites (a magazine, a product page, a type foundry).

**Decisions to make:** Confirm the Terminal Editorial direction. If it doesn't excite you after seeing it, adjust now — before you've written a line of CSS.

### Phase 3 — Sitemap and Content Planning

**Deliverable:** A `CONTENT.md` file with every page, every section, and a rough draft of every headline and paragraph. Yes, _every_ piece of copy. Writing the copy before building the UI prevents "lorem ipsum syndrome" and forces you to confront whether you actually have something to say.

**Decisions to make:** What does the hero terminal say? What are your three project slots? What's your bio paragraph? Write it now.

### Phase 4 — Wireframes

**Deliverable:** Low-fidelity wireframes for the homepage and one case study page. Paper sketches are fine. Figma is fine. The goal is to resolve layout hierarchy _before_ you're wrestling with CSS.

**Decisions to make:** Hero layout (terminal left or centered?), project card layout (horizontal or vertical?), nav behavior on mobile.

### Phase 5 — Design System

**Deliverable:** A `DesignTokens.ts` file and a `styles/index.css` with all custom properties. Build a single "kitchen sink" page (`/dev/kitchen-sink`) that renders every component — buttons, cards, chips, terminal windows, typography scale — so you can see the system in isolation.

**Decisions to make:** Exact font sizes, spacing values, border radii. Lock these. Don't change them during implementation unless something is genuinely broken.

### Phase 6 — Tech Stack and Project Setup

**Deliverable:** A running Vite + React + TypeScript + Tailwind + React Router + Motion project with the folder structure in place, fonts loading, and the kitchen sink page rendering.

**Decisions to make:** Vercel or Cloudflare Pages. Set up the deployment pipeline now — deploy the kitchen sink page. Verify it works before building real content.

**Updated decision:** Keep the project local during the implementation phases. Choose a hosting provider and configure deployment after the remaining phases are complete.

### Phase 7 — Core Components and Pages

**Deliverable:** Homepage fully built with all sections, using hardcoded data. Work index with the empty state. About page. Resume page.

**Decisions to make:** How does the project card empty state look? What's the actual copy?

This is the longest phase. Work in this order: `PageShell` → `NavBar` → `TerminalWindow` → `HeroTerminal` → `FeaturedWork` → remaining sections.

### Phase 8 — Animations and Interactions

**Deliverable:** All essential interactions from Section E implemented. Terminal typing works. Scroll reveals work. Page transitions work. `prefers-reduced-motion` is fully respected.

**Decisions to make:** Verify Motion bundle size after `LazyMotion` setup. If it's above 10KB gzipped, audit imports.

### Phase 9 — Responsive Refinement

**Deliverable:** The site is tested on 320px, 375px, 768px, 1024px, and 1440px viewports. No horizontal scroll. No overlapping text. Mobile drawer works with keyboard and touch.

**Decisions to make:** Does the terminal hero collapse gracefully on mobile? Do project cards stack correctly? Is the nav usable with a thumb?

### Phase 10 — Accessibility, SEO, and Performance

**Deliverable:** Lighthouse scores of 95+ on Performance, Accessibility, Best Practices, and SEO (mobile). Keyboard navigation verified end-to-end. Screen reader test (VoiceOver or NVDA) on the homepage.

**Decisions to make:** Fix whatever Lighthouse flags. Don't argue with it. Then run it again.

**Updated decision:** Defer canonical URLs, `og:url`, the absolute Open Graph image URL, `sitemap.xml`, and `robots.txt` sitemap reference until Phase 11, when the production domain is chosen. Do not publish localhost URLs or guess a domain.

**Verification:** Local mobile Lighthouse scores are Performance 96, Accessibility 100, Best Practices 100, and SEO 100. The measured lab LCP was 2.19s, above the 1.5s project target; recheck it on the deployed site. Keyboard flows and the browser accessibility tree were checked, but a VoiceOver/NVDA pass remains to be done manually.

### Phase 11 — Testing and Deployment

**Deliverable:** Site deployed to production URL. Custom domain configured. Analytics installed and verified. OG image previews correctly on Twitter and LinkedIn.

**Decisions to make:** Domain name. Buy it now if you haven't.

### Phase 12 — Final Polish

**Deliverable:** A `POLISH.md` checklist reviewed: every link works, every image has alt text, every page has a title, the 404 page exists, the favicon exists.

**Decisions to make:** Is the empty-state project section honest and compelling? If not, rewrite it.

---

## I. Risks, Complexity to Avoid, and Common Mistakes

### Major risks

**Risk 1: Overbuilding the shell, underbuilding the work.** This is the most common junior portfolio failure. You spend three weeks on the terminal hero animation and have zero case studies. The hero is a container. The work is the content. Build the work first, polish the shell second.

**Mitigation:** In Phase 7, build the project cards with hardcoded placeholder data _before_ you build the terminal hero. The shell should serve the content, not the other way around.

**Risk 2: Terminal aesthetic becomes gimmick.** If every interaction is a terminal command, the site becomes a puzzle, not a portfolio. Recruiters don't want to learn a CLI to see your projects.

**Mitigation:** Use the terminal as a _visual language_ (mono type, breadcrumb labels, window chrome), not as a _navigation mechanism_. The only interactive terminal is the hero. Everywhere else, normal links and buttons.

**Risk 3: Animation performance degrades on mid-range Android.** A site that runs at 120fps on your M-series MacBook may stutter on a recruiter's Pixel 6a.

**Mitigation:** Test on a real mid-range Android device. Use only `transform` and `opacity`. Use `LazyMotion`. If it doesn't feel smooth, cut animations until it does.

**Risk 4: No projects to show.** You acknowledged this. It's the biggest risk to the portfolio's effectiveness.

**Mitigation:** Start building. The portfolio is not the deliverable — it's the storefront. The projects are the product. Spend 60% of your time building projects, 40% on the portfolio. Ship two small projects this month, even if they're simple. A working todo app with excellent code and a case study is more valuable than a beautiful portfolio with no projects.

### Unnecessary complexity to avoid

- **Dark/light theme toggle.** Pick one. Dark.
- **Contact form with validation.** Use `mailto:`.
- **CMS integration.** MDX files in Git.
- **Authentication or user accounts.** You're not building a SaaS.
- **Internationalization.** You're targeting English-speaking roles. Add i18n only if you're applying in a non-English market.
- **A "blog" with comments, likes, or analytics per post.** Write. Ship. Move on.
- **Component library.** Build your own 8 components.
- **Redux, Zustand, or any state management.** React's `useState` and URL state are sufficient.
- **Testing suite for a static portfolio.** Run Lighthouse. Do a manual keyboard test. That's your QA.

### Common portfolio design mistakes to avoid

- **Burying the work behind animations.** The project cards should be visible within 2 scroll gestures of the hero. Don't make recruiters hunt.
- **A hero that says "Hi, I'm [Name]. I'm a passionate developer."** This tells nothing. The hero should state your lane: "Frontend developer — React, TypeScript, motion."
- **Skill logos in a grid.** Logo grids are meaningless. Everyone lists React. Show _how_ you use it.
- **A "My Process" section.** No recruiter reads "Discover → Define → Design → Develop." Cut it.
- **Generic project descriptions.** "A todo app built with React." No. "A keyboard-first todo app with optimistic updates and offline support, built to learn React Query's mutation patterns."
- **No live links.** Every project card needs a live URL and a repo URL. If the repo is private, say so and link to a demo.
- **A resume PDF with no HTML version.** PDFs are not accessible, not searchable, and not mobile-friendly. Build a `/resume` page and offer a PDF download as a secondary action.

---

## J. Why This Approach Makes the Portfolio Stand Out

Most junior frontend portfolios fail in one of two ways: they're visually generic (purple gradient hero, three cards, "Let's work together!" footer) or they're functionally empty (beautiful animations, no substance). This plan avoids both by treating the portfolio as a demonstration of engineering judgment, not a design showcase.

The Terminal Editorial direction is distinctive because it's a _system_, not a _theme_. Every element — the mono breadcrumb labels, the hairline frames, the strict greyscale, the typed hero — reinforces a single idea: this person builds structured, intentional interfaces. That idea is exactly what hiring managers are evaluating. When a recruiter sees your portfolio, they're not just looking at your projects; they're looking at your _taste_. A disciplined, fast, accessible site with a coherent visual language is the strongest possible signal that you'll bring the same discipline to their codebase.

The tech stack is deliberately minimal because unnecessary dependencies are a junior signal. Every choice — Vite over Next.js, Motion over GSAP, MDX over a CMS, Cloudflare Pages over a complex deployment — is justified by the actual requirements of a personal portfolio. That restraint is itself a portfolio piece. When a hiring manager asks "Why Vite?" in an interview, you'll have a real answer: "Next.js would have added server complexity I didn't need. Vite gives me instant HMR, a static build, and full control over routing."

The animation plan is intentional because motion is the most common place junior portfolios overreach. By limiting animations to functional reveals, a typed hero, and CSS hover states — and by respecting `prefers-reduced-motion` throughout — you demonstrate that you understand motion as a _communication tool_, not a decoration. That's a senior instinct expressed at a junior level.

Finally, the empty-state project section is honest. You don't have public projects yet. The portfolio doesn't pretend otherwise. It says: "First public project shipping soon." That honesty is more impressive to a hiring manager than a fake project. It shows self-awareness and momentum. And it gives you a deadline. The portfolio exists to house the work. Now the work needs to exist.

note: i already downloaded the npm packeges and setups. for this project

### in the end its my social media links..

email: lawandsoran110@gmail.com
github: https://github.com/lawand12-dev
linkedin: https://www.linkedin.com/in/lawand-soran

X: https://x.com/LawandOps

# Phase 4 — Low-Fidelity Wireframes

## Decisions

- **Homepage hero:** Asymmetric, left-aligned identity and actions with the terminal transcript to the right on wide screens. On narrow screens, identity and actions come first, followed by the terminal.
- **Project cards:** Horizontal content/preview split on wide screens; stacked vertically on narrow screens. The content gets the larger share. Until real projects exist, show the honest text-only empty state from `CONTENT-PLAN.md`, not a fake preview.
- **Mobile navigation:** A visible menu button opens a simple navigation drawer. Links remain ordinary links; opening the drawer must not be required to understand the site.
- **Resume link:** Keep it in the planned navigation, but do not show a live link until resume content exists.
- **Header:** Keep the primary navigation visible at the top while scrolling, as specified in the project brief.

## Homepage — `/`

### Wide layout

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ LAWAND SORAN                         Work  Writing  About  Resume*      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ~/intro                                         ┌───────────────────┐  │
│  Lawand Soran                                    │ terminal titlebar │  │
│  Junior frontend developer                      ├───────────────────┤  │
│  building accessible interfaces                 │ $ whoami          │  │
│  with React and TypeScript.                     │ Junior frontend   │  │
│                                                 │ developer — React │  │
│  [ View my work ] [ Read my writing ]            │ · TypeScript      │  │
│                                                 │                   │  │
│                                                 │ $ cat goals.md    │  │
│                                                 │ Seeking a junior  │  │
│                                                 │ frontend role.    │  │
│                                                 └───────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ~/work                                          Selected work          │
│  Projects are where I put new ideas and skills into practice.           │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Projects are in progress                                          │  │
│  │ I haven't published a project yet. When I do, you'll find what it │  │
│  │ does, how I built it, and links to explore it here.               │  │
│  │                                                     View all work →│  │
│  └───────────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ~/about                                          About                 │
│  Curious about how useful things get built.                             │
│  Short bio copy...                                  More about me →     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ~/skills                                         Tools and topics      │
│  A working list of the technologies I'm learning and using.             │
│  languages/   TypeScript · JavaScript · HTML · CSS                      │
│  frameworks/  React · Vite · React Router                               │
│  ...                                                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ~/writing                                        Notes from learning   │
│  No posts published yet...                         Browse writing →     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ~/contact                                        Get in touch          │
│  Looking to discuss a junior frontend opportunity?                       │
│  [ Email Lawand ]                                                        │
│  GitHub                         LinkedIn                         X       │
├─────────────────────────────────────────────────────────────────────────┤
│  Lawand Soran · Junior frontend developer                               │
│  Email · GitHub · LinkedIn · X                                          │
└─────────────────────────────────────────────────────────────────────────┘

* Planned only. Hide Resume until content is available.
```

### Populated project-card structure

This is a layout template for future, real project content; it does not imply that projects have been chosen.

```text
Wide:
┌───────────────────────────────────────────────────────────────────────┐
│ [Project title]                                     [Real preview or  │
│ [Role · Technologies · Status]                       project image]   │
│ [Two or three sentences describing the real project.]                 │
│ [Live project]  [Source code]                                         │
└───────────────────────────────────────────────────────────────────────┘
   60% project information                              40% visual

Narrow:
┌───────────────────────────────────┐
│ [Real preview or project image]   │
│ [Project title]                   │
│ [Role · Technologies · Status]    │
│ [Real project description...]     │
│ [Live project]                    │
│ [Source code]                     │
└───────────────────────────────────┘
```

### Narrow layout

```text
┌───────────────────────────────────┐
│ LAWAND SORAN                  [≡] │
├───────────────────────────────────┤
│ ~/intro                           │
│ Lawand Soran                      │
│ Junior frontend developer         │
│ building accessible interfaces    │
│ with React and TypeScript.        │
│                                   │
│ [ View my work ]                  │
│ [ Read my writing ]               │
│                                   │
│ ┌───────────────────────────────┐ │
│ │ terminal titlebar             │ │
│ │ $ whoami                      │ │
│ │ Junior frontend developer...  │ │
│ │ $ cat goals.md                │ │
│ │ Seeking a junior frontend role│ │
│ └───────────────────────────────┘ │
├───────────────────────────────────┤
│ ~/work                            │
│ Selected work                     │
│ Projects are where I put new      │
│ ideas and skills into practice.  │
│ ┌───────────────────────────────┐ │
│ │ Projects are in progress      │ │
│ │ Empty-state explanation...    │ │
│ │ View all work →               │ │
│ └───────────────────────────────┘ │
├───────────────────────────────────┤
│ ~/about                           │
│ Curious about how useful things  │
│ get built.                       │
│ Short bio copy...                │
│ More about me →                  │
├───────────────────────────────────┤
│ ~/skills                          │
│ Tools and topics                 │
│ languages/                       │
│ TypeScript · JavaScript · HTML   │
│ · CSS                            │
│ frameworks/                      │
│ React · Vite · React Router      │
│ ...                              │
├───────────────────────────────────┤
│ ~/writing                         │
│ Notes from learning and building │
│ No posts published yet...        │
│ Browse writing →                 │
├───────────────────────────────────┤
│ ~/contact                         │
│ Get in touch                     │
│ [ Email Lawand ]                 │
│ GitHub · LinkedIn · X            │
├───────────────────────────────────┤
│ Footer links                     │
└───────────────────────────────────┘
```

### Mobile navigation open state

```text
┌───────────────────────────────────┐
│ LAWAND SORAN                [×]  │
├───────────────────────────────────┤
│ Work                              │
│ Writing                           │
│ About                             │
│ Resume*                           │
└───────────────────────────────────┘

* Include only when the resume page is ready.
```

## Case study — `/work/:slug`

### Wide layout

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ LAWAND SORAN                         Work  Writing  About  Resume*      │
├─────────────────────────────────────────────────────────────────────────┤
│ Work / [Project title]                                                  │
│                                                                         │
│ [Project title]                                                        │
│ [One-sentence description of the project and the problem it addresses.]│
│                                                                         │
│ [ View live project ]  [ View source code ]                              │
│                                                                         │
│ ┌─────────────────────────────────────────────┐ ┌───────────────────┐  │
│ │ Project image or real interface capture    │ │ At a glance       │  │
│ │ with meaningful alternative text.          │ │ Role              │  │
│ │                                             │ │ Technologies      │  │
│ └─────────────────────────────────────────────┘ │ Status            │  │
│                                                 └───────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│ The problem                                                              │
│ Explain the need, constraint, or learning goal that shaped the work.     │
├─────────────────────────────────────────────────────────────────────────┤
│ The approach                                                             │
│ Describe the solution and the decisions behind it.                       │
├─────────────────────────────────────────────────────────────────────────┤
│ Implementation                                                           │
│ Explain the relevant technical choices and trade-offs.                   │
├─────────────────────────────────────────────────────────────────────────┤
│ Outcome and what I learned                                               │
│ State what is complete and what was learned. Use evidence for claims.    │
├─────────────────────────────────────────────────────────────────────────┤
│ Next                                                                     │
│ Optional, only if there is a real next step.                             │
│                                                                         │
│ ← Back to work                                                           │
├─────────────────────────────────────────────────────────────────────────┤
│ Footer links                                                             │
└─────────────────────────────────────────────────────────────────────────┘
```

### Narrow layout

```text
┌───────────────────────────────────┐
│ LAWAND SORAN                  [≡] │
├───────────────────────────────────┤
│ Work / [Project title]            │
│                                   │
│ [Project title]                   │
│ One-sentence project summary...   │
│                                   │
│ [ View live project ]             │
│ [ View source code ]              │
│                                   │
│ ┌───────────────────────────────┐ │
│ │ Real project image or capture │ │
│ └───────────────────────────────┘ │
│                                   │
│ At a glance                       │
│ Role                              │
│ Technologies                      │
│ Status                            │
├───────────────────────────────────┤
│ The problem                       │
│ Readable body copy...             │
├───────────────────────────────────┤
│ The approach                      │
│ Readable body copy...             │
├───────────────────────────────────┤
│ Implementation                    │
│ Readable body copy...             │
├───────────────────────────────────┤
│ Outcome and what I learned        │
│ Readable body copy...             │
├───────────────────────────────────┤
│ Next (when applicable)            │
│                                   │
│ ← Back to work                    │
├───────────────────────────────────┤
│ Footer links                      │
└───────────────────────────────────┘
```

## Behavior and accessibility notes

- Use a semantic header, navigation, main content, sections, headings, and footer. Each page has one H1; case-study section headings follow in order.
- Keep the site header fixed or sticky at the top. Ensure in-page targets are not obscured by it.
- The wordmark is a home link. Navigation, project links, social links, and CTAs are real anchors. The mobile menu control is a real button with an accessible name and expanded state.
- The open mobile navigation can be dismissed with Escape; when dismissed, keyboard focus returns to the menu button. Keep keyboard focus within an open modal-style drawer only if the implementation truly makes it modal; otherwise use a non-modal disclosure and allow normal page navigation.
- Show a distinct `:focus-visible` outline for every link and button. Hover styling is not a substitute for keyboard focus.
- For projects, only display live/source links that exist. If one is not available, omit it or explain its status in text.
- Images are real project material, not decorative code mockups pretending to be screenshots. Provide useful alt text for informative images; use empty alt text for purely decorative imagery.
- The terminal transcript has a complete static text equivalent and remains readable with reduced motion or without animation.
- Do not add loading UI to static content. Any future error or empty state should explain what happened and offer a useful next action.
- The desktop two-column hero is a layout choice, not a fixed viewport-height requirement. Keep the work section within an easy scroll from the introduction.

## Scope note

These are content-first wireframes, not pixel specifications. Exact colors, type sizes, spacing tokens, radii, and component states belong to Phase 5. Case-study fields remain placeholders until a real project exists; no project concept is being selected in this phase.

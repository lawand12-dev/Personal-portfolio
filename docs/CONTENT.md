# Content

## Current content locations

| Content | Current source | Current status |
| --- | --- | --- |
| Name, role statement, home copy, section copy, skills, and social URLs | `src/pages/HomePage.tsx` | Static strings and local arrays in the page component. |
| Biography | `src/pages/AboutPage.tsx` | Static copy. |
| Work index | `src/pages/WorkIndexPage.tsx` | Empty state; no project data or case studies. |
| Writing index | `src/pages/WritingIndexPage.tsx` | Empty state; no posts or MDX renderer. |
| Terminal transcript | `src/components/ui/TerminalWindow.tsx` | Static transcript source animated at runtime. |
| Document metadata and Person JSON-LD | `index.html` | Initial HTML metadata/schema. |
| Route-specific title/description/robots/OG/Twitter fields | `src/hooks/usePageMetadata.ts` and page usage | Updated client-side after route navigation. |
| Existing content plan | `docs/planning/CONTENT-PLAN.md` | Planning document; not imported by application code. |

There is no runtime content directory, project catalog, blog-post schema, loader, frontmatter parser, or resume data. The installed `@mdx-js/react` and `@mdx-js/rollup` packages are not configured in `vite.config.ts` or used by a page.

## Data shapes that exist

The home page contains a `skillGroups` array with group labels and arrays of skill-name strings. It is inferred locally by TypeScript and is not exported as a reusable model. Its effective shape is:

```ts
type SkillGroup = {
  label: string;
  items: string[];
};
```

This describes current home-page data only; it is not a project-wide content schema. Other prose and social-link values are similarly local constants or JSX.

## Projects and articles: current process and future data examples

### Add content to the current UI

1. For a real project listing, replace the honest placeholder in `src/pages/WorkIndexPage.tsx` with supplied project details and working links. Update the featured-work section in `src/pages/HomePage.tsx` if the project should appear there too.
2. For a writing announcement or static copy, update `src/pages/WritingIndexPage.tsx` and, if appropriate, the writing preview in `src/pages/HomePage.tsx`.
3. For longer biography or skill updates, edit `src/pages/AboutPage.tsx` or the corresponding content in `src/pages/HomePage.tsx`.
4. Check each link, copy claim, and responsive layout in the browser. These changes remain hard-coded because there is no content pipeline.

The existing routes do not support `/work/:slug`, `/writing/:slug`, or a resume page. Adding a case study or article page requires implementing its route and renderer as well as its content.

### Future project record (proposal, not an existing type)

If project content is moved into typed data, a record could contain the fields below. This is a design proposal only; do not treat it as a current runtime contract.

```ts
type ProjectRecord = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  technologies: string[];
  status: string;
  liveUrl?: string;
  sourceUrl?: string;
  image?: {
    src: string;
    alt: string;
  };
  sections: Array<{
    heading: string;
    body: string;
  }>;
};
```

### Future MDX frontmatter (proposal, not an existing schema)

No frontmatter is currently parsed or validated, and no `.mdx` posts exist. If an MDX pipeline is added, its metadata schema should be established and validated before publishing content. For example:

```yaml
---
title: "An example title"
description: "A concise summary of the article."
date: "2025-01-15"
tags:
  - React
draft: true
---
```

The example is illustrative, not accepted by the current build. There is currently no specified frontmatter schema, slug convention, date sorting, draft filtering, or MDX component mapping.

## Adding a future blog post

The current site cannot render an MDX post by adding a file alone. A complete future implementation would need to configure MDX in Vite, decide and validate frontmatter, define a content-loading/sorting strategy, add a post route and renderer, update the writing index, and then add the `.mdx` file. The planned `content/blog/` location appears in [the original project plan](./planning/PROJECT-PLAN.md) but does not exist in the current tree.

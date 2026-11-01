---
name: portfolio-management
description: >-
  Manage and update Lawand Soran's personal portfolio content.
  Use when adding or updating articles, project case studies, resume files, skills list, meeting links, or biography.
---

# Portfolio Management Skill

A runbook for adding and maintaining content across Lawand Soran's personal developer portfolio.

## 1. Publishing Articles / Blog Posts

1. **Add Article Record** in `src/data/articles.ts`:
   - Unique URL slug (e.g. `why-smart-ai-models-still-write-like-bots`).
   - Metadata: `title`, `date` (YYYY-MM-DD), `formattedDate`, `readTime` (e.g. `4 min read`), `summary`, `lead`.
   - Body sections: structured as `sections: Array<{ heading?: string, paragraphs: string[] }>`.
   - Optional `editorialNote` at the bottom.
2. **Writing Index** (`src/pages/WritingIndexPage.tsx`):
   - Automatically renders all published posts from `getArticles()`.
   - Ensures each article card displays date, read time, summary, and direct link.
3. **Featured Article on Home** (`src/pages/HomePage.tsx`):
   - The first / latest post in `articles` is automatically highlighted in the `~/writing` section on the homepage.
4. **Sitemap** (`public/sitemap.xml`):
   - Add `<url><loc>https://lawandsoran.site/writing/<slug></loc><lastmod>YYYY-MM-DD</lastmod></url>`.

## 2. Adding Projects / Work Case Studies

1. When projects are ready, replace the placeholder in `src/pages/WorkIndexPage.tsx`.
2. Include:
   - Project name, tagline, description, technologies used.
   - Working live deployment URL and GitHub repository link.
3. Feature the top project in `src/pages/HomePage.tsx` under the `~/work` section.

## 3. Adding Resume

1. Place the compiled resume PDF at `public/Lawand_Soran_Resume.pdf`.
2. In `src/components/layout/NavBar.tsx`, add the resume link.
3. In `src/pages/AboutPage.tsx` or `src/pages/HomePage.tsx`, provide an action button to download/view the PDF.

## 4. Cal.com Meeting & Contact Links

- Meeting URL: `https://cal.com/lawand-soran-45nazw/30min`
- Email: `lawandsoran110@gmail.com`
- Available via:
  - Navbar: `Book a call ↗` in `src/components/layout/NavBar.tsx`.
  - Homepage: Dedicated meeting card in `src/pages/HomePage.tsx` (`~/contact`).
  - About page: Secondary action button in `src/pages/AboutPage.tsx`.


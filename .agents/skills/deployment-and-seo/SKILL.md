---
name: deployment-and-seo
description: >-
  Vercel deployment, SPA routing rewrites, serverless functions, and SEO verification.
  Use when diagnosing 404 errors, configuring Vercel environment variables, updating sitemaps, or auditing production builds.
---

# Deployment & SEO Skill

Procedures for building, deploying, and maintaining production health for Lawand Soran's portfolio on Vercel.

## 1. Single Page Application (SPA) Rewrites

The portfolio is a Vite React client-side SPA with a serverless API function.
To prevent 404 errors on direct links or page refreshes without breaking `/api/contributions`, `vercel.json` in the root must configure:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 2. Serverless Edge GitHub Activity (`/api/contributions`)

- Implemented in `api/contributions.ts`.
- Queries GitHub GraphQL API for the user's 371-day activity.
- Caches responses for 1 hour (`Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`).
- **Security**: Requires secret environment variable `GITHUB_TOKEN` (classic token with `read:user` permission only). Never prefix with `VITE_` or expose in client code.

## 3. SEO & Metadata Standards

- **Canonical URL**: `https://lawandsoran.site`
- **Dynamic Head Metadata**: Handled via `src/hooks/usePageMetadata.ts` (`title`, `description`, Open Graph, Twitter cards, canonical link).
- **Sitemap**: Keep `public/sitemap.xml` updated whenever a new article or page route is published.
- **Robots.txt**: Stored at `public/robots.txt` referencing `https://lawandsoran.site/sitemap.xml`.


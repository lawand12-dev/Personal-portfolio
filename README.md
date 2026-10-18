# Lawand Soran — Portfolio

A personal portfolio for presenting Lawand's frontend work, background, writing, and contact information. The site is a responsive, client-rendered React application built with TypeScript and Vite.

## Run locally

Requires Node.js and npm.

```bash
npm install
npm run dev
```

The development server prints the local URL. To check the production build and lint the source:

```bash
npm run build
npm run lint
```

## GitHub contributions

The home-page graph loads contribution counts through the Vercel function
at `/api/contributions`. It uses GitHub's GraphQL API from the server, so the
GitHub token is never included in the browser bundle.

In the Vercel project settings, add a secret environment variable named
`GITHUB_TOKEN` for the environments you deploy. Create a classic personal
access token with only the `read:user` scope; do not add `repo` scopes. Never
prefix it with `VITE_`, commit it, or paste it into chat. Redeploy after adding
or changing the secret.

To run the site locally with the API function, link the repository to Vercel,
pull its environment variables into the ignored `.env.local` file, then run:

```bash
npx vercel env pull .env.local
npx vercel dev
```

`npm run dev` starts Vite only and does not serve the Vercel function. The
function caches successful GitHub responses for one hour.

## Project status

The home, work, writing, about, and not-found routes are implemented. Work and writing currently show honest empty states: project/article content, detail routes, and an MDX content pipeline have not been added. See the [roadmap](./docs/ROADMAP.md) for known gaps and next steps.

## Documentation

- [Project & Developer Guide](./docs/PROJECT-GUIDE.md) — complete developer manual, how-to guides (adding projects/resume), and next steps.
- [Documentation index](./docs/README.md) — index of implementation guides and planning documents.
- [Architecture](./docs/ARCHITECTURE.md) — stack, routes, and source structure.
- [Design system](./docs/DESIGN-SYSTEM.md) — implemented visual tokens and responsive behavior.
- [Components](./docs/COMPONENTS.md) and [animations](./docs/ANIMATIONS.md) — reusable UI, 3D canvas visualization, and interaction behavior.
- [Roadmap](./docs/ROADMAP.md) — status snapshot, priority tasks, and launch dependencies.
- [Planning documents](./docs/planning/README.md) — brand, content plan, visual direction, wireframes, and original project brief.

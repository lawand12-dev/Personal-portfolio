export default function GitHubActivity() {
  return (
    <div className="portfolio-activity-card mt-6 rounded-card border border-line bg-card p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-meta font-medium tracking-label text-secondary uppercase">
            Active / Currently Building
          </span>
        </div>
        <a
          className="font-mono text-meta text-muted hover:text-primary transition-colors flex items-center gap-1.5"
          href="https://github.com/lawand12-dev"
          rel="noreferrer"
          target="_blank"
        >
          <span>@lawand12-dev on GitHub</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-control border border-line bg-surface p-3">
          <p className="font-mono text-meta text-muted">Focus Area</p>
          <p className="font-mono text-label text-primary font-medium mt-1">
            Full-Stack Systems
          </p>
          <p className="text-meta text-secondary mt-1">
            Building responsive React apps and backend services.
          </p>
        </div>

        <div className="rounded-control border border-line bg-surface p-3">
          <p className="font-mono text-meta text-muted">Architecture</p>
          <p className="font-mono text-label text-primary font-medium mt-1">
            TypeScript &amp; Vite
          </p>
          <p className="text-meta text-secondary mt-1">
            Zero-CLS design systems, Tailwind v4, accessible UI.
          </p>
        </div>

        <div className="rounded-control border border-line bg-surface p-3">
          <p className="font-mono text-meta text-muted">Exploration</p>
          <p className="font-mono text-label text-primary font-medium mt-1">
            Autonomous Workflows
          </p>
          <p className="text-meta text-secondary mt-1">
            AI-assisted programming, Canvas visualizers, tooling.
          </p>
        </div>
      </div>
    </div>
  )
}

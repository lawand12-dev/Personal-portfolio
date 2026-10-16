import usePageMetadata from '../hooks/usePageMetadata'

function WorkIndexPage() {
  usePageMetadata(
    'Work — Lawand Soran',
    'Explore frontend projects by Lawand Soran, built while learning React, TypeScript, and accessible interface development.',
  )

  return (
    <section aria-labelledby="work-title" className="portfolio-page py-16 md:py-24">
      <p className="portfolio-eyebrow font-mono text-meta text-secondary">~/work</p>
      <h1 className="portfolio-page-title mt-4 font-mono text-display font-bold leading-display tracking-display-copy" id="work-title">
        Work
      </h1>
      <p className="portfolio-intro mt-4 max-w-reading text-subheading leading-heading text-secondary">
        Projects where I put frontend ideas into practice.
      </p>
      <div className="portfolio-empty-state portfolio-empty-state--page mt-12 border border-line-strong bg-surface p-6 md:p-8">
        <div>
          <h2 className="portfolio-subheading font-mono text-subheading">
            No published projects yet
          </h2>
          <p className="portfolio-body mt-3 max-w-reading text-secondary">
            I&apos;m still deciding what to build. When a project is ready, this
            page will include a clear overview, the tools I used, and links to
            the live project and source code where available.
          </p>
        </div>
        <a
          className="portfolio-action portfolio-action--secondary"
          href="https://github.com/lawand12-dev"
          rel="noreferrer"
          target="_blank"
        >
          Visit my GitHub
        </a>
      </div>
    </section>
  )
}

export default WorkIndexPage

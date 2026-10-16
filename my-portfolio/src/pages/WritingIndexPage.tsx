import usePageMetadata from '../hooks/usePageMetadata'

function WritingIndexPage() {
  usePageMetadata(
    'Writing — Lawand Soran',
    'Notes by Lawand Soran on frontend development, learning by building, and the ideas behind the work.',
  )

  return (
    <section aria-labelledby="writing-title" className="portfolio-page py-16 md:py-24">
      <p className="portfolio-eyebrow font-mono text-meta text-secondary">~/writing</p>
      <h1 className="portfolio-page-title mt-4 font-mono text-display font-bold leading-display tracking-display-copy" id="writing-title">
        Writing
      </h1>
      <p className="portfolio-intro mt-4 max-w-reading text-subheading leading-heading text-secondary">
        Notes on frontend development, learning by building, and the ideas behind
        the work.
      </p>
      <div className="portfolio-empty-state portfolio-empty-state--page mt-12 border border-line-strong bg-surface p-6 md:p-8">
        <div>
          <h2 className="portfolio-subheading font-mono text-subheading">
            No posts published yet
          </h2>
          <p className="portfolio-body mt-3 max-w-reading text-secondary">
            I haven&apos;t published any posts yet. When I do, you&apos;ll find
            practical notes and reflections from my learning and projects here.
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

export default WritingIndexPage

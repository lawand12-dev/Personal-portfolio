import usePageMetadata from '../hooks/usePageMetadata'

function WritingIndexPage() {
  usePageMetadata(
    'Writing — Lawand Soran — Full-Stack Developer & Founder',
    'Notes by Lawand Soran on engineering, building products, and turning ideas into software.',
  )

  return (
    <section aria-labelledby="writing-title" className="portfolio-page">
      <p className="portfolio-eyebrow">~/writing</p>
      <h1 className="portfolio-page-title mt-4" id="writing-title">
        Writing
      </h1>
      <p className="portfolio-intro mt-4 max-w-reading">
        Notes on engineering, building products, and turning ideas into software.
      </p>
      <div className="portfolio-empty-state portfolio-empty-state--page mt-12">
        <div>
          <h2 className="portfolio-subheading">No posts published yet</h2>
          <p className="portfolio-body mt-3 max-w-reading">
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

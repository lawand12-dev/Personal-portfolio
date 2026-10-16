import { Link } from 'react-router'
import usePageMetadata from '../hooks/usePageMetadata'

function NotFoundPage() {
  usePageMetadata(
    'Page not found — Lawand Soran',
    'The requested page could not be found. Return to Lawand Soran’s portfolio.',
  )

  return (
    <section aria-labelledby="not-found-title" className="portfolio-page py-16 md:py-24">
      <p className="portfolio-eyebrow font-mono text-meta text-secondary">
        404 / Not found
      </p>
      <h1 className="portfolio-page-title mt-4 font-mono text-heading font-bold leading-heading" id="not-found-title">
        This page isn&apos;t here.
      </h1>
      <Link className="portfolio-action portfolio-action--primary mt-8" to="/">
        Return home
      </Link>
    </section>
  )
}

export default NotFoundPage

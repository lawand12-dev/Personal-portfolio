import { Link } from 'react-router'
import usePageMetadata from '../hooks/usePageMetadata'

function NotFoundPage() {
  usePageMetadata(
    'Page not found — Lawand Soran — Full-Stack Developer & Founder',
    'The requested page could not be found. Return to Lawand Soran’s portfolio.',
    'noindex,follow',
  )

  return (
    <section aria-labelledby="not-found-title" className="portfolio-page">
      <p className="portfolio-eyebrow">404 / Not found</p>
      <h1 className="portfolio-section-title mt-4" id="not-found-title">
        This page isn&apos;t here.
      </h1>
      <Link className="portfolio-action portfolio-action--primary mt-8" to="/">
        Return home
      </Link>
    </section>
  )
}

export default NotFoundPage

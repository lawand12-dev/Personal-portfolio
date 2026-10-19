import ActionLink from '../components/ui/ActionLink'
import usePageMetadata from '../hooks/usePageMetadata'

function AboutPage() {
  usePageMetadata(
    'About — Lawand Soran — Frontend Developer',
    'Learn about Lawand Soran, a self-directed learner interested in frontend development, technology, and business.',
  )

  return (
    <article aria-labelledby="about-title" className="portfolio-page">
      <p className="portfolio-eyebrow">~/about</p>
      <h1 className="portfolio-page-title mt-4" id="about-title">
        About Lawand
      </h1>
      <div className="portfolio-prose mt-8 max-w-reading">
        <p className="portfolio-about-lead">
          I&apos;m a self-directed learner interested in technology, business,
          and the process of turning ideas into reality.
        </p>
        <p>
          I started exploring software development because I wanted to
          understand how digital products work and how to build my own. That
          curiosity has grown into an interest in frontend development,
          AI-powered tools, and the ideas that connect technology and business.
        </p>
        <p>
          I&apos;m developing my frontend skills and learning by building,
          experimenting, and understanding the systems behind the things I
          make. Outside of technology, I&apos;m interested in economics,
          business strategy, and startups.
        </p>
        <p>
          My long-term goal is to combine these interests to build useful
          products. For now, I&apos;m working toward that one step at a time.
        </p>
      </div>
      <div className="portfolio-section-action">
        <ActionLink to="/work" variant="primary">
          View my work
        </ActionLink>
      </div>
    </article>
  )
}

export default AboutPage

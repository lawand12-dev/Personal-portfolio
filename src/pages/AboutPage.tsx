import ActionLink from '../components/ui/ActionLink'
import TerminalPortrait from '../components/ui/TerminalPortrait'
import usePageMetadata from '../hooks/usePageMetadata'

function AboutPage() {
  usePageMetadata(
    'About — Lawand Soran — Full-Stack Developer & Founder',
    'Learn about Lawand Soran, a full-stack developer and founder turning ideas into products.',
  )

  return (
    <article aria-labelledby="about-title" className="portfolio-page">
      <p className="portfolio-eyebrow">~/about</p>
      <h1 className="portfolio-page-title mt-4" id="about-title">
        About Lawand
      </h1>

      <div className="mt-8 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="portfolio-prose max-w-reading">
          <p className="portfolio-about-lead">
            I&apos;m a self-directed full-stack developer and founder passionate about
            technology, business, and turning ideas into tangible products.
          </p>
          <p>
            I started exploring software development because I wanted to understand
            how digital products work and how to build my own from scratch. That
            curiosity has grown into full-stack engineering across modern frontend and
            backend systems, exploring AI-powered workflows, and building real products.
          </p>
          <p>
            I learn by building, shipping, and understanding the complete architecture
            behind software. Beyond code, I am deeply interested in product design,
            economics, business strategy, and startups.
          </p>
          <p>
            My focus is on creating fast, accessible, and practical products that solve
            real problems.
          </p>

          <div className="portfolio-section-action mt-8 flex flex-wrap items-center gap-4">
            <ActionLink to="/work" variant="primary">
              View my work
            </ActionLink>
            <a
              className="portfolio-action portfolio-action--secondary"
              href="https://cal.com/lawand-soran-45nazw/30min"
              rel="noreferrer"
              target="_blank"
            >
              Book a 30-min call <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto lg:max-w-none">
          <TerminalPortrait />
        </div>
      </div>
    </article>
  )
}

export default AboutPage

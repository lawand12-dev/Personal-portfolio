import type { KeyboardEvent, MouseEvent } from 'react'
import TerminalWindow from '../components/ui/TerminalWindow'
import usePageMetadata from '../hooks/usePageMetadata'
import './KitchenSinkPage.css'

const colorSamples = [
  { name: 'Page', token: 'var(--color-bg-page)' },
  { name: 'Surface', token: 'var(--color-bg-surface)' },
  { name: 'Card', token: 'var(--color-bg-card)' },
  { name: 'Raised', token: 'var(--color-bg-raised)' },
  { name: 'Primary text', token: 'var(--color-text-primary)' },
  { name: 'Secondary text', token: 'var(--color-text-secondary)' },
  { name: 'Muted text', token: 'var(--color-text-muted)' },
]

const spacingSamples = [
  { name: 'space-1', token: 'var(--space-1)' },
  { name: 'space-2', token: 'var(--space-2)' },
  { name: 'space-3', token: 'var(--space-3)' },
  { name: 'space-4', token: 'var(--space-4)' },
  { name: 'space-6', token: 'var(--space-6)' },
  { name: 'space-8', token: 'var(--space-8)' },
  { name: 'space-12', token: 'var(--space-12)' },
  { name: 'space-16', token: 'var(--space-16)' },
]

function KitchenSinkPage() {
  usePageMetadata(
    'Design system — Lawand Soran',
    'An internal showcase of the portfolio design tokens and reusable components.',
    'noindex,nofollow',
  )

  function handleMobileNavigationKeyDown(
    event: KeyboardEvent<HTMLDetailsElement>,
  ) {
    if (event.key === 'Escape' && event.currentTarget.open) {
      event.currentTarget.open = false
      event.currentTarget.querySelector('summary')?.focus()
    }
  }

  function closeMobileNavigation(event: MouseEvent<HTMLAnchorElement>) {
    const navigation = event.currentTarget.closest('details')
    if (navigation) navigation.open = false
  }

  return (
    <div className="showcase" id="top">
      <header className="showcase-header">
        <a className="wordmark" href="#top" aria-label="Lawand Soran design system, top">
          LS<span aria-hidden="true">/</span>
        </a>

        <nav aria-label="Design system sections" className="desktop-navigation">
          <a href="#type-and-color">Type &amp; color</a>
          <a href="#controls">Controls</a>
          <a href="#surfaces">Surfaces</a>
          <a href="#terminal">Terminal</a>
        </nav>

        <details
          className="mobile-navigation"
          onKeyDown={handleMobileNavigationKeyDown}
        >
          <summary>Menu</summary>
          <nav aria-label="Design system sections">
            <a href="#type-and-color" onClick={closeMobileNavigation}>Type &amp; color</a>
            <a href="#controls" onClick={closeMobileNavigation}>Controls</a>
            <a href="#surfaces" onClick={closeMobileNavigation}>Surfaces</a>
            <a href="#terminal" onClick={closeMobileNavigation}>Terminal</a>
          </nav>
        </details>
      </header>

      <main id="main-content">
        <section className="showcase-intro" aria-labelledby="page-title">
          <p className="portfolio-eyebrow">Design system / 01</p>
          <h1 className="portfolio-page-title mt-4" id="page-title">Terminal Editorial</h1>
          <p className="intro-copy">
            A greyscale system for a developer portfolio: monospaced structure,
            editorial breathing room, and direct paths to the work.
          </p>
          <p className="showcase-note">
            Component preview only. This is not the portfolio homepage.
          </p>
        </section>

        <section className="showcase-section" id="type-and-color" aria-labelledby="type-color-title">
          <div className="section-heading">
            <p className="portfolio-eyebrow">01 / foundations</p>
            <h2 className="portfolio-section-title" id="type-color-title">Type and color</h2>
          </div>

          <div className="type-specimen">
            <p className="portfolio-eyebrow">Display / JetBrains Mono Bold</p>
            <p className="portfolio-page-title">Lawand Soran</p>
            <p className="portfolio-subheading">Building useful interfaces, one project at a time.</p>
            <p className="portfolio-body">
              Inter keeps longer descriptions comfortable to read. Monospaced
              type stays focused on section labels, interface metadata, and
              code-like details.
            </p>
            <p className="portfolio-editorial">
              <span>Editorial emphasis uses a quiet serif italic.</span>
            </p>
            <p className="portfolio-eyebrow">METADATA / FRONTEND DEVELOPMENT / 2026</p>
          </div>

          <div className="chip-sample">
            <p className="portfolio-eyebrow">Chips / technology labels</p>
            <ul className="chip-list" aria-label="Technology label examples">
              <li>React</li>
              <li>TypeScript</li>
              <li>HTML</li>
              <li>CSS</li>
            </ul>
          </div>

          <ul className="swatch-grid" aria-label="Color tokens">
            {colorSamples.map(({ name, token }) => (
              <li className="swatch" key={name}>
                <span className="swatch-chip" style={{ backgroundColor: token }} aria-hidden="true" />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="showcase-section" id="controls" aria-labelledby="controls-title">
          <div className="section-heading">
            <p className="portfolio-eyebrow">02 / interaction</p>
            <h2 className="portfolio-section-title" id="controls-title">Controls and states</h2>
          </div>

          <div className="component-sample">
            <div className="sample-copy">
              <h3 className="portfolio-subheading">Primary and secondary actions</h3>
              <p className="portfolio-body max-w-reading">
                Use a filled action once for the main next step. Keep the
                alternative outlined. Both samples below lead somewhere real.
              </p>
            </div>
            <div className="action-row">
              <a className="portfolio-action portfolio-action--primary" href="mailto:lawandsoran110@gmail.com">
                Email Lawand
              </a>
              <a
                className="portfolio-action portfolio-action--secondary"
                href="https://github.com/lawand12-dev"
                target="_blank"
                rel="noreferrer"
              >
                Open GitHub profile
              </a>
            </div>
            <p className="state-caption">
              Hover, press, and keyboard-focus these links to preview their states.
            </p>
          </div>

          <div className="state-grid">
            <div className="state-sample">
              <p className="portfolio-eyebrow">Disabled</p>
              <button className="portfolio-action" type="button" disabled>
                Resume unavailable
              </button>
              <p className="state-caption">No resume file has been supplied yet.</p>
            </div>
            <div className="state-sample">
              <p className="portfolio-eyebrow">Loading example</p>
              <button className="portfolio-action portfolio-action--secondary" type="button" disabled aria-busy="true">
                <span className="loading-indicator" aria-hidden="true" />
                Preparing preview
              </button>
              <p className="state-caption">
                A real action should show this only while work is in progress.
              </p>
            </div>
          </div>

          <div className="navigation-sample">
            <p className="portfolio-eyebrow">Responsive navigation</p>
            <p className="portfolio-body max-w-reading">Wide screens show the section links. On narrow screens, open the Menu disclosure.</p>
          </div>
        </section>

        <section className="showcase-section" id="surfaces" aria-labelledby="surfaces-title">
          <div className="section-heading">
            <p className="portfolio-eyebrow">03 / layout</p>
            <h2 className="portfolio-section-title" id="surfaces-title">Surfaces and spacing</h2>
          </div>

          <div className="portfolio-empty-state mt-8">
            <div>
              <p className="portfolio-eyebrow">~/work</p>
              <h3 className="portfolio-subheading">No published projects yet</h3>
              <p className="portfolio-body mt-3">
                I'm still deciding what to build. When a project is ready, this
                page will include an overview, the tools I used, and links to
                explore it.
              </p>
            </div>
            <a className="portfolio-text-link" href="https://github.com/lawand12-dev" target="_blank" rel="noreferrer">
              Visit my GitHub <span aria-hidden="true">→</span>
            </a>
          </div>

          <ul className="spacing-samples" aria-label="Spacing scale">
            {spacingSamples.map(({ name, token }) => (
              <li className="spacing-sample" key={name}>
                <span>{name}</span>
                <span className="spacing-bar" style={{ width: token }} aria-hidden="true" />
              </li>
            ))}
          </ul>
        </section>

        <section className="showcase-section terminal-section" id="terminal" aria-labelledby="terminal-title">
          <div className="section-heading">
            <p className="portfolio-eyebrow">04 / signature component</p>
            <h2 className="portfolio-section-title" id="terminal-title">Terminal window</h2>
          </div>

          <TerminalWindow />
          <p className="state-caption">
            The real component is shown here. Its complete transcript is
            available to screen readers, and reduced motion shows it immediately.
          </p>
        </section>
      </main>

      <footer className="showcase-footer">
        <span>Lawand Soran / Design system preview</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  )
}

export default KitchenSinkPage

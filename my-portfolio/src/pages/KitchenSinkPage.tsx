import type { KeyboardEvent, MouseEvent } from 'react'
import { designTokens } from '../DesignTokens'
import usePageMetadata from '../hooks/usePageMetadata'
import './KitchenSinkPage.css'

const colorSamples = [
  { name: 'Page', token: designTokens.color.page },
  { name: 'Surface', token: designTokens.color.surface },
  { name: 'Card', token: designTokens.color.card },
  { name: 'Raised', token: designTokens.color.raised },
  { name: 'Primary text', token: designTokens.color.text },
  { name: 'Secondary text', token: designTokens.color.textSecondary },
  { name: 'Muted text', token: designTokens.color.textMuted },
]

const spacingSamples = [
  { name: 'space-1', token: designTokens.space[1] },
  { name: 'space-2', token: designTokens.space[2] },
  { name: 'space-3', token: designTokens.space[3] },
  { name: 'space-4', token: designTokens.space[4] },
  { name: 'space-6', token: designTokens.space[6] },
  { name: 'space-8', token: designTokens.space[8] },
  { name: 'space-12', token: designTokens.space[12] },
  { name: 'space-16', token: designTokens.space[16] },
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
          <p className="eyebrow">Design system / 01</p>
          <h1 id="page-title">Terminal Editorial</h1>
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
            <p className="eyebrow">01 / foundations</p>
            <h2 id="type-color-title">Type and color</h2>
          </div>

          <div className="type-specimen">
            <p className="eyebrow">Display / JetBrains Mono Bold</p>
            <p className="type-display">Lawand Soran</p>
            <p className="type-heading">Building useful interfaces, one project at a time.</p>
            <p className="type-body">
              Inter keeps longer descriptions comfortable to read. Monospaced
              type stays focused on section labels, interface metadata, and
              code-like details.
            </p>
            <p className="type-editorial">
              <span>Editorial emphasis uses a quiet serif italic.</span>
            </p>
            <p className="type-meta">METADATA / FRONTEND DEVELOPMENT / 2026</p>
          </div>

          <div className="chip-sample">
            <p className="eyebrow">Chips / technology labels</p>
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
            <p className="eyebrow">02 / interaction</p>
            <h2 id="controls-title">Controls and states</h2>
          </div>

          <div className="component-sample">
            <div className="sample-copy">
              <h3>Primary and secondary actions</h3>
              <p>
                Use a filled action once for the main next step. Keep the
                alternative outlined. Both samples below lead somewhere real.
              </p>
            </div>
            <div className="action-row">
              <a className="button button-primary" href="mailto:lawandsoran110@gmail.com">
                Email Lawand
              </a>
              <a
                className="button button-secondary"
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
              <p className="eyebrow">Disabled</p>
              <button className="button button-disabled" type="button" disabled>
                Resume unavailable
              </button>
              <p className="state-caption">No resume file has been supplied yet.</p>
            </div>
            <div className="state-sample">
              <p className="eyebrow">Loading example</p>
              <button className="button button-secondary" type="button" disabled aria-busy="true">
                <span className="loading-indicator" aria-hidden="true" />
                Preparing preview
              </button>
              <p className="state-caption">
                A real action should show this only while work is in progress.
              </p>
            </div>
          </div>

          <div className="navigation-sample">
            <p className="eyebrow">Responsive navigation</p>
            <p>Wide screens show the section links. On narrow screens, open the Menu disclosure.</p>
          </div>
        </section>

        <section className="showcase-section" id="surfaces" aria-labelledby="surfaces-title">
          <div className="section-heading">
            <p className="eyebrow">03 / layout</p>
            <h2 id="surfaces-title">Surfaces and spacing</h2>
          </div>

          <div className="project-empty-state">
            <div>
              <p className="eyebrow">~/work</p>
              <h3>No published projects yet</h3>
              <p>
                I'm still deciding what to build. When a project is ready, this
                page will include an overview, the tools I used, and links to
                explore it.
              </p>
            </div>
            <a className="text-link" href="https://github.com/lawand12-dev" target="_blank" rel="noreferrer">
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
            <p className="eyebrow">04 / signature component</p>
            <h2 id="terminal-title">Terminal window</h2>
          </div>

          <div className="terminal-window">
            <div className="terminal-titlebar">
              <span className="terminal-label">~/intro</span>
              <span className="terminal-status">static preview</span>
            </div>
            <div className="terminal-content">
              <p><span className="terminal-prompt">$</span> whoami</p>
              <p className="terminal-output">Junior frontend developer — React · TypeScript</p>
              <p><span className="terminal-prompt">$</span> cat goals.md</p>
              <p className="terminal-output">Seeking a junior frontend role. Learning by building.</p>
            </div>
          </div>
          <p className="state-caption">
            Static text remains available without animation or scripting.
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

import { useRef, useState, type KeyboardEvent } from 'react'
import { Link, NavLink } from 'react-router'

const links = [
  { label: 'Work', to: '/work' },
  { label: 'Writing', to: '/writing' },
  { label: 'About', to: '/about' },
]

function NavigationLinks({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean
  onNavigate?: () => void
}) {
  return (
    <>
      {links.map(({ label, to }) => (
        <NavLink
          className="portfolio-nav-link"
          end
          key={to}
          onClick={mobile ? onNavigate : undefined}
          to={to}
        >
          {label}
        </NavLink>
      ))}
    </>
  )
}

function NavBar() {
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  function handleMobileNavigationKeyDown(
    event: KeyboardEvent<HTMLElement>,
  ) {
    if (event.key === 'Escape' && mobileNavigationOpen) {
      setMobileNavigationOpen(false)
      menuButtonRef.current?.focus()
    }
  }

  return (
    <header
      className="portfolio-header sticky top-0 z-20 border-b border-line bg-page"
      onKeyDown={handleMobileNavigationKeyDown}
    >
      <div className="portfolio-container portfolio-header-inner">
        <div className="portfolio-header-row flex min-h-16 items-center justify-between gap-6">
          <Link
            aria-label="Lawand Soran, home"
            className="portfolio-wordmark font-mono text-label font-bold tracking-label-copy"
            to="/"
          >
            Lawand Soran<span aria-hidden="true">/</span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="portfolio-desktop-nav flex items-center gap-6"
          >
            <NavigationLinks />
          </nav>

          <button
            aria-controls="mobile-primary-navigation"
            aria-expanded={mobileNavigationOpen}
            className="portfolio-menu-trigger"
            onClick={() => setMobileNavigationOpen((open) => !open)}
            ref={menuButtonRef}
            type="button"
          >
            Menu
          </button>
        </div>
        <nav
          aria-label="Primary navigation"
          className="portfolio-mobile-links"
          hidden={!mobileNavigationOpen}
          id="mobile-primary-navigation"
        >
          <NavigationLinks
            mobile
            onNavigate={() => setMobileNavigationOpen(false)}
          />
        </nav>
      </div>
    </header>
  )
}

export default NavBar

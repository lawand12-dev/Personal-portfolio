import { Collapsible } from '@base-ui/react/collapsible'
import { useRef, useState, type KeyboardEvent } from 'react'
import { Link, NavLink } from 'react-router'
import logo from '../../assets/LS_logo.svg'

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
      <Collapsible.Root
        className="portfolio-container portfolio-header-inner"
        onOpenChange={setMobileNavigationOpen}
        open={mobileNavigationOpen}
      >
        <div className="portfolio-header-row flex min-h-16 items-center justify-between gap-6">
          <Link
            aria-label="Lawand Soran, home"
            className="portfolio-wordmark font-mono text-label font-bold tracking-label-copy"
            to="/"
          >
            <img
              alt=""
              aria-hidden="true"
              className="portfolio-brand-mark"
              src={logo}
            />
            <span className="portfolio-wordmark-name">Lawand Soran</span>
            <span aria-hidden="true">/</span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="portfolio-desktop-nav flex items-center gap-6"
          >
            <NavigationLinks />
          </nav>

          <Collapsible.Trigger
            aria-controls="mobile-primary-navigation"
            className="portfolio-menu-trigger"
            ref={menuButtonRef}
            type="button"
          >
            Menu
          </Collapsible.Trigger>
        </div>

        <Collapsible.Panel
          className="portfolio-mobile-links"
          id="mobile-primary-navigation"
        >
          <nav aria-label="Primary navigation">
            <NavigationLinks
              mobile
              onNavigate={() => setMobileNavigationOpen(false)}
            />
          </nav>
        </Collapsible.Panel>
      </Collapsible.Root>
    </header>
  )
}

export default NavBar

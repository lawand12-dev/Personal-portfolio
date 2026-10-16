import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import Footer from './Footer'
import NavBar from './NavBar'

function PageShell() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname
      mainRef.current?.focus()
    }
  }, [pathname])

  return (
    <div className="portfolio-site min-h-screen bg-page text-primary">
      <a className="portfolio-skip-link" href="#main-content">
        Skip to content
      </a>
      <NavBar />
      <main
        className="portfolio-container"
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PageShell

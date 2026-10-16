import { useEffect, useRef } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { Outlet, useLocation } from 'react-router'
import Footer from './Footer'
import NavBar from './NavBar'

function PageShell() {
  const { pathname } = useLocation()
  const shouldReduceMotion = useReducedMotion()
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
        <AnimatePresence initial={false} mode="wait">
          <m.div
            animate={{ opacity: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : {
                    opacity: 0,
                    y: -6,
                    transition: {
                      duration: 0.15,
                      ease: [0.5, 0, 0.75, 0],
                    },
                  }
            }
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 8 }
            }
            key={pathname}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.24, ease: [0.25, 1, 0.5, 1] }
            }
          >
            <Outlet />
          </m.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default PageShell

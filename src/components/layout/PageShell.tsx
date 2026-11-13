import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { useLocation, useOutlet } from 'react-router'
import CommandPalette from '../ui/CommandPalette'
import Footer from './Footer'
import NavBar from './NavBar'

/**
 * Freezes the route outlet at the moment of mount.
 * When the route changes, AnimatePresence keeps the exiting container mounted;
 * FrozenOutlet prevents that exiting container from displaying the incoming route.
 */
function FrozenOutlet() {
  const currentOutlet = useOutlet()
  const [frozenOutlet] = useState(currentOutlet)
  return <>{frozenOutlet}</>
}

function PageShell() {
  const { pathname, hash } = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const mainRef = useRef<HTMLElement>(null)
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname
      if (!hash) {
        mainRef.current?.focus({ preventScroll: true })
      }
    }
  }, [pathname, hash])

  useEffect(() => {
    if (!hash) return
    const targetId = hash.slice(1)
    let frameId = 0
    let attempts = 0

    // Retry across frames so lazy-loaded pages and AnimatePresence exits can mount the target.
    const scrollToTarget = () => {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({
          behavior: shouldReduceMotion ? 'auto' : 'smooth',
          block: 'start',
        })
        return
      }
      if (attempts < 40) {
        attempts += 1
        frameId = window.requestAnimationFrame(scrollToTarget)
      }
    }

    frameId = window.requestAnimationFrame(scrollToTarget)
    return () => window.cancelAnimationFrame(frameId)
  }, [pathname, hash, shouldReduceMotion])

  return (
    <div className="portfolio-site min-h-screen bg-page text-primary">
      <a className="portfolio-skip-link" href="#main-content">
        Skip to content
      </a>
      <NavBar />
      <CommandPalette />
      <main
        className="portfolio-container"
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
      >
        <AnimatePresence
          initial={true}
          mode="wait"
          onExitComplete={() => {
            if (!hash) {
              window.scrollTo({ top: 0, behavior: 'instant' })
            }
          }}
        >
          <m.div
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: -10,
                    filter: 'blur(4px)',
                    transition: {
                      duration: 0.22,
                      ease: [0.4, 0, 1, 1],
                    },
                  }
            }
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 20, filter: 'blur(6px)' }
            }
            key={pathname}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }
            }
          >
            <FrozenOutlet />
          </m.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default PageShell

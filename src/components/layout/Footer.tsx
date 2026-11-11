import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import logo from '../../assets/LS_logo.svg'
import { isSoundEnabled, toggleSound } from '../../utils/sound'
import SocialLinks from './SocialLinks'

function Footer() {
  const [soundOn, setSoundOn] = useState(() => isSoundEnabled())

  useEffect(() => {
    function handleSoundChange(e: Event) {
      const custom = e as CustomEvent<{ enabled: boolean }>
      setSoundOn(custom.detail?.enabled ?? isSoundEnabled())
    }
    window.addEventListener('portfolio-sound-change', handleSoundChange)
    return () =>
      window.removeEventListener('portfolio-sound-change', handleSoundChange)
  }, [])

  return (
    <footer className="portfolio-footer border-t border-line">
      <div className="portfolio-container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <Link
            aria-label="Lawand Soran, home"
            className="portfolio-footer-name font-mono text-label"
            to="/"
          >
            <img
              alt=""
              aria-hidden="true"
              className="portfolio-brand-mark"
              src={logo}
            />
            Lawand Soran
          </Link>
          <p className="m-0 mt-1 max-w-reading text-label text-secondary">
            Full-stack developer and founder building products and turning
            ideas into reality.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            aria-label="Toggle mechanical sound effects"
            className="cursor-pointer rounded-chip border border-line px-2.5 py-1 font-mono text-meta text-muted transition-colors hover:text-primary"
            onClick={() => setSoundOn(toggleSound())}
            type="button"
          >
            <span>Sound: </span>
            <span className={soundOn ? 'font-bold text-primary' : 'text-muted'}>
              {soundOn ? 'ON' : 'OFF'}
            </span>
          </button>
          <SocialLinks />
        </div>
      </div>
    </footer>
  )
}

export default Footer

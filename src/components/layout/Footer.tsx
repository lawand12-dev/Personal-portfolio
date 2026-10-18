import { Link } from 'react-router'
import logo from '../../assets/LS_logo.svg'
import SocialLinks from './SocialLinks'

function Footer() {
  return (
    <footer className="portfolio-footer border-t border-line">
      <div className="portfolio-container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <div>
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
            Frontend developer building accessible interfaces with React
            and TypeScript.
          </p>
        </div>
        <SocialLinks />
      </div>
    </footer>
  )
}

export default Footer

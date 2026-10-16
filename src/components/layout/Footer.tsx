import { Link } from 'react-router'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/lawand12-dev' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lawand-soran' },
  { label: 'X', href: 'https://x.com/LawandOps' },
]

function Footer() {
  return (
    <footer className="portfolio-footer border-t border-line">
      <div className="portfolio-container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Link className="portfolio-footer-name font-mono text-label" to="/">
            Lawand Soran
          </Link>
          <p className="m-0 mt-1 max-w-reading text-label text-secondary">
            Junior frontend developer building accessible interfaces with React
            and TypeScript.
          </p>
        </div>
        <nav aria-label="Contact and social links" className="portfolio-footer-links flex flex-wrap gap-4">
          <a href="mailto:lawandsoran110@gmail.com">Email</a>
          {socialLinks.map(({ label, href }) => (
            <a href={href} key={label} rel="noreferrer" target="_blank">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default Footer

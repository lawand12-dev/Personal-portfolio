import githubIcon from '../../assets/GitHub.svg'
import gmailIcon from '../../assets/Gmail.svg'
import linkedinLogo from '../../assets/Linkedin.svg'
import xIcon from '../../assets/X.svg'

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/lawand12-dev',
    icon: githubIcon,
    className: 'portfolio-social-icon--github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lawand-soran',
    icon: linkedinLogo,
    className: 'portfolio-social-icon--linkedin',
  },
  {
    label: 'X',
    href: 'https://x.com/LawandOps',
    icon: xIcon,
    className: 'portfolio-social-icon--x',
  },
]

function SocialLinks() {
  return (
    <nav
      aria-label="Contact and social profiles"
      className="portfolio-social-links flex flex-wrap gap-4"
    >
      <a
        aria-label="Gmail"
        href="mailto:lawandsoran110@gmail.com"
        rel="noreferrer"
      >
        <img
          alt=""
          aria-hidden="true"
          className="portfolio-social-icon"
          src={gmailIcon}
        />
      </a>
      {socialLinks.map(({ className, href, icon, label }) => (
        <a
          aria-label={label}
          href={href}
          key={label}
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt=""
            aria-hidden="true"
            className={`portfolio-social-icon ${className}`}
            src={icon}
          />
        </a>
      ))}
    </nav>
  )
}

export default SocialLinks

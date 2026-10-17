import SocialLinks from '../components/layout/SocialLinks'
import ActionLink from '../components/ui/ActionLink'
import Reveal from '../components/ui/Reveal'
import TerminalWindow from '../components/ui/TerminalWindow'
import usePageMetadata from '../hooks/usePageMetadata'

const skillGroups = [
  {
    label: 'languages/',
    items: ['TypeScript', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    label: 'frameworks/',
    items: ['React', 'Vite', 'React Router'],
  },
  {
    label: 'styling/',
    items: ['Tailwind CSS', 'shadcn/ui', 'Base UI'],
  },
  {
    label: 'animation/',
    items: ['Motion for React', 'CSS transitions'],
  },
  {
    label: 'tools/',
    items: ['Git', 'GitHub', 'GitHub Actions', 'Figma'],
  },
  {
    label: 'learning/',
    items: ['Next.js', 'Testing Library', 'Playwright'],
  },
]

function HomePage() {
  usePageMetadata(
    'Lawand Soran — Junior Frontend Developer',
    'Lawand Soran is a junior frontend developer building accessible interfaces with React and TypeScript. Explore his work and get in touch.',
  )

  return (
    <>
      <section
        aria-labelledby="home-title"
        className="portfolio-hero grid grid-cols-1 items-center gap-12 py-24 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="portfolio-hero-copy">
          <p className="portfolio-eyebrow font-mono text-meta text-secondary">
            ~/intro
          </p>
          <h1
            className="portfolio-page-title mt-4 max-w-reading font-mono text-display font-bold leading-display tracking-display-copy"
            id="home-title"
          >
            Lawand Soran
          </h1>
          <p className="portfolio-role mt-4 max-w-reading text-subheading leading-heading text-secondary">
            Junior frontend developer building accessible interfaces with React
            and TypeScript.
          </p>
          <div className="portfolio-actions mt-8 flex flex-wrap gap-3">
            <ActionLink to="/work" variant="primary">
              View my work
            </ActionLink>
            <ActionLink to="/writing">Read my writing</ActionLink>
          </div>
        </div>
        <TerminalWindow />
      </section>

      <Reveal>
        <section
          aria-labelledby="work-heading"
          className="portfolio-section border-t border-line py-16 md:py-24"
          id="work"
        >
          <SectionHeading
            label="~/work"
            title="Selected work"
            id="work-heading"
          >
            Projects are where I put new ideas and skills into practice.
          </SectionHeading>
          <div className="portfolio-empty-state mt-8 border border-line-strong bg-surface p-6 md:p-8">
            <div>
              <h3 className="portfolio-subheading font-mono text-subheading">
                Projects are in progress
              </h3>
              <p className="portfolio-body mt-3 max-w-reading text-secondary">
                I haven&apos;t published a project yet. When I do, you&apos;ll
                find what it does, how I built it, and links to explore it here.
              </p>
            </div>
            <ActionLink to="/work">View all work</ActionLink>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section
          aria-labelledby="about-heading"
          className="portfolio-section border-t border-line py-16 md:py-24"
          id="about"
        >
          <SectionHeading
            id="about-heading"
            label="~/about"
            title="Curious about how useful things get built."
          >
            I&apos;m a self-directed learner interested in technology, business,
            and turning ideas into reality. I&apos;m developing my frontend
            skills, exploring AI-powered tools, and learning by building.
            I&apos;m also interested in economics, startups, and how technology
            changes the way people work and live.
          </SectionHeading>
          <div className="portfolio-section-action">
            <ActionLink to="/about">More about me</ActionLink>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section
          aria-labelledby="skills-heading"
          className="portfolio-section border-t border-line py-16 md:py-24"
          id="skills"
        >
          <SectionHeading
            id="skills-heading"
            label="~/skills"
            title="Tools and topics"
          >
            A working list of the technologies I&apos;m learning and using.
          </SectionHeading>
          <dl className="portfolio-skills mt-8">
            {skillGroups.map(({ label, items }) => (
              <div className="portfolio-skill-row" key={label}>
                <dt className="font-mono text-label text-secondary">{label}</dt>
                <dd>{items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      <Reveal>
        <section
          aria-labelledby="writing-heading"
          className="portfolio-section border-t border-line py-16 md:py-24"
          id="writing"
        >
          <SectionHeading
            id="writing-heading"
            label="~/writing"
            title="Notes from learning and building"
          >
            I haven&apos;t published any writing yet. I plan to share notes
            about what I&apos;m learning in frontend development and the choices
            I make while building.
          </SectionHeading>
          <div className="portfolio-section-action">
            <ActionLink to="/writing">Browse writing</ActionLink>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section
          aria-labelledby="contact-heading"
          className="portfolio-section portfolio-contact border-t border-line py-16 md:py-24"
          id="contact"
        >
          <SectionHeading
            id="contact-heading"
            label="~/contact"
            title="Get in touch"
          >
            Looking to discuss a junior frontend opportunity? Email is the best
            way to reach me.
          </SectionHeading>
          <div className="portfolio-contact-actions mt-8 flex flex-wrap items-center gap-6">
            <a
              className="portfolio-action portfolio-action--primary"
              href="mailto:lawandsoran110@gmail.com"
            >
              Email Lawand
            </a>
            <SocialLinks />
          </div>
        </section>
      </Reveal>
    </>
  )
}

function SectionHeading({
  children,
  id,
  label,
  title,
}: {
  children: string
  id: string
  label: string
  title: string
}) {
  return (
    <div className="portfolio-section-heading">
      <p className="portfolio-eyebrow font-mono text-meta text-secondary">
        {label}
      </p>
      <div>
        <h2 className="portfolio-section-title font-mono text-heading leading-heading" id={id}>
          {title}
        </h2>
        <p className="portfolio-body mt-4 max-w-reading text-secondary">
          {children}
        </p>
      </div>
    </div>
  )
}

export default HomePage

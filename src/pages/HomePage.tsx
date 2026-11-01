import { Link } from "react-router";
import SocialLinks from "../components/layout/SocialLinks";
import ActionLink from "../components/ui/ActionLink";
import GitHubContributions from "../components/ui/GitHubContributions";
import Reveal from "../components/ui/Reveal";
import TerminalWindow from "../components/ui/TerminalWindow";
import { getArticles } from "../data/articles";
import usePageMetadata from "../hooks/usePageMetadata";

const skillGroups = [
  {
    label: "languages/",
    items: ["TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    label: "frameworks/",
    items: ["React", "Vite", "React Router"],
  },
  {
    label: "backend/",
    items: ["Node.js"],
  },
  {
    label: "styling/",
    items: ["Tailwind CSS", "shadcn/ui", "Base UI"],
  },
  {
    label: "animation/",
    items: ["Motion for React", "CSS transitions"],
  },
  {
    label: "tools/",
    items: ["Git", "GitHub", "GitHub Actions", "Figma"],
  },
  {
    label: "learning/",
    items: ["Next.js", "Testing Library", "Playwright"],
  },
];

function HomePage() {
  const [featuredArticle] = getArticles();

  usePageMetadata(
    "Lawand Soran — Full-Stack Developer & Founder",
    "Lawand Soran is a full-stack developer and founder building products and turning ideas into software. Explore his work and get in touch.",
  );

  return (
    <>
      <section
        aria-labelledby="home-title"
        className="portfolio-hero grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="portfolio-hero-copy">
          <p className="portfolio-eyebrow">~/intro</p>
          <h1 className="portfolio-page-title mt-4 max-w-reading" id="home-title">
            Lawand Soran
          </h1>
          <p className="portfolio-role mt-4 max-w-reading">
            Full-stack developer and founder building products and turning
            ideas into reality.
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
          className="portfolio-section"
          id="work"
        >
          <SectionHeading
            label="~/work"
            title="Selected work"
            id="work-heading"
          >
            Projects are where I put new ideas and skills into practice.
          </SectionHeading>
          <div className="portfolio-empty-state mt-8">
            <div>
              <h3 className="portfolio-subheading">Projects are in progress</h3>
              <p className="portfolio-body mt-3 max-w-reading">
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
          className="portfolio-section"
          id="about"
        >
          <SectionHeading
            id="about-heading"
            label="~/about"
            title="Curious about how useful things get built."
          >
            I&apos;m a self-directed builder and founder interested in technology,
            business, and turning ideas into reality. I build full-stack web
            applications, explore AI-powered tools, and learn by shipping.
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
          className="portfolio-section"
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
                <dd>{items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      <Reveal>
        <section
          aria-labelledby="contributions-heading"
          className="portfolio-section"
          id="contributions"
        >
          <SectionHeading
            id="contributions-heading"
            label="~/github"
            title="GitHub contributions"
          >
            A year of activity from my GitHub profile.
          </SectionHeading>
          <div className="mt-8">
            <GitHubContributions />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section
          aria-labelledby="writing-heading"
          className="portfolio-section"
          id="writing"
        >
          <SectionHeading
            id="writing-heading"
            label="~/writing"
            title="Notes from learning and building"
          >
            Practical notes and reflections on engineering, building products, and
            turning ideas into software.
          </SectionHeading>

          {featuredArticle ? (
            <div className="mt-8">
              <article
                aria-labelledby="featured-article-title"
                className="portfolio-article-card"
              >
                <div className="portfolio-meta flex items-center gap-3 font-mono text-meta text-secondary">
                  <time dateTime={featuredArticle.date}>
                    {featuredArticle.formattedDate}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <div className="mt-3">
                  <h3
                    className="portfolio-subheading"
                    id="featured-article-title"
                  >
                    <Link
                      className="hover:text-primary transition-colors"
                      to={`/writing/${featuredArticle.slug}`}
                    >
                      {featuredArticle.title}
                    </Link>
                  </h3>
                  <p className="portfolio-body mt-3 max-w-reading">
                    {featuredArticle.summary}
                  </p>
                </div>
                <Link
                  className="portfolio-text-link mt-4"
                  to={`/writing/${featuredArticle.slug}`}
                >
                  Read article <span aria-hidden="true">→</span>
                </Link>
              </article>
            </div>
          ) : null}

          <div className="portfolio-section-action mt-6">
            <ActionLink to="/writing">Browse all writing</ActionLink>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section
          aria-labelledby="contact-heading"
          className="portfolio-section portfolio-contact"
          id="contact"
        >
          <SectionHeading
            id="contact-heading"
            label="~/contact"
            title="Get in touch"
          >
            Have a project in mind, an engineering opportunity, or want to talk tech and startups?
            Schedule time directly or send a message.
          </SectionHeading>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="portfolio-empty-state portfolio-empty-state--page flex flex-col justify-between">
              <div>
                <p className="portfolio-eyebrow">cal.com · 30 min</p>
                <h3 className="portfolio-subheading mt-3">Schedule a 30-min call</h3>
                <p className="portfolio-body mt-2 max-w-reading">
                  Book a time directly on my calendar to talk about engineering
                  roles, collaboration, or new ideas.
                </p>
              </div>
              <div className="mt-6">
                <a
                  className="portfolio-action portfolio-action--primary"
                  href="https://cal.com/lawand-soran-45nazw/30min"
                  rel="noreferrer"
                  target="_blank"
                >
                  Book a call <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="portfolio-empty-state portfolio-empty-state--page flex flex-col justify-between">
              <div>
                <p className="portfolio-eyebrow">direct · async</p>
                <h3 className="portfolio-subheading mt-3">Send an email</h3>
                <p className="portfolio-body mt-2 max-w-reading">
                  Prefer writing? Drop me an email anytime or connect across
                  my profiles.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  className="portfolio-action portfolio-action--secondary"
                  href="mailto:lawandsoran110@gmail.com"
                >
                  Email Lawand
                </a>
                <SocialLinks />
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}

function SectionHeading({
  children,
  id,
  label,
  title,
}: {
  children: string;
  id: string;
  label: string;
  title: string;
}) {
  return (
    <div className="portfolio-section-heading">
      <p className="portfolio-eyebrow">{label}</p>
      <div>
        <h2 className="portfolio-section-title" id={id}>
          {title}
        </h2>
        <p className="portfolio-body mt-4 max-w-reading">{children}</p>
      </div>
    </div>
  );
}

export default HomePage;

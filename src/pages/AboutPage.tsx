import ActionLink from "../components/ui/ActionLink";
import PageTitle from "../components/ui/PageTitle";
import Reveal from "../components/ui/Reveal";
import TerminalPortrait from "../components/ui/TerminalPortrait";
import { certificates } from "../data/certificates";
import usePageMetadata from "../hooks/usePageMetadata";

function AboutPage() {
  usePageMetadata(
    "About — Lawand Soran — Full-Stack Developer & Founder",
    "Learn about Lawand Soran, a full-stack developer and founder turning ideas into products.",
  );

  return (
    <>
      <article aria-labelledby="about-title" className="portfolio-page">
        <p className="portfolio-eyebrow">~/about</p>
        <PageTitle className="portfolio-page-title mt-4" id="about-title">
          About Lawand
        </PageTitle>

        <div className="portfolio-enter-group mt-8 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="portfolio-enter-group portfolio-prose max-w-reading">
            <p className="portfolio-about-lead">
              I&apos;m a self-directed full-stack developer and founder
              passionate about technology, business, and turning ideas into
              tangible products.
            </p>
            <p>
              I started exploring software development because I wanted to
              understand how digital products work and how to build my own from
              scratch. That curiosity has grown into full-stack engineering
              across modern frontend and backend systems, exploring AI-powered
              workflows, and building real products.
            </p>
            <p>
              I learn by building, shipping, and understanding the complete
              architecture behind software. Beyond code, I am deeply interested
              in product design, economics, business strategy, and startups.
            </p>
            <p>
              My focus is on creating fast, accessible, and practical products
              that solve real problems.
            </p>

            <div className="portfolio-section-action mt-8 flex flex-wrap items-center gap-4">
              <ActionLink to="/work" variant="primary">
                View my work
              </ActionLink>
              <a
                className="portfolio-action portfolio-action--secondary"
                href="https://cal.com/lawand-soran-45nazw/30min"
                rel="noreferrer"
                target="_blank"
              >
                Book a 30-min call <span aria-hidden="true">↗</span>
              </a>
              <a
                className="portfolio-action portfolio-action--secondary"
                href="mailto:lawandsoran110@gmail.com"
              >
                Email Lawand
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <TerminalPortrait />
          </div>
        </div>
      </article>

      <Reveal>
        <section
          aria-labelledby="certificates-heading"
          className="portfolio-section"
          id="certificates"
        >
          <div className="portfolio-section-heading">
            <p className="portfolio-eyebrow">~/certificates</p>
            <div>
              <h2 className="portfolio-section-title" id="certificates-heading">
                Certifications
              </h2>
              <p className="portfolio-body mt-4 max-w-reading">
                Verified coursework completed alongside building products.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {certificates.map((certificate) => {
              const titleId = `certificate-${certificate.id}-title`;

              return (
                <article
                  aria-labelledby={titleId}
                  className="portfolio-article-card w-full"
                  key={certificate.id}
                >
                  <div className="grid w-full grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,20rem)_1fr]">
                    <div className="overflow-hidden rounded-control border border-line bg-surface">
                      <img
                        alt={certificate.imageAlt}
                        className="block aspect-[1318/741] w-full object-cover"
                        decoding="async"
                        height={certificate.height}
                        loading="lazy"
                        src={certificate.image}
                        width={certificate.width}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-meta text-secondary">
                        <span>{certificate.issuer}</span>
                        <span aria-hidden="true">·</span>
                        <span>{certificate.completedAt}</span>
                        <span aria-hidden="true">·</span>
                        <span>{certificate.scope}</span>
                      </div>
                      <h3 className="portfolio-subheading mt-3" id={titleId}>
                        <a
                          className="portfolio-card-link"
                          href={certificate.href}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {certificate.title}
                        </a>
                      </h3>
                      <p className="portfolio-body mt-3 max-w-reading">
                        {certificate.summary}
                      </p>
                      <span aria-hidden="true" className="portfolio-card-cue mt-4">
                        Verify certificate <span>↗</span>
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </Reveal>
    </>
  );
}

export default AboutPage;

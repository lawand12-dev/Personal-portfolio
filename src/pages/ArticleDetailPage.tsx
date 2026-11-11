import { Link, useParams } from "react-router";
import ActionLink from "../components/ui/ActionLink";
import { getAdjacentArticles, getArticleBySlug } from "../data/articles";
import usePageMetadata from "../hooks/usePageMetadata";

function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const adjacent = slug ? getAdjacentArticles(slug) : {};

  usePageMetadata(
    article
      ? `${article.title} — Lawand Soran`
      : "Article not found — Lawand Soran",
    article ? article.summary : "The requested article could not be found.",
  );

  if (!article) {
    return (
      <section aria-labelledby="not-found-title" className="portfolio-page">
        <p className="portfolio-eyebrow">~/writing/404</p>
        <h1 className="portfolio-page-title mt-4" id="not-found-title">
          Article not found
        </h1>
        <p className="portfolio-body mt-4 max-w-reading">
          The article you are looking for doesn’t exist or may have been moved.
        </p>
        <div className="portfolio-section-action mt-8">
          <ActionLink to="/writing" variant="secondary">
            Return to writing
          </ActionLink>
        </div>
      </section>
    );
  }

  return (
    <article aria-labelledby="article-title" className="portfolio-page">
      <nav aria-label="Breadcrumb" className="portfolio-eyebrow">
        <Link className="hover:text-primary transition-colors" to="/writing">
          ~/writing
        </Link>
        <span aria-hidden="true" className="mx-2 text-muted">
          /
        </span>
        <span className="text-secondary">{article.slug}</span>
      </nav>

      <header className="mt-4">
        <h1 className="portfolio-page-title" id="article-title">
          {article.title}
        </h1>
        <div className="portfolio-meta mt-4 flex items-center gap-3 font-mono text-meta text-secondary">
          <time dateTime={article.date}>{article.formattedDate}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>
      </header>

      <div className="portfolio-prose mt-8 max-w-reading">
        <p className="portfolio-about-lead portfolio-editorial">
          {article.lead}
        </p>

        {article.introParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {article.sections.map((section) => (
          <section
            aria-labelledby={`section-${section.heading ? encodeURIComponent(section.heading) : "notes"}`}
            className="mt-10"
            key={section.heading ?? "notes"}
          >
            {section.heading && (
              <h2
                className="portfolio-subheading mb-4"
                id={`section-${encodeURIComponent(section.heading)}`}
              >
                {section.heading}
              </h2>
            )}
            {section.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>
        ))}
      </div>

      {article.editorialNote && (
        <aside
          aria-label="Editorial note"
          className="portfolio-empty-state portfolio-empty-state--page mt-12 max-w-reading"
        >
          <p className="portfolio-body">
            <strong className="text-primary font-medium">
              Editorial note:{" "}
            </strong>
            {article.editorialNote.replace(/^Editorial note:\s*/i, "")}
          </p>
        </aside>
      )}

      {(adjacent.older || adjacent.newer) && (
        <nav
          aria-label="Article navigation"
          className="mt-12 grid grid-cols-1 gap-4 border-t border-line pt-8 sm:grid-cols-2 max-w-reading"
        >
          {adjacent.older ? (
            <Link
              className="rounded-card border border-line bg-card p-4 transition-colors hover:border-line-strong hover:bg-raised block"
              to={`/writing/${adjacent.older.slug}`}
            >
              <span className="font-mono text-meta text-muted">
                ← Previous article
              </span>
              <p className="font-medium text-body text-primary mt-1">
                {adjacent.older.title}
              </p>
              <span className="font-mono text-meta text-secondary mt-2 block">
                {adjacent.older.readTime}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {adjacent.newer && (
            <Link
              className="rounded-card border border-line bg-card p-4 transition-colors hover:border-line-strong hover:bg-raised block sm:text-right"
              to={`/writing/${adjacent.newer.slug}`}
            >
              <span className="font-mono text-meta text-muted">
                Next article →
              </span>
              <p className="font-medium text-body text-primary mt-1">
                {adjacent.newer.title}
              </p>
              <span className="font-mono text-meta text-secondary mt-2 block">
                {adjacent.newer.readTime}
              </span>
            </Link>
          )}
        </nav>
      )}

      <div className="portfolio-section-action mt-8 flex flex-wrap items-center gap-4">
        <ActionLink to="/writing" variant="secondary">
          Back to writing
        </ActionLink>
        <a
          className="portfolio-action portfolio-action--secondary"
          href="https://cal.com/lawand-soran-45nazw/30min"
          rel="noreferrer"
          target="_blank"
        >
          Book a 30-min call <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

export default ArticleDetailPage;

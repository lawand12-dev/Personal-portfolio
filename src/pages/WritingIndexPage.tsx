import { Link } from 'react-router'
import { getArticles } from '../data/articles'
import usePageMetadata from '../hooks/usePageMetadata'

function WritingIndexPage() {
  const articles = getArticles()

  usePageMetadata(
    'Writing — Lawand Soran — Full-Stack Developer & Founder',
    'Notes by Lawand Soran on engineering, building products, and turning ideas into software.',
  )

  return (
    <section aria-labelledby="writing-title" className="portfolio-page">
      <p className="portfolio-eyebrow">~/writing</p>
      <h1 className="portfolio-page-title mt-4" id="writing-title">
        Writing
      </h1>
      <p className="portfolio-intro mt-4 max-w-reading">
        Notes on engineering, building products, and turning ideas into software.
      </p>

      {articles.length === 0 ? (
        <div className="portfolio-empty-state portfolio-empty-state--page mt-12">
          <div>
            <h2 className="portfolio-subheading">No posts published yet</h2>
            <p className="portfolio-body mt-3 max-w-reading">
              I haven&apos;t published any posts yet. When I do, you&apos;ll find
              practical notes and reflections from my learning and projects here.
            </p>
          </div>
          <a
            className="portfolio-action portfolio-action--secondary"
            href="https://github.com/lawand12-dev"
            rel="noreferrer"
            target="_blank"
          >
            Visit my GitHub
          </a>
        </div>
      ) : (
        <div className="mt-12 space-y-6">
          {articles.map((article) => (
            <article
              aria-labelledby={`article-${article.slug}-title`}
              className="portfolio-article-card"
              key={article.slug}
            >
              <div className="portfolio-meta flex items-center gap-3 font-mono text-meta text-secondary">
                <time dateTime={article.date}>{article.formattedDate}</time>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
              </div>
              <div className="mt-3">
                <h2
                  className="portfolio-subheading"
                  id={`article-${article.slug}-title`}
                >
                  <Link
                    className="hover:text-primary transition-colors"
                    to={`/writing/${article.slug}`}
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="portfolio-body mt-3 max-w-reading">
                  {article.summary}
                </p>
              </div>
              <Link
                className="portfolio-text-link mt-4"
                to={`/writing/${article.slug}`}
              >
                Read article <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default WritingIndexPage

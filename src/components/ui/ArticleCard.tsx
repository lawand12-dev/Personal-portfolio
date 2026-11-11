import { Link } from 'react-router'
import type { Article } from '../../data/articles'

type ArticleCardProps = {
  article: Article
  headingLevel?: 'h2' | 'h3'
}

/**
 * The whole card is clickable: the title link stretches over it (see
 * .portfolio-card-link in Portfolio.css), so there is still exactly one link
 * per card for keyboard and screen-reader users.
 */
function ArticleCard({ article, headingLevel = 'h2' }: ArticleCardProps) {
  const Heading = headingLevel
  const titleId = `article-${article.slug}-title`

  return (
    <article aria-labelledby={titleId} className="portfolio-article-card">
      <div className="portfolio-meta flex items-center gap-3 font-mono text-meta text-secondary">
        <time dateTime={article.date}>{article.formattedDate}</time>
        <span aria-hidden="true">·</span>
        <span>{article.readTime}</span>
      </div>
      <Heading className="portfolio-subheading mt-3" id={titleId}>
        <Link className="portfolio-card-link" to={`/writing/${article.slug}`}>
          {article.title}
        </Link>
      </Heading>
      <p className="portfolio-body mt-3 max-w-reading">{article.summary}</p>
      <span aria-hidden="true" className="portfolio-card-cue mt-4">
        Read article <span>→</span>
      </span>
    </article>
  )
}

export default ArticleCard

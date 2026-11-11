import ArticleCard from "../components/ui/ArticleCard";
import PageTitle from "../components/ui/PageTitle";
import { getArticles } from "../data/articles";
import usePageMetadata from "../hooks/usePageMetadata";

function WritingIndexPage() {
  const articles = getArticles();

  usePageMetadata(
    "Writing — Lawand Soran — Full-Stack Developer & Founder",
    "Notes by Lawand Soran on engineering, building products, and turning ideas into software.",
  );

  return (
    <section aria-labelledby="writing-title" className="portfolio-page">
      <p className="portfolio-eyebrow">~/writing</p>
      <PageTitle className="portfolio-page-title mt-4" id="writing-title">
        Writing
      </PageTitle>
      <p className="portfolio-intro mt-4 max-w-reading">
        Notes on engineering, building products, and turning ideas into
        software.
      </p>

      {articles.length === 0 ? (
        <div className="portfolio-empty-state portfolio-empty-state--page mt-12">
          <div>
            <h2 className="portfolio-subheading">No posts published yet</h2>
            <p className="portfolio-body mt-3 max-w-reading">
              I haven&apos;t published any posts yet. When I do, you&apos;ll
              find practical notes and reflections from my learning and projects
              here.
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
        <div className="portfolio-enter-group mt-12 space-y-6">
          {articles.map((article) => (
            <ArticleCard article={article} key={article.slug} />
          ))}
        </div>
      )}
    </section>
  );
}

export default WritingIndexPage;

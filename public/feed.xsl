<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="5.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title><xsl:value-of select="/rss/channel/title"/> RSS Feed</title>
        <style>
          :root {
            --bg-page: #050505;
            --bg-card: #111111;
            --bg-surface: #141414;
            --bg-raised: #1a1a1a;
            --border-subtle: rgba(255, 255, 255, 0.08);
            --border-strong: rgba(255, 255, 255, 0.16);
            --text-primary: #ffffff;
            --text-secondary: #9ca3af;
            --text-muted: #888888;
            --accent: #ffffff;
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            background-color: var(--bg-page);
            color: var(--text-primary);
            font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            padding: 3rem 1.5rem;
            display: flex;
            justify-content: center;
          }

          .container {
            width: 100%;
            max-width: 48rem;
          }

          .eyebrow {
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 0.8125rem;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.75rem;
          }

          h1 {
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            margin-bottom: 1rem;
            color: var(--text-primary);
          }

          .explainer-card {
            background-color: var(--bg-card);
            border: 1px solid var(--border-strong);
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin-bottom: 2.5rem;
          }

          .explainer-card p {
            color: var(--text-secondary);
            font-size: 0.9375rem;
            margin-bottom: 1rem;
          }

          .action-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 1rem;
          }

          .btn {
            background-color: var(--accent);
            color: var(--bg-page);
            border: 1px solid transparent;
            padding: 0.5rem 1rem;
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 0.8125rem;
            font-weight: 600;
            border-radius: 0.375rem;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            transition: opacity 0.15s ease;
          }

          .btn:hover {
            opacity: 0.9;
          }

          .btn-secondary {
            background-color: transparent;
            color: var(--text-primary);
            border: 1px solid var(--border-strong);
          }

          .btn-secondary:hover {
            background-color: var(--bg-raised);
          }

          .feed-heading {
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 1.25rem;
            color: var(--text-primary);
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--border-subtle);
            padding-bottom: 0.75rem;
          }

          .articles-list {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }

          .article-card {
            background-color: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: 0.5rem;
            padding: 1.5rem;
            transition: border-color 0.15s ease, background-color 0.15s ease;
          }

          .article-card:hover {
            border-color: var(--border-strong);
            background-color: var(--bg-raised);
          }

          .article-meta {
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 0.75rem;
            color: var(--text-muted);
            margin-bottom: 0.5rem;
          }

          .article-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .article-title a {
            color: var(--text-primary);
            text-decoration: none;
          }

          .article-title a:hover {
            text-decoration: underline;
          }

          .article-desc {
            color: var(--text-secondary);
            font-size: 0.9375rem;
            margin-bottom: 1rem;
          }

          .article-link {
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 0.8125rem;
            color: var(--text-primary);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
          }

          .article-link:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p class="eyebrow">~/writing/rss</p>
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          
          <div class="explainer-card">
            <p>
              This is an <strong>RSS feed</strong>. It is designed for newsreader applications (such as <em>Feedly</em>, <em>NetNewsWire</em>, or <em>Inoreader</em>) to follow updates automatically without an email newsletter or tracking algorithms.
            </p>
            <div class="action-row">
              <button class="btn" id="copy-btn" onclick="navigator.clipboard.writeText(window.location.href); this.innerText='Copied URL!'; setTimeout(() => this.innerText='Copy Feed URL', 2000)">
                Copy Feed URL
              </button>
              <a class="btn btn-secondary" href="/writing">
                ← Back to Writing
              </a>
            </div>
          </div>

          <div class="feed-heading">
            <span>Recent Articles</span>
            <span style="font-size: 0.8125rem; color: var(--text-muted);">RSS 2.0</span>
          </div>

          <div class="articles-list">
            <xsl:for-each select="/rss/channel/item">
              <article class="article-card">
                <div class="article-meta">
                  <xsl:value-of select="pubDate"/>
                </div>
                <h2 class="article-title">
                  <a href="{link}"><xsl:value-of select="title"/></a>
                </h2>
                <p class="article-desc">
                  <xsl:value-of select="description"/>
                </p>
                <a class="article-link" href="{link}">
                  Read article →
                </a>
              </article>
            </xsl:for-each>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

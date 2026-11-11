import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const articles = [
  {
    slug: 'why-smart-ai-models-still-write-like-bots',
    title: 'Why smart AI models still write like bots',
    date: '2026-11-01',
    summary:
      'A model can solve a hard coding problem and then fail to write four plain paragraphs. Here is why reasoning scores don’t translate into readable prose.',
  },
]

const root = resolve(import.meta.dirname, '..')
const outputPath = resolve(root, 'public/feed.xml')

const itemsXml = articles
  .map(
    (article) => `    <item>
      <title>${article.title}</title>
      <link>https://lawandsoran.site/writing/${article.slug}</link>
      <guid isPermaLink="true">https://lawandsoran.site/writing/${article.slug}</guid>
      <pubDate>${new Date(`${article.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description><![CDATA[${article.summary}]]></description>
    </item>`,
  )
  .join('\n')

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet href="/feed.xsl" type="text/xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lawand Soran: Writing</title>
    <link>https://lawandsoran.site/writing</link>
    <description>Notes on engineering, building products, and turning ideas into software by Lawand Soran.</description>
    <language>en-us</language>
    <atom:link href="https://lawandsoran.site/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>
`

await writeFile(outputPath, rssXml, 'utf8')
console.log('RSS feed generated at public/feed.xml')

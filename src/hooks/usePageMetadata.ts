import { useEffect } from 'react'

function usePageMetadata(
  title: string,
  description: string,
  robots = 'index,follow',
) {
  useEffect(() => {
    const metadata = [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
      ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', description],
      ['meta[name="robots"]', robots],
    ] as const

    for (const [selector, content] of metadata) {
      const meta = document.querySelector<HTMLMetaElement>(selector)

      if (!meta) {
        throw new Error(`The required page metadata tag is missing: ${selector}`)
      }

      meta.content = content
    }

    document.title = title
  }, [description, robots, title])
}

export default usePageMetadata

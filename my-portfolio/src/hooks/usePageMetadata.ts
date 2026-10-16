import { useEffect } from 'react'

function usePageMetadata(title: string, description: string) {
  useEffect(() => {
    const descriptionMeta =
      document.querySelector<HTMLMetaElement>('meta[name="description"]')

    if (!descriptionMeta) {
      throw new Error('The page description meta tag is missing.')
    }

    document.title = title
    descriptionMeta.content = description
  }, [description, title])
}

export default usePageMetadata

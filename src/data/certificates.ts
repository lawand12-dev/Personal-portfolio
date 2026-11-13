import scrimbaAiEngineerCertificate from '../assets/Scrimba-AI-engineer-path.webp'
import scrimbaFullStackCertificate from '../assets/Scrimba-full-stack-certificate.webp'

export interface Certificate {
  id: string
  issuer: string
  title: string
  completedAt: string
  scope: string
  summary: string
  href: string
  image: string
  imageAlt: string
  width: number
  height: number
}

/** Newest completion first. */
export const certificates: Certificate[] = [
  {
    id: 'scrimba-fullstack-path',
    issuer: 'Scrimba',
    title: 'The Fullstack Developer Path',
    completedAt: '13 Nov 2026',
    scope: '108.4 hours · 2,057 lessons',
    summary:
      "Completed Scrimba's full-stack developer curriculum across interactive frontend and backend modules.",
    href: 'https://scrimba.com/@lawand12-dev:certs;cert23wfboWopVFxm2ja2GPLBBy3YZ4AUCCjTEAAzpTXeBA32PRA',
    image: scrimbaFullStackCertificate,
    imageAlt:
      'Scrimba certificate of completion for Lawand Soran in The Fullstack Developer Path',
    width: 960,
    height: 540,
  },
  {
    id: 'scrimba-ai-engineer-path',
    issuer: 'Scrimba',
    title: 'The AI Engineer Path',
    completedAt: '28 Oct 2026',
    scope: '13.4 hours · 296 lessons',
    summary:
      "Completed Scrimba's AI engineer curriculum focused on building AI-powered applications and workflows.",
    href: 'https://scrimba.com/@lawand12-dev:certs;cert2JbLs3qgBk1J3RyLmJ8LKc2cFxJQ7FDKaLe72z',
    image: scrimbaAiEngineerCertificate,
    imageAlt:
      'Scrimba certificate of completion for Lawand Soran in The AI Engineer Path',
    width: 960,
    height: 540,
  },
]

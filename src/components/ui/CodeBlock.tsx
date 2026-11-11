import { useState } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export default function CodeBlock({
  code,
  language = 'typescript',
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for clipboard
    }
  }

  const lines = code.trim().split('\n')

  return (
    <div className="portfolio-codeblock my-6 overflow-hidden rounded-card border border-line bg-card">
      <div className="flex items-center justify-between border-b border-line bg-surface/50 px-4 py-2 font-mono text-meta text-muted">
        <span>{filename ?? language}</span>
        <button
          aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
          className="cursor-pointer font-mono text-meta text-muted hover:text-primary transition-colors flex items-center gap-1"
          onClick={handleCopy}
          type="button"
        >
          {copied ? (
            <span className="text-emerald-400">Copied!</span>
          ) : (
            <span>Copy</span>
          )}
        </button>
      </div>

      <pre className="overflow-x-auto p-4 font-mono text-meta text-secondary leading-relaxed">
        <code>
          {lines.map((line, idx) => (
            <div className="table-row" key={idx}>
              <span className="table-cell select-none pr-4 text-right text-muted/40">
                {idx + 1}
              </span>
              <span className="table-cell text-primary">{line}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}

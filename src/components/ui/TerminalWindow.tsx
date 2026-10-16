import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const transcript = [
  '$ whoami',
  'Junior frontend developer — React · TypeScript',
  '',
  '$ cat goals.md',
  'Seeking a junior frontend role.',
  'Learning by building and sharing what I learn.',
].join('\n')

function TerminalWindow() {
  const shouldReduceMotion = useReducedMotion()
  const [visibleCharacters, setVisibleCharacters] = useState(0)
  const visibleCharactersRef = useRef(0)
  const visibleTranscript = shouldReduceMotion
    ? transcript
    : transcript.slice(0, visibleCharacters)

  useEffect(() => {
    if (shouldReduceMotion) {
      return
    }

    const interval = window.setInterval(() => {
      const nextCharacterIndex = Math.min(
        visibleCharactersRef.current + 1,
        transcript.length,
      )
      visibleCharactersRef.current = nextCharacterIndex
      setVisibleCharacters(nextCharacterIndex)

      if (nextCharacterIndex >= transcript.length) {
        window.clearInterval(interval)
      }
    }, 22)

    return () => window.clearInterval(interval)
  }, [shouldReduceMotion])

  return (
    <aside aria-label="Introduction in terminal format" className="portfolio-terminal">
      <div className="portfolio-terminal-titlebar">
        <span>~/intro</span>
        <span className="portfolio-terminal-status">read only</span>
      </div>
      <div className="portfolio-terminal-body">
        <p className="sr-only">
          Terminal transcript: whoami. Junior frontend developer — React and
          TypeScript. cat goals.md. Seeking a junior frontend role. Learning by
          building and sharing what I learn.
        </p>
        <div aria-hidden="true" className="portfolio-terminal-animation">
          <pre className="portfolio-terminal-reserve">{transcript}</pre>
          <pre className="portfolio-terminal-output">
            {visibleTranscript}
            <span className="portfolio-terminal-cursor" />
          </pre>
        </div>
      </div>
    </aside>
  )
}

export default TerminalWindow

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react'
import { useReducedMotion } from 'motion/react'
import { playKeyClick, toggleSound } from '../../utils/sound'

interface TerminalHistoryItem {
  type: 'command' | 'output' | 'error' | 'spacer'
  text: string
}

const initialLines = [
  { text: '$ whoami', type: 'command' as const },
  {
    text: 'Full-stack developer & founder: React · Node.js · TypeScript',
    type: 'output' as const,
  },
  { text: '', type: 'spacer' as const },
  { text: '$ cat goals.md', type: 'command' as const },
  {
    text: 'Building products and turning ideas into software.',
    type: 'output' as const,
  },
  {
    text: 'Open to building, product collaborations, and engineering roles.',
    type: 'output' as const,
  },
]

const initialTranscript = initialLines.map(({ text }) => text).join('\n')

function TerminalWindow() {
  const shouldReduceMotion = useReducedMotion()
  const [visibleCharacters, setVisibleCharacters] = useState(
    shouldReduceMotion ? initialTranscript.length : 0,
  )
  const visibleCharactersRef = useRef(shouldReduceMotion ? initialTranscript.length : 0)
  const [isInteractive, setIsInteractive] = useState(Boolean(shouldReduceMotion))
  const [history, setHistory] = useState<TerminalHistoryItem[]>([])
  const [inputValue, setInputValue] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyPointer, setHistoryPointer] = useState<number>(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalBodyRef = useRef<HTMLDivElement>(null)

  const visibleTranscript = shouldReduceMotion
    ? initialTranscript
    : initialTranscript.slice(0, visibleCharacters)
  const visibleLines = visibleTranscript.split('\n')

  // Auto-typing sequence on initial mount
  useEffect(() => {
    if (shouldReduceMotion) {
      return
    }

    let timeout: number
    const typeNextCharacter = () => {
      const nextIndex = Math.min(
        visibleCharactersRef.current + 1,
        initialTranscript.length,
      )
      visibleCharactersRef.current = nextIndex
      setVisibleCharacters(nextIndex)

      if (nextIndex >= initialTranscript.length) {
        setIsInteractive(true)
        return
      }

      const justTypedNewline = initialTranscript[nextIndex - 1] === '\n'
      timeout = window.setTimeout(typeNextCharacter, justTypedNewline ? 240 : 35)
    }

    timeout = window.setTimeout(typeNextCharacter, 300)
    return () => window.clearTimeout(timeout)
  }, [shouldReduceMotion])

  // Scroll to bottom when history grows
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [history, visibleCharacters])

  function handleTerminalClick() {
    if (!isInteractive) {
      // Clicking skips auto-typing directly into interactive mode
      setVisibleCharacters(initialTranscript.length)
      visibleCharactersRef.current = initialTranscript.length
      setIsInteractive(true)
    }
    inputRef.current?.focus()
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
    playKeyClick()
  }

  function executeCommand(rawCommand: string) {
    const trimmed = rawCommand.trim()
    if (!trimmed) {
      setHistory((prev) => [...prev, { type: 'command', text: '$' }])
      return
    }

    const [cmd] = trimmed.split(' ')
    const normalized = cmd.toLowerCase()
    const newItems: TerminalHistoryItem[] = [
      { type: 'command', text: `$ ${trimmed}` },
    ]

    switch (normalized) {
      case 'help':
        newItems.push({
          type: 'output',
          text: [
            'Available commands:',
            '  skills    - inspect languages, frameworks, & tooling',
            '  contact   - email & meeting links',
            '  about     - bio and product ethos',
            '  writing   - read notes and published essays',
            '  sound     - toggle mechanical sound effects',
            '  clear     - clear terminal session',
            '  whoami    - identity check',
          ].join('\n'),
        })
        break

      case 'skills':
        newItems.push({
          type: 'output',
          text: [
            'languages:   TypeScript · JavaScript · HTML · CSS',
            'frameworks:  React · Vite · Node.js · React Router',
            'styling:     Tailwind CSS · shadcn/ui · Base UI',
            'tooling:     Git · GitHub Actions · Vitest · Canvas',
          ].join('\n'),
        })
        break

      case 'contact':
        newItems.push({
          type: 'output',
          text: [
            'email:     lawandsoran110@gmail.com',
            'meeting:   https://cal.com/lawand-soran-45nazw/30min',
            'github:    https://github.com/lawand12-dev',
            'x:         https://x.com/LawandOps',
          ].join('\n'),
        })
        break

      case 'about':
        newItems.push({
          type: 'output',
          text: 'Lawand Soran: Builder and founder creating fast, accessible products and turning ideas into software.',
        })
        break

      case 'writing':
        newItems.push({
          type: 'output',
          text: 'Latest: "Why smart AI models still write like bots" (4 min read)\nBrowse all articles at /writing',
        })
        break

      case 'whoami':
        newItems.push({
          type: 'output',
          text: 'A curious visitor exploring Lawand’s portfolio.',
        })
        break

      case 'sound':
      case 'audio': {
        const next = toggleSound()
        newItems.push({
          type: 'output',
          text: `Mechanical sound effects: ${next ? 'ENABLED (ON)' : 'DISABLED (OFF)'}`,
        })
        break
      }

      case 'clear':
        setHistory([])
        setInputValue('')
        setHistoryPointer(-1)
        return

      case 'sudo':
        newItems.push({
          type: 'error',
          text: 'Permission denied: guest credentials cannot execute privileged commands.',
        })
        break

      default:
        newItems.push({
          type: 'error',
          text: `command not found: ${cmd}. Type 'help' for available commands.`,
        })
        break
    }

    setHistory((prev) => [...prev, ...newItems])
    setCommandHistory((prev) => [...prev, trimmed])
    setInputValue('')
    setHistoryPointer(-1)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    playKeyClick()

    if (e.key === 'Enter') {
      executeCommand(inputValue)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      const nextPointer =
        historyPointer === -1
          ? commandHistory.length - 1
          : Math.max(0, historyPointer - 1)
      setHistoryPointer(nextPointer)
      setInputValue(commandHistory[nextPointer] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyPointer === -1) return
      const nextPointer = historyPointer + 1
      if (nextPointer >= commandHistory.length) {
        setHistoryPointer(-1)
        setInputValue('')
      } else {
        setHistoryPointer(nextPointer)
        setInputValue(commandHistory[nextPointer] ?? '')
      }
    }
  }

  return (
    <aside
      aria-label="Interactive terminal introduction"
      className="portfolio-terminal cursor-text"
      onClick={handleTerminalClick}
    >
      <div className="portfolio-terminal-titlebar">
        <div className="portfolio-terminal-title">
          <div aria-hidden="true" className="portfolio-terminal-controls">
            <span className="portfolio-terminal-control portfolio-terminal-control--close" />
            <span className="portfolio-terminal-control portfolio-terminal-control--minimize" />
            <span className="portfolio-terminal-control portfolio-terminal-control--maximize" />
          </div>
          <span>~/intro</span>
        </div>
        <div className="flex items-center gap-2">
          {isInteractive && (
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
          )}
          <span className="portfolio-terminal-status font-mono text-meta">
            {isInteractive ? 'interactive' : 'reading…'}
          </span>
        </div>
      </div>

      <div
        className="portfolio-terminal-body max-h-72 overflow-y-auto"
        ref={terminalBodyRef}
      >
        <p className="sr-only">
          Terminal transcript: whoami. Full-stack developer &amp; founder. cat
          goals.md. Building products and turning ideas into software.
        </p>

        {/* Initial typed transcript */}
        <div aria-hidden="true" className="portfolio-terminal-animation">
          <pre className="portfolio-terminal-reserve">{initialTranscript}</pre>
          <pre className="portfolio-terminal-output">
            {visibleLines.map((line, index) => {
              const item = initialLines[index]
              const type = item ? item.type : 'output'
              const content =
                type === 'command' && line.startsWith('$ ') ? (
                  <>
                    <span className="portfolio-terminal-prompt">$</span>
                    {line.slice(1)}
                  </>
                ) : (
                  line
                )

              return (
                <span
                  className={`portfolio-terminal-line portfolio-terminal-line--${type}`}
                  key={`${type}-${index}`}
                >
                  {index > 0 && '\n'}
                  {content}
                </span>
              )
            })}
            {!isInteractive && <span className="portfolio-terminal-cursor" />}
          </pre>
        </div>

        {/* Interactive history and user prompt */}
        {isInteractive && (
          <div className="portfolio-terminal-interactive mt-2 font-mono text-label">
            {history.map((item, idx) => (
              <div
                className={`portfolio-terminal-line portfolio-terminal-line--${item.type} mt-1`}
                key={`hist-${idx}`}
              >
                {item.type === 'command' && item.text.startsWith('$ ') ? (
                  <>
                    <span className="portfolio-terminal-prompt">$</span>
                    {item.text.slice(1)}
                  </>
                ) : (
                  <pre className="font-mono whitespace-pre-wrap">{item.text}</pre>
                )}
              </div>
            ))}

            <div className="flex items-center mt-2">
              <span className="portfolio-terminal-prompt mr-2 text-secondary">
                $
              </span>
              <div className="relative flex-1">
                <input
                  aria-label="Terminal command input"
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  className="w-full bg-transparent font-mono text-label text-primary outline-hidden"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={history.length === 0 ? "type 'help'..." : ''}
                  ref={inputRef}
                  spellCheck="false"
                  type="text"
                  value={inputValue}
                />
              </div>
              <span className="portfolio-terminal-cursor inline-block" />
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default TerminalWindow

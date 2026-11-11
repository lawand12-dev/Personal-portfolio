import { Dialog } from '@base-ui/react/dialog'
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react'
import { useNavigate } from 'react-router'
import { getArticles } from '../../data/articles'

interface PaletteItem {
  id: string
  category: 'Navigation' | 'Articles' | 'Connect'
  title: string
  subtitle: string
  shortcut?: string
  to?: string
  href?: string
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((prev) => {
          if (!prev) {
            setQuery('')
            setSelectedIndex(0)
          }
          return !prev
        })
      }
    }

    function handleOpenEvent() {
      setQuery('')
      setSelectedIndex(0)
      setOpen(true)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-command-palette', handleOpenEvent)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-command-palette', handleOpenEvent)
    }
  }, [])

  const articles = getArticles()

  const allItems: PaletteItem[] = [
    {
      id: 'nav-home',
      category: 'Navigation',
      title: 'Home',
      subtitle: 'Overview, hero intro, and highlights',
      shortcut: '~/',
      to: '/',
    },
    {
      id: 'nav-work',
      category: 'Navigation',
      title: 'Selected work',
      subtitle: 'Projects and software in progress',
      shortcut: '~/work',
      to: '/work',
    },
    {
      id: 'nav-writing',
      category: 'Navigation',
      title: 'Writing',
      subtitle: 'Notes and essays on engineering and AI',
      shortcut: '~/writing',
      to: '/writing',
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'About Lawand',
      subtitle: 'Background, curiosity, and product focus',
      shortcut: '~/about',
      to: '/about',
    },
    ...articles.map((article) => ({
      id: `article-${article.slug}`,
      category: 'Articles' as const,
      title: article.title,
      subtitle: `${article.readTime} · ${article.formattedDate}`,
      shortcut: '~/read',
      to: `/writing/${article.slug}`,
    })),
    {
      id: 'connect-call',
      category: 'Connect',
      title: 'Schedule a 30-min call',
      subtitle: 'Book time on cal.com for collaboration or intro',
      shortcut: 'cal.com',
      href: 'https://cal.com/lawand-soran-45nazw/30min',
    },
    {
      id: 'connect-email',
      category: 'Connect',
      title: 'Send an email',
      subtitle: 'lawandsoran110@gmail.com',
      shortcut: 'mailto:',
      href: 'mailto:lawandsoran110@gmail.com',
    },
    {
      id: 'connect-github',
      category: 'Connect',
      title: 'GitHub profile',
      subtitle: 'github.com/lawand12-dev',
      shortcut: 'gh',
      href: 'https://github.com/lawand12-dev',
    },
    {
      id: 'connect-linkedin',
      category: 'Connect',
      title: 'LinkedIn',
      subtitle: 'linkedin.com/in/lawand-soran',
      shortcut: 'in',
      href: 'https://www.linkedin.com/in/lawand-soran',
    },
    {
      id: 'connect-x',
      category: 'Connect',
      title: 'X (formerly Twitter)',
      subtitle: 'x.com/LawandOps',
      shortcut: 'x',
      href: 'https://x.com/LawandOps',
    },
  ]

  const trimmed = query.trim().toLowerCase()
  const filteredItems = trimmed
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(trimmed) ||
          item.subtitle.toLowerCase().includes(trimmed) ||
          (item.shortcut && item.shortcut.toLowerCase().includes(trimmed)),
      )
    : allItems

  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[aria-selected="true"]')
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  function handleQueryChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    setSelectedIndex(0)
  }

  function selectItem(item: PaletteItem) {
    setOpen(false)
    if (item.to) {
      navigate(item.to)
    } else if (item.href) {
      if (item.href.startsWith('mailto:')) {
        window.location.href = item.href
      } else {
        window.open(item.href, '_blank', 'noopener,noreferrer')
      }
    }
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (filteredItems.length === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelectedIndex((prev) =>
        prev === 0 ? filteredItems.length - 1 : prev - 1,
      )
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const item = filteredItems[selectedIndex]
      if (item) {
        selectItem(item)
      }
    }
  }

  return (
    <Dialog.Root
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (isOpen) {
          setQuery('')
          setSelectedIndex(0)
        }
      }}
      open={open}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="portfolio-palette-backdrop fixed inset-0 z-50 bg-black/70 backdrop-blur-xs transition-opacity" />
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-20">
          <Dialog.Popup
            aria-label="Command palette"
            className="portfolio-palette-popup w-full max-w-xl overflow-hidden rounded-card border border-line-strong bg-card text-primary outline-hidden"
            initialFocus={inputRef}
          >
            <div className="portfolio-palette-header flex items-center border-b border-line px-4 py-3">
              <span
                aria-hidden="true"
                className="font-mono text-label text-secondary mr-3"
              >
                &gt;
              </span>
              <input
                aria-autocomplete="list"
                aria-controls="palette-results"
                className="w-full bg-transparent font-mono text-body text-primary outline-hidden placeholder:text-muted"
                onChange={handleQueryChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Type a command, page, or search..."
                ref={inputRef}
                role="combobox"
                type="text"
                value={query}
              />
              <kbd className="portfolio-kbd font-mono text-meta text-muted ml-2">
                ESC
              </kbd>
            </div>

            <ul
              className="portfolio-palette-list max-h-80 overflow-y-auto p-2"
              id="palette-results"
              ref={listRef}
              role="listbox"
            >
              {filteredItems.length === 0 ? (
                <li className="px-4 py-8 text-center font-mono text-label text-muted">
                  No matching commands or pages found.
                </li>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex
                  return (
                    <li
                      aria-selected={isSelected}
                      className={`portfolio-palette-item flex cursor-pointer items-center justify-between gap-4 rounded-control px-3 py-2.5 transition-colors ${
                        isSelected
                          ? 'bg-raised text-primary'
                          : 'text-secondary hover:bg-raised/60 hover:text-primary'
                      }`}
                      key={item.id}
                      onClick={() => selectItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      role="option"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-label font-medium text-primary">
                            {item.title}
                          </span>
                          <span className="font-mono text-meta text-muted">
                            [{item.category}]
                          </span>
                        </div>
                        <p className="truncate text-meta text-muted mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                      {item.shortcut && (
                        <span className="shrink-0 font-mono text-meta text-muted">
                          {item.shortcut}
                        </span>
                      )}
                    </li>
                  )
                })
              )}
            </ul>

            <div className="portfolio-palette-footer flex items-center justify-between border-t border-line px-4 py-2 font-mono text-meta text-muted">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="portfolio-kbd mr-1">↑</kbd>
                  <kbd className="portfolio-kbd mr-1">↓</kbd> navigate
                </span>
                <span>
                  <kbd className="portfolio-kbd mr-1">↵</kbd> select
                </span>
              </div>
              <span>Terminal Editorial</span>
            </div>
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useReducedMotion } from 'motion/react'
import lawandPhoto from '../../assets/Lawand.jpg'

type ViewMode = 'binary' | 'photo'

const GRID_COLS = 64
const GRID_ROWS = 64
const SCAN_DURATION = 1300 // ~1.3s top-to-bottom scan

function TerminalPortrait() {
  const shouldReduceMotion = useReducedMotion()
  const [mode, setMode] = useState<ViewMode>('binary')
  const [isLoaded, setIsLoaded] = useState(false)
  const [scanKey, setScanKey] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const offscreenDataRef = useRef<Uint8ClampedArray | null>(null)
  const mousePosRef = useRef<{ x: number; y: number } | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const isScanningRef = useRef(false)

  // 1. Load image and compute downsampled pixel map
  useEffect(() => {
    const img = new Image()
    img.src = lawandPhoto

    img.onload = () => {
      const offscreen = document.createElement('canvas')
      offscreen.width = GRID_COLS
      offscreen.height = GRID_ROWS
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true })

      if (!offCtx) return

      offCtx.drawImage(img, 0, 0, GRID_COLS, GRID_ROWS)
      const imgData = offCtx.getImageData(0, 0, GRID_COLS, GRID_ROWS)
      offscreenDataRef.current = imgData.data
      setIsLoaded(true)
    }
  }, [])

  // 2. Render binary portrait with top-to-bottom scan animation
  useEffect(() => {
    if (!isLoaded || mode !== 'binary') return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const data = offscreenDataRef.current
    if (!data) return

    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const size = rect.width || 320

    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    const cellW = size / GRID_COLS
    const cellH = size / GRID_ROWS
    const fontSize = Math.max(Math.floor(cellH * 1.1), 7)

    ctx.font = `500 ${fontSize}px "JetBrains Mono", monospace`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    let scanRow = shouldReduceMotion ? GRID_ROWS : 0
    let startTime: number | null = null
    isScanningRef.current = !shouldReduceMotion

    const render = (now: number) => {
      if (isScanningRef.current) {
        if (!startTime) startTime = now
        const elapsed = now - startTime
        const progress = Math.min(elapsed / SCAN_DURATION, 1)

        scanRow = Math.floor(progress * GRID_ROWS)

        if (progress >= 1) {
          isScanningRef.current = false
          scanRow = GRID_ROWS
        }
      }

      ctx.clearRect(0, 0, size, size)

      const mouse = mousePosRef.current
      const maxRow = Math.min(scanRow, GRID_ROWS)

      for (let row = 0; row < maxRow; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
          const idx = (row * GRID_COLS + col) * 4
          const r = data[idx]
          const g = data[idx + 1]
          const b = data[idx + 2]
          const a = data[idx + 3]

          if (a === 0) continue

          // Natural linear luminance
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
          const centerX = col * cellW + cellW / 2
          const centerY = row * cellH + cellH / 2

          let isNearMouse = false
          if (mouse) {
            const dx = mouse.x - centerX
            const dy = mouse.y - centerY
            if (dx * dx + dy * dy < 1600) {
              isNearMouse = true
            }
          }

          let char = (col + row) % 2 === 0 ? '0' : '1'
          if (isNearMouse && !shouldReduceMotion) {
            char = Math.random() > 0.5 ? '1' : '0'
          }

          if (luminance < 0.12) {
            // Dark shadows
            ctx.fillStyle = 'rgba(255, 255, 255, 0.06)'
            ctx.fillText(char, centerX, centerY)
          } else if (luminance < 0.35) {
            // Soft shadows - balanced, gentle lift
            ctx.fillStyle = isNearMouse
              ? 'rgba(255, 255, 255, 0.55)'
              : 'rgba(156, 163, 175, 0.42)'
            ctx.fillText(char, centerX, centerY)
          } else if (luminance < 0.65) {
            // Natural midtones & facial features - clean, balanced, not washed out
            ctx.fillStyle = isNearMouse
              ? 'rgba(255, 255, 255, 0.88)'
              : 'rgba(175, 183, 195, 0.78)'
            ctx.fillText(char, centerX, centerY)
          } else {
            // Highlights
            ctx.fillStyle = isNearMouse
              ? '#ffffff'
              : 'rgba(255, 255, 255, 0.92)'
            ctx.fillText(char, centerX, centerY)
          }
        }
      }

      // Scanline indicator beam
      if (isScanningRef.current && scanRow < GRID_ROWS) {
        const scanY = scanRow * cellH
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
        ctx.fillRect(0, scanY, size, 2)
      }

      if (isScanningRef.current || mousePosRef.current) {
        animationFrameRef.current = requestAnimationFrame(render)
      }
    }

    animationFrameRef.current = requestAnimationFrame(render)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isLoaded, mode, scanKey, shouldReduceMotion])

  function handleMouseMove(e: MouseEvent<HTMLCanvasElement>) {
    if (isScanningRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(() => {})
    }
  }

  function handleMouseLeave() {
    mousePosRef.current = null
  }

  function handleCardClick() {
    if (mode === 'binary' && !isScanningRef.current) {
      setScanKey((k) => k + 1)
    } else {
      setMode((m) => (m === 'binary' ? 'photo' : 'binary'))
    }
  }

  return (
    <aside
      aria-label="Portrait in terminal format"
      className="portfolio-terminal overflow-hidden"
    >
      <div className="portfolio-terminal-titlebar flex items-center justify-between border-b border-line bg-surface px-4 py-2">
        <div className="portfolio-terminal-title flex items-center gap-3">
          <div aria-hidden="true" className="portfolio-terminal-controls flex gap-1.5">
            <span className="portfolio-terminal-control portfolio-terminal-control--close" />
            <span className="portfolio-terminal-control portfolio-terminal-control--minimize" />
            <span className="portfolio-terminal-control portfolio-terminal-control--maximize" />
          </div>
          <span className="font-mono text-meta text-secondary">
            {mode === 'binary' ? '~/portrait.bin' : '~/portrait.jpg'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-meta">
          {mode === 'binary' && (
            <button
              aria-label="Replay scan animation"
              className="rounded-control px-2 py-0.5 text-secondary hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                setScanKey((k) => k + 1)
              }}
              title="Re-run top-to-bottom scan"
              type="button"
            >
              ⟳ Scan
            </button>
          )}
          <button
            aria-pressed={mode === 'binary'}
            className={`rounded-control px-2 py-0.5 transition-colors cursor-pointer ${
              mode === 'binary'
                ? 'bg-raised text-primary font-medium'
                : 'text-secondary hover:text-primary'
            }`}
            onClick={(e) => {
              e.stopPropagation()
              setMode('binary')
              setScanKey((k) => k + 1)
            }}
            type="button"
          >
            01 Binary
          </button>
          <span className="text-muted">/</span>
          <button
            aria-pressed={mode === 'photo'}
            className={`rounded-control px-2 py-0.5 transition-colors cursor-pointer ${
              mode === 'photo'
                ? 'bg-raised text-primary font-medium'
                : 'text-secondary hover:text-primary'
            }`}
            onClick={(e) => {
              e.stopPropagation()
              setMode('photo')
            }}
            type="button"
          >
            Photo
          </button>
        </div>
      </div>

      <div
        className="relative aspect-square w-full bg-card cursor-pointer"
        onClick={handleCardClick}
        title={
          mode === 'binary'
            ? 'Click to re-scan or switch to Photo'
            : 'Click to switch to Binary'
        }
      >
        {mode === 'binary' ? (
          <canvas
            aria-label="Portrait of Lawand Soran rendered in binary code with top-to-bottom scan"
            className="block h-full w-full"
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            ref={canvasRef}
            role="img"
          />
        ) : (
          <img
            alt="Portrait of Lawand Soran, full-stack developer and founder"
            className="block h-full w-full object-cover"
            src={lawandPhoto}
          />
        )}

        <div className="pointer-events-none absolute bottom-3 right-3 rounded-control bg-raised/80 px-2 py-1 font-mono text-meta text-secondary backdrop-blur-xs">
          {mode === 'binary' ? '64×64 scan' : '702×700 px'}
        </div>
      </div>
    </aside>
  )
}

export default TerminalPortrait

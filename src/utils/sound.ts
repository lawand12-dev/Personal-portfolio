// Web Audio API synthesizer for tactile terminal & UI sounds. Zero external asset dependencies.
let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    void audioCtx.resume()
  }
  return audioCtx
}

const STORAGE_KEY = 'portfolio-sound-enabled'

export function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(STORAGE_KEY) === 'true'
}

export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false')
  window.dispatchEvent(
    new CustomEvent('portfolio-sound-change', { detail: { enabled } }),
  )
}

export function toggleSound(): boolean {
  const next = !isSoundEnabled()
  setSoundEnabled(next)
  if (next) {
    playSwitchSound()
  }
  return next
}

/**
 * Very subtle, soft mechanical click (duration 18ms, pitch drop from 1200Hz to 400Hz).
 * Volume kept very low (0.04) so it sounds like a real tactile switch, not a beep.
 */
export function playKeyClick(): void {
  if (!isSoundEnabled()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    // Pitch envelope
    osc.frequency.setValueAtTime(1200 + Math.random() * 200, now)
    osc.frequency.exponentialRampToValueAtTime(350, now + 0.018)

    // Volume envelope
    gain.gain.setValueAtTime(0.04, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.02)
  } catch {
    // Audio errors are safely ignored on restricted user agents
  }
}

/**
 * Soft tactile double-click for toggles (e.g. 2D/3D skyline, command palette actions).
 */
export function playSwitchSound(): void {
  if (!isSoundEnabled()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(800, now)
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.03)

    gain.gain.setValueAtTime(0.05, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.035)
  } catch {
    // Audio errors are safely ignored
  }
}

import { beforeEach, describe, expect, it } from 'vitest'
import {
  isSoundEnabled,
  playKeyClick,
  playSwitchSound,
  setSoundEnabled,
  toggleSound,
} from './sound'

describe('sound utility', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('defaults to disabled', () => {
    expect(isSoundEnabled()).toBe(false)
  })

  it('can be enabled and disabled', () => {
    setSoundEnabled(true)
    expect(isSoundEnabled()).toBe(true)

    setSoundEnabled(false)
    expect(isSoundEnabled()).toBe(false)
  })

  it('toggles sound state', () => {
    expect(toggleSound()).toBe(true)
    expect(isSoundEnabled()).toBe(true)

    expect(toggleSound()).toBe(false)
    expect(isSoundEnabled()).toBe(false)
  })

  it('safely runs playKeyClick and playSwitchSound without errors', () => {
    expect(() => playKeyClick()).not.toThrow()
    expect(() => playSwitchSound()).not.toThrow()

    setSoundEnabled(true)
    expect(() => playKeyClick()).not.toThrow()
    expect(() => playSwitchSound()).not.toThrow()
  })
})

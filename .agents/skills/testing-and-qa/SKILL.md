---
name: testing-and-qa
description: >-
  Vitest, React Testing Library, jsdom, and automated QA for the portfolio.
  Use when writing unit tests, testing UI interactions, verifying math utilities, or configuring test runners.
---

# Testing & QA Skill

Runbook and standards for testing utilities, hooks, and React components in Lawand Soran's portfolio.

## 1. Test Environment & Stack

- **Runner**: `vitest` with `jsdom` environment.
- **Testing Libraries**: `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`.
- **Target Files**: `src/**/*.test.ts`, `src/**/*.test.tsx`.

## 2. Test Execution

Add to `package.json` scripts if not already present:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Run test suite:
```bash
npm run test
```

## 3. Testing Pure Mathematical Utilities (`src/contribution-utils.ts`)

Test matrix projections, activity levels, bar heights, and streak statistics:
```ts
import { describe, it, expect } from 'vitest'
import { levelOf, barHeight, buildGrid } from './contribution-utils'

describe('contribution-utils', () => {
  it('correctly quantizes commit counts into levels 0-4', () => {
    expect(levelOf(0, 10)).toBe(0)
    expect(levelOf(2, 10)).toBe(1)
    expect(levelOf(10, 10)).toBe(4)
    expect(levelOf(25, 10)).toBe(4)
  })

  it('calculates proper 3D bar height proportional to busy threshold', () => {
    expect(barHeight(0, 10)).toBe(0.2)
    expect(barHeight(10, 10)).toBe(1.0)
  })
})
```

## 4. Testing React Components & Accessibility

Follow Testing Library user-centric principles:
1. **Query by Role First**: Use `getByRole('button', { name: /.../i })`, `getByRole('navigation')`, `getByRole('heading', { level: 1 })`.
2. **Keyboard Interaction**: Use `@testing-library/user-event` to verify Escape key behavior, Tab order, and toggle disclosures.
3. **Assert ARIA States**: Check `aria-expanded`, `aria-pressed`, `aria-busy`, and `aria-hidden` attributes.

Example component test:
```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ActionLink from './ActionLink'
import { BrowserRouter } from 'react-router'

describe('ActionLink', () => {
  it('renders accessible link with primary variant class', () => {
    render(
      <BrowserRouter>
        <ActionLink to="/work" variant="primary">View my work</ActionLink>
      </BrowserRouter>
    )
    const link = screen.getByRole('link', { name: /view my work/i })
    expect(link).toHaveAttribute('href', '/work')
    expect(link).toHaveClass('portfolio-action--primary')
  })
})
```


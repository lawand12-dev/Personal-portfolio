import { useEffect, useState } from 'react'
import ContributionSkyline from '../../contibution'
import type { ContributionDay } from '../../contribution-utils'

type LoadState =
  | { status: 'loading' }
  | { status: 'success'; data: ContributionDay[] }
  | { status: 'error' }

function isContributionDay(value: unknown): value is ContributionDay {
  return (
    typeof value === 'object' &&
    value !== null &&
    'date' in value &&
    typeof value.date === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(value.date) &&
    'count' in value &&
    typeof value.count === 'number' &&
    Number.isSafeInteger(value.count) &&
    value.count >= 0
  )
}

function isContributionResponse(
  value: unknown,
): value is { data: ContributionDay[] } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'data' in value &&
    Array.isArray(value.data) &&
    value.data.every(isContributionDay)
  )
}

function GitHubContributions() {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    async function loadContributions() {
      try {
        const response = await fetch('/api/contributions', {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Contributions request failed with status ${response.status}.`)
        }

        const payload: unknown = await response.json()
        if (!isContributionResponse(payload)) {
          throw new Error('Contributions response has an invalid format.')
        }
        setState({ status: 'success', data: payload.data })
      } catch (error) {
        if (controller.signal.aborted) return
        console.error('Could not load GitHub contributions.', error)
        setState({ status: 'error' })
      }
    }

    void loadContributions()
    return () => controller.abort()
  }, [attempt])

  if (state.status === 'loading') {
    return (
      <p aria-busy="true" className="portfolio-body mt-8 text-secondary" role="status">
        Loading contributions…
      </p>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <p className="portfolio-body text-secondary" role="alert">
          GitHub contributions are temporarily unavailable. Retry loading them or
          view my GitHub profile.
        </p>
        <button
          className="portfolio-action portfolio-action--secondary"
          onClick={() => {
            setState({ status: 'loading' })
            setAttempt((previous) => previous + 1)
          }}
          type="button"
        >
          Retry loading contributions
        </button>
        <a
          className="text-link"
          href="https://github.com/lawand12-dev"
          rel="noreferrer"
          target="_blank"
        >
          GitHub profile
        </a>
      </div>
    )
  }

  return <ContributionSkyline data={state.data} />
}

export default GitHubContributions

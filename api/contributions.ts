import process from 'node:process'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { ContributionDay } from '../src/contibution'

const GITHUB_USERNAME = 'lawand12-dev'
const CONTRIBUTIONS_QUERY = `
  query Contributions($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function readContributionDays(payload: unknown): ContributionDay[] | null {
  if (!isRecord(payload) || !isRecord(payload.data)) return null
  const user = payload.data.user
  if (!isRecord(user)) return null
  const collection = user.contributionsCollection
  if (!isRecord(collection)) return null
  const calendar = collection.contributionCalendar
  if (!isRecord(calendar) || !Array.isArray(calendar.weeks)) return null

  const days: ContributionDay[] = []
  for (const week of calendar.weeks) {
    if (!isRecord(week) || !Array.isArray(week.contributionDays)) return null
    for (const day of week.contributionDays) {
      if (
        !isRecord(day) ||
        typeof day.date !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
        typeof day.contributionCount !== 'number' ||
        !Number.isSafeInteger(day.contributionCount) ||
        day.contributionCount < 0
      ) {
        return null
      }
      days.push({ date: day.date, count: day.contributionCount })
    }
  }

  return days
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  response.setHeader('Cache-Control', 'no-store')
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    console.error('GitHub contributions are unavailable: GITHUB_TOKEN is not configured.')
    return response.status(503).json({ error: 'Contributions are unavailable.' })
  }

  try {
    const githubResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'lawand12-dev-portfolio',
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: { login: GITHUB_USERNAME },
      }),
      signal: AbortSignal.timeout(8000),
    })

    if (!githubResponse.ok) {
      console.error(
        `GitHub contributions request failed with status ${githubResponse.status}.`,
      )
      return response.status(502).json({ error: 'Contributions are unavailable.' })
    }

    const payload: unknown = await githubResponse.json()
    if (
      isRecord(payload) &&
      Array.isArray(payload.errors) &&
      payload.errors.length > 0
    ) {
      console.error('GitHub returned GraphQL errors for the contributions request.')
      return response.status(502).json({ error: 'Contributions are unavailable.' })
    }

    const data = readContributionDays(payload)
    if (!data) {
      console.error('GitHub returned an invalid contributions response.')
      return response.status(502).json({ error: 'Contributions are unavailable.' })
    }

    response.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400',
    )
    return response.status(200).json({ data })
  } catch (error) {
    console.error(
      'GitHub contributions request failed.',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return response.status(502).json({ error: 'Contributions are unavailable.' })
  }
}

import { useEffect, useState } from 'react'
import sample from '@/data/repos.sample.json'
import { site } from '@/lib/site'

export interface Repo {
  name: string
  description: string
  language: string
  color: string
  url: string
  stars?: number
  pushedAt?: string
}

const LANG_COLORS: Record<string, string> = {
  'C#': '#178600',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572a5',
  Java: '#b07219',
  SCSS: '#c6538c',
}

const owner = site.socials.github.split('/').filter(Boolean).pop() ?? ''
const CACHE_KEY = 'gh-repos-v2'
const TTL = 60 * 60 * 1000 // 1 hour

const fallback: Repo[] = sample.map((r) => ({
  ...r,
  url: `${site.socials.github}/${r.name}`,
}))

interface ApiRepo {
  name: string
  description: string | null
  language: string | null
  html_url: string
  stargazers_count: number
  pushed_at: string
  fork: boolean
  archived: boolean
}

function readCache(): Repo[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { at, data } = JSON.parse(raw) as { at: number; data: Repo[] }
    return Date.now() - at < TTL ? data : null
  } catch {
    return null
  }
}

async function fetchRepos(): Promise<Repo[]> {
  const cached = readCache()
  if (cached) return cached
  const res = await fetch(
    `https://api.github.com/users/${owner}/repos?sort=pushed&per_page=30`,
    {
      headers: { Accept: 'application/vnd.github+json' },
    },
  )
  if (!res.ok) throw new Error(`GitHub ${res.status}`) // includes rate limiting
  const list = ((await res.json()) as ApiRepo[])
    .filter((r) => !r.fork && !r.archived && r.name.toLowerCase() !== owner.toLowerCase()) // skip the profile README repo
    .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at))
    .slice(0, 4)
    .map<Repo>((r) => ({
      name: r.name,
      description: r.description ?? '',
      language: r.language ?? '',
      color: LANG_COLORS[r.language ?? ''] ?? 'var(--tm)',
      url: r.html_url,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
    }))
  if (!list.length) throw new Error('No public repos')
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data: list }))
  } catch {
    /* ignore */
  }
  return list
}

/** Latest public repos from GitHub; falls back to sample data if the API fails or is rate-limited. */
export function useRepos() {
  const [state, setState] = useState<{ repos: Repo[]; live: boolean }>({
    repos: fallback,
    live: false,
  })
  useEffect(() => {
    let cancelled = false
    fetchRepos()
      .then((repos) => !cancelled && setState({ repos, live: true }))
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])
  return state
}

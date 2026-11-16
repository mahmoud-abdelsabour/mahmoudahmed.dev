export const SITE_URL: string
export const OG_IMAGE: Record<'en' | 'ar', string>
export const GITHUB_URL: string
export function pagePath(lang: 'en' | 'ar', sub?: string): string

export interface SeoStrings {
  title: string
  description: string
  projectSuffix: string
  ogAlt: string
  jobTitle: string
}

export interface Meta {
  title: string
  description: string
  canonical: string
  alternates: { hreflang: string; href: string }[]
  image: string
  imageAlt: string
  locale: string
  noindex: boolean
  jsonLd: Record<string, unknown>[]
}

export function buildMeta(o: {
  lang: 'en' | 'ar'
  sub?: string
  seo: SeoStrings
  brand: { first: string; last: string }
  project?: { title: string; summary: string } | null
  notFound?: boolean
  draft?: boolean
}): Meta
export function metaToHtml(m: Meta): string

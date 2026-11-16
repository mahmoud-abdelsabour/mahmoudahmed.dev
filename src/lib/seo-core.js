// Shared by the app (client-side head updates) and scripts/prerender.mjs (static HTML at build time).
// Plain JS on purpose: Node runs it directly, TypeScript reads seo-core.d.ts.

export const SITE_URL = 'https://mahmoudahmed.dev'
export const OG_IMAGE = { en: '/og/og-en.png', ar: '/og/og-ar.png' }
export const GITHUB_URL = 'https://github.com/mahmoud-abdelsabour'

const prefix = (lang) => (lang === 'ar' ? '/ar' : '')

/** Public path for a page in a language. `sub` is '' (home) or '/projects/<slug>'. */
export const pagePath = (lang, sub = '') => `${prefix(lang)}${sub}` || '/'

/**
 * @param {{
 *  lang: 'en'|'ar',
 *  sub?: string,
 *  seo: { title: string, description: string, projectSuffix: string, ogAlt: string, jobTitle: string },
 *  brand: { first: string, last: string },
 *  project?: { title: string, summary: string } | null,
 *  notFound?: boolean,
 *  draft?: boolean,
 * }} o
 */
export function buildMeta({ lang, sub = '', seo, brand, project = null, notFound = false, draft = false }) {
  const name = `${brand.first} ${brand.last}`
  const title = project ? `${project.title} · ${seo.projectSuffix} · ${name}` : seo.title
  const description = project ? project.summary : seo.description
  const canonical = SITE_URL + pagePath(lang, sub)
  const alternates = notFound
    ? []
    : [
        { hreflang: 'en', href: SITE_URL + pagePath('en', sub) },
        { hreflang: 'ar', href: SITE_URL + pagePath('ar', sub) },
        { hreflang: 'x-default', href: SITE_URL + pagePath('en', sub) },
      ]
  const image = SITE_URL + OG_IMAGE[lang]
  const jsonLd = notFound
    ? []
    : project
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.summary,
            inLanguage: lang,
            url: canonical,
            author: { '@type': 'Person', name, url: SITE_URL },
          },
        ]
      : [
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
            name,
            jobTitle: seo.jobTitle,
            url: SITE_URL,
            sameAs: [GITHUB_URL],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            '@id': `${SITE_URL}/#service`,
            name,
            description: seo.description,
            url: canonical,
            inLanguage: lang,
            areaServed: ['EG', 'SA', 'AE', 'Worldwide'],
            founder: { '@id': `${SITE_URL}/#person` },
          },
        ]
  return {
    title,
    description,
    canonical,
    alternates,
    image,
    imageAlt: seo.ogAlt,
    locale: lang === 'ar' ? 'ar_AR' : 'en_US',
    noindex: notFound || draft,
    jsonLd,
  }
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Head tags as an HTML string (used at build time). */
export function metaToHtml(m) {
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta data-seo name="description" content="${esc(m.description)}" />`,
    `<link data-seo rel="canonical" href="${esc(m.canonical)}" />`,
    ...m.alternates.map(
      (a) => `<link data-seo rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}" />`,
    ),
    m.noindex ? '<meta data-seo name="robots" content="noindex" />' : '',
    `<meta data-seo property="og:type" content="website" />`,
    `<meta data-seo property="og:site_name" content="Mahmoud Abdelsabour" />`,
    `<meta data-seo property="og:title" content="${esc(m.title)}" />`,
    `<meta data-seo property="og:description" content="${esc(m.description)}" />`,
    `<meta data-seo property="og:url" content="${esc(m.canonical)}" />`,
    `<meta data-seo property="og:locale" content="${m.locale}" />`,
    `<meta data-seo property="og:image" content="${esc(m.image)}" />`,
    `<meta data-seo property="og:image:width" content="1200" />`,
    `<meta data-seo property="og:image:height" content="630" />`,
    `<meta data-seo property="og:image:alt" content="${esc(m.imageAlt)}" />`,
    `<meta data-seo name="twitter:card" content="summary_large_image" />`,
    `<meta data-seo name="twitter:title" content="${esc(m.title)}" />`,
    `<meta data-seo name="twitter:description" content="${esc(m.description)}" />`,
    `<meta data-seo name="twitter:image" content="${esc(m.image)}" />`,
    ...m.jsonLd.map(
      (j) => `<script data-seo type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`,
    ),
  ]
  return tags.filter(Boolean).join('\n    ')
}

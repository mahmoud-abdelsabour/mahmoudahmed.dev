// Post-build step: writes one HTML file per route with the right <title>, description, canonical,
// hreflang, Open Graph and JSON-LD already in the source (crawlers and link previews don't run JS),
// plus sitemap.xml and robots.txt. Run automatically by `npm run build`.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL, buildMeta, metaToHtml, pagePath } from '../src/lib/seo-core.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const json = async (p) => JSON.parse(await readFile(join(root, p), 'utf8'))

const projects = await json('src/data/projects.json')
const locales = {}
for (const lang of ['en', 'ar']) locales[lang] = await json(`src/locales/${lang}/common.json`)

const shell = await readFile(join(dist, 'index.html'), 'utf8')

function render(lang, sub, opts = {}) {
  const c = locales[lang]
  const meta = buildMeta({ lang, sub, seo: c.seo, brand: c.brand, ...opts })
  let html = shell
    .replace(/<title>.*?<\/title>/s, metaToHtml(meta))
    .replace(/<html lang="en">/, `<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">`)
  return html
}

async function emit(path, html) {
  const file = path === '/' ? 'index.html' : join(path.slice(1), 'index.html')
  await mkdir(dirname(join(dist, file)), { recursive: true })
  await writeFile(join(dist, file), html)
}

const urls = [] // sitemap entries: { sub }
for (const lang of ['en', 'ar']) {
  await emit(pagePath(lang), render(lang, ''))
  for (const p of projects) {
    const sub = `/projects/${p.slug}`
    await emit(
      pagePath(lang, sub),
      render(lang, sub, {
        project: { title: p.title[lang], summary: p.summary[lang] },
        draft: Boolean(p.draft),
      }),
    )
  }
}
urls.push('', ...projects.filter((p) => !p.draft).map((p) => `/projects/${p.slug}`))

// 404.html: Vercel serves it (with a 404 status) for unknown URLs; the client router shows NotFound.
await writeFile(join(dist, '404.html'), render('en', '/404', { notFound: true }))

const today = new Date().toISOString().slice(0, 10)
const entry = (sub) =>
  ['en', 'ar']
    .map(
      (lang) => `  <url>
    <loc>${SITE_URL}${pagePath(lang, sub)}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${pagePath('en', sub)}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${SITE_URL}${pagePath('ar', sub)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${pagePath('en', sub)}"/>
  </url>`,
    )
    .join('\n')
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(entry).join('\n')}
</urlset>
`,
)
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
console.log(`prerender: ${2 + projects.length * 2} pages + 404, sitemap (${urls.length * 2} urls), robots`)

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import projects from '@/data/projects.json'
import { useLang } from '@/hooks/useLang'
import { loc } from '@/lib/localize'
import { buildMeta, metaToHtml, type SeoStrings } from '@/lib/seo-core'

/** Keeps <title>, description, canonical, hreflang, Open Graph and JSON-LD in sync on client navigation. */
export default function Seo() {
  const { pathname } = useLocation()
  const { lang } = useLang()
  const { t } = useTranslation()

  useEffect(() => {
    const sub = pathname.replace(/^\/ar(?=\/|$)/, '').replace(/\/+$/, '')
    const slug = /^\/projects\/([^/]+)$/.exec(sub)?.[1]
    const p = slug ? projects.find((x) => x.slug === slug) : undefined
    const notFound = sub !== '' && !p
    const m = buildMeta({
      lang,
      sub,
      seo: t('seo', { returnObjects: true }) as SeoStrings,
      brand: { first: t('brand.first'), last: t('brand.last') },
      project: p ? { title: loc(p.title, lang), summary: loc(p.summary, lang) } : null,
      notFound,
      draft: Boolean(p?.draft),
    })
    document.title = m.title
    document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove())
    const tpl = document.createElement('template')
    tpl.innerHTML = metaToHtml(m).replace(/<title>.*?<\/title>/, '')
    // Scripts created via innerHTML don't run, which is fine for JSON-LD (data only).
    document.head.append(tpl.content)
  }, [pathname, lang, t])

  return null
}

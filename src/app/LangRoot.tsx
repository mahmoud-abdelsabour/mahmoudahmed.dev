import { useLayoutEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router'
import SiteLayout from '@/components/layout/SiteLayout'
import { LangContext } from '@/hooks/useLang'
import i18n, { type Lang } from '@/lib/i18n'

export default function LangRoot({ lang }: { lang: Lang }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const [ready, setReady] = useState(i18n.language === lang)

  // Switch language (and <html lang/dir>) before paint. Children render only once i18n matches,
  // so nothing is updated mid-render.
  useLayoutEffect(() => {
    const el = document.documentElement
    el.lang = lang
    el.dir = dir
    if (i18n.language === lang) {
      setReady(true)
      return
    }
    setReady(false)
    void i18n.changeLanguage(lang).then(() => setReady(true))
  }, [lang, dir])

  const value = useMemo(
    () => ({ lang, dir, base: lang === 'ar' ? '/ar' : '' }) as const,
    [lang, dir],
  )
  if (!ready || i18n.language !== lang) return null
  return (
    <LangContext.Provider value={value}>
      <SiteLayout>
        <Outlet />
      </SiteLayout>
    </LangContext.Provider>
  )
}

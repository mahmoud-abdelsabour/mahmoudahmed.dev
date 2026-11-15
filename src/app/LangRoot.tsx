import { useLayoutEffect, useMemo } from 'react'
import { Outlet } from 'react-router'
import { LangContext } from '@/hooks/useLang'
import i18n, { type Lang } from '@/lib/i18n'
import SiteLayout from '@/components/layout/SiteLayout'

export default function LangRoot({ lang }: { lang: Lang }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  if (i18n.language !== lang) void i18n.changeLanguage(lang)

  useLayoutEffect(() => {
    const el = document.documentElement
    el.lang = lang
    el.dir = dir
  }, [lang, dir])

  const value = useMemo(
    () => ({ lang, dir, base: lang === 'ar' ? '/ar' : '' }) as const,
    [lang, dir],
  )
  return (
    <LangContext.Provider value={value}>
      <SiteLayout>
        <Outlet />
      </SiteLayout>
    </LangContext.Provider>
  )
}

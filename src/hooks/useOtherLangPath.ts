import { useLocation } from 'react-router'
import { useLang } from '@/hooks/useLang'

/** Path of the current page in the other language. */
export function useOtherLangPath() {
  const { lang } = useLang()
  const { pathname, search, hash } = useLocation()
  const rest = pathname.replace(/^\/ar(?=\/|$)/, '') || '/'
  const target = lang === 'ar' ? rest : `/ar${rest === '/' ? '' : rest}`
  return `${target || '/'}${search}${hash}`
}

import { createContext, useContext } from 'react'
import type { Lang } from '@/lib/i18n'

export interface LangCtx {
  lang: Lang
  dir: 'ltr' | 'rtl'
  /** '' for English, '/ar' for Arabic — prefix for internal links */
  base: string
}

export const LangContext = createContext<LangCtx>({ lang: 'en', dir: 'ltr', base: '' })
export const useLang = () => useContext(LangContext)

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import arHome from '@/locales/ar/home.json'
import ar from '@/locales/ar/common.json'
import enHome from '@/locales/en/home.json'
import en from '@/locales/en/common.json'

export type Lang = 'en' | 'ar'

export const langFromPath = (pathname: string): Lang =>
  pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en'

void i18n.use(initReactI18next).init({
  resources: {
    en: { common: en, home: enHome },
    ar: { common: ar, home: arHome },
  },
  lng: typeof window === 'undefined' ? 'en' : langFromPath(window.location.pathname),
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
})

export default i18n

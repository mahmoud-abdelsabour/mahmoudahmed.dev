import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import ScrollManager from '@/app/ScrollManager'
import Footer from './Footer'
import Navbar from './Navbar'
import WhatsAppFab from './WhatsAppFab'

export default function SiteLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-50 focus:rounded-btn focus:bg-acc focus:px-4 focus:py-2 focus:font-semibold focus:text-accfg"
      >
        {t('nav.skip')}
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}

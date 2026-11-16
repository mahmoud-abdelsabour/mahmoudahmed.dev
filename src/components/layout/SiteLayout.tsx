import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import ScrollManager from '@/app/ScrollManager'
import Seo from '@/app/Seo'
import ScrollProgress from './ScrollProgress'
import Footer from './Footer'
import Navbar from './Navbar'
import WhatsAppFab from './WhatsAppFab'

export default function SiteLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-50 focus:rounded-btn focus:bg-acc focus:px-4 focus:py-2 focus:font-semibold focus:text-accfg"
      >
        {t('nav.skip')}
      </a>
      <ScrollManager />
      <Seo />
      <ScrollProgress />
      <Navbar />
      <motion.main
        id="main"
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}

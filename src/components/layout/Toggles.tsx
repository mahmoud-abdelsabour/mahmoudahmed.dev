import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'
import { useLang } from '@/hooks/useLang'
import { useOtherLangPath } from '@/hooks/useOtherLangPath'
import { useTheme } from '@/hooks/useTheme'

export function LangToggle({ className }: { className?: string }) {
  const { t } = useTranslation()
  const { lang } = useLang()
  const to = useOtherLangPath()
  return (
    <Button
      to={to}
      variant="ghost"
      icon
      className={`text-sm font-bold ${className ?? ''}`}
      aria-label={lang === 'ar' ? t('toggle.toEnglish') : t('toggle.toArabic')}
      hrefLang={lang === 'ar' ? 'en' : 'ar'}
    >
      {lang === 'ar' ? 'EN' : 'ع'}
    </Button>
  )
}

export function ThemeToggle() {
  const { t } = useTranslation()
  const { theme, toggle } = useTheme()
  return (
    <Button variant="ghost" icon onClick={toggle} aria-label={t('toggle.switchTheme')}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="inline-flex"
          initial={{ rotate: -80, scale: 0.6, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 80, scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </motion.span>
      </AnimatePresence>
    </Button>
  )
}

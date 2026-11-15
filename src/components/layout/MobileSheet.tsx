import { ArrowRight, MessageCircle, Moon, Sun, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import { useLang } from '@/hooks/useLang'
import { useOtherLangPath } from '@/hooks/useOtherLangPath'
import { useTheme } from '@/hooks/useTheme'
import { sections, whatsappLink } from '@/lib/site'

const seg = (active: boolean) =>
  `min-h-[38px] min-w-11 rounded-[7px] px-3 text-sm font-semibold transition ${
    active ? 'bg-acc-soft text-tp' : 'text-ts'
  }`

const group = 'inline-flex gap-0.5 rounded-btn border border-border bg-surface p-[3px]'

export default function MobileSheet({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { t } = useTranslation()
  const { lang, base } = useLang()
  const { theme, setTheme } = useTheme()
  const otherLang = useOtherLangPath()
  const navigate = useNavigate()
  const home = base || '/'

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const switchTo = (target: 'en' | 'ar') => {
    if (lang === target) return
    onClose()
    navigate(otherLang)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.mobileLabel')}
          className="fixed inset-0 z-40 flex flex-col bg-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="mx-auto flex h-[68px] w-full max-w-[1264px] items-center justify-between px-5">
            <span className="inline-flex items-center gap-2.5 text-base font-bold text-tp">
              <Logo />
              {t('brand.first')}
            </span>
            <Button
              variant="secondary"
              icon
              onClick={onClose}
              aria-label={t('nav.closeMenu')}
            >
              <X size={20} />
            </Button>
          </div>

          <nav aria-label={t('nav.mobileLabel')} className="flex flex-col px-5 py-2">
            {sections.map((id) => (
              <Link
                key={id}
                to={{ pathname: home, hash: `#${id}` }}
                onClick={onClose}
                className="flex min-h-14 items-center justify-between border-b border-border text-xl font-semibold text-tp no-underline"
              >
                {t(`nav.${id}`)}
                <ArrowRight size={18} className="text-tm rtl:-scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-2.5 border-t border-border p-5">
            <div className="flex items-center justify-between gap-3">
              <div role="group" aria-label={t('toggle.language')} className={group}>
                <button
                  type="button"
                  aria-pressed={lang === 'en'}
                  className={seg(lang === 'en')}
                  onClick={() => switchTo('en')}
                >
                  EN
                </button>
                <button
                  type="button"
                  aria-pressed={lang === 'ar'}
                  className={seg(lang === 'ar')}
                  onClick={() => switchTo('ar')}
                >
                  عربي
                </button>
              </div>
              <div role="group" aria-label={t('toggle.theme')} className={group}>
                <button
                  type="button"
                  aria-label={t('toggle.dark')}
                  aria-pressed={theme === 'dark'}
                  className={seg(theme === 'dark')}
                  onClick={() => setTheme('dark')}
                >
                  <Moon size={16} className="mx-auto" />
                </button>
                <button
                  type="button"
                  aria-label={t('toggle.light')}
                  aria-pressed={theme === 'light'}
                  className={seg(theme === 'light')}
                  onClick={() => setTheme('light')}
                >
                  <Sun size={16} className="mx-auto" />
                </button>
              </div>
            </div>
            <Button to={`${home}#contact`} size="lg" block onClick={onClose}>
              {t('cta.book')}
            </Button>
            <Button
              href={whatsappLink(t('whatsappPrefill'))}
              variant="secondary"
              size="lg"
              block
            >
              <MessageCircle size={18} />
              {t('cta.whatsapp')}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

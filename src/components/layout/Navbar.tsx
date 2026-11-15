import { CalendarCheck, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import { useLang } from '@/hooks/useLang'
import { sections } from '@/lib/site'
import MobileSheet from './MobileSheet'
import { LangToggle, ThemeToggle } from './Toggles'

export default function Navbar() {
  const { t } = useTranslation()
  const { base } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const home = base || '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur-[14px]">
        <div
          className={`mx-auto flex w-full max-w-[1264px] items-center gap-4 px-5 transition-[height] duration-200 md:px-8 ${
            scrolled ? 'h-[60px]' : 'h-[68px]'
          }`}
        >
          <Link
            to={{ pathname: home, hash: '#top' }}
            aria-label={t('nav.home')}
            className="inline-flex min-h-11 items-center gap-2.5 text-base font-bold text-tp no-underline hover:text-tp"
          >
            <Logo />
            <span>
              {t('brand.first')}{' '}
              <span className="hidden font-medium text-tm md:inline">
                {t('brand.last')}
              </span>
            </span>
          </Link>

          <nav aria-label={t('nav.label')} className="ms-auto hidden gap-1 lg:flex">
            {sections.map((id) => (
              <Link
                key={id}
                to={{ pathname: home, hash: `#${id}` }}
                className="inline-flex min-h-11 items-center rounded-btn-sm px-3 text-[15px] font-medium text-ts no-underline transition hover:bg-acc-soft hover:text-tp"
              >
                {t(`nav.${id}`)}
              </Link>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-1.5 lg:ms-3">
            <LangToggle className="hidden lg:inline-flex" />
            <ThemeToggle />
            <Button to={`${home}#contact`} className="hidden lg:inline-flex">
              <CalendarCheck size={18} />
              {t('cta.book')}
            </Button>
            <Button
              variant="secondary"
              icon
              className="lg:hidden"
              aria-label={t('nav.openMenu')}
              aria-haspopup="dialog"
              onClick={() => setOpen(true)}
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </header>
      <MobileSheet open={open} onClose={() => setOpen(false)} />
    </>
  )
}

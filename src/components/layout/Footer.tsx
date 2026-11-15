import { ArrowUp, Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { GitHubIcon, LinkedInIcon } from '@/components/icons/brands'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import { useLang } from '@/hooks/useLang'
import { site } from '@/lib/site'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const { t } = useTranslation()
  const { base } = useLang()
  const top = { pathname: base || '/', hash: '#top' }
  const socials = [
    { key: 'github', href: site.socials.github, icon: <GitHubIcon />, label: 'GitHub' },
    {
      key: 'linkedin',
      href: site.socials.linkedin,
      icon: <LinkedInIcon />,
      label: 'LinkedIn',
    },
    {
      key: 'mostaql',
      href: site.socials.mostaql,
      icon: <span className="text-sm font-bold">م</span>,
      label: 'Mostaql',
    },
    {
      key: 'khamsat',
      href: site.socials.khamsat,
      icon: <span className="text-sm font-bold">خ</span>,
      label: 'Khamsat',
    },
  ].filter((s) => s.href)

  return (
    <footer className="border-t border-border pt-12 pb-8">
      <div className="mx-auto w-full max-w-[1264px] px-5 md:px-8">
        <div className="flex flex-wrap items-start justify-between gap-7">
          <div className="flex flex-col gap-3">
            <Link
              to={top}
              className="inline-flex items-center gap-2.5 font-bold text-tp no-underline hover:text-tp"
            >
              <Logo />
              {t('brand.first')} {t('brand.last')}
            </Link>
            <p className="text-ts">{t('footer.tagline')}</p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <ul className="flex gap-1.5" aria-label={t('footer.socials')}>
              {socials.map((s) => (
                <li key={s.key}>
                  <Button href={s.href} variant="secondary" icon aria-label={s.label}>
                    {s.icon}
                  </Button>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              <Button href={site.cv.en} variant="ghost" size="sm" download>
                <Download size={16} />
                {t('footer.cvEn')}
              </Button>
              <Button href={site.cv.ar} variant="ghost" size="sm" download>
                <Download size={16} />
                {t('footer.cvAr')}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-[13px] text-tm">
          <p>{t('footer.rights', { year: YEAR })}</p>
          <Link
            to={top}
            className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ts no-underline hover:text-tp"
          >
            <ArrowUp size={16} />
            {t('footer.top')}
          </Link>
        </div>
      </div>
    </footer>
  )
}

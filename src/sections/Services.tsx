import { ArrowRight, Check, LayoutDashboard, AppWindow, Plug, Wrench } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { Section, SectionHead, cardCls, liftCls } from '@/components/ui/Section'
import { useLang } from '@/hooks/useLang'
import { site } from '@/lib/site'

interface Item {
  title: string
  text: string
  gets: string[]
}

const icons = [LayoutDashboard, AppWindow, Wrench, Plug]

export default function Services() {
  const { t } = useTranslation('home')
  const { base } = useLang()
  const items = t('services.items', { returnObjects: true }) as Item[]

  return (
    <Section id="services">
      <SectionHead
        className="mb-10 lg:mb-14"
        eyebrow={t('services.eyebrow')}
        title={t('services.title')}
        lead={t('services.lead')}
      />
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {items.map((item, i) => {
          const Icon = icons[i]
          return (
            <article
              key={item.title}
              className={`${cardCls} ${liftCls} flex flex-col gap-4 p-6 lg:p-8`}
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex size-11 flex-none items-center justify-center rounded-btn bg-acc-soft text-acc">
                  <Icon size={22} />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl leading-snug">{item.title}</h3>
                  <p className="text-ts">{item.text}</p>
                </div>
              </div>
              <div>
                <p className="mb-2.5 text-xs font-semibold tracking-[.06em] text-tm uppercase rtl:tracking-normal">
                  {t('services.get')}
                </p>
                <ul className="flex flex-col gap-2">
                  {item.gets.map((g) => (
                    <li key={g} className="flex items-start gap-2.5 text-[15px] text-ts">
                      <Check size={16} className="mt-1 flex-none text-acc" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-border pt-4">
                {site.showPrices ? (
                  <span className="text-sm text-tm">
                    {t('services.from')}{' '}
                    <b className="text-base text-tp">{t('services.price')}</b>
                  </span>
                ) : (
                  <span />
                )}
                <Link
                  to={{ pathname: base || '/', hash: '#contact' }}
                  className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-acc no-underline hover:text-acch"
                >
                  {t('services.discuss')}
                  <ArrowRight size={16} className="rtl:-scale-x-100" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}

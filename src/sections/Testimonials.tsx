import { MessageSquareQuote } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { buttonClass } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHead, cardCls } from '@/components/ui/Section'
import { useLang } from '@/hooks/useLang'

/** Empty state until real reviews exist. Swap for quote cards later (data/testimonials.json). */
export default function Testimonials() {
  const { t } = useTranslation('home')
  const { base } = useLang()
  return (
    <Section id="testimonials">
      <SectionHead
        className="mb-10 lg:mb-14"
        eyebrow={t('testimonials.eyebrow')}
        title={t('testimonials.title')}
      />
      <Reveal
        className={`${cardCls} flex flex-col items-center gap-3.5 border-dashed px-6 py-10 text-center`}
      >
        <span className="inline-flex size-11 items-center justify-center rounded-btn bg-acc-soft text-acc">
          <MessageSquareQuote size={22} />
        </span>
        <h3 className="text-xl">{t('testimonials.emptyTitle')}</h3>
        <p className="max-w-[460px] text-ts">{t('testimonials.emptyText')}</p>
        <Link
          to={{ pathname: base || '/', hash: '#contact' }}
          className={buttonClass({ variant: 'primary', size: 'md' })}
        >
          {t('testimonials.start')}
        </Link>
      </Reveal>
    </Section>
  )
}

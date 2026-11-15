import { ImageIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Section, SectionHead, cardCls } from '@/components/ui/Section'

interface Stat {
  value: string
  label: string
}
interface Entry {
  when: string
  title: string
  text: string
}

export default function About() {
  const { t } = useTranslation('home')
  const stats = t('about.stats', { returnObjects: true }) as Stat[]
  const timeline = t('about.timeline', { returnObjects: true }) as Entry[]
  return (
    <Section id="about">
      <div className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-16">
        <div className="flex flex-col gap-4">
          {/* Replace with <img src="/images/mahmoud.webp" …> once you have a photo */}
          <div className="flex aspect-[4/5] flex-col items-center justify-center gap-2.5 rounded-photo border border-dashed border-border bg-[linear-gradient(160deg,var(--acc-soft),var(--surface))] p-6 text-center text-sm text-tm">
            <ImageIcon size={32} aria-hidden="true" />
            {t('about.photo')}
          </div>
          <ul className="grid grid-cols-3 gap-2.5">
            {stats.map((s) => (
              <li key={s.label} className={`${cardCls} px-3.5 py-4`}>
                <b className="block text-[26px] leading-[1.1] font-bold tracking-tight text-tp">
                  {s.value}
                </b>
                <span className="mt-1.5 block text-[13px] leading-snug text-ts">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <SectionHead eyebrow={t('about.eyebrow')} title={t('about.title')} />
          <p className="lead">{t('about.bio')}</p>
          <ol className="flex flex-col">
            {timeline.map((e) => (
              <li
                key={e.title}
                className="grid gap-1 border-t border-border py-4 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-3.5"
              >
                <span className="font-mono text-xs text-tm rtl:font-sans rtl:text-[13px]">
                  {e.when}
                </span>
                <div>
                  <h4 className="text-[17px] leading-snug">{e.title}</h4>
                  <p className="mt-1 text-sm text-ts">{e.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}

import { CheckCircle2, MessagesSquare, ClipboardList, Hammer, Rocket } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Section, SectionHead } from '@/components/ui/Section'

interface Step {
  title: string
  text: string
  get: string
}
const icons = [MessagesSquare, ClipboardList, Hammer, Rocket]

export default function Process() {
  const { t } = useTranslation('home')
  const steps = t('process.steps', { returnObjects: true }) as Step[]
  return (
    <Section id="process">
      <SectionHead
        className="mb-10 lg:mb-14"
        eyebrow={t('process.eyebrow')}
        title={t('process.title')}
        lead={t('process.lead')}
      />
      <ol className="grid lg:grid-cols-4 lg:gap-6">
        {steps.map((s, i) => {
          const Icon = icons[i]
          const last = i === steps.length - 1
          return (
            <li
              key={s.title}
              className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 pb-8 last:pb-0 lg:grid-cols-1 lg:pb-0"
            >
              {!last && (
                <span
                  aria-hidden="true"
                  className="absolute [inset-inline-start:23px] top-12 bottom-0 w-0.5 bg-border lg:[inset-inline-start:56px] lg:[inset-inline-end:-24px] lg:top-6 lg:bottom-auto lg:h-0.5 lg:w-auto"
                />
              )}
              <span className="relative z-[1] inline-flex size-12 items-center justify-center rounded-full border border-border bg-surface text-acc">
                <Icon size={20} />
              </span>
              <div className="flex flex-col gap-2">
                <p dir="ltr" className="font-mono text-xs text-tm rtl:text-start">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="text-xl">{s.title}</h3>
                <p className="text-ts">{s.text}</p>
                <p className="mt-1.5 flex items-start gap-2.5 rounded-btn bg-acc-soft px-3.5 py-3 text-sm text-tp">
                  <CheckCircle2 size={16} className="mt-[3px] flex-none text-acc" />
                  <span>
                    <b>{t('process.gets')}</b> {s.get}
                  </span>
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}

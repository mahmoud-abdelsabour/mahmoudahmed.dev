import { useTranslation } from 'react-i18next'
import { Section, SectionHead, cardCls } from '@/components/ui/Section'
import stack from '@/data/stack.json'

const groups = ['backend', 'frontend', 'database', 'tools'] as const

export default function TechStack() {
  const { t } = useTranslation('home')
  return (
    <Section id="stack">
      <SectionHead
        className="mb-10 lg:mb-14"
        eyebrow={t('stack.eyebrow')}
        title={t('stack.title')}
        lead={t('stack.lead')}
      />
      <div className="grid gap-3 xl:grid-cols-4 xl:gap-4 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g} className={`${cardCls} flex flex-col gap-4 p-[22px]`}>
            <h3 className="text-[17px]">{t(`stack.groups.${g}`)}</h3>
            <ul className="grid grid-cols-2 gap-2">
              {stack[g].map((s) => (
                <li
                  key={s.name}
                  className="flex min-h-[52px] items-center gap-2.5 rounded-btn border border-border bg-bg p-2.5 text-sm font-medium text-tp"
                >
                  <span
                    dir="ltr"
                    aria-hidden="true"
                    className="inline-flex size-[30px] flex-none items-center justify-center rounded-[7px] font-mono text-[11px] font-bold"
                    style={{
                      color: s.color,
                      background: `color-mix(in srgb, ${s.color} 16%, transparent)`,
                    }}
                  >
                    {s.mark}
                  </span>
                  <bdi>{s.name}</bdi>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

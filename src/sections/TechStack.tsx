import { useTranslation } from 'react-i18next'
import { Section, SectionHead, cardCls } from '@/components/ui/Section'
import { Item, Stagger } from '@/components/ui/Reveal'
import icons from '@/data/stack-icons.json'
import stack from '@/data/stack.json'

type IconId = keyof typeof icons

function StackIcon({ id }: { id: string }) {
  const icon = icons[id as IconId]
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-[34px] flex-none items-center justify-center rounded-[8px] bg-[color-mix(in_srgb,var(--tp)_7%,transparent)] p-1.5"
    >
      <svg
        viewBox={`0 0 ${icon.width} ${icon.height}`}
        className="size-full"
        dangerouslySetInnerHTML={{ __html: icon.body }}
      />
    </span>
  )
}

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
      <Stagger className="grid gap-3 xl:grid-cols-4 xl:gap-4 sm:grid-cols-2">
        {groups.map((g) => (
          <Item key={g} className={`${cardCls} flex flex-col gap-4 p-[22px]`}>
            <h3 className="text-[17px]">{t(`stack.groups.${g}`)}</h3>
            <ul className="grid grid-cols-2 gap-2">
              {stack[g].map((s) => (
                <li
                  key={s.name}
                  className="flex min-h-[52px] items-center gap-2.5 rounded-btn border border-border bg-bg p-2.5 text-sm font-medium text-tp"
                >
                  <StackIcon id={s.icon} />
                  <bdi>{s.name}</bdi>
                </li>
              ))}
            </ul>
          </Item>
        ))}
      </Stagger>
    </Section>
  )
}

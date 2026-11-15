import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Code2,
  FolderCheck,
  MessageCircle,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'
import { Frame, HeroMock } from '@/components/ui/Mock'
import { Container } from '@/components/ui/Section'
import { whatsappLink } from '@/lib/site'

export default function Hero() {
  const { t } = useTranslation('home')
  const { t: tc } = useTranslation()
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-14 pb-[72px] lg:pt-24 lg:pb-[120px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(var(--grid)_1px,transparent_1.2px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_20%,transparent_75%)] [background-size:22px_22px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute [inset-inline-end:-160px] -top-[200px] -z-10 size-[720px] bg-[radial-gradient(circle,var(--acc-soft),transparent_65%)]"
      />
      <Container className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14">
        <div className="flex flex-col items-start gap-[22px]">
          <span className="inline-flex h-8 items-center gap-2 rounded-full border border-border bg-surface px-3 text-[13px] font-medium text-ts">
            <i className="size-2 rounded-full bg-succ shadow-[0_0_0_3px_color-mix(in_srgb,var(--succ)_25%,transparent)]" />
            {t('hero.available')}
          </span>
          <p className="eyebrow rtl:font-sans rtl:text-sm rtl:font-semibold rtl:tracking-normal rtl:normal-case">
            {t('hero.eyebrow')}
          </p>
          <h1 className="display rtl:text-[38px] rtl:leading-[1.3] rtl:tracking-normal lg:rtl:text-[54px]">
            {t('hero.titleA')}
            <span className="text-acc">{t('hero.titleB')}</span>
          </h1>
          <p className="max-w-[540px] lead">{t('hero.lead')}</p>
          <div className="flex w-full flex-wrap gap-3">
            <Button to="#contact" size="lg" className="flex-1 basis-[200px] md:flex-none">
              <CalendarCheck size={18} />
              {tc('cta.book')}
            </Button>
            <Button
              href={whatsappLink(tc('whatsappPrefill'))}
              variant="secondary"
              size="lg"
              className="flex-1 basis-[200px] md:flex-none"
            >
              <MessageCircle size={18} />
              {tc('cta.whatsapp')}
            </Button>
          </div>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ts">
            <li className="inline-flex items-center gap-[7px]">
              <FolderCheck size={16} className="text-acc" />
              {t('hero.trustProjects')}
            </li>
            <li className="inline-flex items-center gap-[7px]">
              <Code2 size={16} className="text-acc" />
              <bdi>{t('hero.trustStack')}</bdi>
            </li>
            <li className="inline-flex items-center gap-[7px]">
              <Clock size={16} className="text-acc" />
              {t('hero.trustReply')}
            </li>
          </ul>
        </div>

        <div className="relative">
          <Frame url="app.yourclient.com/dashboard" label={t('hero.mockAria')}>
            <HeroMock />
          </Frame>
          <div className="absolute [inset-inline-start:-14px] -bottom-[18px] flex items-center gap-2.5 rounded-xl border border-border bg-elev px-3.5 py-2.5 text-[13px] font-medium text-tp shadow-sh3">
            <CheckCircle2 size={16} className="text-succ" />
            <span>{t('hero.float')}</span>
          </div>
        </div>
      </Container>
    </section>
  )
}

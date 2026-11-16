import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  ExternalLink,
  Layers,
  MessageCircle,
  ShieldCheck,
  Zap,
  Video,
} from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import { GitHubIcon } from '@/components/icons/brands'
import Gallery from '@/components/project/Gallery'
import VideoPlayer from '@/components/project/VideoPlayer'
import Button from '@/components/ui/Button'
import { Frame, ProjectMock, type MockKind } from '@/components/ui/Mock'
import { Container, cardCls } from '@/components/ui/Section'
import projects from '@/data/projects.json'
import { useLang } from '@/hooks/useLang'
import { useTheme } from '@/hooks/useTheme'
import { openCal } from '@/lib/cal'
import { trackEvent } from '@/lib/analytics'
import { loc } from '@/lib/localize'
import { whatsappLink } from '@/lib/site'
import NotFound from '@/pages/NotFound'

const icons = [Layers, Zap, ShieldCheck]

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[26px] lg:text-[32px]">{children}</h2>
}

export default function ProjectPage() {
  const { slug } = useParams()
  const { t } = useTranslation('home')
  const { t: tc } = useTranslation()
  const { lang, base } = useLang()
  const { theme } = useTheme()

  const index = projects.findIndex((p) => p.slug === slug)
  const p = projects[index]
  const title = p ? loc(p.title, lang) : ''

  useEffect(() => {
    if (!p) return
    const prev = document.title
    document.title = `${title} · ${tc('brand.first')} ${tc('brand.last')}`
    return () => {
      document.title = prev
    }
  }, [p, title, tc])

  if (!p) return <NotFound />

  const screenshots = p.screenshots as string[]
  const prevP = projects[(index - 1 + projects.length) % projects.length]
  const nextP = projects[(index + 1) % projects.length]
  const Back = lang === 'ar' ? ArrowRight : ArrowLeft
  const live = p.status === 'live'

  const meta = [
    { k: t('projectPage.year'), v: String(p.year) },
    { k: t('projectPage.role'), v: loc(p.role, lang) },
    { k: t('projectPage.status'), v: live ? t('projects.live') : t('projects.wip') },
  ]

  return (
    <article>
      <header className="relative isolate overflow-hidden pt-8 pb-12 lg:pt-12 lg:pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(var(--grid)_1px,transparent_1.2px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_20%,transparent_75%)] [background-size:22px_22px]"
        />
        <Container>
          <Link
            to={{ pathname: base || '/', hash: '#projects' }}
            className="mb-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ts no-underline hover:text-tp"
          >
            <Back size={16} />
            {t('projectPage.back')}
          </Link>

          {import.meta.env.DEV && p.draft && (
            <p className="mb-5 rounded-btn border border-dashed border-border bg-acc-soft px-3.5 py-2.5 text-sm text-ts">
              {t('projectPage.draft')}
            </p>
          )}

          <div className="flex max-w-[820px] flex-col gap-5">
            <h1 className="display !text-[34px] lg:!text-5xl rtl:!text-[34px] lg:rtl:!text-5xl">
              {title}
            </h1>
            <p className="lead">{loc(p.summary, lang)}</p>
            <ul className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <li
                  key={s}
                  dir="ltr"
                  className="inline-flex h-[26px] items-center rounded-chip bg-acc-soft px-[9px] font-mono text-xs font-medium text-ts"
                >
                  {s}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              {p.liveUrl && (
                <Button href={p.liveUrl} size="lg">
                  <ExternalLink size={18} />
                  {t('projects.demo')}
                </Button>
              )}
              {p.repoUrl && (
                <Button href={p.repoUrl} variant="secondary" size="lg">
                  <GitHubIcon width={18} height={18} />
                  {t('projectPage.repo')}
                </Button>
              )}
              {p.video && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => document.getElementById('video')?.scrollIntoView()}
                >
                  <Video size={18} />
                  {t('projectPage.watch')}
                </Button>
              )}
            </div>
            <dl className="grid max-w-[560px] grid-cols-3 gap-3 border-t border-border pt-5">
              {meta.map((m) => (
                <div key={m.k}>
                  <dt className="text-xs text-tm">{m.k}</dt>
                  <dd className="mt-0.5 text-[15px] font-semibold text-tp">{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </header>

      <Container className="flex flex-col gap-14 pb-16 lg:gap-20 lg:pb-24">
        <Frame
          url={p.mockUrl}
          label={t('projects.mockAria', { name: title })}
          className="mx-auto w-full max-w-[760px]"
        >
          <ProjectMock kind={p.mock as MockKind} />
        </Frame>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <section className="flex flex-col gap-3">
            <H2>{t('projectPage.problem')}</H2>
            <p className="lead">{loc(p.problem, lang)}</p>
          </section>
          <section className="flex flex-col gap-3">
            <H2>{t('projectPage.solution')}</H2>
            <p className="lead">{loc(p.solution, lang)}</p>
          </section>
        </div>

        <section className="flex flex-col gap-6">
          <H2>{t('projectPage.highlights')}</H2>
          <ul className="grid gap-4 md:grid-cols-3">
            {p.highlights.map((h, i) => {
              const Icon = icons[i % icons.length]
              return (
                <li key={h.title.en} className={`${cardCls} flex flex-col gap-3 p-6`}>
                  <span className="inline-flex size-11 items-center justify-center rounded-btn bg-acc-soft text-acc">
                    <Icon size={22} />
                  </span>
                  <h3 className="text-lg">{loc(h.title, lang)}</h3>
                  <p className="text-ts">{loc(h.text, lang)}</p>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <H2>{t('projectPage.screenshots')}</H2>
          {screenshots.length ? (
            <Gallery images={screenshots} title={title} />
          ) : (
            <div className={`${cardCls} border-dashed px-6 py-10 text-center text-ts`}>
              {t('projectPage.screenshotsSoon')}
            </div>
          )}
        </section>

        {p.video && (
          <section id="video" className="flex flex-col gap-6">
            <H2>{t('projectPage.video')}</H2>
            <VideoPlayer src={p.video} title={title} />
          </section>
        )}

        <section
          className={`${cardCls} flex flex-col items-start gap-5 border-[color-mix(in_srgb,var(--acc)_50%,var(--border))] bg-[linear-gradient(180deg,var(--acc-soft),var(--surface)_70%)] p-7 lg:flex-row lg:items-center lg:justify-between lg:p-10`}
        >
          <div className="flex max-w-[520px] flex-col gap-2">
            <h2 className="text-2xl lg:text-[30px]">{t('projectPage.ctaTitle')}</h2>
            <p className="text-ts">{t('projectPage.ctaText')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => {
                trackEvent('cta_book_call', { source: `project:${p.slug}` })
                void openCal(theme)
              }}
            >
              <CalendarCheck size={18} />
              {tc('cta.book')}
            </Button>
            <Button
              href={whatsappLink(tc('whatsappPrefill'))}
              variant="secondary"
              size="lg"
            >
              <MessageCircle size={18} />
              {tc('cta.whatsapp')}
            </Button>
          </div>
        </section>

        <nav aria-label="Projects" className="grid gap-4 sm:grid-cols-2">
          {[
            { to: prevP, label: t('projectPage.prev'), dir: 'prev' as const },
            { to: nextP, label: t('projectPage.next'), dir: 'next' as const },
          ].map(({ to, label, dir }) => (
            <Link
              key={dir}
              to={`${base}/projects/${to.slug}`}
              className={`${cardCls} flex flex-col gap-1 p-5 no-underline transition hover:border-acc ${dir === 'next' ? 'sm:items-end sm:text-end' : ''}`}
            >
              <span className="text-xs text-tm">{label}</span>
              <span className="text-lg font-semibold text-tp">{loc(to.title, lang)}</span>
            </Link>
          ))}
        </nav>
      </Container>
    </article>
  )
}

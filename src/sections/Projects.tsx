import { ArrowRight, ArrowUpRight, ExternalLink, Star } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { GitHubIcon } from '@/components/icons/brands'
import Button from '@/components/ui/Button'
import { Frame, ProjectMock, type MockKind } from '@/components/ui/Mock'
import { Section, SectionHead, cardCls, liftCls } from '@/components/ui/Section'
import projects from '@/data/projects.json'
import { useLang } from '@/hooks/useLang'
import { trackEvent } from '@/lib/analytics'
import { useRepos } from '@/lib/github'
import { loc } from '@/lib/localize'
import { site } from '@/lib/site'

type Project = (typeof projects)[number]
type Filter = 'all' | 'web' | 'dash' | 'api'
function ago(iso: string, lang: string) {
  const days = Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000)
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' })
  if (Math.abs(days) < 30) return rtf.format(days, 'day')
  if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), 'month')
  return rtf.format(Math.round(days / 365), 'year')
}

const filters: Filter[] = ['all', 'web', 'dash', 'api']

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <li
          key={s}
          dir="ltr"
          className="inline-flex h-[26px] items-center rounded-chip bg-acc-soft px-[9px] font-mono text-xs leading-none font-medium text-ts [unicode-bidi:isolate]"
        >
          {s}
        </li>
      ))}
    </ul>
  )
}

function StatusBadge({ status }: { status: string }) {
  const { t } = useTranslation('home')
  const live = status === 'live'
  return (
    <span
      className={`inline-flex h-6 items-center gap-[5px] rounded-full border border-border bg-surface px-[9px] text-xs font-semibold ${live ? 'text-succ' : 'text-ts'}`}
    >
      {live && <i className="size-1.5 rounded-full bg-succ" />}
      {live ? t('projects.live') : t('projects.wip')}
    </span>
  )
}

function CaseLink({ slug }: { slug: string }) {
  const { t } = useTranslation('home')
  const { base } = useLang()
  return (
    <Link
      to={`${base}/projects/${slug}`}
      onClick={() => trackEvent('project_open', { slug })}
      className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-acc no-underline hover:text-acch"
    >
      {t('projects.case')}
      <ArrowRight size={16} className="rtl:-scale-x-100" />
    </Link>
  )
}

function ProjectLinks({ p }: { p: Project }) {
  const { t } = useTranslation('home')
  return (
    <div className="flex gap-1">
      {p.liveUrl && (
        <Button href={p.liveUrl} variant="ghost" size="sm">
          <ExternalLink size={15} />
          {t('projects.demo')}
        </Button>
      )}
      {p.repoUrl && (
        <Button href={p.repoUrl} variant="ghost" size="sm" aria-label="GitHub">
          <GitHubIcon width={16} height={16} />
        </Button>
      )}
    </div>
  )
}

function Media({ p, title }: { p: Project; title: string }) {
  const { t } = useTranslation('home')
  return (
    <div className="relative bg-[linear-gradient(180deg,var(--acc-soft),transparent_85%)] px-5 pt-5">
      <Frame
        url={p.mockUrl}
        label={t('projects.mockAria', { name: title })}
        className="!rounded-b-none !border-b-0"
      >
        <ProjectMock kind={p.mock as MockKind} />
      </Frame>
    </div>
  )
}

function Featured({ p }: { p: Project }) {
  const { t } = useTranslation('home')
  const { lang } = useLang()
  const title = loc(p.title, lang)
  return (
    <article
      className={`${cardCls} ${liftCls} mb-5 grid overflow-hidden lg:grid-cols-[1.35fr_1fr]`}
    >
      <div className="[&>div]:lg:px-7 [&>div]:lg:pt-7">
        <Media p={p} title={title} />
      </div>
      <div className="flex flex-col gap-4 border-t border-border p-7 lg:justify-center lg:border-s lg:border-t-0 lg:p-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 items-center rounded-full border border-border bg-surface px-[9px] text-xs font-semibold text-acc">
            {t('projects.featured')}
          </span>
          <StatusBadge status={p.status} />
        </div>
        <h3 className="text-2xl lg:text-[28px]">{title}</h3>
        <p className="text-ts">{loc(p.summary, lang)}</p>
        <ul className="flex flex-col gap-1.5 text-[15px] text-ts">
          {p.features.map((f) => (
            <li key={f.en} className="flex items-start gap-2.5">
              <Star size={14} className="mt-1.5 flex-none text-acc" />
              {loc(f, lang)}
            </li>
          ))}
        </ul>
        <Tags items={p.stack} />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CaseLink slug={p.slug} />
          <ProjectLinks p={p} />
        </div>
      </div>
    </article>
  )
}

function Card({ p }: { p: Project }) {
  const { lang } = useLang()
  const title = loc(p.title, lang)
  return (
    <article className={`${cardCls} ${liftCls} group flex flex-col overflow-hidden`}>
      <div className="relative">
        <Media p={p} title={title} />
        <ul className="pointer-events-none absolute inset-x-5 top-5 bottom-0 flex flex-col justify-end gap-2 rounded-t-xl bg-[linear-gradient(180deg,transparent_30%,color-mix(in_srgb,var(--bg)_92%,transparent))] p-4 text-[13px] text-tp opacity-0 transition-opacity duration-[250ms] group-focus-within:opacity-100 group-hover:opacity-100">
          {p.features.map((f) => (
            <li key={f.en} className="flex items-start gap-2">
              <Star size={12} className="mt-1 flex-none text-acc" />
              {loc(f, lang)}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-1 flex-col gap-3 border-t border-border p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl">{title}</h3>
          <StatusBadge status={p.status} />
        </div>
        <p className="text-sm text-ts">{loc(p.summary, lang)}</p>
        <Tags items={p.stack} />
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
          <CaseLink slug={p.slug} />
          <ProjectLinks p={p} />
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const { t } = useTranslation('home')
  const { i18n } = useTranslation()
  const { repos, live } = useRepos()
  const [filter, setFilter] = useState<Filter>('all')
  const count = (f: Filter) =>
    f === 'all' ? projects.length : projects.filter((p) => p.category === f).length
  const visible = projects.filter((p) => filter === 'all' || p.category === filter)
  const featured = visible.find((p) => p.featured)
  const rest = visible.filter((p) => p !== featured)

  return (
    <Section id="projects">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <SectionHead eyebrow={t('projects.eyebrow')} title={t('projects.title')} />
        <div
          role="group"
          aria-label={t('projects.filterLabel')}
          className="flex flex-wrap gap-2"
        >
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-medium text-ts transition hover:border-acc hover:text-tp aria-pressed:border-tp aria-pressed:bg-tp aria-pressed:text-bg"
            >
              {t(`projects.filters.${f}`)}
              <span className="font-mono text-xs opacity-70">{count(f)}</span>
            </button>
          ))}
        </div>
      </div>

      {featured && <Featured p={featured} />}
      <div className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {rest.map((p) => (
          <Card key={p.slug} p={p} />
        ))}
      </div>

      <div className="mt-14">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-xl">{t('projects.github')}</h3>
            {!live && <p className="text-[13px] text-tm">{t('projects.githubNote')}</p>}
          </div>
          <Button href={site.socials.github} variant="ghost" size="sm">
            {t('projects.viewAll')}
            <ArrowUpRight size={16} className="rtl:-scale-x-100" />
          </Button>
        </div>
        <ul className="grid gap-3 xl:grid-cols-4 xl:gap-4 sm:grid-cols-2">
          {repos.map((r) => (
            <li key={r.name}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardCls} ${liftCls} flex h-full flex-col gap-2.5 p-[18px] text-tp no-underline hover:text-tp`}
              >
                <span
                  dir="ltr"
                  className="flex items-center gap-2 font-mono text-sm font-medium"
                >
                  <GitHubIcon width={16} height={16} className="text-tm" />
                  {r.name}
                </span>
                <span className="text-sm text-ts">{r.description}</span>
                <span className="mt-auto flex flex-wrap items-center gap-x-3.5 gap-y-1 pt-1 text-[13px] text-tm">
                  {r.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <i
                        className="size-2.5 rounded-full"
                        style={{ background: r.color }}
                      />
                      <bdi>{r.language}</bdi>
                    </span>
                  )}
                  {!!r.stars && (
                    <span className="inline-flex items-center gap-1">
                      <Star size={13} />
                      {r.stars}
                    </span>
                  )}
                  {r.pushedAt && (
                    <span>
                      {t('projects.updated', { when: ago(r.pushedAt, i18n.language) })}
                    </span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

import {
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react'
import { useState, type FormEvent, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'
import { Section, SectionHead, cardCls } from '@/components/ui/Section'
import { useTheme } from '@/hooks/useTheme'
import { trackEvent } from '@/lib/analytics'
import { calUrl, openCal } from '@/lib/cal'
import { site, whatsappLink } from '@/lib/site'

type Status = 'idle' | 'sending' | 'ok' | 'error' | 'noconfig'

const input =
  'min-h-12 w-full rounded-btn border border-border bg-bg px-3.5 text-[15px] text-tp outline-none transition placeholder:text-tm hover:border-[color-mix(in_srgb,var(--tp)_30%,var(--border))] focus:border-acc focus:shadow-[0_0_0_3px_var(--acc-soft)] disabled:cursor-not-allowed disabled:opacity-50'

function Field({
  label,
  optional,
  full,
  children,
}: {
  label: string
  optional?: string
  full?: boolean
  children: React.ReactNode
}) {
  return (
    <label className={`flex flex-col gap-[7px] ${full ? 'md:col-span-2' : ''}`}>
      <span className="text-sm font-semibold text-tp">
        {label} {optional && <span className="font-normal text-tm">{optional}</span>}
      </span>
      {children}
    </label>
  )
}

export default function Contact() {
  const { t } = useTranslation('home')
  const { t: tc } = useTranslation()
  const { theme } = useTheme()
  const [status, setStatus] = useState<Status>('idle')
  const types = t('contact.types', { returnObjects: true }) as string[]
  const budgets = t('contact.budgets', { returnObjects: true }) as string[]

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('_gotcha')) return // honeypot: bots only
    if (!site.formspreeId) {
      setStatus('noconfig')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus('ok')
      trackEvent('form_submit')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact">
      <SectionHead
        className="mb-10 lg:mb-14"
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        lead={t('contact.lead')}
      />
      <div className="grid gap-5 lg:grid-cols-[7fr_5fr] lg:gap-6">
        <form
          onSubmit={onSubmit}
          className={`${cardCls} grid gap-[18px] p-6 md:grid-cols-2 md:p-8`}
          noValidate={false}
        >
          <Field label={t('contact.name')}>
            <input className={input} name="name" required autoComplete="name" />
          </Field>
          <Field label={t('contact.email')}>
            <input
              className={input}
              name="email"
              type="email"
              required
              autoComplete="email"
              dir="ltr"
            />
          </Field>
          <Field label={t('contact.phone')} optional={t('contact.optional')}>
            <input
              className={input}
              name="whatsapp"
              type="tel"
              autoComplete="tel"
              dir="ltr"
            />
          </Field>
          <Field label={t('contact.type')}>
            <select
              className={`${input} select-chevron`}
              name="project_type"
              required
              defaultValue=""
            >
              <option value="" disabled>
                {t('contact.typePlaceholder')}
              </option>
              {types.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t('contact.budget')} optional={t('contact.optional')} full>
            <select className={`${input} select-chevron`} name="budget" defaultValue="">
              <option value="" disabled>
                {t('contact.budgetPlaceholder')}
              </option>
              {budgets.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t('contact.message')} full>
            <textarea
              className={`${input} min-h-[132px] resize-y py-3 leading-normal`}
              name="message"
              required
              rows={5}
            />
          </Field>
          {/* honeypot */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 md:col-span-2">
            <p className="flex items-center gap-1.5 text-[13px] text-tm">
              <ShieldCheck size={14} />
              {t('contact.privacy')}
            </p>
            <Button type="submit" size="lg" disabled={status === 'sending'}>
              {status === 'sending' ? (
                <Loader2 size={18} className="animate-spin" />
              ) : null}
              {status === 'sending' ? t('contact.sending') : t('contact.send')}
            </Button>
          </div>

          <div role="status" aria-live="polite" className="md:col-span-2">
            {status === 'ok' && (
              <div className="flex items-start gap-3 rounded-xl border border-border bg-elev p-4 shadow-sh2">
                <CheckCircle2 size={18} className="mt-0.5 flex-none text-succ" />
                <div>
                  <b className="block text-sm">{t('contact.okTitle')}</b>
                  <p className="text-[13px] text-ts">{t('contact.okText')}</p>
                </div>
              </div>
            )}
            {(status === 'error' || status === 'noconfig') && (
              <div className="flex items-start gap-3 rounded-xl border border-border bg-elev p-4 shadow-sh2">
                <AlertCircle size={18} className="mt-0.5 flex-none text-err" />
                <div>
                  <b className="block text-sm">{t('contact.badTitle')}</b>
                  <p className="text-[13px] text-ts">
                    {status === 'noconfig'
                      ? t('contact.badNoConfig')
                      : t('contact.badText')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </form>

        <div className="flex flex-col gap-4">
          <div
            className={`${cardCls} flex flex-col gap-3 border-[color-mix(in_srgb,var(--acc)_50%,var(--border))] bg-[linear-gradient(180deg,var(--acc-soft),var(--surface)_70%)] p-[22px]`}
          >
            <span className="inline-flex size-11 items-center justify-center rounded-btn bg-acc-soft text-acc">
              <CalendarCheck size={22} />
            </span>
            <h3 className="text-xl">{t('contact.callTitle')}</h3>
            <p className="text-ts">{t('contact.callText')}</p>
            {calUrl ? (
              <Button
                href={calUrl}
                block
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  trackEvent('cta_book_call', { source: 'contact' })
                  void openCal(theme)
                }}
              >
                {t('contact.callCta')}
              </Button>
            ) : (
              <Button block disabled>
                {t('contact.callCta')}
              </Button>
            )}
            <p className="text-xs text-tm">{t('contact.callBy')}</p>
          </div>

          <div className={`${cardCls} flex flex-col gap-3 p-[22px]`}>
            <span className="inline-flex size-11 items-center justify-center rounded-btn bg-acc-soft text-acc">
              <MessageCircle size={22} />
            </span>
            <h3 className="text-xl">{t('contact.waTitle')}</h3>
            <p className="text-ts">{t('contact.waText')}</p>
            <Button href={whatsappLink(tc('whatsappPrefill'))} variant="secondary" block>
              <MessageCircle size={18} />
              {tc('cta.whatsapp')}
            </Button>
          </div>

          {site.email && (
            <p className="flex items-center gap-2.5 px-1 text-sm text-ts">
              <Mail size={16} className="text-acc" />
              {t('contact.emailLabel')}
              <a href={`mailto:${site.email}`} dir="ltr" className="font-medium text-tp">
                {site.email}
              </a>
            </p>
          )}
        </div>
      </div>
    </Section>
  )
}

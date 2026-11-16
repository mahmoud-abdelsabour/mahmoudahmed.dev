import { track } from '@vercel/analytics'

export type AnalyticsEvent =
  'cta_whatsapp' | 'cta_book_call' | 'project_open' | 'cv_download' | 'form_submit'

/** Fire a custom event. No-ops in development. Custom events need a Vercel Pro plan; pageviews work on Hobby. */
export function trackEvent(
  name: AnalyticsEvent,
  props?: Record<string, string | number | boolean>,
) {
  if (import.meta.env.DEV) return
  try {
    track(name, props)
  } catch {
    /* analytics must never break the UI */
  }
}

/** Guess the event for an external href (used by Button automatically). */
export function eventForHref(href: string): AnalyticsEvent | undefined {
  if (href.startsWith('https://wa.me/')) return 'cta_whatsapp'
  if (href.startsWith('https://cal.com/')) return 'cta_book_call'
  if (href.endsWith('.pdf')) return 'cv_download'
  return undefined
}

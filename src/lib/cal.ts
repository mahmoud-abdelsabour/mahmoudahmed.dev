import { site } from '@/lib/site'

export const calUrl = site.calUsername
  ? `https://cal.com/${site.calUsername}/${site.calEvent}`
  : ''

/** Open the Cal.com booking modal. The embed code is loaded on demand, so it costs nothing until used. */
export async function openCal(theme: 'dark' | 'light') {
  if (!site.calUsername) return
  try {
    const { getCalApi } = await import('@calcom/embed-react')
    const cal = await getCalApi()
    cal('ui', { theme, hideEventTypeDetails: false, layout: 'month_view' })
    cal('modal', {
      calLink: `${site.calUsername}/${site.calEvent}`,
      config: { layout: 'month_view', theme },
    })
  } catch {
    window.open(calUrl, '_blank', 'noopener,noreferrer')
  }
}

/** Central site config. Fill the empty values as they become available. */
export const site = {
  name: { en: 'Mahmoud Abdelsabour', ar: 'محمود عبدالصبور' },
  domain: 'mahmoudahmed.dev',
  url: 'https://mahmoudahmed.dev',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER ?? '', // digits only, with country code
  calUsername: import.meta.env.VITE_CAL_USERNAME ?? 'mahmoud-ahmed-gems9b',
  calEvent: '30min', // slug of the event type opened by the booking popup
  showPrices: true, // service cards: "Starting from [PRICE]"
  formspreeId: import.meta.env.VITE_FORMSPREE_ID ?? '',
  email: '', // e.g. hello@mahmoudahmed.dev
  socials: {
    github: 'https://github.com/mahmoud-abdelsabour',
    linkedin: '',
    mostaql: '',
    khamsat: '',
  },
  cv: {
    en: '/cv/Mahmoud-Abdelsabour-CV-EN.pdf',
    ar: '/cv/Mahmoud-Abdelsabour-CV-AR.pdf',
  },
} as const

export const sections = ['services', 'projects', 'process', 'about', 'contact'] as const
export type SectionId = (typeof sections)[number]

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

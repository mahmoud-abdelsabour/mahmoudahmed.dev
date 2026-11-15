import type { Lang } from '@/lib/i18n'

export type Localized = { en: string; ar: string }

/** Pick the string for the active language. */
export const loc = (v: Localized, lang: Lang) => v[lang] ?? v.en

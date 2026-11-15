import { Home } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'
import { useLang } from '@/hooks/useLang'

export default function NotFound() {
  const { t } = useTranslation()
  const { base } = useLang()
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [background-image:radial-gradient(var(--grid)_1px,transparent_1.2px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_20%,transparent_75%)] [background-size:22px_22px]"
      />
      <div className="mx-auto flex min-h-[70vh] max-w-[1264px] flex-col items-center justify-center gap-5 px-5 py-24 text-center md:px-8">
        <p
          dir="ltr"
          className="font-mono text-[clamp(72px,18vw,160px)] leading-none font-bold tracking-tighter text-acc"
        >
          404
        </p>
        <h1 className="text-3xl font-bold lg:text-4xl">{t('notFound.title')}</h1>
        <p className="max-w-[480px] lead">{t('notFound.text')}</p>
        <Button to={base || '/'} size="lg">
          <Home size={18} />
          {t('cta.backHome')}
        </Button>
      </div>
    </section>
  )
}

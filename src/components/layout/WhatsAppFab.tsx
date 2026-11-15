import { useTranslation } from 'react-i18next'
import { WhatsAppIcon } from '@/components/icons/brands'
import Button from '@/components/ui/Button'
import { whatsappLink } from '@/lib/site'

export default function WhatsAppFab() {
  const { t } = useTranslation()
  return (
    <div className="group fixed end-5 bottom-5 z-30 flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="pointer-events-none rounded-btn-sm bg-tp px-3 py-2 text-[13px] font-semibold whitespace-nowrap text-bg opacity-0 shadow-sh2 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
      >
        {t('whatsappTip')}
      </span>
      <Button
        href={whatsappLink(t('whatsappPrefill'))}
        aria-label={t('whatsappTip')}
        className="!h-14 !w-14 !rounded-full !px-0 shadow-sh3"
      >
        <WhatsAppIcon width={26} height={26} />
      </Button>
    </div>
  )
}

import { X } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

/** Screenshot grid; clicking opens a native <dialog> lightbox (Esc and backdrop click close it). */
export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const { t } = useTranslation('home')
  const dialog = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState(0)

  const open = (i: number) => {
    setActive(i)
    dialog.current?.showModal()
  }

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {images.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`${t('projectPage.open')} ${i + 1}`}
              className="block w-full overflow-hidden rounded-card border border-border bg-surface transition hover:border-acc"
            >
              <img
                src={src}
                alt={`${title} ${i + 1}`}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto max-h-[92vh] max-w-[min(1200px,94vw)] overflow-visible rounded-card border border-border bg-bg p-0 backdrop:bg-black/70"
      >
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label={t('projectPage.close')}
          className="absolute end-2 top-2 z-10 inline-flex size-11 items-center justify-center rounded-full bg-bg/90 text-tp shadow-sh2"
        >
          <X size={20} />
        </button>
        <img
          src={images[active]}
          alt={`${title} ${active + 1}`}
          className="max-h-[92vh] w-full rounded-card object-contain"
        />
      </dialog>
    </>
  )
}

import { Play } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function youTubeId(url: string) {
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/,
  )
  return m?.[1]
}

/** Click-to-play: nothing heavy loads until the visitor presses play. */
export default function VideoPlayer({
  src,
  title,
  poster,
}: {
  src: string
  title: string
  poster?: string
}) {
  const { t } = useTranslation('home')
  const [playing, setPlaying] = useState(false)
  const yt = youTubeId(src)

  if (playing) {
    return (
      <div className="aspect-video overflow-hidden rounded-card border border-border bg-black">
        {yt ? (
          <iframe
            className="size-full"
            src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            className="size-full"
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
          />
        )}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`${t('projectPage.play')}: ${title}`}
      className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-card border border-border bg-[linear-gradient(160deg,var(--acc-soft),var(--surface))]"
    >
      {poster && (
        <img
          src={poster}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
      )}
      <span className="relative inline-flex size-16 items-center justify-center rounded-full bg-acc text-accfg shadow-sh3 transition group-hover:scale-105 group-hover:bg-acch">
        <Play
          size={26}
          className="translate-x-0.5 rtl:-translate-x-0.5 rtl:-scale-x-100"
        />
      </span>
    </button>
  )
}

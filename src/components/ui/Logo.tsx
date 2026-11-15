import { useId } from 'react'

/** "MA" monogram: accent rounded square with a gradient + highlight. */
export default function Logo({ size = 32 }: { size?: number }) {
  const id = useId()
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient
          id={`${id}-g`}
          x1="4"
          y1="2"
          x2="28"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="var(--acch)" />
          <stop offset="1" stopColor="var(--acc)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill={`url(#${id}-g)`} />
      <rect
        x=".5"
        y=".5"
        width="31"
        height="31"
        rx="7.5"
        fill="none"
        stroke="#fff"
        strokeOpacity=".18"
      />
      <path
        d="M7 22V10l5 7 5-7v12l4-12 4 12M18.4 18h4.8"
        fill="none"
        stroke="var(--accfg)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

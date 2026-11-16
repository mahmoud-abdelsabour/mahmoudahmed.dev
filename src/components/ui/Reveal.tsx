import { motion, type HTMLMotionProps, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

/** Shared motion language: short, subtle, once. `MotionConfig reducedMotion="user"` (in App) turns movement off for users who ask. */
const ease = [0.2, 0.7, 0.2, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease } },
}

const group = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

const tags = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  article: motion.article,
  section: motion.section,
  form: motion.form,
  p: motion.p,
  h1: motion.h1,
  span: motion.span,
} as const
type Tag = keyof typeof tags

const viewport = { once: true, margin: '0px 0px -80px 0px' } as const

interface Base {
  as?: Tag
  className?: string
  children?: ReactNode
}

/** Fades up once when scrolled into view. */
export function Reveal({
  as = 'div',
  delay = 0,
  ...rest
}: Base & { delay?: number } & Record<string, unknown>) {
  const C = tags[as] as React.ComponentType<HTMLMotionProps<'div'>>
  return (
    <C
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
      {...(rest as HTMLMotionProps<'div'>)}
    />
  )
}

/** Parent that staggers its <Item> children. `onMount` animates immediately instead of on scroll. */
export function Stagger({
  as = 'div',
  stagger = 0.11,
  delay = 0,
  onMount,
  ...rest
}: Base & { stagger?: number; delay?: number; onMount?: boolean } & Record<
    string,
    unknown
  >) {
  const C = tags[as] as React.ComponentType<HTMLMotionProps<'div'>>
  const mode = onMount ? { animate: 'show' } : { whileInView: 'show', viewport }
  return (
    <C
      variants={group(stagger, delay)}
      initial="hidden"
      {...mode}
      {...(rest as HTMLMotionProps<'div'>)}
    />
  )
}

export function Item({ as = 'div', ...rest }: Base & Record<string, unknown>) {
  const C = tags[as] as React.ComponentType<HTMLMotionProps<'div'>>
  return <C variants={fadeUp} {...(rest as HTMLMotionProps<'div'>)} />
}

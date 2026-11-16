import { motion, type Variants } from 'motion/react'
import { Fragment } from 'react'

const word: Variants = {
  hidden: { y: '118%' },
  show: { y: 0, transition: { duration: 0.75, ease: [0.2, 0.7, 0.2, 1] } },
}

/** Variants for the parent (e.g. <motion.h1>) so its words rise one after another. */
export const wordsParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

/** Masked word-by-word reveal. Must sit inside a motion parent that uses `wordsParent`. */
export function Words({ text, className = '' }: { text: string; className?: string }) {
  const words = text.trim().split(/\s+/)
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span
            className={`-mb-[.16em] inline-block overflow-hidden pb-[.16em] align-bottom ${className}`}
          >
            <motion.span className="inline-block" variants={word}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  )
}

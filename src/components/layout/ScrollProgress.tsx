import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'

/** Thin accent bar at the very top showing how far down the page you are. */
export default function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })
  if (reduce) return null
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-acc rtl:origin-right"
      style={{ scaleX }}
    />
  )
}

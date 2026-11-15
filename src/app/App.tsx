import { MotionConfig } from 'motion/react'
import { RouterProvider } from 'react-router'
import '@/lib/i18n'
import { router } from '@/app/router'
import SmoothScroll from '@/app/SmoothScroll'
import ThemeProvider from '@/app/ThemeProvider'

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <SmoothScroll />
        <RouterProvider router={router} />
      </MotionConfig>
    </ThemeProvider>
  )
}

import { createBrowserRouter, type RouteObject } from 'react-router'
import LangRoot from '@/app/LangRoot'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import type { Lang } from '@/lib/i18n'

const children: RouteObject[] = [
  { index: true, element: <Home /> },
  {
    path: 'projects/:slug',
    lazy: async () => ({ Component: (await import('@/pages/ProjectPage')).default }),
  },
  { path: '*', element: <NotFound /> },
]

const tree = (lang: Lang, path: string): RouteObject => ({
  path,
  element: <LangRoot lang={lang} />,
  children,
})

export const router = createBrowserRouter([tree('ar', '/ar'), tree('en', '/')])

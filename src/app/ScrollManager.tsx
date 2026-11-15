import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** Scroll to #hash targets, otherwise to the top on route change. */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, key])
  return null
}

import * as React from 'react'

type MediaQueryCallback = (isMatches: boolean) => void

export function useMediaQuery(query: string, callback?: MediaQueryCallback): boolean {
  const [matches, setMatches] = React.useState<boolean>(() => {
    // If we're server-side, we can't determine the media query
    if (typeof window === 'undefined') {
      return false
    }
    try {
      return window.matchMedia(query).matches
    }
    catch (error) {
      console.error('Invalid media query:', error)
      return false
    }
  })

  const handleChange = React.useCallback(
    (event: MediaQueryListEvent) => {
      setMatches(event.matches)
      try {
        callback?.(event.matches)
      }
      catch (error) {
        console.error('Error in media query callback:', error)
      }
    },
    [callback],
  )

  React.useEffect(
    () => {
      // If we're server-side, we can't set up the media query
      if (typeof window === 'undefined') {
        return
      }

      let mediaQuery: MediaQueryList | null = null

      try {
        mediaQuery = window.matchMedia(query)
        setMatches(mediaQuery.matches)
        mediaQuery.addEventListener('change', handleChange)
      }
      catch (error) {
        console.error('Error setting up media query:', error)
        return
      }

      return () => {
        mediaQuery?.removeEventListener('change', handleChange)
      }
    },
    [query, handleChange],
  )

  return matches
}

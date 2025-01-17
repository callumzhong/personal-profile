import { useMediaQuery } from './use-media-query'

export type Breakpoints = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const breakpoints: Record<string, number> = {
  'xxs': 320,
  'xs': 475,
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536,
}

export function useTailwindMediaQuery(breakpoint: Breakpoints | number, media?: 'min-width' | 'max-width', callback?: (isMatches: boolean) => void) {
  const query = media === 'max-width'
    ? `not all and (min-width: ${breakpoints?.[breakpoint] ?? breakpoint}px)`
    : `(min-width: ${breakpoints?.[breakpoint] ?? breakpoint}px)`

  return useMediaQuery(
    query,
    callback,
  )
}

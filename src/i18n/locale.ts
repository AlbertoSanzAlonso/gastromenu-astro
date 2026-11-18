export type Locale = 'es' | 'en'

export const LOCALES: readonly Locale[] = ['es', 'en'] as const
export const DEFAULT_LOCALE: Locale = 'es'

/** Prefijo de URL para un locale (`''` en ES, `'/en'` en EN). */
export function localePrefix(locale: Locale) {
  return locale === 'en' ? '/en' : ''
}

/** Une locale + path canónico (`/cartas` → `/en/cartas`). */
export function localePath(locale: Locale, path: string) {
  const normalized = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  if (locale === 'es') return normalized || '/'
  return `/en${normalized || ''}` || '/en'
}

/** Quita el prefijo `/en` y devuelve el path canónico. */
export function barePath(pathname: string) {
  if (pathname === '/en' || pathname === '/en/') return '/'
  if (pathname.startsWith('/en/')) return pathname.slice(3) || '/'
  return pathname || '/'
}

export function detectLocale(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es'
}

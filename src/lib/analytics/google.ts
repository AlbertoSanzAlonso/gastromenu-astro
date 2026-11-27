const CONSENT_KEY = 'gastromenu.cookie-consent'
const SETTINGS_EVENT = 'gastromenu:cookie-settings'
const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/
const GA_ID_PATTERN = /^G-[A-Z0-9]+$/

export type AnalyticsConsent = 'granted' | 'denied'

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

function readId(value: unknown, pattern: RegExp) {
  if (typeof value !== 'string') return ''
  const id = value.trim().toUpperCase()
  return pattern.test(id) ? id : ''
}

export const gtmId = readId(import.meta.env.PUBLIC_GTM_ID, GTM_ID_PATTERN)
export const gaMeasurementId = readId(import.meta.env.PUBLIC_GA_MEASUREMENT_ID, GA_ID_PATTERN)
export const analyticsEnabled = Boolean(gtmId || gaMeasurementId)

let started = false

function ensureGtag() {
  window.dataLayer = window.dataLayer ?? []
  if (window.gtag) return
  window.gtag = function gtag() {
    // Google lee el objeto `arguments` de esta cola, no un array copiado.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments)
  }
}

function consentState(value: AnalyticsConsent) {
  const analytics = value === 'granted' ? 'granted' : 'denied'
  return {
    analytics_storage: analytics,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
  }
}

function applyConsent(value: AnalyticsConsent) {
  window.gtag?.('consent', 'update', consentState(value))
}

function clearAnalyticsCookies() {
  const names = document.cookie
    .split(';')
    .map((part) => part.split('=')[0]?.trim() ?? '')
    .filter((name) => name === '_ga' || name === '_gid' || name.startsWith('_ga_'))
  const host = window.location.hostname
  for (const name of names) {
    const expiry = `${name}=; Max-Age=0; path=/`
    document.cookie = expiry
    document.cookie = `${expiry}; domain=${host}`
    document.cookie = `${expiry}; domain=.${host}`
  }
}

function appendScript(id: string, src: string) {
  if (document.getElementById(id)) return
  const script = document.createElement('script')
  script.id = id
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

export function readConsent(): AnalyticsConsent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    if (value === 'granted' || value === 'denied') return value
  } catch {
    // Si el almacenamiento no está disponible, se vuelve a preguntar.
  }
  return null
}

export function installAnalytics() {
  if (started || !analyticsEnabled) return
  if (window.location.pathname.startsWith('/admin')) return
  started = true
  if (window.gtag) return

  ensureGtag()
  window.gtag?.('consent', 'default', {
    ...consentState('denied'),
    security_storage: 'granted',
    wait_for_update: 500,
  })

  const stored = readConsent()
  if (stored) applyConsent(stored)

  if (gaMeasurementId) {
    appendScript('ga-tag', `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`)
    window.gtag?.('js', new Date())
    window.gtag?.('config', gaMeasurementId, { send_page_view: false })
  }

  if (gtmId) {
    window.dataLayer?.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    appendScript('gtm-script', `https://www.googletagmanager.com/gtm.js?id=${gtmId}`)
  }
}

export function writeConsent(value: AnalyticsConsent) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // La elección se aplica en esta visita aunque no se pueda guardar.
  }
  installAnalytics()
  applyConsent(value)
  if (value === 'denied') clearAnalyticsCookies()
}

export function trackPageView(path: string) {
  if (!analyticsEnabled || readConsent() !== 'granted') return
  if (path.startsWith('/admin')) return

  const pageLocation = `${window.location.origin}${path}`
  const pageTitle = document.title

  if (gaMeasurementId) {
    window.gtag?.('event', 'page_view', {
      page_path: path,
      page_location: pageLocation,
      page_title: pageTitle,
      send_to: gaMeasurementId,
    })
  }

  if (gtmId && !gaMeasurementId) {
    window.dataLayer?.push({
      event: 'virtual_page_view',
      page_path: path,
      page_location: pageLocation,
      page_title: pageTitle,
    })
  }
}

export function requestCookieSettings() {
  window.dispatchEvent(new Event(SETTINGS_EVENT))
}

export function onCookieSettings(listener: () => void) {
  window.addEventListener(SETTINGS_EVENT, listener)
  return () => window.removeEventListener(SETTINGS_EVENT, listener)
}

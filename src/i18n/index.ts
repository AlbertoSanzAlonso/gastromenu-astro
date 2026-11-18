import { messages, type Messages } from '@/i18n/messages'
import type { Locale } from '@/i18n/locale'

export { messages }
export type { Locale, Messages }

export function getMessages(locale: Locale): Messages {
  return messages[locale]
}

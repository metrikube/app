import dayjs, { locale, extend } from 'dayjs'
import 'dayjs/locale/fr'
import duration from 'dayjs/plugin/duration'
import localeData from 'dayjs/plugin/localeData'
import relativeTime from 'dayjs/plugin/relativeTime'

export const LOCALE = 'fr'

locale(LOCALE)

extend(localeData)
extend(duration)
extend(relativeTime)

export default dayjs

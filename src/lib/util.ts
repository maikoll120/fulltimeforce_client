import { formatDistance } from 'date-fns'

export const formatDateSince = (date: string) => {
  const parseDate = Date.parse(date)
  return formatDistance(parseDate, new Date(), { addSuffix: true })
}

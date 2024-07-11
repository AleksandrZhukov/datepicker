import { useMemo, useState } from 'react'
import { CalendarAdapter } from './adapters'

export type UseCalendarProps<TDate, TLocale> = {
  start: TDate
  allowOutsideDays?: boolean
  months?: number
  adapter: ReturnType<CalendarAdapter<TDate, TLocale>>
}

export function useCalendar<TDate, TLocale>({
  start,
  months = 1,
  allowOutsideDays,
  adapter,
}: UseCalendarProps<TDate, TLocale>) {
  const [date, setDate] = useState(start)

  const actions = useMemo(
    function actionsFn() {
      const nextMonth = () => setDate(prevSet => adapter.addMonths(prevSet, 1))
      const prevMonth = () => setDate(prevSet => adapter.addMonths(prevSet, -1))
      const resetDate = () => setDate(start)

      const dates = Array.from({ length: months }, (_, i) => {
        const month = adapter.addMonths(date, i)

        const startDateOfMonth = adapter.startOfMonth(month)
        const endDateOfMonth = adapter.endOfMonth(month)
        const startWeek = adapter.startOfWeek(startDateOfMonth)
        const endWeek = adapter.endOfWeek(endDateOfMonth)
        const days = adapter.daysInRange(startWeek, endWeek)

        return {
          startDateOfMonth,
          endDateOfMonth,
          startWeek,
          endWeek,
          days: allowOutsideDays
            ? days
            : adapter.removeOutMonthDays(days, month),
        }
      })

      return {
        nextMonth,
        prevMonth,
        resetDate,
        dates,
      }
    },
    [allowOutsideDays, date, start, months]
  )

  return {
    startDate: date,
    ...actions,
  }
}

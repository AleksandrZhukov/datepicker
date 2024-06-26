import { Button, useMultiStyleConfig } from '@chakra-ui/react'
import { useCalendarContext } from './context'
import { CalendarControlStyles } from './types'
import { ReactElement } from 'react'

type CalendarNextButtonProps = {
  as?: ({ onClick }: { onClick: VoidFunction }) => ReactElement | null
}

export function CalendarNextButton<TDate, TLocale>({
  as,
}: CalendarNextButtonProps) {
  const styles = useMultiStyleConfig(
    'CalendarControl',
    {}
  ) as CalendarControlStyles

  const context = useCalendarContext<TDate, TLocale>()

  if (as) {
    return as({ onClick: context.nextMonth })
  }

  return (
    <Button onClick={context.nextMonth} sx={styles.button}>
      &#8594;
    </Button>
  )
}

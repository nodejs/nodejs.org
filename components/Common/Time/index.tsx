import { useMemo } from 'react';
import { useLocale } from '@/hooks/useLocale';
import type { FC } from 'react';

type TimeProps = { date: string | Date; format: Intl.DateTimeFormatOptions };

export const Time: FC<TimeProps> = ({ date, format }) => {
  const { currentLocale } = useLocale();

  const { isoDate, formatedDate } = useMemo(() => {
    const dateObject = new Date(date);

    return {
      isoDate: dateObject.toISOString(),
      formatedDate: dateObject.toLocaleString(currentLocale.hrefLang, {
        ...format,
        timeZone: 'UTC',
      }),
    };
    // We assume that the `format` options will not change and be static
    // and we calculate the date difference by comparing its string value
    // since its ISO format is what matters for us the most.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date.toString(), currentLocale.hrefLang]);

  return <time dateTime={isoDate}>{formatedDate}</time>;
};

import type { DateTimeFormatOptions } from 'next-intl';
import { useFormatter } from 'next-intl';
import type { FC } from 'react';
import { useMemo } from 'react';

type TimeProps = { date: string | Date; format: DateTimeFormatOptions };

export const Time: FC<TimeProps> = ({ date, format }) => {
  const formatter = useFormatter();

  const dateObject = useMemo(() => new Date(date), [date]);

  return (
    <time dateTime={dateObject.toISOString()}>
      {formatter.dateTime(dateObject, format)}
    </time>
  );
};

import type { DateTimeFormatOptions } from 'next-intl';
import { useFormatter } from 'next-intl';
import type { FC } from 'react';

import { DEFAULT_DATE_FORMAT } from '@/next.calendar.constants.mjs';

type TimeProps = { date: string | Date; format?: DateTimeFormatOptions };

const Time: FC<TimeProps> = ({ date, format = DEFAULT_DATE_FORMAT }) => {
  const formatter = useFormatter();

  const dateObject = new Date(date);

  return (
    <time dateTime={dateObject.toISOString()}>
      {formatter.dateTime(dateObject, format)}
    </time>
  );
};

export default Time;

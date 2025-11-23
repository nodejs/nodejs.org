import { useFormatter } from 'next-intl';

import { DEFAULT_DATE_FORMAT } from '#site/next.calendar.constants.mjs';

import type { DateTimeFormatOptions } from 'next-intl';
import type { FC } from 'react';

type FormattedTimeProps = {
  date: string | Date;
  format?: DateTimeFormatOptions;
};

const FormattedTime: FC<FormattedTimeProps> = ({ date, format }) => {
  const formatter = useFormatter();

  const dateObject = new Date(date);

  return (
    <time dateTime={dateObject.toISOString()}>
      {formatter.dateTime(dateObject, format ?? DEFAULT_DATE_FORMAT)}
    </time>
  );
};

export default FormattedTime;

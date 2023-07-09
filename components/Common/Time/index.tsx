import type { FC } from 'react';
import { FormattedDate } from 'react-intl';

type TimeProps = { date: string | Date; format: Intl.DateTimeFormatOptions };

export const Time: FC<TimeProps> = ({ date, format }) => {
  const dateObject = new Date(date);

  return (
    <time dateTime={dateObject.toISOString()}>
      <FormattedDate value={dateObject} {...format} timeZone="UTC" />
    </time>
  );
};

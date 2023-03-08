import { formatTime } from './formatTime';

export const getTimeComponent = (date: string, humanFormat = '%F') => (
  <time dateTime={formatTime(date, '%FT%T%z')}>
    {formatTime(date, humanFormat)}
  </time>
);

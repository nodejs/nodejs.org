import { formatTime } from './formatTime';

export const getTimeComponent = (date: string) => (
  <time dateTime={formatTime(date, '%FT%T%z')}>{formatTime(date, '%F')}</time>
);

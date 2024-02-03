import type { CalendarEvent, ZonedCalendarTime } from '@/types';

export const isZoned = (d: object): d is ZonedCalendarTime =>
  'dateTime' in d && 'timeZone' in d;

export const getZoomLink = (
  event: Pick<CalendarEvent, 'description' | 'location'>
) =>
  event.description?.match(/https:\/\/zoom.us\/j\/\d+/)?.[0] ||
  event.location?.match(/https:\/\/zoom.us\/j\/\d+/)?.[0];

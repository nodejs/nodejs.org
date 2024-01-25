import type { FC } from 'react';

import Time from '@/components/Common/Time';
import Link from '@/components/Link';
import { CALENDAR_NODEJS_ID } from '@/next.calendar.constants.mjs';
import { getCalendarEvents } from '@/next.calendar.mjs';
import type { CalendarEvent, ZonedCalendarTime } from '@/types';

type GrouppedEntries = Record<string, Array<CalendarEvent>>;

const isZoned = (d: object): d is ZonedCalendarTime =>
  'dateTime' in d && 'timeZone' in d;

const getZoomLink = (event: Pick<CalendarEvent, 'description' | 'location'>) =>
  event.description?.match(/https:\/\/zoom.us\/j\/\d+/)?.[0] ||
  event.location?.match(/https:\/\/zoom.us\/j\/\d+/)?.[0];

const UpcomingCalendar: FC = async () => {
  const events = await getCalendarEvents(CALENDAR_NODEJS_ID);

  const groupedEntries = events.filter(getZoomLink).reduce((acc, event) => {
    const startDate = new Date(
      isZoned(event.start) ? event.start.dateTime : event.start.date
    );

    const datePerDay = startDate.toDateString();

    acc[datePerDay] = acc[datePerDay] || [];
    acc[datePerDay].push(event);

    return acc;
  }, {} as GrouppedEntries);

  const sortedGroupedEntries = Object.entries(groupedEntries).sort(
    ([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime()
  );

  return sortedGroupedEntries.map(([date, entries]) => (
    <div key={date} className="flex flex-col gap-2">
      <h4 className="text-xl font-bold">
        <Time date={date} format={{ day: 'numeric', month: 'long' }} />
      </h4>

      {entries.map(({ id, start, end, summary, location, description }) => (
        <div key={id} className="flex w-fit flex-col gap-1">
          <div className="flex flex-row gap-2">
            <span className="text-sm font-bold">
              <Time
                date={isZoned(start) ? start.dateTime : start.date}
                format={{ hour: 'numeric', minute: 'numeric' }}
              />
            </span>
            <span className="text-sm font-bold">-</span>
            <span className="text-sm font-bold">
              <Time
                date={isZoned(end) ? end.dateTime : end.date}
                format={{ hour: 'numeric', minute: 'numeric' }}
              />
            </span>
            (UTC)
          </div>

          <Link href={getZoomLink({ description, location })}>
            <div className="text-sm">{summary}</div>
          </Link>
        </div>
      ))}
    </div>
  ));
};

export default UpcomingCalendar;

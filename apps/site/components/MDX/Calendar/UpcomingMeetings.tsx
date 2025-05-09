import type { FC } from 'react';

import FormattedTime from '#site/components/Common/FormattedTime';
import Event from '#site/components/MDX/Calendar/Event';
import { getZoomLink, isZoned } from '#site/components/MDX/Calendar/utils';
import { CALENDAR_NODEJS_ID } from '#site/next.calendar.constants.mjs';
import { getCalendarEvents } from '#site/next.calendar.mjs';
import type { CalendarEvent } from '#site/types';

import styles from './calendar.module.css';

type GroupedEntries = Record<string, Array<CalendarEvent>>;

const UpcomingMeetings: FC = async () => {
  const events = await getCalendarEvents(CALENDAR_NODEJS_ID);

  const groupedEntries = events.filter(getZoomLink).reduce((acc, event) => {
    const startDate = new Date(
      isZoned(event.start) ? event.start.dateTime : event.start.date
    );

    const datePerDay = startDate.toDateString();

    acc[datePerDay] = acc[datePerDay] || [];
    acc[datePerDay].push(event);

    return acc;
  }, {} as GroupedEntries);

  const sortedGroupedEntries = Object.entries(groupedEntries).sort(
    ([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime()
  );

  return sortedGroupedEntries.map(([date, entries]) => (
    <div key={date} className={styles.events}>
      <h4>
        <FormattedTime date={date} format={{ day: 'numeric', month: 'long' }} />
      </h4>

      {entries.map(({ id, start, end, summary, location, description }) => (
        <Event
          key={id}
          start={start}
          end={end}
          summary={summary}
          location={location}
          description={description}
        />
      ))}
    </div>
  ));
};

export default UpcomingMeetings;

import type { FC } from 'react';

import FormattedTime from '@/components/Common/FormattedTime';
import Link from '@/components/Link';
import { getZoomLink, isZoned } from '@/components/MDX/Calendar/utils';
import type { CalendarEvent } from '@/types';

import styles from './index.module.css';

type EventProps = Pick<
  CalendarEvent,
  'start' | 'end' | 'summary' | 'location' | 'description'
>;

const Event: FC<EventProps> = ({
  start,
  end,
  description,
  summary,
  location,
}) => (
  <div className={styles.event}>
    <div className={styles.title}>
      <span>
        <FormattedTime
          date={isZoned(start) ? start.dateTime : start.date}
          format={{ hour: 'numeric', minute: 'numeric' }}
        />
      </span>
      <span>-</span>
      <span>
        <FormattedTime
          date={isZoned(end) ? end.dateTime : end.date}
          format={{ hour: 'numeric', minute: 'numeric' }}
        />
      </span>
      <small>(UTC)</small>
    </div>

    <Link href={getZoomLink({ description, location })}>{summary}</Link>
  </div>
);

export default Event;

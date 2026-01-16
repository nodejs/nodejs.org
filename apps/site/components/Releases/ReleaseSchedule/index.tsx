import { create } from 'lts';

import provideReleaseSchedule from '#site/next-data/providers/releaseSchedule';

import type { FC } from 'react';

const MONTH = 30 * 24 * 3_600_000;

const ReleaseSchedule: FC = async () => {
  const schedule = await provideReleaseSchedule();

  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();

  const threeMonthsAgo = new Date(now - 3 * MONTH);
  const sixMonthsFromNow = new Date(now + 6 * MONTH);

  const svg = create({
    data: schedule,
    queryStart: threeMonthsAgo,
    queryEnd: sixMonthsFromNow,
    animate: true,
    excludeMain: false,
    projectName: 'Node.js',
    currentDateMarker: 'red',
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg.html() }}
      className="h-auto w-auto"
    />
  );
};

export default ReleaseSchedule;

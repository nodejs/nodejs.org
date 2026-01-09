import { create } from 'lts';

import provideReleaseSchedule from '#site/next-data/providers/releaseSchedule';

import type { FC } from 'react';

const ReleaseSchedule: FC = async () => {
  const schedule = await provideReleaseSchedule();

  const now = new Date();

  const threeMonthsAgo = new Date(now);
  threeMonthsAgo.setMonth(now.getMonth() - 3);

  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(now.getMonth() + 6);

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

import { cache } from 'react';

import fetchReleaseSchedule from '#site/next-data/generators/releaseSchedule.mjs';

export default cache(fetchReleaseSchedule);

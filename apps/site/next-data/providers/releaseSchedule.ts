import { cache } from 'react';

import generateReleaseSchdule from '#site/next-data/generators/releaseSchedule.mjs';

export default cache(generateReleaseSchdule);

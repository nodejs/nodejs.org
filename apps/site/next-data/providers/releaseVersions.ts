import { cache } from 'react';

import generateReleaseVersions from '#site/next-data/generators/releaseVersions.mjs';

export default cache(generateReleaseVersions);

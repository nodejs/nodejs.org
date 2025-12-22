import { cache } from 'react';

import generateReleaseData from '#site/next-data/generators/releaseData.mjs';

export default cache(generateReleaseData);

import { cache } from 'react';

import generateAllVersionsData from '#site/next-data/generators/releaseVersions.mjs';

const releaseVersions = await generateAllVersionsData();

const provideReleaseVersions = cache(() => releaseVersions);

export default provideReleaseVersions;

import { cache } from 'react';

import generateReleaseVersions from '#site/next-data/generators/releaseVersions.mjs';

const releaseVersions = await generateReleaseVersions();

const provideReleaseVersions = cache(() => releaseVersions);

export default provideReleaseVersions;

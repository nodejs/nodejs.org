import { cache } from 'react';

import generateReleaseData from '#site/next-data/generators/releaseData.mjs';

const releaseData = await generateReleaseData();

const provideReleaseData = cache(() => releaseData);

export default provideReleaseData;

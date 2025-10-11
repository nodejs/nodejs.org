'use cache';

import generateReleaseData from '#site/next-data/generators/releaseData.mjs';

const provideReleaseData = async () => generateReleaseData();

export default provideReleaseData;

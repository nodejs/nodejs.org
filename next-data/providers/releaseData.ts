import { cache } from 'react';

import generateReleaseData from '@/next-data/generators/releaseData.mjs';

const releaseData = generateReleaseData();

const provideReleaseData = cache(async () => releaseData);

export default provideReleaseData;

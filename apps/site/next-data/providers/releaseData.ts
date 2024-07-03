import { cache } from 'react';

import generateReleaseData from '@/next-data/generators/releaseData.mjs';

const releaseData = await generateReleaseData();

const provideReleaseData = cache(() => releaseData);

export default provideReleaseData;

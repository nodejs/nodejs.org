import { cache } from 'react';

import generateReleaseData from '@/next-data/generators/releaseData.mjs';

const provideReleaseData = cache(() => generateReleaseData());

export default provideReleaseData;

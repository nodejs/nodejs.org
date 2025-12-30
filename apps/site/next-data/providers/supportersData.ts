import { cache } from 'react';

import generateSupporters from '#site/next-data/generators/supportersData.mjs';

export default cache(generateSupporters);

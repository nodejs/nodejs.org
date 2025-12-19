import { cache } from 'react';

import generatePartners from '#site/next-data/generators/partners.mjs';

export default cache(generatePartners);

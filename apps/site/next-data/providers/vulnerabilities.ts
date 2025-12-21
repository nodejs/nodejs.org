import { cache } from 'react';

import generateVulnerabilities from '#site/next-data/generators/vulnerabilities.mjs';

export default cache(generateVulnerabilities);

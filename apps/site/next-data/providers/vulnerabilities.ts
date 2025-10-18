import { cache } from 'react';

import generateVulnerabilities from '#site/next-data/generators/vulnerabilities.mjs';

const vulnerabilities = await generateVulnerabilities();

const provideVulnerabilities = cache(() => vulnerabilities);

export default provideVulnerabilities;

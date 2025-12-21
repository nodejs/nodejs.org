import { cache } from 'react';

import generateSupporters from '#site/next-data/generators/supportersData.mjs';

const supportersData = await generateSupporters();

const provideSupporters = cache(() => supportersData);

export default provideSupporters;

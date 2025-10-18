import { cache } from 'react';

import { fetchOpenCollectiveData } from '#site/next-data/generators/supportersData.mjs';

const openCollectiveSupporters = await fetchOpenCollectiveData();

const provideSupporters = cache(() => openCollectiveSupporters);

export default provideSupporters;

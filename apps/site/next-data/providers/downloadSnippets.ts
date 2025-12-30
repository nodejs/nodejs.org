import { cache } from 'react';

import generateDownloadSnippets from '#site/next-data/generators/downloadSnippets.mjs';

export default cache(generateDownloadSnippets);

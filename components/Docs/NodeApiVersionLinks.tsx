import type { FC } from 'react';

import getReleaseData from '@/next-data/releaseData';
import { DOCS_URL } from '@/next.constants.mjs';

// This is a React Async Server Component
// Note that Hooks cannot be used in a RSC async component
// Async Components do not get re-rendered at all.
const NodeApiVersionLinks: FC = async () => {
  const releaseData = await getReleaseData();

  // Gets all major releases without the 0x release as those are divided on 0.12x and 0.10x
  const mappedReleases = releaseData.slice(0, -1).map(({ major }) => (
    <li key={major}>
      <a href={`${DOCS_URL}latest-v${major}.x/api/`}>Node.js {major}.x</a>
    </li>
  ));

  return (
    <ul>
      {mappedReleases}

      <li>
        <a href={`${DOCS_URL}latest-v0.12.x/api/`}>Node.js 0.12.x</a>
      </li>
      <li>
        <a href={`${DOCS_URL}latest-v0.10.x/api/`}>Node.js 0.10.x</a>
      </li>
    </ul>
  );
};

export default NodeApiVersionLinks;

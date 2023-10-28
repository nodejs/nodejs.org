import { useMemo } from 'react';

import { useNodeReleases } from '@/hooks/useNodeReleases';
import { DOCS_URL } from '@/next.constants.mjs';

const NodeApiVersionLinks = () => {
  const { releases } = useNodeReleases();

  const mappedReleases = useMemo(
    () =>
      // Gets all major releases without the 0x release as those are divided on 0.12x and 0.10x
      releases.slice(0, -1).map(({ major }) => (
        <li key={major}>
          <a href={`${DOCS_URL}latest-v${major}.x/api/`}>Node.js {major}.x</a>
        </li>
      )),
    [releases]
  );

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

import type { FC } from 'react';

import provideReleaseData from '#site/next-data/providers/releaseData';
import type { NodeRelease, NodeReleaseStatus } from '#site/types';

type WithNodeReleaseProps = {
  status: Array<NodeReleaseStatus> | NodeReleaseStatus;
  children: FC<{ release: NodeRelease }>;
};

// This is a React Async Server Component
// Note that Hooks cannot be used in a RSC async component
// Async Components do not get re-rendered at all.
const WithNodeRelease: FC<WithNodeReleaseProps> = ({
  status,
  children: Component,
}) => {
  const releaseData = provideReleaseData();

  const matchingRelease = releaseData.find(release =>
    [status].flat().includes(release.status)
  );

  if (matchingRelease !== undefined) {
    return <Component release={matchingRelease!} />;
  }

  return null;
};

export default WithNodeRelease;

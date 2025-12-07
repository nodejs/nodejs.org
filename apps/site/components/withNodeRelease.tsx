'use server';

import provideReleaseData from '#site/next-data/providers/releaseData';

import type { NodeRelease, NodeReleaseStatus } from '#site/types';
import type { FC } from 'react';

type WithNodeReleaseProps = {
  status: Array<NodeReleaseStatus> | NodeReleaseStatus;
  children: FC<{ release: NodeRelease }>;
};

// This is a React Async Server Component
// Note that Hooks cannot be used in a RSC async component
// Async Components do not get re-rendered at all.
const WithNodeRelease: FC<WithNodeReleaseProps> = async ({
  status: statuses,
  children: Component,
}) => {
  const releases = await provideReleaseData();

  const matchingRelease = [statuses]
    .flat()
    .map(status => releases.find(release => release.status === status))
    .find(Boolean);

  if (matchingRelease) {
    return <Component release={matchingRelease} />;
  }

  return null;
};

export default WithNodeRelease;

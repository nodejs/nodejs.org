'use server';

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
const WithNodeRelease: FC<WithNodeReleaseProps> = async ({
  status,
  children: Component,
}) => {
  const releaseData = await provideReleaseData();

  let matchingRelease: NodeRelease | undefined;
  for (const statusItem of Array.isArray(status) ? status : [status]) {
    matchingRelease = releaseData.find(
      release => release.status === statusItem
    );
    if (matchingRelease) {
      break;
    }
  }

  if (matchingRelease) {
    return <Component release={matchingRelease} />;
  }

  return null;
};

export default WithNodeRelease;

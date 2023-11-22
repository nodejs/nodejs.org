import type { FC } from 'react';

import { releaseData } from '@/next.data.mjs';
import type { NodeRelease, NodeReleaseStatus } from '@/types';

type WithNodeReleaseProps = {
  status: NodeReleaseStatus[] | NodeReleaseStatus;
  children: FC<{ release: NodeRelease }>;
};

export const WithNodeRelease: FC<WithNodeReleaseProps> = ({
  status,
  children: Component,
}) => {
  const matchingRelease = releaseData.find(release =>
    [status].flat().includes(release.status)
  );

  if (matchingRelease !== undefined) {
    return <Component release={matchingRelease!} />;
  }

  return null;
};

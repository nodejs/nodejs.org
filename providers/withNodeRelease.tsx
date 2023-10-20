import { useMemo } from 'react';
import type { FC } from 'react';

import { useNodeReleases } from '@/hooks/useNodeReleases';
import type { NodeRelease, NodeReleaseStatus } from '@/types';
import { isNodeRelease } from '@/util/nodeRelease';

type WithNodeReleaseProps = {
  status: NodeReleaseStatus[] | NodeReleaseStatus;
  children: FC<{ release: NodeRelease }>;
};

export const WithNodeRelease: FC<WithNodeReleaseProps> = ({
  status,
  children: Component,
}) => {
  const { getReleaseByStatus } = useNodeReleases();

  const [release] = useMemo(
    () =>
      [status]
        .flat()
        .map(s => getReleaseByStatus(s))
        .filter(s => !!s),
    [status, getReleaseByStatus]
  );

  if (release !== undefined && isNodeRelease(release)) {
    return <Component release={release} />;
  }

  return null;
};

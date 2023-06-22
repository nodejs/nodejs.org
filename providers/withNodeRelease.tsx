import { useMemo } from 'react';
import { useNodeReleases } from '../hooks/useNodeReleases';
import { isNodeRelease } from '../util/nodeRelease';
import type { FC } from 'react';
import type { NodeRelease, NodeReleaseStatus } from '../types';

type WithNodeReleaseProps = {
  status: NodeReleaseStatus;
  children: FC<{ release: NodeRelease }>;
};

export const WithNodeRelease: FC<WithNodeReleaseProps> = ({
  status,
  children: Component,
}) => {
  const { getReleaseByStatus } = useNodeReleases();

  const release = useMemo(
    () => getReleaseByStatus(status),
    [status, getReleaseByStatus]
  );

  if (isNodeRelease(release)) {
    return <Component release={release} />;
  }

  return null;
};

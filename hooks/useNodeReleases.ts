import { useCallback, useContext } from 'react';
import { NodeReleasesContext } from '../providers/nodeReleasesProvider';
import type { NodeReleaseStatus } from '../types';

export const useNodeReleases = () => {
  const releases = useContext(NodeReleasesContext);

  const getReleaseByStatus = useCallback(
    (status: NodeReleaseStatus) =>
      releases.find(release => release.status === status),
    [releases]
  );

  return { releases, getReleaseByStatus };
};

import { createContext, useCallback } from 'react';
import { useFetchNodeReleases } from '../hooks/useFetchNodeReleases';
import type { FC, PropsWithChildren } from 'react';
import type { NodeRelease, NodeReleaseStatus } from '../types';

export const NodeReleasesContext = createContext<{
  releases: NodeRelease[];
  getReleaseByStatus: (status: NodeReleaseStatus) => NodeRelease | undefined;
}>({
  releases: [],
  getReleaseByStatus: (_: NodeReleaseStatus) => undefined,
});

export const NodeReleasesProvider: FC<PropsWithChildren> = ({ children }) => {
  const releases = useFetchNodeReleases();

  const getReleaseByStatus = useCallback(
    (status: NodeReleaseStatus) =>
      releases.find(release => release.status === status),
    [releases]
  );

  return (
    <NodeReleasesContext.Provider value={{ releases, getReleaseByStatus }}>
      {children}
    </NodeReleasesContext.Provider>
  );
};

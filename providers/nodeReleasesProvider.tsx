import { createContext } from 'react';
import { useFetchNodeReleases } from '../hooks/useFetchNodeReleases';
import type { FC, PropsWithChildren } from 'react';
import type { NodeRelease } from '../types';

export const NodeReleasesContext = createContext<{
  releases: NodeRelease[];
  lts?: NodeRelease;
  current?: NodeRelease;
}>(undefined as any);

export const NodeReleasesProvider: FC<PropsWithChildren> = ({ children }) => {
  const releases = useFetchNodeReleases();

  const lts = releases.find(release => release.status === 'Active LTS');
  const current = releases.find(release => release.status === 'Current');

  return (
    <NodeReleasesContext.Provider value={{ releases, lts, current }}>
      {children}
    </NodeReleasesContext.Provider>
  );
};

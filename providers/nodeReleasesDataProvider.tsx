import { createContext } from 'react';
import { useFetchNodeReleasesData } from '../hooks/useFetchNodeReleasesData';
import type { FC, PropsWithChildren } from 'react';
import type { NodeReleaseData } from '../types';

export const NodeReleasesDataContext = createContext<{
  releases: NodeReleaseData[];
  lts?: NodeReleaseData;
  current?: NodeReleaseData;
}>(undefined as any);

export const NodeReleasesDataProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const releases = useFetchNodeReleasesData();

  const lts = releases.find(release => release.status === 'Active LTS');
  const current = releases.find(release => release.status === 'Current');

  return (
    <NodeReleasesDataContext.Provider value={{ releases, lts, current }}>
      {children}
    </NodeReleasesDataContext.Provider>
  );
};

import { createContext } from 'react';
import type { FC, PropsWithChildren } from 'react';
import type {
  NodeReleaseData,
  NodeReleasesDataContext as NodeReleasesDataContextType,
} from '../types';

type NodeReleasesDataProviderProps = PropsWithChildren<{
  releases: NodeReleaseData[];
}>;

export const NodeReleasesDataContext =
  createContext<NodeReleasesDataContextType>(undefined as any);

export const NodeReleasesDataProvider: FC<NodeReleasesDataProviderProps> = ({
  children,
  releases,
}) => {
  const lts = releases.find(release => release.status === 'Active LTS');
  const current = releases.find(release => release.status === 'Current');

  return (
    <NodeReleasesDataContext.Provider value={{ releases, lts, current }}>
      {children}
    </NodeReleasesDataContext.Provider>
  );
};

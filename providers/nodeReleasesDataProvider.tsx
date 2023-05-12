import { createContext } from 'react';
import type { FC, PropsWithChildren } from 'react';
import type {
  NodeReleaseData,
  NodeReleasesDataContext as NodeReleasesDataContextType,
} from '../types';

type NodeReleasesDataProviderProps = PropsWithChildren<{
  nodeReleasesData: NodeReleaseData[];
}>;

export const NodeReleasesDataContext =
  createContext<NodeReleasesDataContextType>(undefined as any);

export const NodeReleasesDataProvider: FC<NodeReleasesDataProviderProps> = ({
  children,
  nodeReleasesData,
}) => {
  const current = nodeReleasesData.find(
    nodeReleaseData => nodeReleaseData.status === 'Current'
  );
  const lts =
    nodeReleasesData.find(
      nodeReleaseData => nodeReleaseData.status === 'Active LTS'
    ) || current;

  return (
    <NodeReleasesDataContext.Provider
      value={{ nodeReleasesData, lts, current }}
    >
      {children}
    </NodeReleasesDataContext.Provider>
  );
};

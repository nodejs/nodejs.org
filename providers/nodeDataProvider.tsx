import { createContext } from 'react';
import type { FC, PropsWithChildren } from 'react';
import type { NodeVersionData } from '../types';

type NodeDataProviderProps = PropsWithChildren<{
  nodeVersionData: NodeVersionData[];
}>;

export const NodeDataContext = createContext<NodeVersionData[]>([]);

export const NodeDataProvider: FC<NodeDataProviderProps> = ({
  children,
  nodeVersionData,
}) => (
  <NodeDataContext.Provider value={nodeVersionData || []}>
    {children}
  </NodeDataContext.Provider>
);

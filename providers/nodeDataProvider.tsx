import { createContext } from 'react';
import type { PropsWithChildren } from 'react';

import type { NodeVersionData } from '../types';

type NodeDataProviderProps = PropsWithChildren<{
  nodeVersionData: NodeVersionData[];
}>;

export const NodeDataContext = createContext<NodeVersionData[]>([]);

export const NodeDataProvider = (props: NodeDataProviderProps) => (
  <NodeDataContext.Provider value={props.nodeVersionData || []}>
    {props.children}
  </NodeDataContext.Provider>
);

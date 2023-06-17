import { createContext } from 'react';
import { useFetchNodeReleases } from '../hooks/useFetchNodeReleases';
import type { FC, PropsWithChildren } from 'react';
import type { NodeRelease } from '../types';

export const NodeReleasesContext = createContext<NodeRelease[]>([]);

export const NodeReleasesProvider: FC<PropsWithChildren> = ({ children }) => {
  const releases = useFetchNodeReleases();

  return (
    <NodeReleasesContext.Provider value={releases}>
      {children}
    </NodeReleasesContext.Provider>
  );
};

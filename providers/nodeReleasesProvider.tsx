import { createContext, useMemo } from 'react';
import nodeReleasesData from '../public/node-releases-data.json';
import { getNodeReleaseStatus } from '../util/nodeRelease';
import type { FC, PropsWithChildren } from 'react';
import type { NodeReleaseSource, NodeRelease } from '../types';

export const NodeReleasesContext = createContext<NodeRelease[]>([]);

export const NodeReleasesProvider: FC<PropsWithChildren> = ({ children }) => {
  const releases = useMemo(() => {
    const now = new Date();

    return nodeReleasesData.map((raw: NodeReleaseSource) => {
      const support = {
        currentStart: raw.currentStart,
        ltsStart: raw.ltsStart,
        maintenanceStart: raw.maintenanceStart,
        endOfLife: raw.endOfLife,
      };

      const status = getNodeReleaseStatus(now, support);

      return {
        ...support,
        major: raw.major,
        version: raw.version,
        versionWithPrefix: `v${raw.version}`,
        codename: raw.codename || '',
        isLts: status === 'Active LTS' || status === 'Maintenance LTS',
        status: status,
        npm: raw.npm || '',
        v8: raw.v8 || '',
        releaseDate: raw.releaseDate || '',
        modules: raw.modules || '',
      };
    });
  }, []);

  return (
    <NodeReleasesContext.Provider value={releases}>
      {children}
    </NodeReleasesContext.Provider>
  );
};

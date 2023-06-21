import { createContext, useMemo } from 'react';
import nodeReleasesData from '../public/node-releases-data.json';
import { getNodeReleaseStatus } from '../util/nodeRelease';
import type { FC, PropsWithChildren } from 'react';
import type { NodeRelease } from '../types';

type NodeReleaseJSON = {
  major: number;
  version: string;
  codename?: string;
  currentStart: string;
  ltsStart?: string;
  maintenanceStart?: string;
  endOfLife: string;
  npm?: string;
  v8?: string;
  releaseDate?: string;
  modules?: string;
};

export const NodeReleasesContext = createContext<NodeRelease[]>([]);

export const NodeReleasesProvider: FC<PropsWithChildren> = ({ children }) => {
  const releases = useMemo(() => {
    const now = new Date();

    return nodeReleasesData.map((raw: NodeReleaseJSON) => {
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

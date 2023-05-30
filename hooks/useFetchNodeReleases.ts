import { useRouter } from 'next/router';
import { useMemo } from 'react';
import useSWR from 'swr';
import { getNodeReleaseStatus } from '../util/nodeRelease';
import type { NodeRelease } from '../types';

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then(res => res.json());

export const useFetchNodeReleases = (): NodeRelease[] => {
  const { basePath } = useRouter();

  const { data = [] } = useSWR<any[]>(
    `${basePath}/node-releases-data.json`,
    fetcher
  );

  return useMemo(() => {
    const now = new Date();

    return data.map(raw => {
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
      } as NodeRelease;
    });
  }, [data]);
};

import { useRouter } from 'next/router';
import { useMemo } from 'react';
import useSWR from 'swr';
import { getNodeReleaseStatus } from '../util/nodeReleaseData';
import type { NodeReleaseData } from '../types';

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then(res => res.json());

export const useFetchNodeReleasesData = (): NodeReleaseData[] => {
  const { basePath } = useRouter();

  const { data = [] } = useSWR<any[]>(
    `${basePath}/static/node-releases-data.json`,
    fetcher
  );

  return useMemo(() => {
    const now = new Date();

    return data.map(raw => {
      const status = getNodeReleaseStatus(
        now,
        raw.currentStart,
        raw.ltsStart,
        raw.maintenanceStart,
        raw.endOfLife
      );

      return {
        major: raw.major,
        version: raw.version,
        versionWithPrefix: `v${raw.version}`,
        codename: raw.codename || '',
        isLts: status === 'Active LTS' || status === 'Maintenance LTS',
        status: status,
        currentStart: raw.currentStart,
        ltsStart: raw.ltsStart,
        maintenanceStart: raw.maintenanceStart,
        endOfLife: raw.endOfLife,
        npm: raw.npm || '',
        v8: raw.v8 || '',
        releaseDate: raw.releaseDate || '',
        modules: raw.modules || '',
      } as NodeReleaseData;
    });
  }, [data]);
};

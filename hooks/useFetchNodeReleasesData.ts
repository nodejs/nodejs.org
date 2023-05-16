import { useRouter } from 'next/router';
import { useMemo } from 'react';
import useSWR from 'swr';
import type { NodeReleaseData } from '../types';

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then(res => res.json());

const getNodeReleaseStatus = (
  now: Date,
  currentStart?: string,
  ltsStart?: string,
  maintenanceStart?: string,
  endOfLife?: string
) => {
  if (endOfLife) {
    const endOfLifeDate = new Date(endOfLife);
    if (now > endOfLifeDate) {
      return 'End-of-life';
    }
  }

  if (maintenanceStart) {
    const maintenanceStartDate = new Date(maintenanceStart);
    if (now > maintenanceStartDate) {
      return 'Maintenance LTS';
    }
  }

  if (ltsStart) {
    const ltsStartDate = new Date(ltsStart);
    if (now > ltsStartDate) {
      return 'Active LTS';
    }
  }

  if (currentStart) {
    const currentStartDate = new Date(currentStart);
    if (now >= currentStartDate) {
      return 'Current';
    }
  }

  return 'Pending';
};

export const useFetchNodeReleasesData = (): NodeReleaseData[] => {
  const { basePath } = useRouter();

  const { data = [] } = useSWR<any[]>(
    `${basePath}/static/node-releases-data.json`,
    fetcher
  );

  const nodeReleasesData = useMemo(() => {
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

  return nodeReleasesData;
};

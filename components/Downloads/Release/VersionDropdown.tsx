'use client';

import type { FC } from 'react';
import { useContext, useEffect } from 'react';

import Select from '@/components/Common/Select';
import { ReleaseContext } from '@/providers/releaseProvider';
import type { NodeRelease } from '@/types';

const getDropDownStatus = (version: string, status: string) => {
  if (status === 'Active LTS') {
    return `${version} (LTS)`;
  }

  if (status === 'Current') {
    return `${version} (Current)`;
  }

  return version;
};

const VersionDropdown: FC<NodeRelease> = ({ versionWithPrefix }) => {
  const { releases, release, setVersion } = useContext(ReleaseContext);
  // we shouldn't react when "actions" change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setVersion(versionWithPrefix), []);

  return (
    <Select
      values={releases.map(({ status, versionWithPrefix }) => ({
        value: versionWithPrefix,
        label: getDropDownStatus(versionWithPrefix, status),
      }))}
      defaultValue={release.versionWithPrefix}
      onChange={setVersion}
      className="min-w-28"
      inline
    />
  );
};

export default VersionDropdown;

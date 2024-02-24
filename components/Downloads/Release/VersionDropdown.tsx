'use client';

import type { FC } from 'react';
import { useContext, useEffect } from 'react';

import Select from '@/components/Common/Select';
import { ReleaseContext } from '@/providers/releaseProvider';
import type { NodeRelease } from '@/types';

const VersionDropdown: FC<NodeRelease> = ({ versionWithPrefix }) => {
  const { releases, setVersion } = useContext(ReleaseContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setVersion(versionWithPrefix), []);

  return (
    <Select
      values={releases.map(({ versionWithPrefix }) => versionWithPrefix)}
      defaultValue={versionWithPrefix}
      onChange={setVersion}
      className="min-w-28"
      inline
    />
  );
};

export default VersionDropdown;

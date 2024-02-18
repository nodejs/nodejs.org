'use client';

import type { FC } from 'react';
import { useEffect, useMemo } from 'react';

import Select from '@/components/Common/Select';
import { useReleaseContext } from '@/providers/releaseProvider';
import type { NodeReleaseStatus } from '@/types';

type VersionDropdownProps = {
  status: NodeReleaseStatus;
};

const VersionDropdown: FC<VersionDropdownProps> = ({
  status = 'Active LTS',
}) => {
  const {
    state: { version, releases },
    dispatch: { setVersion },
  } = useReleaseContext();

  const release = useMemo(
    () => releases.find(item => item.status === status)?.versionWithPrefix,
    [releases, status]
  );

  useEffect(() => {
    setVersion(release!);
  }, [release, setVersion]);

  return (
    <Select
      values={releases.map(({ versionWithPrefix }) => versionWithPrefix)}
      defaultValue={version}
      onChange={setVersion}
      className="min-w-28"
      inline
    />
  );
};

export default VersionDropdown;

'use client';

import type { FC } from 'react';
import { useEffect } from 'react';

import Select from '@/components/Common/Select';
import { useDetectOS } from '@/hooks/react-client';
import { useReleaseContext } from '@/providers/releaseProvider';
import type { UserOS } from '@/types/userOS';

export enum OperatingSystem {
  WIN = 'Windows',
  MAC = 'MacOs',
  LINUX = 'Linux',
  OTHER = 'Other',
}

const OperatingSystemDropdown: FC = () => {
  const { os: userOS } = useDetectOS();
  const {
    state: { os },
    dispatch: { setOs },
  } = useReleaseContext();

  useEffect(() => {
    setOs(userOS);
  }, [setOs, userOS]);

  return (
    <Select
      values={[
        {
          items: [
            {
              label: OperatingSystem.WIN,
              value: 'WIN',
            },
            {
              label: OperatingSystem.MAC,
              value: 'MAC',
            },
          ],
        },
      ]}
      defaultValue={os}
      onChange={(value: string) => setOs(value as UserOS)}
      inline
      className="min-w-24"
    />
  );
};

export default OperatingSystemDropdown;

'use client';

import type { FC } from 'react';
import { useEffect } from 'react';

import Select from '@/components/Common/Select';
import { useReleaseContext } from '@/providers/releaseProvider';

const PlatformDropdown: FC = () => {
  const {
    state: { platform },
    dispatch: { setPlatform },
  } = useReleaseContext();

  useEffect(() => {
    setPlatform('NVM');
  }, [setPlatform]);

  return (
    <Select
      values={[
        {
          items: [
            {
              label: 'NVM',
              value: 'NVM',
            },
            {
              label: 'BREW',
              value: 'BREW',
            },
            {
              label: 'FWM',
              value: 'FWM',
            },
          ],
        },
      ]}
      defaultValue={platform}
      onChange={(value: string) => {
        return setPlatform(value || '');
      }}
      inline
      className="min-w-24"
    />
  );
};

export default PlatformDropdown;

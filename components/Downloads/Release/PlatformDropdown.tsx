'use client';

import type { FC } from 'react';
import { useMemo } from 'react';

import Select from '@/components/Common/Select';
import Generic from '@/components/Icons/Platform/Generic';
import Homebrew from '@/components/Icons/Platform/Homebrew';
import NVM from '@/components/Icons/Platform/NVM';
import { useReleaseContext } from '@/providers/releaseProvider';

const PlatformDropdown: FC = () => {
  const {
    state: { platform },
    dispatch: { setPlatform },
  } = useReleaseContext();

  const items = useMemo(
    () => [
      {
        label: 'NVM',
        value: 'NVM',
        iconImage: <NVM width={16} height={16} />,
      },
      {
        label: 'Brew',
        value: 'BREW',
        iconImage: <Homebrew width={16} height={16} />,
      },
      {
        label: 'fvm',
        value: 'FWM',
        iconImage: (
          <Generic className="dark:stroke-neutral-600" width={16} height={16} />
        ),
      },
    ],
    []
  );

  return (
    <Select
      values={[
        {
          items: items,
        },
      ]}
      defaultValue={platform}
      onChange={setPlatform}
      inline
      className="min-w-24"
    />
  );
};

export default PlatformDropdown;

'use client';

import type { FC } from 'react';

import Select from '@/components/Common/Select';
import Generic from '@/components/Icons/Platform/Generic';
import Homebrew from '@/components/Icons/Platform/Homebrew';
import NVM from '@/components/Icons/Platform/NVM';
import { useReleaseContext } from '@/providers/releaseProvider';
import { formatDropdownItems, platformItems } from '@/util/downloadUtils';

const PlatformDropdown: FC = () => {
  const {
    state: { platform },
    dispatch: { setPlatform },
  } = useReleaseContext();

  return (
    <Select
      values={formatDropdownItems({
        items: platformItems,
        icons: {
          NVM: <NVM width={16} height={16} />,
          BREW: <Homebrew width={16} height={16} />,
        },
        defaultIcon: (
          <Generic className="dark:stroke-neutral-600" width={16} height={16} />
        ),
      })}
      defaultValue={platform}
      onChange={setPlatform}
      inline={true}
      className="min-w-24"
    />
  );
};

export default PlatformDropdown;

'use client';

import { useContext, useEffect } from 'react';
import type { FC } from 'react';

import Select from '@/components/Common/Select';
import Generic from '@/components/Icons/Platform/Generic';
import Homebrew from '@/components/Icons/Platform/Homebrew';
import NVM from '@/components/Icons/Platform/NVM';
import { ReleaseContext } from '@/providers/releaseProvider';
import type { PackageManager } from '@/types/release';
import { formatDropdownItems, platformItems } from '@/util/downloadUtils';

const PlatformDropdown: FC = () => {
  const { release, platform, setPlatform } = useContext(ReleaseContext);

  const homebrewSupportsVersion = [
    'Active LTS',
    'Maintenance LTS',
    'Current',
  ].includes(release.status);

  useEffect(() => {
    if (platform === 'BREW' && !homebrewSupportsVersion) {
      setPlatform('NVM');
    }
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homebrewSupportsVersion, platform]);

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
        disabledItems: homebrewSupportsVersion ? [] : ['BREW'],
      })}
      defaultValue={platform}
      onChange={platform => setPlatform(platform as PackageManager)}
      inline={true}
      className="min-w-24"
    />
  );
};

export default PlatformDropdown;

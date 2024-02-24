'use client';

import { useContext } from 'react';
import type { FC } from 'react';
import semVer from 'semver';

import Select from '@/components/Common/Select';
import Generic from '@/components/Icons/Platform/Generic';
import Homebrew from '@/components/Icons/Platform/Homebrew';
import NVM from '@/components/Icons/Platform/NVM';
import { ReleaseContext } from '@/providers/releaseProvider';
import type { PackageManager } from '@/types/release';
import { formatDropdownItems, platformItems } from '@/util/downloadUtils';

const PlatformDropdown: FC = () => {
  const { release, platform, setPlatform } = useContext(ReleaseContext);

  const homebrewSupportsVersion =
    semVer.satisfies(release.version, '>= 14.0.0') &&
    ['Active LTS', 'Maintenance LTS'].includes(release.status);

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

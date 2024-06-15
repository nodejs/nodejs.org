'use client';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useMemo } from 'react';
import type { FC } from 'react';

import Select from '@/components/Common/Select';
import Choco from '@/components/Icons/Platform/Choco';
import Docker from '@/components/Icons/Platform/Docker';
import FNM from '@/components/Icons/Platform/FNM';
import Homebrew from '@/components/Icons/Platform/Homebrew';
import NVM from '@/components/Icons/Platform/NVM';
import { ReleaseContext } from '@/providers/releaseProvider';
import type { PackageManager } from '@/types/release';
import { formatDropdownItems, platformItems } from '@/util/downloadUtils';

const supportedHomebrewVersions = ['LTS', 'Current'];

const PlatformDropdown: FC = () => {
  const { release, os, platform, setPlatform } = useContext(ReleaseContext);
  const t = useTranslations();

  // @TODO: We should have a proper utility that gives
  // disabled OSs, Platforms, based on specific criteria
  // this can be an optimisation for the future
  // to remove this logic from this component
  const disabledItems = useMemo(() => {
    const disabledItems = [];

    if (os === 'WIN') {
      disabledItems.push('BREW', 'NVM');
    }

    if (os === 'LINUX' || os === 'MAC') {
      disabledItems.push('CHOCO');
    }

    const releaseSupportsHomebrew = supportedHomebrewVersions.includes(
      release.status
    );

    if (!releaseSupportsHomebrew) {
      disabledItems.push('BREW');
    }

    return disabledItems;
  }, [os, release.status]);

  // @TODO: We should have a proper utility that gives
  // disabled OSs, Platforms, based on specific criteria
  // this can be an optimisation for the future
  // to remove this logic from this component
  useEffect(() => {
    const currentPlatformExcluded = disabledItems.includes(platform);

    const nonExcludedPlatform = platformItems
      .map(({ value }) => value)
      .find(platform => !disabledItems.includes(platform));

    if (currentPlatformExcluded && nonExcludedPlatform) {
      setPlatform(nonExcludedPlatform);
    }
    // we shouldn't react when "actions" change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [release.status, disabledItems, platform]);

  return (
    <Select
      values={formatDropdownItems({
        items: platformItems,
        icons: {
          NVM: <NVM width={16} height={16} />,
          FNM: <FNM width={16} height={16} />,
          BREW: <Homebrew width={16} height={16} />,
          DOCKER: <Docker width={16} height={16} />,
          CHOCO: <Choco width={16} height={16} />,
        },
        disabledItems,
      })}
      ariaLabel={t('layouts.download.dropdown.platform')}
      defaultValue={platform}
      onChange={platform => setPlatform(platform as PackageManager)}
      className="w-28"
      inline={true}
    />
  );
};

export default PlatformDropdown;

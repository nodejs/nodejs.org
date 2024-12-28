'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { useEffect, useContext, useMemo } from 'react';

import Select from '@/components/Common/Select';
import { useClientContext } from '@/hooks';
import { ReleaseContext } from '@/providers/releaseProvider';
import type { UserPlatform } from '@/types/userOS';
import { PLATFORMS, nextItem, parseCompat } from '@/util/downloadUtils';
import { getUserPlatform } from '@/util/getUserPlatform';

const PlatformDropdown: FC = () => {
  const { architecture, bitness } = useClientContext();

  const release = useContext(ReleaseContext);
  const t = useTranslations();

  useEffect(
    () => {
      if (architecture && bitness) {
        const autoDetectedPlatform = getUserPlatform(architecture, bitness);

        release.setPlatform(autoDetectedPlatform);
      }
    },
    // Only react on the change of the Client Context Architecture and Bitness
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [architecture, bitness]
  );

  // We parse the compatibility of the dropdown items
  const parsedPlatforms = useMemo(
    () =>
      // We only want to parse the compatibility when the OS has finished loading
      // Otherwise, we would be parsing the compatibility of an empty array
      release.os !== 'LOADING'
        ? parseCompat(PLATFORMS[release.os], release)
        : [],
    // We only want to react on the change of the OS, Platform, and Version
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [release.os, release.version]
  );

  // We set the Platform to the next available Architecture when the current
  // one is not valid anymore due to OS or Version changes
  useEffect(
    () => {
      if (release.os !== 'LOADING' && release.platform !== '') {
        release.setPlatform(nextItem(release.platform, parsedPlatforms));
      }
    },
    // We only want to react on the change of the OS and Version
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [release.os, release.version, release.platform]
  );

  return (
    <Select<UserPlatform>
      values={parsedPlatforms}
      defaultValue={release.platform !== '' ? release.platform : undefined}
      loading={release.os === 'LOADING' || release.platform === ''}
      placeholder={t('layouts.download.dropdown.unknown')}
      ariaLabel={t('layouts.download.dropdown.installMethod')}
      onChange={platform => platform && release.setPlatform(platform)}
      className="min-w-28"
      inline={true}
    />
  );
};

export default PlatformDropdown;

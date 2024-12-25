'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useMemo } from 'react';
import type { FC } from 'react';

import Select from '@/components/Common/Select';
import { ReleaseContext } from '@/providers/releaseProvider';
import type { InstallationMethod } from '@/types/release';
import { nextItem, INSTALL_METHODS, parseCompat } from '@/util/downloadUtils';

const PlatformDropdown: FC = () => {
  const release = useContext(ReleaseContext);
  const t = useTranslations();

  // Prevents the Platform from being set during OS loading state
  // This also prevents the Platform from being set (by Dropdwon or Automatic methods)
  // when we haven't yet loaded the OS and defined the initial Platform
  const setPlaform = (platform: InstallationMethod | '') => {
    if (release.os !== 'LOADING' && release.platform !== '') {
      release.setPlatform(platform);
    }
  };

  // We parse the compatibility of the dropdown items
  const parsedPlatforms = useMemo(
    () => parseCompat(INSTALL_METHODS, release),
    // We only want to react on the change of the OS and Version
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [release.os, release.version]
  );

  // We group Platforms on the Platform Dropdown to provide the User
  // understanding of what is recommended/official and what is not.
  const grouppedPlatforms = useMemo(
    () => [
      {
        label: t('layouts.download.dropdown.platformGroups.official'),
        items: parsedPlatforms.filter(({ recommended }) => recommended),
      },
      {
        label: t('layouts.download.dropdown.platformGroups.unofficial'),
        items: parsedPlatforms.filter(({ recommended }) => !recommended),
      },
    ],
    // We only want to react on the change of the parsedPlatforms
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [parsedPlatforms]
  );

  useEffect(() => {
    // We should only define the initial Platform if the current platform is empty
    // (aka has not yet been set) and the OS has finished loading (in the sense that)
    // `detectOS` has finished running and decided what platform we are running on.
    if (release.os !== 'LOADING' && release.platform === '') {
      release.setPlatform(
        // Sets either the utmost recommended platform or the first non-disabled one
        // Note that the first item of groupped platforms is always the recommended one
        nextItem('', grouppedPlatforms[0].items) ||
          nextItem('', parsedPlatforms)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedPlatforms, release.platform, release.os]);

  // We set the Platform to the next available platform when the current
  // one is not valid anymore due to OS or Version changes
  useEffect(
    () => setPlaform(nextItem(release.platform, parsedPlatforms)),
    // We only want to react on the change of the OS and Version
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [release.os, release.version]
  );

  return (
    <Select<InstallationMethod | ''>
      values={grouppedPlatforms}
      defaultValue={release.platform}
      loading={release.os === 'LOADING' || release.platform === ''}
      ariaLabel={t('layouts.download.dropdown.platform')}
      onChange={platform => platform && setPlaform(platform)}
      className="min-w-28"
      inline={true}
    />
  );
};

export default PlatformDropdown;

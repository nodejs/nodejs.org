'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useMemo } from 'react';
import type { FC } from 'react';

import Select from '@/components/Common/Select';
import { ReleaseContext } from '@/providers/releaseProvider';
import type { InstallationMethod } from '@/types/release';
import { nextItem, INSTALL_METHODS, parseCompat } from '@/util/downloadUtils';

const InstallationMethodDropdown: FC = () => {
  const release = useContext(ReleaseContext);
  const t = useTranslations();

  // We parse the compatibility of the dropdown items
  const parsedInstallMethods = useMemo(
    () => parseCompat(INSTALL_METHODS, release),
    // We only want to react on the change of the OS and Version
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [release.os, release.version]
  );

  // We group Platforms on the Platform Dropdown to provide the User
  // understanding of what is recommended/official and what is not.
  const grouppedMethods = useMemo(
    () => [
      {
        label: t('layouts.download.dropdown.platformGroups.official'),
        items: parsedInstallMethods.filter(({ recommended }) => recommended),
      },
      {
        label: t('layouts.download.dropdown.platformGroups.unofficial'),
        items: parsedInstallMethods.filter(({ recommended }) => !recommended),
      },
    ],
    // We only want to react on the change of the parsedPlatforms
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [parsedInstallMethods]
  );

  useEffect(() => {
    // We should only define the initial Platform if the current platform is empty
    // (aka has not yet been set) and the OS has finished loading (in the sense that)
    // `detectOS` has finished running and decided what platform we are running on.
    if (release.os !== 'LOADING' && release.installMethod === '') {
      const installationMethod =
        // Sets either the utmost recommended platform or the first non-disabled one
        // Note that the first item of groupped platforms is always the recommended one
        nextItem<InstallationMethod | ''>('', grouppedMethods[0].items) ||
        nextItem<InstallationMethod | ''>('', parsedInstallMethods);

      // This will never return an empty string as there should always be an item
      // when the OS has finished loading for a given installation method
      release.setInstallMethod(installationMethod as InstallationMethod);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedInstallMethods, release.installMethod, release.os]);

  // We set the Platform to the next available platform when the current
  // one is not valid anymore due to OS or Version changes
  useEffect(
    () => {
      if (release.os !== 'LOADING' && release.installMethod !== '') {
        release.setInstallMethod(
          nextItem(release.installMethod, parsedInstallMethods)
        );
      }
    },
    // We only want to react on the change of the OS and Version
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [release.os, release.version]
  );

  return (
    <Select<InstallationMethod | ''>
      values={grouppedMethods}
      defaultValue={release.installMethod}
      loading={release.os === 'LOADING' || release.installMethod === ''}
      ariaLabel={t('layouts.download.dropdown.platform')}
      onChange={platform => platform && release.setInstallMethod(platform)}
      className="min-w-28"
      inline={true}
    />
  );
};

export default InstallationMethodDropdown;

'use client';

import Select from '@node-core/ui-components/Common/Select';
import { useTranslations } from 'next-intl';
import { useEffect, use, useMemo, useRef } from 'react';

import useClientContext from '#site/hooks/useClientContext';
import { ReleaseContext } from '#site/providers/releaseProvider';
import { PLATFORMS, nextItem, parseCompat } from '#site/util/download';
import { getUserPlatform } from '#site/util/userAgent';

import type { Platform } from '#site/types/userAgent';
import type { FC } from 'react';

const PlatformDropdown: FC = () => {
  const { architecture, bitness } = useClientContext();

  const release = use(ReleaseContext);

  const t = useTranslations();

  // Compute the platform during render so it's available to both `useEffect` calls below in the same cycle
  // (avoiding race conditions when architecture detection and OS detection arrive in the same batch)
  const currentPlatform =
    architecture && bitness ? getUserPlatform(architecture, bitness) : null;

  // Track whether the user has manually selected a platform via the dropdown.
  // When true the OS/version effect will respect their choice instead of
  // resetting to the auto-detected value.
  const userSelectedPlatformRef = useRef(false);

  useEffect(
    () => {
      if (currentPlatform) {
        userSelectedPlatformRef.current = false;
        release.setPlatform(currentPlatform);
      }
    },
    // Only react on the change of the Client Context Architecture and Bitness
    // eslint-disable-next-line @eslint-react/exhaustive-deps
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
    // eslint-disable-next-line @eslint-react/exhaustive-deps
    [release.os, release.version]
  );

  // We set the Platform to the next available Architecture when the current
  // one is not valid anymore due to OS or Version changes
  useEffect(
    () => {
      if (release.os !== 'LOADING' && release.platform !== '') {
        // If the user has not manually selected a platform and there is a currently
        // auto-detected one then use it otherwise fallback to the current release platform
        const basePlatform =
          !userSelectedPlatformRef.current && currentPlatform
            ? currentPlatform
            : release.platform;

        release.setPlatform(nextItem(basePlatform, parsedPlatforms));
      }
    },
    // We only want to react on the change of the OS and Version
    // eslint-disable-next-line @eslint-react/exhaustive-deps
    [release.os, release.version]
  );

  return (
    <Select<Platform>
      values={parsedPlatforms}
      defaultValue={release.platform !== '' ? release.platform : undefined}
      loading={release.os === 'LOADING' || release.platform === ''}
      placeholder={t('layouts.download.dropdown.unknown')}
      ariaLabel={t('layouts.download.dropdown.platform')}
      onChange={platform => {
        userSelectedPlatformRef.current = true;
        release.setPlatform(platform);
      }}
      className="min-w-28"
      inline={true}
    />
  );
};

export default PlatformDropdown;

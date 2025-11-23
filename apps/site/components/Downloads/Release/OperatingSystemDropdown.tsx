'use client';

import Select from '@node-core/ui-components/Common/Select';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useMemo } from 'react';

import { useClientContext } from '#site/hooks';
import { ReleaseContext } from '#site/providers/releaseProvider';
import { nextItem, OPERATING_SYSTEMS, parseCompat } from '#site/util/download';

import type { OperatingSystem } from '#site/types/userAgent';
import type { FC } from 'react';

type OperatingSystemDropdownProps = { exclude?: Array<OperatingSystem> };

const OperatingSystemDropdown: FC<OperatingSystemDropdownProps> = () => {
  const { os } = useClientContext();
  const release = useContext(ReleaseContext);
  const t = useTranslations();

  useEffect(() => {
    if (os !== 'LOADING') {
      release.setOS(os);
    }
    // Reacts on Client Context change of OS
    // Only this Hook is allowed to bypass the `setOS` from above
    // As this Hook is what defined the initial OS state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [os]);

  // We parse the compatibility of the dropdown items
  const parsedOperatingSystems = useMemo(
    () => parseCompat(OPERATING_SYSTEMS, release),
    // We only want to react on the change of the Install Method and Version
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [release.installMethod, release.version]
  );

  // We set the OS to the next available OS when the current
  // one is not valid anymore due to Version changes
  useEffect(
    () => {
      if (release.os !== 'LOADING') {
        release.setOS(nextItem(release.os, parsedOperatingSystems));
      }
    },
    // We only want to react on the change of the Version, Install Method and OS
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [release.installMethod, release.version, release.os]
  );

  return (
    <Select<OperatingSystem>
      values={parsedOperatingSystems}
      defaultValue={release.os !== 'LOADING' ? release.os : undefined}
      loading={release.os === 'LOADING'}
      placeholder={t('layouts.download.dropdown.unknown')}
      ariaLabel={t('layouts.download.dropdown.os')}
      onChange={value => release.setOS(value)}
      className="min-w-[8.5rem]"
      inline={true}
    />
  );
};

export default OperatingSystemDropdown;

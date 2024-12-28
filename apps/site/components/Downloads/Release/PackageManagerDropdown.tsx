'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useMemo } from 'react';
import type { FC } from 'react';

import Select from '@/components/Common/Select';
import { ReleaseContext } from '@/providers/releaseProvider';
import type { PackageManager } from '@/types/release';
import { nextItem, PACKAGE_MANAGERS, parseCompat } from '@/util/downloadUtils';

const PackageManagerDropdown: FC = () => {
  const release = useContext(ReleaseContext);
  const t = useTranslations();

  // We parse the compatibility of the dropdown items
  const parsedPackageManagers = useMemo(
    () => parseCompat(PACKAGE_MANAGERS, release),
    // We only want to react on the change of the Version
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [release.version]
  );

  // We set the Package Manager to the next available Package Manager when the current
  // one is not valid anymore due to Version changes
  useEffect(
    () =>
      release.setPackageManager(
        nextItem(release.packageManager, parsedPackageManagers)
      ),
    // We only want to react on the change of the Version
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [release.version, release.packageManager]
  );

  return (
    <Select<PackageManager>
      values={parsedPackageManagers}
      defaultValue={release.packageManager}
      loading={release.os === 'LOADING' || release.installMethod === ''}
      ariaLabel={t('layouts.download.dropdown.packageManager')}
      onChange={manager => release.setPackageManager(manager)}
      className="min-w-28"
      inline={true}
    />
  );
};

export default PackageManagerDropdown;

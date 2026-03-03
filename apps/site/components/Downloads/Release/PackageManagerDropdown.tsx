'use client';

import Select from '@node-core/ui-components/Common/Select';
import { useTranslations } from 'next-intl';
import { use, useEffect, useMemo } from 'react';

import { ReleaseContext } from '#site/providers/releaseProvider';
import { nextItem, PACKAGE_MANAGERS, parseCompat } from '#site/util/download';

import type { PackageManager } from '#site/types/release';
import type { FC } from 'react';

const PackageManagerDropdown: FC = () => {
  const release = use(ReleaseContext);
  const t = useTranslations();

  // We parse the compatibility of the dropdown items
  const parsedPackageManagers = useMemo(
    () => parseCompat(PACKAGE_MANAGERS, release),
    // We only want to react on the change of the Version
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

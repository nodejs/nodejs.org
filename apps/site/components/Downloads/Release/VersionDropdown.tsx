'use client';

import Select from '@node-core/ui-components/Common/Select';
import { useLocale, useTranslations } from 'next-intl';
import type { FC } from 'react';
import { useContext } from 'react';

import { redirect, usePathname } from '#site/navigation';
import {
  ReleaseContext,
  ReleasesContext,
} from '#site/providers/releaseProvider';

const getDropDownStatus = (version: string, status: string) => {
  if (status === 'LTS') {
    return `${version} (LTS)`;
  }

  if (status === 'Current') {
    return `${version} (Current)`;
  }

  return version;
};

const VersionDropdown: FC = () => {
  const { releases } = useContext(ReleasesContext);
  const { release, setVersion } = useContext(ReleaseContext);
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  // Allows us to keep the route semantically correct to what the user should expect
  // from the /current and non /current routes.
  const setVersionOrNavigate = (version: string) => {
    const release = releases.find(
      ({ versionWithPrefix }) => versionWithPrefix === version
    );

    if (release?.status === 'LTS' && pathname.includes('current')) {
      redirect({ href: '/download', locale: locale });
      return;
    }

    if (release?.status === 'Current' && !pathname.includes('current')) {
      redirect({ href: '/download/current', locale: locale });
      return;
    }

    setVersion(version);
  };

  return (
    <Select
      ariaLabel={t('layouts.download.dropdown.version')}
      values={releases.map(({ status, versionWithPrefix }) => ({
        value: versionWithPrefix,
        label: getDropDownStatus(versionWithPrefix, status),
      }))}
      defaultValue={release.versionWithPrefix}
      onChange={setVersionOrNavigate}
      className="min-w-36"
      inline={true}
    />
  );
};

export default VersionDropdown;

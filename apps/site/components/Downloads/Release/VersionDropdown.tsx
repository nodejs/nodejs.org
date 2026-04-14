'use client';

import WithNoScriptSelect from '@node-core/ui-components/Common/Select/NoScriptSelect';
import { useLocale, useTranslations } from 'next-intl';
import { use } from 'react';

import { redirect, usePathname } from '#site/navigation';
import {
  ReleaseContext,
  ReleasesContext,
} from '#site/providers/releaseProvider';

import type { NodeReleaseStatus } from '#site/types/releases.js';
import type { FC } from 'react';

const getDropDownStatus = (version: string, status: NodeReleaseStatus) => {
  if (status === 'LTS') {
    return `${version} (LTS)`;
  }

  if (status === 'Current') {
    return `${version} (Current)`;
  }

  if (status === 'End-of-life') {
    return `${version} (EoL)`;
  }

  return version;
};

const VersionDropdown: FC = () => {
  const { releases } = use(ReleasesContext);
  const { release, setVersion } = use(ReleaseContext);
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
      redirect({ href: '/download', locale });
      return;
    }

    if (release?.status === 'Current' && !pathname.includes('current')) {
      redirect({ href: '/download/current', locale });
      return;
    }

    setVersion(version);
  };

  return (
    <WithNoScriptSelect
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

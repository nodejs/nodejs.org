'use client';

import WithNoScriptSelect from '@node-core/ui-components/Common/Select/NoScriptSelect';
import { useLocale, useTranslations } from 'next-intl';
import { use } from 'react';

import { redirect, usePathname } from '#site/navigation.mjs';
import { STATUS_KIND_MAP } from '#site/next.constants.mjs';
import {
  ReleaseContext,
  ReleasesContext,
} from '#site/providers/releaseProvider';

import type { FC } from 'react';

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

    if (
      (release?.status === 'LTS' || release?.status === 'EOL') &&
      (pathname.includes('current') || pathname.includes('alpha'))
    ) {
      redirect({ href: '/download', locale });
      return;
    }

    if (release?.status === 'Current' && !pathname.includes('current')) {
      redirect({ href: '/download/current', locale });
      return;
    }

    if (release?.status === 'Alpha' && !pathname.includes('alpha')) {
      redirect({ href: '/download/alpha', locale });
      return;
    }

    setVersion(version);
  };

  return (
    <WithNoScriptSelect
      ariaLabel={t('layouts.download.dropdown.version')}
      values={releases.map(({ status, isMaintenance, versionWithPrefix }) => ({
        value: versionWithPrefix,
        label: versionWithPrefix,
        badge: {
          label: status,
          kind: isMaintenance ? 'neutral' : STATUS_KIND_MAP[status],
        },
      }))}
      defaultValue={release.versionWithPrefix}
      onChange={setVersionOrNavigate}
      className="min-w-36"
      inline={true}
    />
  );
};

export default VersionDropdown;

'use client';

import WithNoScriptSelect from '@node-core/ui-components/Common/Select/NoScriptSelect';
import { useLocale, useTranslations } from 'next-intl';
import { use, useEffect } from 'react';

import { redirect, usePathname } from '#site/navigation.mjs';
import { STATUS_KIND_MAP } from '#site/next.constants.mjs';
import {
  ReleaseContext,
  ReleasesContext,
} from '#site/providers/releaseProvider';

import type { NodeReleaseStatus } from '#site/types';
import type { FC } from 'react';

const VersionDropdown: FC = () => {
  const { releases } = use(ReleasesContext);
  const { release, setVersion } = use(ReleaseContext);
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  // Allows us to keep the route semantically correct to what the user should expect
  // from the /current and non /current routes.
  const getRedirectPath = (status: NodeReleaseStatus) => {
    if (['LTS', 'EOL'].includes(status) && !pathname.endsWith('/download')) {
      return '/download';
    }

    if (status === 'Current' && !pathname.includes('current')) {
      return '/download/current';
    }

    if (status === 'Alpha' && !pathname.includes('alpha')) {
      return '/download/alpha';
    }
  };

  // Ensure the initial route is correct based on the release status.
  useEffect(() => {
    const redirectPath = getRedirectPath(release.status);
    if (redirectPath) {
      redirect({ href: redirectPath, locale });
    }
    // eslint-disable-next-line @eslint-react/exhaustive-deps -- deps are correct on first render, and this should not run again.
  }, []);

  // Handle setting the new version or navigating to the correct route based on status.
  const setVersionOrNavigate = (version: string) => {
    const selectedRelease = releases.find(
      ({ versionWithPrefix }) => versionWithPrefix === version
    );

    if (selectedRelease) {
      const href = getRedirectPath(selectedRelease.status);
      if (href) {
        redirect({ href, locale });
        return;
      }
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

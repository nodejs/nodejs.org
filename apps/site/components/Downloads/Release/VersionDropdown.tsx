'use client';

import WithNoScriptSelect from '@node-core/ui-components/Common/Select/NoScriptSelect';
import { useLocale, useTranslations } from 'next-intl';
import { use, useEffect } from 'react';

import { redirect, usePathname } from '#site/navigation.mjs';
import { STATUS_KIND_MAP, STATUS_ROUTE_MAP } from '#site/next.constants.mjs';
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

  // The route a status is presented on, unless we are already on it.
  const getRouteChange = (status: NodeReleaseStatus) => {
    const route = STATUS_ROUTE_MAP[status];

    return route === pathname ? undefined : route;
  };

  // Ensure the initial route is correct based on the release status.
  useEffect(() => {
    const route = getRouteChange(release.status);
    if (route) {
      redirect({ href: route, locale });
    }
    // eslint-disable-next-line @eslint-react/exhaustive-deps -- deps are correct on first render, and this should not run again.
  }, []);

  // Handle setting the new version or navigating to the correct route based on status.
  const setVersionOrNavigate = (version: string) => {
    const selectedRelease = releases.find(
      ({ versionWithPrefix }) => versionWithPrefix === version
    );

    const route = selectedRelease && getRouteChange(selectedRelease.status);
    if (route) {
      redirect({ href: route, locale });
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

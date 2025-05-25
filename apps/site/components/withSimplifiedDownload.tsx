/**
 * @fileoverview
 * Higher-order component to provide simplified download data and sidebar items
 * to its child component, based on the current route and release data.
 *
 * - Fetches release data and translations
 * - Determines the current version from the URL
 * - Finds the matching release and builds download artifacts
 * - Localizes sidebar group names
 *
 * Usage:
 * <WithSimplifiedDownload>
 *   {(props) => <YourComponent {...props} />}
 * </WithSimplifiedDownload>
 */

import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import { getClientContext } from '#site/client-context';
import getReleaseData from '#site/next-data/releaseData';
import {
  buildReleaseArtifacts,
  groupReleasesByStatus,
} from '#site/util/downloadUtils/simple';

type SimplifiedDownload = ReturnType<typeof buildReleaseArtifacts> & {
  mappedSidebarItems: ReturnType<typeof groupReleasesByStatus>;
};

type WithSimplifiedDownloadProps = {
  children: FC<SimplifiedDownload>;
};

/**
 * Provides download artifacts and sidebar items to its child component
 */
const WithSimplifiedDownload: FC<WithSimplifiedDownloadProps> = async ({
  children: Component,
}) => {
  const [releaseData, t] = await Promise.all([
    getReleaseData(),
    getTranslations(),
  ]);
  const { pathname } = getClientContext();

  // Group and localize sidebar items
  const mappedSidebarItems = groupReleasesByStatus(releaseData, pathname);
  const localizedSidebarItems = mappedSidebarItems.map(item => ({
    ...item,
    groupName: t(`layouts.simpleDownload.sidebar.${item.groupName}`),
  }));

  // Extract version from pathname
  const version = pathname?.split('/').pop();
  if (!version) return null;

  // Find the matching release
  const matchingRelease = releaseData.find(
    ({ major, isLts }) =>
      major === Number(version) || (isLts === true && version === 'simplified')
  );

  if (matchingRelease) {
    const releaseArtifacts = buildReleaseArtifacts(matchingRelease);

    return (
      <Component
        {...releaseArtifacts}
        mappedSidebarItems={localizedSidebarItems}
      />
    );
  }

  return null;
};

export default WithSimplifiedDownload;

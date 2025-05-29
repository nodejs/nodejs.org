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

import type MetaBar from '@node-core/ui-components/Containers/MetaBar';
import { getTranslations } from 'next-intl/server';
import type { ComponentProps, FC } from 'react';

import { getClientContext } from '#site/client-context';
import getReleaseData from '#site/next-data/releaseData';
import {
  buildMetaBarItems,
  buildReleaseArtifacts,
  extractVersionFromPath,
  groupReleasesByStatus,
} from '#site/util/downloadUtils/simple';

type SimplifiedDownload = ReturnType<typeof buildReleaseArtifacts> & {
  sidebarItems: ReturnType<typeof groupReleasesByStatus>;
  metabarItems: ComponentProps<typeof MetaBar>['items'];
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
  const { pathname } = getClientContext();
  const [releaseData, t] = await Promise.all([
    getReleaseData(),
    getTranslations(),
  ]);

  // Extract version from pathname
  const version = extractVersionFromPath(pathname);

  if (!version) {
    return null;
  }

  // Find the matching release
  const release = releaseData.find(
    ({ major, isLts }) =>
      major === Number(version) || (isLts === true && version === 'simplified')
  );

  if (!release) {
    return null;
  }

  const releaseArtifacts = buildReleaseArtifacts(release);
  const metabarItems = buildMetaBarItems(release, t);

  // Group and localize sidebar items
  const mappedSidebarItems = groupReleasesByStatus(releaseData, pathname);
  const localizedSidebarItems = mappedSidebarItems.map(item => ({
    ...item,
    groupName: t(`layouts.simpleDownload.statusNames.${item.groupName}`),
  }));

  return (
    <Component
      {...releaseArtifacts}
      sidebarItems={localizedSidebarItems}
      metabarItems={metabarItems}
    />
  );
};

export default WithSimplifiedDownload;

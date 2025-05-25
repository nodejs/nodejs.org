import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import { getClientContext } from '#site/client-context';
import getReleaseData from '#site/next-data/releaseData';
import {
  getDownloadTable,
  groupReleasesForSidebar,
} from '#site/util/downloadUtils/simple';

type DownloadTable = ReturnType<typeof getDownloadTable>;
type Sidebar = ReturnType<typeof groupReleasesForSidebar>;

type WithSimplifiedDownloadProps = {
  children: FC<DownloadTable & { mappedSidebarItems: Sidebar }>;
};

const WithSimplifiedDownload: FC<WithSimplifiedDownloadProps> = async ({
  children: Component,
}) => {
  const releaseData = await getReleaseData();
  const { pathname } = getClientContext();
  const t = await getTranslations();

  const mappedSidebarItems = groupReleasesForSidebar(releaseData);
  const localizedSidebarItems = mappedSidebarItems.map(item => ({
    ...item,
    groupName: t(`layouts.simpleDownload.sidebar.${item.groupName}`),
  }));

  const version = pathname.split('/').pop();
  const matchingRelease = releaseData.find(
    ({ major, isLts }) =>
      major === Number(version) || (isLts === true && version === 'simplified')
  );

  if (matchingRelease !== undefined) {
    const table = getDownloadTable(matchingRelease);

    return <Component {...table} mappedSidebarItems={localizedSidebarItems} />;
  }

  return null;
};

export default WithSimplifiedDownload;

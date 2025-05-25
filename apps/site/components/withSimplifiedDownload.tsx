import type { FC } from 'react';

import { getClientContext } from '#site/client-context';
import getReleaseData from '#site/next-data/releaseData';
import {
  getDownloadTable,
  mapSidebarItems,
} from '#site/util/downloadUtils/simple';

type DownloadTable = ReturnType<typeof getDownloadTable>;
type Sidebar = ReturnType<typeof mapSidebarItems>;

type WithSimplifiedDownloadProps = {
  children: FC<DownloadTable & { mappedReleases: Sidebar }>;
};

const WithSimplifiedDownload: FC<WithSimplifiedDownloadProps> = async ({
  children: Component,
}) => {
  const releaseData = await getReleaseData();
  const { pathname } = getClientContext();
  const sidebarGroups = mapSidebarItems(releaseData);

  const version = pathname.split('/').pop();
  const matchingRelease = releaseData.find(
    ({ major, isLts }) =>
      major === Number(version) || (isLts === true && version === 'simplified')
  );

  if (matchingRelease !== undefined) {
    const table = getDownloadTable(matchingRelease);

    return <Component {...table} mappedReleases={sidebarGroups} />;
  }

  return null;
};

export default WithSimplifiedDownload;

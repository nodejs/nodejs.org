import type { FC } from 'react';

import { getClientContext } from '#site/client-context';
import getReleaseData from '#site/next-data/releaseData';
import { getDownloadTable } from '#site/util/downloadUtils';

const mapSidebarItems = (
  releaseData: Awaited<ReturnType<typeof getReleaseData>>
) =>
  Object.values(
    releaseData.reduce<
      Record<
        string,
        { groupName: string; items: Array<{ label: string; link: string }> }
      >
    >((acc, release) => {
      const key = release.status;
      if (!acc[key]) {
        acc[key] = {
          groupName: key,
          items: [],
        };
      }

      const label = [`v${release.major}`];

      if (release.codename) {
        label.push(release.codename);
      }

      acc[key].items.push({
        label: label.join(' '),
        link: `/download/${release.major}`,
      });

      return acc;
    }, {})
  );

type DownloadTable = ReturnType<typeof getDownloadTable>;
type Sidebar = ReturnType<typeof mapSidebarItems>;

type WithSimplifiedDownloadProps = {
  children: FC<DownloadTable & { mappedReleases: Sidebar }>;
};

const WithSimplifiedDownload: FC<WithSimplifiedDownloadProps> = async ({
  children: Component,
}) => {
  const { pathname } = getClientContext();
  const releaseData = await getReleaseData();
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

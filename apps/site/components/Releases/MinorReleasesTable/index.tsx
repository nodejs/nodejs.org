import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';
import Separator from '@node-core/ui-components/Common/Separator';
import NpmIcon from '@node-core/ui-components/Icons/PackageManager/Npm';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import LinkWithArrow from '#site/components/Common/LinkWithArrow';
import Link from '#site/components/Link';
import ReleaseOverviewItem from '#site/components/Releases/ReleaseOverview/ReleaseOverviewItem';
import { BASE_CHANGELOG_URL } from '#site/next.constants.mjs';
import type { MinorVersion } from '#site/types';
import { getNodeApiUrl } from '#site/util/url';

import styles from './index.module.css';

type MinorReleasesTableProps = {
  releases: Array<MinorVersion>;
};

const MinorReleasesTable: FC<MinorReleasesTableProps> = ({ releases }) => {
  const t = useTranslations();

  return (
    <div className={styles.scrollable}>
      <table>
        <thead className={styles.header}>
          <tr>
            <th>{t('components.minorReleasesTable.version')}</th>
            <th>{t('components.minorReleasesTable.information')}</th>
            <th>{t('components.minorReleasesTable.links')}</th>
          </tr>
        </thead>
        <tbody>
          {releases.map(release => (
            <tr key={release.version}>
              <td>
                <Link href={`/download/archive/v${release.version}`}>
                  v{release.version}
                </Link>
              </td>
              <td>
                <div className={styles.items}>
                  {release.modules && (
                    <>
                      <ReleaseOverviewItem
                        Icon={CodeBracketSquareIcon}
                        title={`v${release.modules}`}
                        subtitle={t('components.releaseOverview.nApiVersion')}
                      />
                      <Separator orientation="vertical" />
                    </>
                  )}
                  {release.npm && (
                    <>
                      <ReleaseOverviewItem
                        Icon={NpmIcon}
                        title={`v${release.npm}`}
                        subtitle={t('components.releaseOverview.npmVersion')}
                      />
                      <Separator orientation="vertical" />
                    </>
                  )}
                  <ReleaseOverviewItem
                    Icon={CodeBracketSquareIcon}
                    title={`v${release.v8}`}
                    subtitle={t('components.releaseOverview.v8Version')}
                  />
                </div>
              </td>
              <td>
                <div className={styles.additionalLinks}>
                  <Link href={getNodeApiUrl(`v${release.version}`)}>
                    {t('components.minorReleasesTable.actions.docs')}
                  </Link>
                  <Separator orientation="vertical" />
                  <LinkWithArrow
                    href={`${BASE_CHANGELOG_URL}${release.version}`}
                  >
                    {t('components.minorReleasesTable.actions.changelog')}
                  </LinkWithArrow>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MinorReleasesTable;

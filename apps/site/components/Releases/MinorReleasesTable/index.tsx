import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';
import Separator from '@node-core/ui-components/Common/Separator';
import NpmIcon from '@node-core/ui-components/Icons/PackageManager/Npm';
import { useTranslations } from 'next-intl';

import LinkWithArrow from '#site/components/Common/LinkWithArrow';
import Link from '#site/components/Link';
import ReleaseOverviewItem from '#site/components/Releases/ReleaseOverview/ReleaseOverviewItem';
import { BASE_CHANGELOG_URL } from '#site/next.constants.mjs';
import { getNodeApiUrl } from '#site/util/url';

import type { MinorVersion } from '#site/types';
import type { FC } from 'react';

import styles from './index.module.css';

type MinorReleasesTableProps = {
  releases: Array<MinorVersion>;
};

const MinorReleasesTable: FC<MinorReleasesTableProps> = ({ releases }) => {
  const t = useTranslations();

  return (
    <table>
      <thead>
        <tr>
          <th>{t('components.minorReleasesTable.version')}</th>
          <th>{t('components.minorReleasesTable.nApiVersion')}</th>
          <th>{t('components.minorReleasesTable.npmVersion')}</th>
          <th>{t('components.minorReleasesTable.v8Version')}</th>
          <th>{t('components.minorReleasesTable.links')}</th>
        </tr>
      </thead>
      <tbody>
        {releases.map(release => (
          <tr key={release.version}>
            <td data-label={t('components.minorReleasesTable.version')}>
              <Link href={`/download/archive/v${release.version}`}>
                v{release.version}
              </Link>
            </td>
            <td data-label={t('components.minorReleasesTable.nApiVersion')}>
              {release.modules && (
                <ReleaseOverviewItem
                  Icon={CodeBracketSquareIcon}
                  title={`v${release.modules}`}
                  className={styles.releaseOverviewItem}
                />
              )}
            </td>
            <td data-label={t('components.minorReleasesTable.npmVersion')}>
              {release.npm && (
                <ReleaseOverviewItem
                  Icon={NpmIcon}
                  title={`v${release.npm}`}
                  className={styles.releaseOverviewItem}
                />
              )}
            </td>
            <td data-label={t('components.minorReleasesTable.v8Version')}>
              <ReleaseOverviewItem
                Icon={CodeBracketSquareIcon}
                title={`v${release.v8}`}
                className={styles.releaseOverviewItem}
              />
            </td>
            <td>
              <div className={styles.additionalLinks}>
                <Link href={getNodeApiUrl(`v${release.version}`)}>
                  {t('components.minorReleasesTable.actions.docs')}
                </Link>
                <Separator orientation="vertical" />
                <LinkWithArrow href={`${BASE_CHANGELOG_URL}${release.version}`}>
                  {t('components.minorReleasesTable.actions.changelog')}
                </LinkWithArrow>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MinorReleasesTable;

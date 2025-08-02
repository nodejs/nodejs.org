'use client';

import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';
import Separator from '@node-core/ui-components/Common/Separator';
import NpmIcon from '@node-core/ui-components/Icons/PackageManager/Npm';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { ReleaseOverviewItem } from '#site/components/Downloads/ReleaseOverview';
import Link from '#site/components/Link';
import LinkWithArrow from '#site/components/LinkWithArrow';
import { BASE_CHANGELOG_URL } from '#site/next.constants.mjs';
import type { MinorVersion } from '#site/types';
import { getNodeApiUrl } from '#site/util/url';

import styles from './index.module.css';

type MinorReleasesTableProps = {
  releases: Array<MinorVersion>;
};

const MinorReleasesTable: FC<MinorReleasesTableProps> = ({ releases }) => {
  const t = useTranslations('components');

  return (
    <div className={styles.scrollable}>
      <table>
        <thead>
          <tr>
            <th>{t('minorReleasesTable.version')}</th>
            <th className={styles.information}>
              {t('minorReleasesTable.information')}
            </th>
            <th className={styles.links}>{t('minorReleasesTable.links')}</th>
          </tr>
        </thead>
        <tbody>
          {releases.map(release => (
            <tr key={release.version}>
              <td>
                <Link kind="neutral" href={`/download/v${release.version}`}>
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
                        subtitle={t('releaseOverview.nApiVersion')}
                      />
                      <Separator orientation="vertical" />
                    </>
                  )}
                  {release.npm && (
                    <>
                      <ReleaseOverviewItem
                        Icon={NpmIcon}
                        title={`v${release.npm}`}
                        subtitle={t('releaseOverview.npmVersion')}
                      />
                      <Separator orientation="vertical" />
                    </>
                  )}
                  <ReleaseOverviewItem
                    Icon={CodeBracketSquareIcon}
                    title={`v${release.v8}`}
                    subtitle={t('releaseOverview.v8Version')}
                  />
                </div>
              </td>
              <td>
                <div className={styles.additionalLinks}>
                  <Link
                    kind="neutral"
                    href={getNodeApiUrl(`v${release.version}`)}
                  >
                    {t('minorReleasesTable.actions.docs')}
                  </Link>
                  <Separator orientation="vertical" />
                  <LinkWithArrow
                    kind="neutral"
                    href={`${BASE_CHANGELOG_URL}${release.version}`}
                  >
                    {t('minorReleasesTable.actions.changelog')}
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

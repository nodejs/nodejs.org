'use client';

import Separator from '@node-core/ui-components/Common/Separator';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '#site/components/Link';
import { BASE_CHANGELOG_URL } from '#site/next.constants.mjs';
import type { MinorVersion } from '#site/types';
import { getNodeApiLink } from '#site/util/getNodeApiLink';

import styles from './index.module.css';

type MinorReleasesTableProps = {
  releases: Array<MinorVersion>;
};

const chunkedReleases = (releases: Array<MinorVersion>, size: number) => {
  const count = Math.ceil(releases.length / size);

  return Array.from({ length: count }, (_, index) =>
    releases.slice(index * size, (index + 1) * size)
  );
};

export const MinorReleasesTable: FC<MinorReleasesTableProps> = ({
  releases,
}) => {
  const t = useTranslations('components.minorReleasesTable');
  // Chunk minor releases into groups of 8 for scrollable display.
  // This is to ensure that the table does not become too wide and remains user-friendly
  const releaseGroups = chunkedReleases(releases, 8);

  return (
    <div className={styles.scrollable}>
      {releaseGroups.map(releases => (
        <table key={releases[0].version}>
          <thead>
            <tr>
              <th>{t('version')}</th>
              <th>{t('links')}</th>
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
                  <div className={styles.links}>
                    <Link
                      kind="neutral"
                      href={`https://nodejs.org/download/release/v${release.version}/`}
                    >
                      {t('actions.release')}
                    </Link>
                    <Separator orientation="vertical" />
                    <Link
                      kind="neutral"
                      href={`${BASE_CHANGELOG_URL}${release.version}`}
                    >
                      {t('actions.changelog')}
                    </Link>
                    <Separator orientation="vertical" />
                    <Link
                      kind="neutral"
                      href={getNodeApiLink(`v${release.version}`)}
                    >
                      {t('actions.docs')}
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};

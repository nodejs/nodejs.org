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

export const MinorReleasesTable: FC<MinorReleasesTableProps> = ({
  releases,
}) => {
  const t = useTranslations('components.minorReleasesTable');

  return (
    <div className={styles.scrollable}>
      <table>
        <thead>
          <tr>
            <th>{t('version')}</th>
            <th>{t('links')}</th>
          </tr>
        </thead>
        <tbody>
          <tr />
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
    </div>
  );
};

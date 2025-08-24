'use client';

import Badge from '@node-core/ui-components/Common/Badge';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { Fragment, useState } from 'react';

import FormattedTime from '#site/components/Common/FormattedTime';
import LinkWithArrow from '#site/components/Common/LinkWithArrow';
import Link from '#site/components/Link';
import provideReleaseData from '#site/next-data/providers/releaseData';

import ReleaseModal from './ReleaseModal';

const BADGE_KIND_MAP = {
  'End-of-life': 'warning',
  'Maintenance LTS': 'neutral',
  'Active LTS': 'info',
  Current: 'default',
  Pending: 'default',
} as const;

const PreviousReleasesTable: FC = () => {
  const releaseData = provideReleaseData();

  const t = useTranslations();

  const [currentModal, setCurrentModal] = useState<string | undefined>();

  return (
    <table id="tbVersions">
      <thead>
        <tr>
          <th>{t('components.downloadReleasesTable.version')}</th>
          <th>{t('components.downloadReleasesTable.codename')}</th>
          <th>{t('components.downloadReleasesTable.firstReleased')}</th>
          <th>{t('components.downloadReleasesTable.lastUpdated')}</th>
          <th>{t('components.downloadReleasesTable.status')}</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {releaseData.map(release => (
          <Fragment key={release.major}>
            <tr key={release.major}>
              <td data-label="Version">
                <Link href={`/download/archive/${release.versionWithPrefix}`}>
                  v{release.major}
                </Link>
              </td>

              <td data-label="LTS">{release.codename || '-'}</td>

              <td data-label="Date">
                <FormattedTime date={release.currentStart} />
              </td>

              <td data-label="Date">
                <FormattedTime date={release.releaseDate} />
              </td>

              <td data-label="Status">
                <Badge kind={BADGE_KIND_MAP[release.status]} size="small">
                  {release.status}
                  {release.status === 'End-of-life' ? ' (EoL)' : ''}
                </Badge>
              </td>

              <td>
                <LinkWithArrow
                  className="cursor-pointer"
                  onClick={() => setCurrentModal(release.version)}
                >
                  {t('components.downloadReleasesTable.details')}
                </LinkWithArrow>
              </td>
            </tr>

            <ReleaseModal
              release={release}
              open={currentModal === release.version}
              onOpenChange={open => open || setCurrentModal(undefined)}
            />
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default PreviousReleasesTable;

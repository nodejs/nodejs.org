'use client';

import Badge from '@node-core/ui-components/Common/Badge';
import { useTranslations } from 'next-intl';
import { Fragment, useState } from 'react';

import FormattedTime from '#site/components/Common/FormattedTime';
import LinkWithArrow from '#site/components/Common/LinkWithArrow';
import Link from '#site/components/Link';
import { STATUS_KIND_MAP } from '#site/next.constants.mjs';

import type { NodeRelease } from '#site/types';
import type { FC } from 'react';

import ReleaseModal from '../ReleaseModal';

type PreviousReleasesTableBodyProps = {
  releaseData: Array<NodeRelease>;
};

const PreviousReleasesTableBody: FC<PreviousReleasesTableBodyProps> = ({
  releaseData,
}) => {
  const t = useTranslations();

  const [currentModal, setCurrentModal] = useState<string | undefined>();

  return (
    <tbody>
      {releaseData.map(release => (
        <Fragment key={release.major}>
          <tr data-label={release.versionWithPrefix}>
            <td data-label={t('components.downloadReleasesTable.version')}>
              <Link href={`/download/archive/${release.versionWithPrefix}`}>
                v{release.major}
              </Link>
            </td>

            <td data-label={t('components.downloadReleasesTable.codename')}>
              {release.codename || '-'}
            </td>

            <td
              data-label={t('components.downloadReleasesTable.firstReleased')}
            >
              <FormattedTime date={release.initialReleaseDate} />
            </td>

            <td data-label={t('components.downloadReleasesTable.lastUpdated')}>
              <FormattedTime date={release.latestReleaseDate} />
            </td>

            <td data-label={t('components.downloadReleasesTable.status')}>
              <Badge kind={STATUS_KIND_MAP[release.status]} size="small">
                {release.status}
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
  );
};

export default PreviousReleasesTableBody;

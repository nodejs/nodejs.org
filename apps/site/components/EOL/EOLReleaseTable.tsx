'use client';

import { useTranslations } from 'next-intl';
import { Fragment, useState } from 'react';
import type { FC } from 'react';

import FormattedTime from '#site/components/Common/FormattedTime';
import LinkWithArrow from '#site/components/Common/LinkWithArrow';
import EOLModal from '#site/components/EOL/EOLModal';
import VulnerabilityChips from '#site/components/EOL/VulnerabilityChips';
import provideReleaseData from '#site/next-data/providers/releaseData';
import provideVulnerabilities from '#site/next-data/providers/vulnerabilities';
import { EOL_VERSION_IDENTIFIER } from '#site/next.constants.mjs';

const EOLReleaseTable: FC = () => {
  const releaseData = provideReleaseData();
  const vulnerabilities = provideVulnerabilities();

  const eolReleases = releaseData.filter(
    release => release.status === EOL_VERSION_IDENTIFIER
  );

  const t = useTranslations();

  const [currentModal, setCurrentModal] = useState<string | undefined>();

  return (
    <table id="tbVulnerabilities">
      <thead>
        <tr>
          <th>
            {t('components.eolTable.version')} (
            {t('components.eolTable.codename')})
          </th>
          <th>{t('components.eolTable.lastUpdated')}</th>
          <th>{t('components.eolTable.vulnerabilities')}</th>
          <th>{t('components.eolTable.details')}</th>
        </tr>
      </thead>

      <tbody>
        {eolReleases.map(release => (
          <Fragment key={release.major}>
            <tr>
              <td data-label="Version">
                v{release.major}{' '}
                {release.codename ? `(${release.codename})` : ''}
              </td>

              <td data-label="Date">
                <FormattedTime date={release.releaseDate} />
              </td>

              <td>
                <VulnerabilityChips
                  vulnerabilities={vulnerabilities[release.major]}
                />
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

            <EOLModal
              release={release}
              vulnerabilities={vulnerabilities[release.major]}
              open={currentModal === release.version}
              onOpenChange={open => open || setCurrentModal(undefined)}
            />
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default EOLReleaseTable;

'use client';

import Switch from '@node-core/ui-components/Common/Switch';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { Fragment, useState } from 'react';

import FormattedTime from '#site/components/Common/FormattedTime';
import LinkWithArrow from '#site/components/Common/LinkWithArrow';
import EOLModal from '#site/components/EOL/EOLModal';
import VulnerabilityChips from '#site/components/EOL/VulnerabilityChips';
import type { NodeRelease } from '#site/types/releases.js';
import type { GroupedVulnerabilities } from '#site/types/vulnerabilities.js';

type EOLReleaseTableBodyProps = {
  eolReleases: Array<NodeRelease>;
  vulnerabilities: GroupedVulnerabilities;
};

const EOLReleaseTableClient: FC<EOLReleaseTableBodyProps> = ({
  eolReleases,
  vulnerabilities,
}) => {
  const t = useTranslations();

  const [currentModal, setCurrentModal] = useState<string | undefined>();
  const [hideNonLts, setHideNonLts] = useState(false);

  const filteredReleases = hideNonLts
    ? eolReleases.filter(release => release.isLts)
    : eolReleases;

  return (
    <>
      <Switch
        label={t('components.eolTable.hideNonLts')}
        checked={hideNonLts}
        onCheckedChange={setHideNonLts}
      />
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
          {filteredReleases.map(release => (
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
    </>
  );
};

export default EOLReleaseTableClient;

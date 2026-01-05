'use client';

import { useTranslations } from 'next-intl';
import { Fragment, useState } from 'react';

import FormattedTime from '#site/components/Common/FormattedTime';
import LinkWithArrow from '#site/components/Common/LinkWithArrow';
import EOLModal from '#site/components/EOL/EOLModal';
import VulnerabilityChips from '#site/components/EOL/VulnerabilityChips';

import type { GroupedVulnerabilities, NodeRelease } from '#site/types';
import type { FC } from 'react';

type EOLReleaseTableBodyProps = {
  eolReleases: Array<NodeRelease>;
  vulnerabilities: GroupedVulnerabilities;
};

const EOLReleaseTableBody: FC<EOLReleaseTableBodyProps> = ({
  eolReleases,
  vulnerabilities,
}) => {
  const t = useTranslations();

  const [currentModal, setCurrentModal] = useState<string | undefined>();

  return (
    <tbody>
      {eolReleases.map(release => (
        <Fragment key={release.major}>
          <tr data-lts={!!release.codename}>
            <td data-label="Version">
              v{release.major} {release.codename ? `(${release.codename})` : ''}
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
  );
};

export default EOLReleaseTableBody;

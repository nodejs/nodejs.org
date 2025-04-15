import Modal from '@node-core/ui-components/Common/Modal';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import LinkWithArrow from '@/components/LinkWithArrow';
import { BASE_CHANGELOG_URL } from '@/next.constants.mjs';
import type { NodeRelease } from '@/types';
import { getNodeApiLink } from '@/util/getNodeApiLink';

import { MinorReleasesTable } from './MinorReleasesTable';

type ReleaseModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  release: NodeRelease;
};

const ReleaseModal: FC<ReleaseModalProps> = ({
  isOpen,
  closeModal,
  release,
}) => {
  const t = useTranslations('components.releaseModal');

  return (
    <Modal
      heading={`Node.js ${release.major} Release`}
      subheading={release?.codename ?? ''}
      open={isOpen}
      onOpenChange={closeModal}
    >
      <div className="flex flex-row gap-2">
        {release.status !== 'Current' && (
          <LinkWithArrow
            href={`/blog/announcements/v${release.major}-release-announce`}
          >
            {t('releaseAnnouncement')}
          </LinkWithArrow>
        )}

        <LinkWithArrow
          href={`https://nodejs.org/download/release/${release.versionWithPrefix}/`}
        >
          {t('actions.releases')}
        </LinkWithArrow>

        <LinkWithArrow href={`${BASE_CHANGELOG_URL}${release.version}`}>
          {t('actions.changelog')}
        </LinkWithArrow>

        <LinkWithArrow href={getNodeApiLink(release.versionWithPrefix)}>
          {t('actions.docs')}
        </LinkWithArrow>
      </div>

      <MinorReleasesTable releases={release.minorVersions} />
    </Modal>
  );
};

export default ReleaseModal;

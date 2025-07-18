'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { use } from 'react';

import LinkWithArrow from '#site/components/LinkWithArrow';
import { ReleaseModalContext } from '#site/providers/releaseModalProvider';
import type { NodeRelease } from '#site/types';

type DetailsButtonProps = {
  versionData: NodeRelease;
};

/**
 * TODO @bmuenzenmeyer adapt to vulnerabilities - this is currently a copy paste of the release - versionData should have everything we need :fingers_crossed:
 * @param param0
 * @returns
 */
const DetailsButton: FC<DetailsButtonProps> = ({ versionData }) => {
  const t = useTranslations('components.downloadReleasesTable');

  const { openModal } = use(ReleaseModalContext);

  return (
    <LinkWithArrow
      className="cursor-pointer"
      onClick={() => openModal(versionData)}
    >
      {t('details')}
    </LinkWithArrow>
  );
};

export default DetailsButton;

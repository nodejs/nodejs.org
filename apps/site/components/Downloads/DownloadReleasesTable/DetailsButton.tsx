'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { use } from 'react';

import LinkWithArrow from '#site/components/Common/LinkWithArrow';
import { ReleaseModalContext } from '#site/providers/releaseModalProvider';
import type { NodeRelease } from '#site/types';

type DetailsButtonProps = {
  versionData: NodeRelease;
};

const DetailsButton: FC<DetailsButtonProps> = ({ versionData }) => {
  const t = useTranslations('components.downloadReleasesTable');

  const { openModal } = use(ReleaseModalContext);

  return (
    <LinkWithArrow
      onClick={() => openModal(versionData)}
      aria-label={t('details')}
    >
      {t('details')}
    </LinkWithArrow>
  );
};

export default DetailsButton;

'use client';

import { useTranslations } from 'next-intl';
import { use, type FC } from 'react';

import LinkWithArrow from '@/components/LinkWithArrow';
import { ReleaseModalContext } from '@/providers/releaseModalProvider';
import type { NodeRelease } from '@/types';

type DetailsButtonProps = {
  versionData: NodeRelease;
};

const DetailsButton: FC<DetailsButtonProps> = ({ versionData }) => {
  const t = useTranslations('components.downloadReleasesTable');

  const { openModal } = use(ReleaseModalContext);

  return (
    <LinkWithArrow href="#" onClick={() => openModal(versionData)}>
      {t('details')}
    </LinkWithArrow>
  );
};

export default DetailsButton;

'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { use } from 'react';

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
    <LinkWithArrow
      className="cursor-pointer"
      onClick={() => openModal(versionData)}
    >
      {t('details')}
    </LinkWithArrow>
  );
};

export default DetailsButton;

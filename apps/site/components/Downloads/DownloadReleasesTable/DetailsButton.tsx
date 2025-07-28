'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { use } from 'react';

import LinkWithArrow from '#site/components/LinkWithArrow';
import { ModalContext } from '#site/providers/modalProvider';

type DetailsButtonProps = {
  data: unknown;
};

const DetailsButton: FC<DetailsButtonProps> = ({ data }) => {
  const t = useTranslations();

  const { openModal } = use(ModalContext);

  return (
    <LinkWithArrow className="cursor-pointer" onClick={() => openModal(data)}>
      {t('components.downloadReleasesTable.details')}
    </LinkWithArrow>
  );
};

export default DetailsButton;

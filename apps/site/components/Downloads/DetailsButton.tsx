'use client';

import { use, type FC } from 'react';

import LinkWithArrow from '@/components/LinkWithArrow';
import { ReleaseModalContext } from '@/providers/releaseModalProvider';
import type { NodeRelease } from '@/types';

type DetailsButtonProps = {
  versionData: NodeRelease;
};

const DetailsButton: FC<DetailsButtonProps> = ({ versionData }) => {
  const { openModal } = use(ReleaseModalContext);

  return (
    <LinkWithArrow onClick={() => openModal(versionData)}>
      Details
    </LinkWithArrow>
  );
};

export default DetailsButton;

'use client';

import type { FC, PropsWithChildren } from 'react';
import { useContext } from 'react';

import LinkWithArrow from '@/components/Downloads/Release/LinkWithArrow';
import { ReleaseContext } from '@/providers/releaseProvider';

const ChangelogLink: FC<PropsWithChildren> = ({ children }) => {
  const { modalOpen, setModalOpen } = useContext(ReleaseContext);

  return (
    <LinkWithArrow
      className="cursor-pointer"
      onClick={() => setModalOpen(!modalOpen)}
    >
      {children}
    </LinkWithArrow>
  );
};

export default ChangelogLink;

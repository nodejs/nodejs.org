'use client';

import type { FC, PropsWithChildren } from 'react';
import { useContext } from 'react';

import LinkWithArrow from '@/components/Downloads/Release/LinkWithArrow';
import { ReleaseContext } from '@/providers/releaseProvider';

const ChangelogLink: FC<PropsWithChildren> = ({ children }) => {
  const { modalOpen, setModalOpen } = useContext(ReleaseContext);

  return (
    <button onClick={() => setModalOpen(!modalOpen)}>
      <LinkWithArrow className="cursor-pointer">{children}</LinkWithArrow>
    </button>
  );
};

export default ChangelogLink;

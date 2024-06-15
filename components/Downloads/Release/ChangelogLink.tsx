'use client';

import type { FC, PropsWithChildren } from 'react';
import { useContext } from 'react';

import LinkWithArrow from '@/components/Downloads/Release/LinkWithArrow';
import { ReleaseContext } from '@/providers/releaseProvider';

const ChangelogLink: FC<PropsWithChildren> = ({ children }) => {
  const { modalOpen, setModalOpen } = useContext(ReleaseContext);

  return (
    <LinkWithArrow asChild>
      <button
        className="anchor cursor-pointer"
        onClick={() => setModalOpen(!modalOpen)}
      >
        {children}
      </button>
    </LinkWithArrow>
  );
};

export default ChangelogLink;

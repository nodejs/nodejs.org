'use client';

import type { FC, PropsWithChildren } from 'react';

import ChangelogModal from '@/components/Downloads/ChangelogModal';
import LinkWithArrow from '@/components/Downloads/Release/LinkWithArrow';
import { useReleaseContext } from '@/providers/releaseProvider';

const ChangelogTrigger: FC<PropsWithChildren> = ({ children }) => {
  const {
    state: { version },
  } = useReleaseContext();

  return (
    <ChangelogModal
      trigger={<LinkWithArrow url="#">{children}</LinkWithArrow>}
      heading={version}
      subheading=""
      avatars={[]}
    >
      {children}
    </ChangelogModal>
  );
};

export default ChangelogTrigger;
